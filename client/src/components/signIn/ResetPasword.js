import React, { useState } from 'react'
import swal from 'sweetalert';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

export const PasswordReset = () => {
const { id, token } = useParams();
const [data, setData] = useState({ email: ""});
const [message,setMessege]= useState("")

console.log("data",data);
const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
};
const sendLink=async()=>{
		try {
			const url = `http://localhost:5000/users/ForgotPassword`;
			const { data: res } = await axios.post(url, data);
                swal({
                    title: "Success!",
                    text: "password reset link sended on email",
                    icon: "success",
                    button: "OK!",
                  });
                  
		} catch (error) {
           console.log(error);
		}

          
}
  return (
    <div className='image'>
    <section className="container forms">
        <div className="form login">
            <div className="form-content">
                <header>Enter your email</header>
                <form  >
                    <div className="field input-field">
                        <input type="email" placeholder="Email" className="input"  name='email' value={data.email} onChange={handleChange} />
                    </div>
                    {message ? <p style={{ color: "green", fontWeight: "bold" }}>pasword reset link send Succsfully in Your Email</p> : ""}
                    <div className="field button-field">
                      <Link to='/SignIn'>
                        <button onClick={sendLink}>Send Link</button>
                      </Link>
                    </div>                        
                </form>
                </div>
            </div>
    </section>
</div>
  )
}
