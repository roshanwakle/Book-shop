import React from 'react'
import '../footer/footer.css'
export const Footer = () => {
    return (
        <div>
            <footer className='footer'>
                <div class="main-content">
                    <div class="left box">
                        <h2 className='heading'>About us</h2>
                        <div class="content">
                            <p className='heading'>An e-commerce website is one that allows people to buy and sell physical goods, services, and digital products over the internet rather than at a brick-and-mortar location.</p>
                            <div class="social">
                                <a href="https://facebook.com/coding.np"><span class="fab fa-facebook-f"></span></a>
                                <a href="#"><span class="fab fa-twitter"></span></a>
                                <a href="https://instagram.com/coding.np"><span class="fab fa-instagram"></span></a>
                                <a href="https://youtube.com/c/codingnepal"><span class="fab fa-youtube"></span></a>
                            </div>
                        </div>
                    </div>
                    <div class="center box">
                        <h2 className='heading'>Address</h2>
                        <div class="content">
                            <div class="place">
                                <span class="fas fa-map-marker-alt"></span>
                                <span className='heading'>Chandrapur,Maharashra</span>
                            </div>
                            <div class="phone">
                                <span class="fas fa-phone-alt"></span>
                                <span class="className='heading'">+91-9579880971</span>
                            </div>
                            <div class="email">
                                <span class="fas fa-envelope"></span>
                                <span class="className='heading'">roshan.wakle@aitglobalinc.com</span>
                            </div>
                        </div>
                    </div>
                    <div class="right box">
                        <h2 className='heading'>Contact us</h2>
                        <div class="content">
                            <form action="#">
                                <div class="email">
                                    <div class="text">Email *</div>
                                    <input type="email" required />
                                </div>
                                <div class="msg">
                                    <div class="text">Message *</div>
                                    <textarea rows="2" cols="25" required></textarea>
                                </div>
                                <div class="btn">
                                    <button type="submit">Send</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="bottom">
                    <center>
                        <span class="credit">Created By <a href="">Rosh@nW@kle</a> | </span>
                        <span class="far fa-copyright"></span><span> 2022 All rights reserved.</span>
                    </center>
                </div>
            </footer>
        </div>
    )
}
