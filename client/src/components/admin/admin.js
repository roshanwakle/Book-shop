import React, { useEffect, useState } from 'react'
import '../admin/admin.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

export const Admin = (props) => {
    const [cards, setCards] = useState([]);
    const [productId, setProductId] = useState("")
    const [admin, setAdmin] = useState(props.admin);
    // get all Products
    const getProducts = async () => {
        const response = await axios.get(`http://localhost:5000/product/getProduct`)
        // console.log(response.data.products);
        if (response.status === 200) {
            setCards(response.data.products)
        }
    }

    //delete product
    const deleteProduct = async (id) => {
        const url = `http://localhost:5000/product/deleteProduct/${id}`;
        console.log("id", url);
        await axios.delete(url).then((response) => {
            console.log("res", response.data.products);
            swal({
                title: "Are you sure?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        swal("Product has been deleted", {
                            icon: "success",
                        });
                    } else {
                        swal("Your imaginary file is safe!");
                    }
                });
            if (response) {
                getProducts();
            }

        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        getProducts()
        setProductId()
    }, [])

    return (

        <div>
            <div class="d-flex" id="wrapper">
                <div class="bg-secondary" id="sidebar-wrapper">
                    <div class="sidebar-heading text-center py-4 primary-text fs-4 fw-bold text-uppercase border-bottom"><i
                        class="fas fa-user-secret me-2"></i>Admin</div>
                    <div class="list-group list-group-flush my-3">
                        <a href="#" class="list-group-item list-group-item-action bg-transparent second-text active"><i
                            class="fas fa-tachometer-alt me-2"></i>Dashboard</a>
                        <Link to="/AdminUser">
                            <a href="#" class="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                                class="fas fa-project-diagram me-2"></i>User Details</a>
                        </Link>
                        <a href="#" class="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                            class="fas fa-chart-line me-2"></i>Analytics</a>
                        <a href="#" class="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                            class="fas fa-paperclip me-2"></i>Reports</a>
                        <a href="#" class="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                            class="fas fa-shopping-cart me-2"></i>Store Mng</a>
                        <a href="#" class="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                            class="fas fa-gift me-2"></i>Products</a>
                        <a href="#" class="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                            class="fas fa-comment-dots me-2"></i>Chat</a>
                        <a href="#" class="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                            class="fas fa-map-marker-alt me-2"></i>Outlet</a>

                    </div>
                </div>

                <div id="page-content-wrapper">
                    <nav class="navbar navbar-expand-lg navbar-light bg-transparent py-4 px-4">
                        <div class="d-flex align-items-center">
                            <i class="fas fa-align-left primary-text fs-4 me-3" id="menu-toggle"></i>
                            <h2 class="fs-2 m-0">Dashboard</h2>
                        </div>
                    </nav>

                    <div class="container-fluid px-4">
                        <div class="row g-3 my-2">
                            <div class="col-md-3">
                                <div class="p-3 bg-secondary shadow-sm d-flex justify-content-around align-items-center rounded">
                                    <div>
                                        <h3 class="fs-2">720</h3>
                                        <p class="fs-5">Products</p>
                                    </div>
                                    <i class="fas fa-gift fs-1 primary-text border rounded-full secondary-bg p-3"></i>
                                </div>
                            </div>

                            <div class="col-md-3">
                                <div class="p-3 bg-secondary shadow-sm d-flex justify-content-around align-items-center rounded">
                                    <div>
                                        <h3 class="fs-2">4920</h3>
                                        <p class="fs-5">Sales</p>
                                    </div>
                                    <i
                                        class="fas fa-hand-holding-usd fs-1 primary-text border rounded-full secondary-bg p-3"></i>
                                </div>
                            </div>

                            <div class="col-md-3">
                                <div class="p-3 bg-secondary shadow-sm d-flex justify-content-around align-items-center rounded">
                                    <div>
                                        <h3 class="fs-2">3899</h3>
                                        <p class="fs-5">Delivery</p>
                                    </div>
                                    <i class="fas fa-truck fs-1 primary-text border rounded-full secondary-bg p-3"></i>
                                </div>
                            </div>

                            <div class="col-md-3">
                                <div class="p-3 bg-secondary shadow-sm d-flex justify-content-around align-items-center rounded">
                                    <div>
                                        <h3 class="fs-2">%25</h3>
                                        <p class="fs-5">Increase</p>
                                    </div>
                                    <i class="fas fa-chart-line fs-1 primary-text border rounded-full secondary-bg p-3"></i>
                                </div>
                            </div>
                        </div>

                        <div class="row my-5">
                            <h3 class="fs-4 mb-3">Recent Orders</h3>
                            <div class="col">
                                <table class="table bg-light rounded shadow-sm  table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col" width="50">Sr</th>
                                            <th scope="col">Product Image</th>
                                            <th scope="col">productId</th>
                                            <th scope="col">title</th>
                                            <th scope="col">categories</th>
                                            <th scope="col">color</th>
                                            <th scope="col">desc</th>
                                            <th scope="col">price</th>
                                            <th scope="col">size</th>
                                            <th scope="col">price</th>
                                            <th scope="col">Manage</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cards.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <th scope="row" >{index + 1}</th>
                                                    <td><img src={item.img} style={{ width: "100px", height: "70px" }} /></td>
                                                    <td>{item.productId}</td>
                                                    <td>{item.title}</td>
                                                    <td>{item.categories}</td>
                                                    <td>{item.color}</td>
                                                    <td>{item.desc}</td>
                                                    <td>{item.price}</td>
                                                    <td>{item.size}</td>
                                                    <td>Rs-{item.price}</td>
                                                    <td>
                                                        <Link to={"/editProduct/" + item._id}>
                                                            <a><i class="fa-solid fa-pen-to-square" style={{ color: "green" }}></i></a>&nbsp;&nbsp;&nbsp;
                                                        </Link>
                                                        <Link to='/AddProduct'>
                                                            <a><i class="fa-solid fa-user-plus" style={{ color: "blue" }}></i></a>&nbsp;&nbsp;&nbsp;
                                                        </Link>
                                                        <a onClick={() => deleteProduct(item._id)}><i class="fa-solid fa-trash-can" style={{ color: "red" }}></i></a>
                                                    </td>

                                                </tr>
                                            )
                                        })}


                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>


    )
}
