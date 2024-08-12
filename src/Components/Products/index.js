import { Component } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import ProductCard from "../ProductCard";

import "./index.css";
import Navbar from "../../Navbar";

class Products extends Component {
    state = {
        productsList: [],
        filteredProductsList: [],
        error: "",
        showFilters: false,
        activeCategory: "all",
        sortValue: "low",
    };

    async componentDidMount() {
        const api = "https://fakestoreapi.com/products";
        const options = {
            method: "GET",
        };
        try {
            const response = await fetch(api, options);
            const responseData = await response.json();
            const products = responseData.sort((a, b) => a.price - b.price);
            if (!response.ok) {
                throw Error("Failed Fetching Products");
            }
            this.setState({ productsList: products, filteredProductsList: [...products] });
            console.log("Fetched Products Successfully...");
        } catch (error) {
            this.setState({ error: "Failed fetching products" });
            console.error("Failed Fetching Products" + error);
        }
    }

    handleShowingFilters = () => {
        this.setState((prev) => ({ showFilters: !prev.showFilters }));
    };

    handleActiveCategory = (e) => {
        const category = e.target.getAttribute("value");
        this.setState({ activeCategory: category }, () => {
            const { productsList, sortValue } = this.state;

            let formattedProductList;
            if (category === "all") {
                formattedProductList =
                    sortValue === "high" ? productsList.sort((a, b) => b.price - a.price) : productsList.sort((a, b) => a.price - b.price);
            } else {
                formattedProductList =
                    sortValue === "high"
                        ? productsList.filter((item) => item.category === category).sort((a, b) => b.price - a.price)
                        : productsList.filter((item) => item.category === category).sort((a, b) => a.price - b.price);
            }
            this.setState({ filteredProductsList: formattedProductList });
        });
    };

    handleSortValue = (e) => {
        let value = e.target.value;
        this.setState({ sortValue: value }, () => {
            const { filteredProductsList } = this.state;
            let sortedProductList;
            if (value === "high") {
                sortedProductList = filteredProductsList.sort((a, b) => b.price - a.price);
            } else {
                sortedProductList = filteredProductsList.sort((a, b) => a.price - b.price);
            }
            this.setState({ filteredProductsList: sortedProductList });
        });
    };

    render() {
        const { error, filteredProductsList, showFilters, activeCategory } = this.state;
        return (
            <div className="main-container">
                <Navbar />
                <h1 className="discover">Discover our products</h1>
                <h4 className="lorem">
                    Lorem ipsum dolor sit amet consectetur. Amet est posuere rhoncus scelerisque. Dolor integer scelerisque nibh amet mi ut
                    elementum dolor.
                </h4>
                <div className="filters-container">
                    <h2>{filteredProductsList.length} ITEMS</h2>
                    {showFilters ? (
                        <button onClick={this.handleShowingFilters}>
                            <IoIosArrowBack /> HIDE FILTERS
                        </button>
                    ) : (
                        <button onClick={this.handleShowingFilters}>
                            <IoIosArrowForward /> SHOW FILTERS
                        </button>
                    )}
                    <select onChange={this.handleSortValue}>
                        <option value="low">PRICE: LOW TO HIGH</option>
                        <option value="high">PRICE: HIGH TO LOW</option>
                    </select>
                </div>
                <div className="content">
                    <ul onClick={this.handleActiveCategory} className={showFilters ? "categories-container" : "categories-container hidden"}>
                        <h4>Categories</h4>
                        <li value="all" className={activeCategory === "all" ? "active" : ""}>
                            All
                        </li>
                        <li value="men's clothing" className={activeCategory === "men's clothing" ? "active" : ""}>
                            Men's Clothing
                        </li>
                        <li value="women's clothing" className={activeCategory === "women's clothing" ? "active" : ""}>
                            Women's Clothing
                        </li>
                        <li value="jewelery" className={activeCategory === "jewelery" ? "active" : ""}>
                            Jewelery
                        </li>
                        <li value="electronics" className={activeCategory === "electronics" ? "active" : ""}>
                            Electronics
                        </li>
                    </ul>
                    <ul className="list-container">
                        {filteredProductsList.map((item) => (
                            <ProductCard details={item} key={item.id} />
                        ))}
                        {error !== "" ? <p>{error}</p> : ""}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Products;
