import { CiSearch, CiHeart } from "react-icons/ci";
import { SlHandbag } from "react-icons/sl";
import { IoPersonOutline } from "react-icons/io5";
import "./index.css";
import { RxHamburgerMenu } from "react-icons/rx";
export default function Navbar() {
    return (
        <header className="header">
            <div className="header-part1">
                <RxHamburgerMenu className="hamburger" />
                <img src="https://res.cloudinary.com/dwgg5pyqk/image/upload/v1723403089/pfizer_ar13sm.png" alt="logo" className="logo" />
                <h1 className="brand">LOGO</h1>
                <div className="icons-container">
                    <CiSearch className="icon1" />
                    <CiHeart className="icon1" />
                    <SlHandbag className="icon2" />
                    <IoPersonOutline className="icon2 person" />
                </div>
            </div>
            <ul className="header-part2">
                <li>SHOP</li>
                <li>SKILLS</li>
                <li>STORIES</li>
                <li>ABOUT</li>
                <li>CONTACT US</li>
            </ul>
        </header>
    );
}
