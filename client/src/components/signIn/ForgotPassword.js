import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';
import axios from 'axios';
import { useParams, useNavigate ,Link} from 'react-router-dom';

export const ForgotPassword = () => {
    const { id, token } = useParams();
    const [password, setPassword] = useState('');
    const history = useNavigate();

    console.log(password,">>>>>>>>>>.")
    const sendLink = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/users//forgotpassword/${id}/${token}`)
            if (response.status === 201) {
                console.log("user valid")
            } else {
                history("*")
            }
        } catch (error) {
            console.log(error);
        }
    }

 
    const sendpassword = async (e) => {
        const reset = { password:password}
        await axios.post(`http://localhost:5000/users/${id}/${token}`, reset)          
            swal({
                title: "Success!",
                text: "Your password changed successfully",
                icon: "success",
                button: "OK!",
              });
    }

    useEffect(() => {
        sendLink()
    })
    return (
        <div className='image'>
            <section className="container forms">
                <div className="form login">
                    <div className="form-content">
                        <header>Enter your new password</header>
                        <form  >
                            <h5 style={{ color: "white" }}>New password</h5>
                            <div className="field input-field">
                                <input type="password" placeholder="password" className="input" name='email' value={password}onChange={(e) => { setPassword(e.target.value) }} />
                            </div>
                            <div className="field button-field">
                                <Link to ="/SignIn">
                                <button onClick={sendpassword}>Send</button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}
