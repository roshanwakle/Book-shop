import React, { useEffect, useState } from 'react'
import '../admin/addProduct.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

export const AddProduct = () => {
    const [img, setImg] = useState();
    const [title, setTitle] = useState('')
    const [categories, setCategories] = useState()
    const [color, setColor] = useState('')
    const [desc, setDesc] = useState('')
    const [price, setPrice] = useState('')
    const [size, setSize] = useState('')
    const [productId, setProductId] = useState('')


    const addProduct = async (e) => {
        const EmpDetails = { img: img, title: title, categories: categories, color: color, desc: desc, price: price, size: size, productId: productId, }
        await axios.post(`http://localhost:5000/product/postProduct`, EmpDetails)
            .then((res) => {
                window.location.reload()
            })
            swal({
                title: "Success!",
                text: "Product added successfuly",
                icon: "success",
                button: "Aww yiss!",
              });
    };

    return (
        <div className='background'>
            <h1>
                Add Products Here
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
                    <button  class="formButton" onClick={addProduct}>Submit</button>
                    </Link>
                </form>
            </div>
        </div>

    )
}
