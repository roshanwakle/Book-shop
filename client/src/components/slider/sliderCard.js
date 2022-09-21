import React, { useState, useEffect } from 'react'
import axios from 'axios';
import '../slider/sliderCard.css'
import img from '../imases/book.png'
import Slider from 'react-slick'
// import "~slick-carousel/slick/slick.css"; 
// import "~slick-carousel/slick/slick-theme.css";
export const SliderCard = () => {
  const [slide, setSlide] = useState([]);

  const setting = {
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }

  const getProducts = async (e) => {

    const response = await axios.get(`http://localhost:5000/product/getProduct`)
    // console.log(response.data.products, "???");
    if (response.status === 200) {
      setSlide(response.data.products)
    }
  }


  useEffect(() => {
    getProducts()
  }, [])
  return (
    <>
      <Slider {...setting}>
        {slide.map((item, index) => {
          return (

            <div class="Slidecard" >
              <div className='card-top'>
                <img src={item.img} style={{width:"100%",height:"200px"}} class="card-top" alt="..." />
              </div>
              <div className='card-bottom'>
                <h5 class="card-title" >{item.title}</h5>
              </div>
              <div className='card-bottom'>
              <h5 class="card-title" >{item.price} Rs./only</h5>
              </div>
            </div>

          )
        })}
      </Slider>
    </>
  )
}


