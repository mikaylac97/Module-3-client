import React from 'react'

export default function Footer() {
    return (
        <footer>
            <div className='foot-toleft'>
                <ul>
                    <li className='foot-title'>COMPANY</li>
                    <li>About Us</li>
                    <li>Contact</li>
                    <li>Careers</li>
                    <li>Terms</li>
                    <li>Privacy</li>
                </ul>
                <ul>
                    <li className='foot-title'>CONNECT</li>
                    <div className='foot-imgs'>
                        <li><img src="https://img.icons8.com/fluent/48/000000/github.png" alt='github'/></li>
                        <li><img src="https://img.icons8.com/metro/26/000000/linkedin.png" alt='linkedin'/></li>
                    </div>
                </ul>
            </div>
            <div className='foot-toright'>
            <ul>
                <li>Bookr.</li>
                <li>Ironhack PTWD June 2020</li>
                <li>Final Project by Mikayla Castro</li>
            </ul>
            </div>
        </footer>
    )
}
