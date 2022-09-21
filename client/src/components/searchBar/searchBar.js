import React,{useState,useEffect} from 'react'
import '../searchBar/searchBar.css'
import { Cards } from '../cards/cards';
import axios from 'axios';
import { Cart } from '../cards/cart';
export const SearchBar = (props) => {
    const [cards, setCards] = useState([]);
    const [search ,setSearch] = useState('')
    const getProducts = async () => {
        const response = await axios.get(`http://localhost:5000/product/getProduct`)
        if (response.status === 200) {
            setCards(response.data.products)
        }
    }

    const searchText = (dataSearch)=>{
        return dataSearch.filter((itemm)=>
         itemm.title.toLowerCase().includes(search) ||
         itemm.price.toLowerCase().includes(search)
        )
    }

    const filterResult =(catItem)=>{
        console.log('clicked')
      const result = cards.filter((currData) =>{
        return currData === catItem
      })
    }
   
  
      useEffect(() => {
        getProducts()
    }, [])

    return (
        <>
        <div className='col-lg-4 mx-auto'>
            <form>
                <div className='p-1 bg-light shadow-sm'>
                    <div className='input-group'>
                        <input type='search' placeholder='Search Books' className='form-control' onChange={(e)=>setSearch(e.target.value)}/>
                        <div className="dropdown">
                            <button class="dropbtn" >All Books</button>
                            <div class="dropdown-content">
                                <a  onClick={()=>filterResult('white')} ><i className="fa-solid fa-comment-dots mr-2"></i>Story</a>
                                <a href="#" ><i className="fa-solid fa-comment-dots mr-2" ></i>Novels</a>
                                <a href="#" ><i className="fa-solid fa-comment-dots mr-2"></i>Comics</a>
                            </div>
                        </div>
                        <div className='input-group-append'>
                            <button type='submit' className='btn btn-link'><i class="fas fa-search"></i></button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <Cards data={searchText(cards)} handleAddToCard={props.handleAddToCard}/>
        {/* <Cart cart={cards} setCart={setCards} handleChange={handleChange} /> */}
        </>
    )
}

