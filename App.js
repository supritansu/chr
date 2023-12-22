import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./src/components/Header";
import HomePage from "./src/components/HomePage";
// import SearchBar from "./src/components/SearchBar";
import ProductDetails from "./src/components/ProductDetails";
import AuthComponent from "./src/components/AuthComponent";
import MyContext from "./src/components/MyContext";
import { Provider } from "react-redux";
import appStore from "./src/utils/appStore";
import Category from "./src/components/Category";
import Cart from "./src/components/Cart";
import Customer from "./src/components/Customer";
import Order from "./src/components/Order";
import Caraousel from "./src/components/Caraousel";
// import {useHistory} from "react-router-dom"

const AppLayout = () => {
    const [text, setText] = useState();

    console.log(text);



    return (
        <Provider store={appStore}>

            <div>
                <Header />

                {/* Use Routes to wrap Route components */}
                <Routes>
                    <Route path="cart" element={<Cart />} />
                    <Route path="order" element={<Order />} />
                    <Route path="/" element={<HomePage />} />
                    <Route path="customer-details/:pid" element={<Customer />} />
                    <Route path="login" element={<AuthComponent />} />
                    <Route path="product/:pid" element={<ProductDetails />} />
                </Routes>
            </div>
        </Provider>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

// Wrap your AppLayout with the Router component
root.render(
    <Router>
        <AppLayout />
    </Router>
);
