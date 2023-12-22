import React, { useState, useEffect } from 'react';
import Product from './Product';
import Deal from './Dod';
import Trending from './Trending';
import "../Css/styles.css"
import Category from './Category';
import Caraousel from './Caraousel';


const Homepage = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [sortBy, setSortBy] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
    useEffect(() => {
        fetchProducts();
    }, [page])



    const fetchProducts = () => {
        const projectId = '3oxp02p5lcr2';
        const url = `https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?limit=10&page=${page}`;
        console.log(url)
        setLoading(true);

        fetch(url, {

            method: 'GET',
            headers: {
                'projectID': projectId,
            },
        })
            .then(response => response.json())
            .then(data => {
                const newProducts = data.data || [];
                setProducts(prevProducts => [...prevProducts, ...newProducts]);
                setLoading(false);

                if (newProducts.length === 0) {
                    setHasMore(false);
                }
                console.log(page);
            })

            .catch(error => {
                console.error('Error fetching products:', error);
                setLoading(false);
            });
    };

    const handleScroll = () => {
        console.log("scrolling")
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) {

            return;

        }

        fetchData();

    };

    useEffect(() => {

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);

    }, [loading]);
    //useEffect(() => {
    //setPage(page + 1)
    //}, [loading]);
    const handleSort = (criteria) => {
        if (sortBy === criteria) {
            // If the same criteria is clicked, reverse the order
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            // If a new criteria is clicked, set it as the new sorting criteria
            setSortBy(criteria);
            setSortOrder('asc');
        }
    };

    const sortedProducts = [...products].sort((a, b) => {
        if (sortBy === 'price') {
            return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
        } else if (sortBy === 'rating') {
            return sortOrder === 'asc' ? a.ratings - b.ratings : b.ratings - a.ratings;
        }
        return 0;
    });

    // const [selectedOption, setSelectedOption] = useState('');

    // const handleSelectionChange = (event) => {
    //     const selectedValue = event.target.value;
    //     // Do something with the selected value
    //     setSelectedOption(selectedValue);
    // };

    return (
        <div style={{ minHeight: '100vh', overflowY: 'auto' }}>
            <Caraousel />
            <Category />
            <Deal />
            <Trending />
            <div onScroll={handleScroll} className="dod-items bg-[rgb(18,18,18)] flex flex-col justify-center items-center">
                <h1 className="text-white margin:auto">Featured Products</h1>
                <div className="flex text-white justify-between">
                    <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full shadow-md" onClick={() => handleSort('price')}>Sort by Price</button>


                    <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full shadow-md" onClick={() => handleSort('rating')}>Sort by Rating</button>
                </div>

                {/* <label htmlFor="customDropdown">Select an option:</label>
                <select id="customDropdown" value={selectedOption} onChange={handleSelectionChange}>
                    <option value="">Select...</option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                </select> */}

                <div className="dod-item flex justify-center items-center">
                    <div className="scroll flex justify-center items-center gap-5">
                        {sortedProducts.map((product) => (
                            <Product key={product._id} product={product} />
                        ))}
                    </div>
                </div>
            </div>


            {!loading && <div>{page}</div>}
            {!hasMore && <p>No more products to load.</p>}
        </div>
    );
};

export default Homepage;