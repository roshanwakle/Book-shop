import React, { useState } from 'react'
import '../signIn/signIn.css'
import { useNavigate } from 'react-router-dom'
import google from '../imases/google.png'
import facebook from '../imases/Facebook.png'
import { Link } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert';


export const SignIn = () => {
    const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");
    const [isShown, setIsSHown] = useState(false);
	const Navigate= useNavigate()
	// console.log(data, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>")

     const togglePassword = () => {
         setIsSHown((isShown) => !isShown);
     };

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:5000/users/login";
			const { data: res } = await axios.post(url, data);
			//token Storage
                swal({
                    title: "Success!",
                    text: "Login successful",
                    icon: "success",
                    button: "OK!",
                  });
            
			console.log("resp................", res.data);
			localStorage.setItem("token", res.data.token, "email", data.email);
			localStorage.setItem("email", data.email);
            // localStorage.setItem("fullName", data.fullName);
			localStorage.setItem("admin", res.data.admin);
            
			Navigate( "/Home")
            
		} catch (error) {
            if (
                error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
                ) {
				setError(error.response.data.message);
			}
		}
	};
	
  return (
    <div className='image'>
        <section className="container forms">
            <div className="form login">
                <div className="form-content">
                    <header>Sign In</header>
                    <form  onSubmit={handleSubmit}>
                        <div className="field input-field">
                            <input type="email" placeholder="Email" className="input"  name='email' value={data.email} onChange={handleChange}/>
                        </div>
                        {error && data.email.length<= 0 ?<label>Enter your Email</label>:""}
                        
                         <div className="field input-field">
                            <input type={isShown ? "text" : "password"}placeholder="Password" className="password"  name='password' value={data.password} onChange={handleChange}/>
                            <i className='bx bx-hide eye-icon'></i>
                        </div>
                        <p style={{ color: "white" }}>Show password?</p>
                            <input type="checkbox"  checked={isShown}  onChange={togglePassword} placeholder="Enter Your Password" class="input" name='password' />
                        {error && data.password<=0 ?<label>Enter your Password</label>:""}
                        
                         <Link to ='/PasswordReset'>
                         <div className="form-link">
                            <a href="#" className="forgot-pass">Forgot password?</a>
                        </div>
                         </Link>
                        

                        <div className="field button-field">
                            {/* <Link to="/Home"> */}
                            <button>SignIn</button>
                            {/* </Link> */}
                        </div>
                    </form>

                    <div className="form-link">
                        <span >Don't have an account? 
                            <Link to="/SignUp">
                            <a href="#" className="link signup-link">Signup</a>
                            </Link>
                        </span>
                    </div>
                </div>

                <div className="line"></div>

                <div className="media-options">
                    <a href="#" className="field facebook">
                    <img src={facebook} alt="" className="google-img"/>
                        <span>Login with Facebook</span>
                    </a>
                </div>

                <div className="media-options">
                    <a href="#" className="field google">
                        <img src={google} alt="" className="google-img"/>
                        <span className='Login-with-Google'>Login with Google</span>
                    </a>
                </div>

            </div>
           

        </section>
    </div>
  )
}
