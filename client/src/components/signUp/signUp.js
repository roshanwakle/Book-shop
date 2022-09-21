import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import '../signUp/signUp.css'
import google from '../imases/google.png'
import facebook from '../imases/Facebook.png'
import axios from 'axios'
import validate from './validate';

export const SignUp = () => {
    const [data, setData] = useState({
        fullName: "",
        phone: "",
        email: "",
        password: ""
    })
    // This variable determines whether password is shown or not
    const [isShown, setIsSHown] = useState(false);

    // This function is called when the checkbox is checked or unchecked
    const togglePassword = () => {
        setIsSHown((isShown) => !isShown);
    };
    const Navigate = useNavigate()
    const [error, setError] = useState("");

    console.log(data, "data>>>>>>>>")


    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async () => {
        try {
            const url = "http://localhost:5000/users/postUser";
            const { data: res } = await axios.post(url, data);
            setError(validate(data))
            Navigate('/SignIn')
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
            }
        }

    }
    useEffect(() => {
        const auth = localStorage.getItem('user')
        if (auth) {
            Navigate('/')
        }
    })


    return (
        <div className='image'>
            <section class="container forms">
                <div class="form login">
                    <div class="form-content">
                        <header>SignUp</header>
                        <form action="#" onSubmit={handleSubmit} >
                            <div class="field input-field">
                                <input type="text" placeholder="Enter Your Full Name" class="input" name='fullName' onChange={handleChange} value={data.fullName} />
                                {error && data.fullName.length <= 0 ? <label>Enter your Full Name</label> : ""}
                            </div>
                            <div class="field input-field">
                                <input type="text" placeholder="Enter Your Phone Number" class="input" name='phone' onChange={handleChange} value={data.phone} />
                                {error && data.phone.length <= 0 ? <label>Enter your Phone Number</label> : ""}

                            </div>
                            <div class="field input-field">
                                <input type="email" placeholder="Enter Your Email" class="input" name='email' onChange={handleChange} value={data.email} />
                                {error && data.email.length <= 0 ? <label>Enter your Email</label> : ""}

                            </div>
                            <div class="field input-field">
                                <input type={isShown ? "text" : "password"} placeholder="Enter Your Password" class="input" name='password' onChange={handleChange} value={data.password} />
                                {error && data.password.length <= 0 ? <label>Enter your Password</label> : ""}
                            </div>
                            <p style={{ color: "white" }}>Show password?</p>
                            <input type="checkbox"  checked={isShown}  onChange={togglePassword} placeholder="Enter Your Password" class="input" name='password' />
                            <Link to="/PasswordReset">
                                <div class="form-link">
                                    <a href="#" class="forgot-pass">Forgot password?</a>
                                </div>
                            </Link>


                            <div class="field button-field">
                                <button>SignUp</button>
                            </div>
                        </form>

                        <div class="form-link">
                            <span>Don't have an account?
                                <Link to="/SignIn">
                                    <a href="#" class="link signup-link">SignIn</a>
                                </Link>
                            </span>
                        </div>
                    </div>

                    <div class="line"></div>

                    <div class="media-options">
                        <a href="#" class="field facebook">
                            <img src={facebook} alt="" class="google-img" />
                            <span>Login with Facebook</span>
                        </a>
                    </div>

                    <div class="media-options">
                        <a href="#" class="field google">
                            <img src={google} alt="" class="google-img" />
                            <span>Login with Google</span>
                        </a>
                    </div>

                </div>

            </section>
        </div>
    )
}

