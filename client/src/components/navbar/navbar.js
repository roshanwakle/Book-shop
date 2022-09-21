import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import book from '../imases/book1.png'
import '../navbar/navbar.css'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert';
import axios from 'axios'
export const Navbar = (props) => {
    const cartItems = props.cartItems
    const navigate = useNavigate()
    const admin = localStorage.getItem("admin");
    const auth = localStorage.getItem("token")
    const email = localStorage.getItem('email')
    const [user, setUser] = useState([]);

    console.log(props, "props")

    //getUser Details
    const getUserDetails = async () => {
        const response = await axios.get(`http://localhost:5000/users`)
        console.log(response, "response in navbar")

        if (response.status === 200) {
            setUser(response.data)
        }
    }

    useEffect(() => {
        getUserDetails()
    }, [])






    const handleLogout = () => {
        localStorage.clear();
        navigate("/SignIn")
        console.log("handle log-out");
        swal({
            title: "Success!",
            text: "User loged out successful",
            icon: "success",
            button: "OK!",
        });
    }


    return (
        <div>

            <nav className="navbar navbar-expand-lg navbar-light  bg-light ">
                <div className="container-fluid ">
                    <Link to="/Home">
                        <a className="navbar-brand ">
                            <img src={book} style={{ height: "40px", width: "100px" }} ></img>
                        </a>
                    </Link>
                    <div className='collapse navbar-collapse'>
                        <ul className="navbar-nav me-auto ">
                            {auth && <Link to="/Home">
                                <li className="nav-itemm">
                                    <a className="nav-link" href="">Home</a>
                                </li>
                            </Link>}

                            {auth && <Link to="/About">
                                <li className="nav-itemm">
                                    <a className="nav-link" href="">AboutUs</a>
                                </li>
                            </Link>}

                            {admin === "true" && <Link to="/Admin">
                                <li className="nav-itemm">
                                    <a className="nav-link" href="/Admin">Admin</a>
                                </li>
                            </Link>}


                        </ul>
                    </div>

                    <div className="collapse navbar-collapse position-absolute top-44 end-0" id="navbarSupportedContent">

                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {auth ?
                                <Link to="/Cart">
                                    <button className="nav-item" >
                                        <a className="nav-link" ><i className="fa fa-cart-plus"><span style={{ color: "red" }}>{cartItems.length === 0 ? "" : cartItems.length}</span></i></a>
                                    </button >
                                </Link> : <Link to="/SignIn">
                                    <li className="nav-item">
                                        <a className="nav-link" href="/SignIn"><i className="fa fa-user"></i></a>
                                    </li>
                                </Link>}



                            {/* <li className="nav-item"> */}
                            <a className="nav-link active" aria-current="page" href="#">
                                <button class="sideButton" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"><i className="fa fa-bars"></i></button>
                                <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                                    <div class="bg-white" id="sidebar-wrapper">
                                        <div class="sidebar-heading text-center py-4 primary-text fs-4 fw-bold text-uppercase border-bottom"><i
                                            class="fa-solid fa-earth-americas"></i>E-Shop</div>
                                        <div >
                                            <h1 className="list-group-item list-group-item-action bg-transparent second-text active" style={{marginLeft:"90px"}}>{email}</h1>
                                        </div>
                                        <div class="list-group list-group-flush my-3">

                                            <a href="#" class="list-group-item list-group-item-action bg-transparent second-text active"><i
                                                class="fas fa-tachometer-alt me-2"></i>Welcome</a>
                                            <a href="#" class="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                                                class="fas fa-project-diagram me-2"></i>Projects</a>
                                            <a href="#" class="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                                                class="fas fa-chart-line me-2"></i>Analytics</a>
                                            <a href="#" class="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                                                class="fas fa-paperclip me-2"></i>Reports</a>
                                            {/* <a href="#" class="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                                                class="fas fa-shopping-cart me-2"></i>Store Mng</a> */}
                                            <a href="#" class="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                                                class="fas fa-gift me-2"></i>Products</a>
                                            <a href="#" class="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                                                class="fas fa-comment-dots me-2"></i>Chat</a>
                                            <a href="#" class="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                                                class="fas fa-map-marker-alt me-2"></i>Outlet</a>
                                            <a href="#" class="list-group-item list-group-item-action bg-transparent text-danger fw-bold" onClick={handleLogout}><i
                                                class="fas fa-power-off me-2"></i>Logout</a>
                                        </div>
                                    </div>
                                </div>
                            </a>

                        </ul>

                    </div>
                </div>
            </nav>


            <div>
            </div>
        </div>
    )
}
