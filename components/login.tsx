import Image from 'next/image';
import React from 'react';
import { useRef, useState } from "react";
const login = () => {
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);
    

    const validateEmail = (email: string) => {
      const re = /\S+@\S+\.\S+/;
      return re.test(email)
    }
    
    const validatePassword = (password: string) => {
      const uppercaseRegex = /[A-Z]/;
      if (password.trim() === '') {
        setPasswordError('Password cannot be empty')
      } else if (!uppercaseRegex.test(password)) {
        setPasswordError('First character of Password should be Capital')
      }
       else if (password.length<=8) {
        setPasswordError('Please enter a valid password(atleast 8 characters)')
      } else {
        setPasswordError('');
        return true;
      }
    }
  
    const handleSubmit = (e: { preventDefault: () => void; }) => {
      e.preventDefault();
  
      const emailInput = document.getElementById('email') as HTMLInputElement
      const passwordInput = document.getElementById('password') as HTMLInputElement

      if(validateEmail(emailInput.value)) {
        setEmailError('');
      } else {
        setEmailError('Email cannot be empty');
      }
      
      if (validatePassword(passwordInput.value))
      {
        setSuccessMessage('You have Successfully Logged in!')
        setFormSubmitted(true);
        console.log("Form submitted state:", formSubmitted);
      } else {
        return;
      }
    }
  
    const thanksForm = () => {
      setFormSubmitted(false);
      window.location.href="/"
    }  

    

 return (
    <div className="bg-white p-6 md:p-0 md:pl-8 md:pr-8 md:pt-4 md:pb-10 w-full rounded-lg shadow-card border-2">
  {!formSubmitted && (

<form className="w-full mx-auto" onSubmit={handleSubmit}>
            <p className='text-center tracking-tight font-bold text-2xl'>Login</p>
  <div className="mb-5 mt-5 relative">
    <input type="email" id="email" className="bg-slate-200 border border-gray-300  text-lg rounded-lg focus:ring-purple-700 focus:border-purple-700 placeholder:font-bold font-bold block w-full p-2.5 py-[0.84rem] px-8 dark:focus:ring-purple-700 dark:focus:border-purple-700  focus-visible:outline-purple-700 focus-visible:outline-1 focus-visible:outline" placeholder="Email" />
    {emailError && (
    <img src="/images/icon-error.svg" alt="" className="absolute top-2 right-0 mt-2 mr-2" />
  )}
  {emailError && <p className="text-red-500 text-sm mt-2 text-right">{emailError}</p>}
  </div>

  <div className="mb-5 relative">
  <input 
    type="password" 
    id="password" 
    className="bg-slate-200 border border-gray-300 text-lg rounded-lg focus:ring-purple-700 focus:border-purple-700 block w-full p-2.5 py-[0.84rem] px-8 dark:focus:ring-purple-700 dark:focus:border-purple-700 placeholder:font-bold focus-visible:outline-purple-700 focus-visible:outline-1 focus-visible:outline" 
    placeholder="Password"
  />
  {passwordError && (
    <img src="/images/icon-error.svg" alt="" className="absolute top-2 right-0 mt-2 mr-2" />
  )}
  {passwordError && <p className="text-red-500 text-sm mt-2 text-right">{passwordError}</p>}
</div>

  <button type="submit" className="text-white bg-green-700 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-lg md:text-xl w-full py-3 text-center dark:hover:bg-blue-700 dark:focus:ring-blue-800  transition duration-500 shadow-card hover:translate-y-1 ease-linear ">Login</button>
  <p className="mt-4 w-full text-black tracking-tight text-sm font-semibold text-center">New User?{" "}
  <a href="/signup" className="text-green-500 font-semibold text-sm group">Sign Up
  </a>
  </p>
</form>
  )} {formSubmitted && (
    <div className='text-gray-600 tracking-tight flex flex-col p-2'>
      <h2 className="text-xl font-bold mb-2 text-center md:text-left"><span className='text-purple-700'>Thanks</span> for signing up!</h2>
    <p className="text-base font-poppins mt-4 text-center md:text-left">You have Successfully Logged In!</p>
      <button type="button" onClick={thanksForm} id="dismiss" className='md:max-w-[22rem] font-medium text-lg mt-4 py-3 text-center bg-amber-600 rounded-lg text-white cursor-pointer hover:bg-amber-800 duration-500'> Go Back to Homepage
      </button>
    </div>
  )}

</div> 

 );
}

export default login
