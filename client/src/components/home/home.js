import React from 'react'
import '../home/home.css'
import { Cards } from '../cards/cards'
import { Carousel } from '../carousel/carousel'
import { SearchBar } from '../searchBar/searchBar'
import { SliderCard } from '../slider/sliderCard'
import { BuyNow } from '../cards/BuyNow'
import { About } from '../aboutUs/about'



export const Home = (props) => {
  
  let x = props.handleAddProduct
  return (
    <div className='all'>
      
      <SliderCard/>
      <SearchBar handleAddToCard={x} />
      <div>
        <Carousel />
      </div>
      <div>
        {/* <About/> */}
      </div>
    </div>
  )
}
