import React, { useState ,useRef} from 'react';
import Product from './Product';
import '../Css/styles.css'




const SearchBar = () => {


    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                `https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?search={"name":"${searchTerm}"}`,
                {
                    headers: {
                        'projectID': '3oxp02p5lcr2',
                    },
                }
            );
            const data = await response.json();
            console.log(data)
            setSearchResults(data.data);
        } catch (error) {
            console.error('Error searching for products:', error);
        } finally {
            setLoading(false);
        }
    };

    const inputRef = useRef(null);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            // Prevent the default behavior of the Enter key (e.g., form submission)
            event.preventDefault();

            // Perform the search action here, e.g., call a search function
            // performSearch();
            handleSearch();
        }
    };

    // const performSearch = () => {
    //     // Access the input value using inputRef.current.value
    //     const searchQuery = inputRef.current.value;
    //     // Implement your search logic here
    //     console.log('Searching for:', searchQuery);
    //     // You can make an API call or update state as needed
    // };

    return (
        <div>
            <input className='w-96 pl-2 pr-10 py-2 rounded'
                onKeyDown={handleKeyDown}
                type="text"
                placeholder="What are you looking for? "
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}

            />
            <button className='pl-2' onClick={handleSearch}><i class="ri-search-line"></i></button>

            {loading && <p>Loading...</p>}
            {console.log(searchResults)}
            {searchResults.length > 0 &&

                <div className="indexx flex flex-wrap h-[100vh] w-[130%]  ">
                    {searchResults.map((product) => (
                        <Product key={product.id} product={product} />
                    ))}
                </div>}
        </div>
    );

};

export default SearchBar;
