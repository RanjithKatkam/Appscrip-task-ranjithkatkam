import "./index.css";
import { FaStar } from "react-icons/fa";

export default function ProductCard({ details }) {
    const { id, title, price, image, rating } = details;
    const newTitle = title.length > 30 ? title.substring(0, 30) + "..." : title;
    return (
        <li className="card">
            <div className="img-container">
                <img src={image} alt={id} />
            </div>
            <h1 className="card-title">{newTitle}</h1>
            <div className="price-rating">
                <h5>{"$ " + price}</h5>
                <p>
                    {rating.rate} <FaStar />
                </p>
            </div>
        </li>
    );
}
