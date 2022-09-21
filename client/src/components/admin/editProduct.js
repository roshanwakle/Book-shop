import React, { useEffect, useState } from 'react'
import { useParams ,useNavigate,Link} from 'react-router-dom';
import '../admin/addProduct.css'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import swal from 'sweetalert';
export const EditProduct = () => {
    // const [data ,setData] = useState([])
    const [img, setImg] = useState();
    const [title, setTitle] = useState('')
    const [categories, setCategories] = useState()
    const [color, setColor] = useState('')
    const [desc, setDesc] = useState('')
    const [price, setPrice] = useState('')
    const [size, setSize] = useState('')
    const [productId, setProductId] = useState('')
    const params = useParams()
    const Navigate= useNavigate()

    // console.log(img, title, categories, color, desc, price, size, productId, ">>>>>>>>>")
 

    const getProducts = async (e) => {
        console.log(params,"params");
        const response = await axios.get(`http://localhost:5000/product/getProduct/${params.id}`)
        console.log(response,"response")
        setImg(response.data.img)
        setCategories(response.data.categories);
        setTitle(response.data.title);
        setColor(response.data.color)
        setDesc(response.data.desc)
        setPrice(response.data.price)
        setSize(response.data.size)
        setProductId(response.data.productId)  
      
    }

    const updateProduct = async () => {
        console.log(img, title, categories, color, desc, price, size, productId)
        const obj = { img: img, categories: categories, title: title, color: color,desc:desc, price:price,size:size,productId};
        const result = await axios.put(`http://localhost:5000/product//updateProduct/${params.id}`,obj)
        console.log(result,"result")
        swal({
            title: "Success!",
            text: "Product updated successful",
            icon: "success",
            button: "OK!",
          });
     
    };

    useEffect(() => {
        getProducts()
    }, [])
    return (
        <div className='background'>
            <h1>
                Update Products
            </h1>

            <div className='Contain-all'>
                <form >
                    <input type="text" name="img" class="formStyle" placeholder="Image " value={img} onChange={(e) => { setImg(e.target.value) }} />
                    <input type="text" name="title" class="formStyle" placeholder="title " value={title} onChange={(e) => { setTitle(e.target.value) }} />
                    <input type="text" name="categories" class="formStyle" placeholder="categories " value={categories} onChange={(e) => { setCategories(e.target.value) }} />
                    <input type="text" name="color" class="formStyle" placeholder="color " value={color} onChange={(e) => { setColor(e.target.value) }} />
                    <input type="text" name="desc" class="formStyle" placeholder="desc " value={desc} onChange={(e) => { setDesc(e.target.value) }} />
                    <input type="text" name="price" class="formStyle" placeholder="price " value={price} onChange={(e) => { setPrice(e.target.value) }} />
                    <input type="text" name="size" class="formStyle" placeholder="size " value={size} onChange={(e) => { setSize(e.target.value) }} />
                    <input type="text" name="productId" class="formStyle" placeholder="productId " value={productId} onChange={(e) => { setProductId(e.target.value) }} />
                    <Link to="/Admin">
                    <button class="formButton" onClick={updateProduct}>Submit</button>
                    </Link>
                </form>
            </div>
                <ToastContainer />
        </div>

    )
}
