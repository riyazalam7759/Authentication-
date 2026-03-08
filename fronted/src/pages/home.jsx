import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { handleSuccess } from "./util";
import { ToastContainer } from "react-toastify";

function Home() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser') || '');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('Logout successful!');
    setTimeout(() => {
      navigate('/login');
    }, 1000)
  }

  const fetchProducts = async () => {
    try {
      const url = "https://authenticationapp-mu.vercel.app/products"//product-service-1t0o.onrender.com/api/v1/products
      const headers = {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      }
      const response = await fetch(url, headers);
      const result = await response.json();
      console.log('Products ->', result)
      setProducts(result);
    }
    catch (error) {
      console.log('Fetch products error ->', error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      <h1>Welcome, {loggedInUser}!</h1>
      <button onClick={handleLogout}>Logout</button>
      <div>
        {
          products.map((item)=>(
            <ul>
              <span>{item.name} : {item.price}</span>
            </ul>
          ))
        }
      </div>
      <ToastContainer />
    </div>
  )
}
export default Home
