import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import "./styles/Footer.css"
function Footer() {
    return (
       <footer>
    <div className="f-info">
        <div className="f-info-socials">
           <FacebookIcon/>
           <InstagramIcon/>
           <LinkedInIcon/>
        </div>
        <div className="f-info-brand">&copy; CropScan Private Limited</div>
        <div className="f-info-links">
            <a href="/privacy">Privacy </a>
            <a href="/terms">Terms </a>
        </div>
    </div>
    </footer>
    )
}

export default Footer
