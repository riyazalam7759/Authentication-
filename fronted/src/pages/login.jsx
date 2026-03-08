

import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError,handleSuccess } from './util'


function Login() {

   const [loginInfo, setLoginInfo] = React.useState({
      email: '',
      password: ''
   })
    
     const naviagate = useNavigate();//hook for navigation after successful signup

   const handleChange = (e) => {
      const { name, value } = e.target;
      console.log(name, value)
      const copyLoginInfo = { ...loginInfo };
      copyLoginInfo[name] = value;
      setLoginInfo(copyLoginInfo);
   }
   console.log(' loginInfo ->', loginInfo)

   const handleLogin = async (e) => {
      e.preventDefault();
      const { email, password } = loginInfo;
      if ( !email || !password) {
         return handleError('All fields (email and password) are required!')
      }
      try {
         const url = "http://localhost:8080/auth/login"//auth-service-1t0o.onrender.com/api/v1/auth/login
         const response = await fetch(url, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginInfo)
         });
         const result = await response.json();
         
         const { success, message, jwtToken , name ,error } = result;
         if (success) {
            handleSuccess(message);
            localStorage.setItem('token', jwtToken);
              localStorage.setItem('loggedInUser', name);
            setTimeout(()=>{
               naviagate('/home')
            }, 1000)
         }
         else if(error){
            const details = error?.details[0].message;
            handleError(details);
         }
         else if(!success){
            handleError(message);
         }

         console.log('result ->', result)
      }
      catch (err) {
           handleError(err);
      }
   }

   return (
      <div className="container">
         <h1>Login</h1>
         <form action="" onSubmit={handleLogin}>
                  <div>
               <label htmlFor="email">Email: </label>
               <input
                  onChange={handleChange}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email..."
                  value={loginInfo.email}
               />
            </div>

            <div>
               <label htmlFor="password">Password: </label>
               <input
                  onChange={handleChange}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password..."
                  value={loginInfo.password}
               />
            </div>
            <button type='submit'>Login</button>
            <span>Doest'n have an account?
               <Link to="/signup">Signup</Link>
            </span>
         </form>
         <ToastContainer />
      </div>
   )
}

export default Login

