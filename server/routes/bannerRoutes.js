const router = require("express").Router();
const Banner = require('../models/bannerModel')



router.get('/getBanner', async (req, res) => {
    try {
        const data = await Banner.find();
        res.status(200).send({ message: data });
    } catch (error) {
        res.status(500).send({ message: error });
    }
})

router.post('/postBanner', async (req, res) => {
    const { description, bannerImage, bannerId } = req.body
    console.log(req.body, ">>>>>>");
    try {
        const data = await Banner.create({ description, bannerImage, bannerId })
        res.status(200).send({ message: data });

    } catch (error) {
        res.status(400).send({ message: error });

    }
})

router.put('/putBanner/:Id', async (req, res) => {
    try {
        const data = await Banner.updateOne(req.params, { $set: req.body })
        res.status(200).send({ data });
    } catch (error) {
        res.status(400).send({ message: error });
    }
})

router.delete('/deleteBanner/:id', async (req, res) => {
    try {
        console.log(req.params.id, ">>>>>>>>>>>");
        await Banner.deleteOne({ _id: req.params.id });
        res.status(200).send("banner record deleted Successfully............");
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
})

module.exports = router;