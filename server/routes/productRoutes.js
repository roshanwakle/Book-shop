const router = require("express").Router();

const Product = require('../models/product')

class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    filtering() {
        const queryObj = { ...this.queryString } //queryString = req.query

        const excludedFields = ['page', 'sort', 'limit']
        excludedFields.forEach(el => delete (queryObj[el]))

        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)

        //    gte = greater than or equal
        //    lte = lesser than or equal
        //    lt = lesser than
        //    gt = greater than
        this.query.find(JSON.parse(queryStr))

        return this;
    }

    sorting() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        } else {
            this.query = this.query.sort('-createdAt')
        }

        return this;
    }

    paginating() {
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

router.get('/getProduct/:id', async (req,res)=> {
    // try{
    //    let user= await Product.findOne({id:req.params._id});
    //     res.json(user);
    // }catch (e) {
    //     res.json({message: e.message})
    // }
    try{
        const user = await Product.findById(req.params.id);
        res.status(200).json(user);
    }catch( error ){
        res.status(404).json({ message: error.message })
    }

})

router.get('/getProduct', async (req, res) => {
    try {
        const features = new APIfeatures(Product.find(), req.query)
            .filtering().sorting().paginating()

        const products = await features.query

        res.json({
            status: 'success',
            result: products.length,
            products: products
        })

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }

})
 
router.post('/postProduct', async (req, res) => {
    try {
        const { productId, title, desc, img, categories, size, color, price } = req.body
        if (!img) return res.status(400).json({ msg: "No image upload" })
        const product = await Product.findOne({ productId })
        if (product)
            return res.status(400).json({ msg: "This product already exists." })

        const newProduct = new Product({
            productId, title: title.toLowerCase(), desc, img, categories, size, color, price
        })

        await newProduct.save()
        res.status(200).json({ message: "product created" })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }

})

router.delete('/deleteProduct/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.json({ msg: "Deleted a Product" })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
})

router.delete('/deleteProduct/:productId', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.productId)
        res.json({ msg: "Deleted a Product" })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
})

router.put('/updateProduct/:id', async (req, res) => {
    try {
        const { title, desc, img, categories, size, color, price } = req.body;
        if (!img) return res.status(400).json({ msg: "No image upload" })

        await Product.findOneAndUpdate({ _id: req.params.id }, {
            title: title.toLowerCase(), desc, img, categories, size, color, price
        })

        res.json({ msg: "Updated a Product" })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }

})



module.exports = router