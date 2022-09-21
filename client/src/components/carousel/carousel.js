import React from 'react'
import { Link } from 'react-router-dom'
import book1 from '../imases/bookC1.jpg'
import book2 from '../imases/bookC2.jpg'
import book3 from '../imases/bookC3.jpg'
import '../carousel/carousel.css'
export const Carousel = () => {
    return (
        <div>
        <div className=''>
              <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="false">
                <div class="carousel-indicators">
                  <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                  <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                  <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <img src={book1} style={{ height: "400px" }} class="d-block w-100" alt="..." />
                    <div class="carousel-caption d-none d-md-block">
                        <Link to ="/Cart">
                      <button className='primary'>Shop Now</button>
                      </Link>
                      <p className='carouserDesc'></p>
                    </div>
                  </div>
                  <div class="carousel-item">
                <img src={book2} style={{ height: "400px" }} class="d-block w-100" alt="..." />
                <div class="carousel-caption d-none d-md-block">
                <button className='primary'>Shop Now</button>
                  <p>Some representative placeholder content for the first slide.</p>
                </div>
              </div>
              <div class="carousel-item">
                <img src={book3} style={{ height: "400px" }} class="d-block w-100" alt="..." />
                <div class="carousel-caption d-none d-md-block">
                <button className='primary'>Shop Now</button>
                  <p>Some representative placeholder content for the first slide.</p>
                </div>
              </div> 
                  <h1>{}</h1>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>
        </div>
    </div>
    )
}
