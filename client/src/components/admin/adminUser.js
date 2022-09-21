import React, { useEffect, useState } from 'react'
import '../admin/admin.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

export const AdminUser = (props) => {
    const [user, setUser] = useState([]);


    //getUser Details
    const getUserDetails = async () => {
        const response = await axios.get(`http://localhost:5000/users`)
   
        if (response.status === 200) {
            setUser(response.data)
        }
    }

    
    const deleteProduct = async (id) => {
        const url = `http://localhost:5000/users/${id}`;
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
                        swal("User has been deleted", {
                            icon: "success",
                        });
                    } else {
                        swal("Your imaginary file is safe!");
                    }
                });
            if (response) {
                getUserDetails();
            }

        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        getUserDetails()
        
    }, [])
    return (

        <div>
            <div class="d-flex" id="wrapper">
                <div class="bg-secondary" id="sidebar-wrapper">
                    <div class="sidebar-heading text-center py-4 primary-text fs-4 fw-bold text-uppercase border-bottom"><i
                        class="fas fa-user-secret me-2"></i>Admin</div>
                    <div class="list-group list-group-flush my-3">
                        <Link to ="/Admin">
                        <a  class="list-group-item list-group-item-action bg-transparent second-text active"><i
                            class="fas fa-tachometer-alt me-2"></i>Dashboard</a>
                        </Link>
                        

                        <a href="#" class="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                            class="fas fa-project-diagram me-2"></i>User Details</a>

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
                            <h3 class="fs-4 mb-3">User Details</h3>
                            <div class="col">
                                <table class="table bg-light rounded shadow-sm  table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col" width="50">Sr</th>
                                            <th scope="col">Full Name</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Phone No</th>
                                            <th scope="col">Password</th>
                                            <th scope="col">ID</th>
                                            <th scope="col">action</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {user.map((item, index) => {
                                            return (
                                                <tr >
                                                    <th scope="row" >{index + 1}</th>
                                                    <td>{item.fullName}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.phone}</td>
                                                    <td>{item.password}</td>
                                                    <td>{item._id}</td>

                                                    <td>
                                                        
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
