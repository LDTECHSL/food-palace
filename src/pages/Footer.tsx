import "../styles/footer.css"
import logo from "../assets/food_palace-transparent.png"
import { FacebookFilled, InstagramFilled, TikTokFilled, TwitterSquareFilled } from "@ant-design/icons"
import { Button } from "@mui/material"

export default function Footer() {
    return (
        <div className="footer">
            <div className="main-footer-outer">
                <div className="sub-footer-outer">
                    <div className="footer-inner">
                        <img className="footer-logo" src={logo} alt="Food Palace Logo" />
                    </div>
                    <div className="footer-inner">
                        <span className="footer-text">
                            Food Palace – where flavor meets comfort. Serving freshly made meals, beverages, and snacks crafted with love and quality ingredients. Whether dining in or taking away, we’re here to make every bite memorable. Taste the difference today at Food Palace!
                        </span>
                    </div>
                    <div className="footer-inner">
                        <a href="https://www.facebook.com/FoodPalace" target="_blank" rel="noopener noreferrer">
                            <FacebookFilled className="footer-icon" />
                        </a>
                        <a href="https://www.instagram.com/FoodPalace" target="_blank" rel="noopener noreferrer">
                            <InstagramFilled className="footer-icon" />
                        </a>
                        <a href="https://www.tiktok.com/@FoodPalace" target="_blank" rel="noopener noreferrer">
                            <TikTokFilled className="footer-icon" />
                        </a>
                        <a href="https://www.twitter.com/FoodPalace" target="_blank" rel="noopener noreferrer">
                            <TwitterSquareFilled className="footer-icon" />
                        </a>
                    </div>
                    <div className="footer-inner">
                        <Button className="primary-button" variant="contained" href="#top" style={{ textTransform: "none" }}>
                            Back to Top
                        </Button>
                    </div>
                </div>
                <div className="sub-footer-outer sfo">
                    <div className="sub-footer-inner">
                        <span style={{fontWeight: "bold", fontSize: "15px"}}>Site Map</span>
                        <br /> <br />
                        <a className="footer-links" href="breakfast">Breakfast</a>
                        <br />
                        <a className="footer-links" href="lunch">Lunch</a>
                        <br />
                        <a className="footer-links" href="dinner">Dinner</a>
                        <br />
                        <a className="footer-links" href="bakery">Bakery</a>
                        <br />
                        <a className="footer-links" href="drinks">Drinks</a>
                        <br />
                        <a className="footer-links" href="deserts">Desserts</a>
                    </div>
                    <div className="sub-footer-inner">                        
                        <span style={{fontWeight: "bold", fontSize: "15px"}}>Legal</span>
                        <br /> <br />
                        <a className="footer-links" href="#home">Privacy Policy</a>
                        <br />
                        <a className="footer-links" href="#about">Terms of Service</a>
                        <br />
                    </div>
                </div>
            </div>
            <div className="cp-outer">
                <span className="cp-text">© 2024 Food Palace. All rights reserved.</span>
            </div>
        </div>
    )
}