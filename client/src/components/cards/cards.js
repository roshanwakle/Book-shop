import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../cards/cards.css'
import { useCart } from 'react-use-cart'

export const Cards = (props) => {
const data = props.data;
const [visible,setStVisible]= useState(4)
const showMoreItems =()=>{
    setStVisible((prevValue)=>prevValue+4)
}
const handleAddToCard = props.handleAddToCard;
    return (
        <>
        <div>
            {data.slice(0,visible).map((productItem, index) => {
                return (
                    <div class="card" style={{ width: "18rem" }}>
                        <img src={productItem.img} class="card-img-top" alt="..." />
                        <div class="card-body" key={productItem.productId}>
                            <h5 class="card-title">{productItem.title}</h5>
                            <p class="containText">{productItem.desc}</p>
                            <p class="card-text">{productItem.price}-/Rs</p>
                            <p class="card-text">{productItem.size}</p>
                            <p class="card-text">{productItem.color}</p>
                        <a class="Cart" onClick={()=>{handleAddToCard(productItem)}} >Add to cart</a>
                            {/* <a href="#" class="Cart" >Buy it Now</a> */}
                        </div>
                    </div>

                )
            })}
        </div>
            <button className='LoadMore' onClick={showMoreItems}>Load More</button>
        </>
    )
}


