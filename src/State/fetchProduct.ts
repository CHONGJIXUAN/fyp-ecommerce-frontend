import axios from "axios";

const api = "http://localhost:8081/products/getAllProducts";

export const fetchProducts = async() =>{
    try {
        const response = await axios.get(api);
        console.log("Products fetched successfully:", response);
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}