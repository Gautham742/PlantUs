import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/app/firebase/config';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);
    const router = useRouter();
    
    const handleLogin = async () => {
      try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          // User is logged in
          console.log("User logged in:", userCredential.user);
          router.push('/');
      } catch (error) {
          // Handle login failure
          console.error("Login failed:", error.message);
          if (error.code === 'auth/invalid-login-credentials') {
              // Handle invalid credentials error
              setEmailError('Invalid email or password');
              setPasswordError('Invalid email or password');
          } else {
              // Handle other errors
              // You can set generic error messages here if needed
              setEmailError('Login failed. Please try again.');
              setPasswordError('Login failed. Please try again.');
          }
      }
  };
  

    const validateForm = () => {
        let isValid = true;
        if (!email.trim()) {
            setEmailError('Email cannot be empty');
            isValid = false;
        }
        if (!password.trim()) {
            setPasswordError('Password cannot be empty');
            isValid = false;
        }
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            handleLogin();
            setFormSubmitted(true);
        }
    };

    const thanksForm = () => {
        setFormSubmitted(false);
        // Redirect the user to the homepage or another appropriate route
        router.push('/');
    };

    return (
        <div className="bg-white p-6 md:p-0 md:pl-8 md:pr-8 md:pt-4 md:pb-10 w-full rounded-lg shadow-card border-2">
            {!formSubmitted ? (
                <form className="w-full mx-auto" onSubmit={handleSubmit}>
                    <p className='text-center tracking-tight font-bold text-2xl'>Login</p>
                    <div className="mb-5 mt-5 relative">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-slate-200 border border-gray-300  text-lg rounded-lg focus:ring-purple-700 focus:border-purple-700 placeholder:font-bold font-bold block w-full p-2.5 py-[0.84rem] px-8 dark:focus:ring-purple-700 dark:focus:border-purple-700  focus-visible:outline-purple-700 focus-visible:outline-1 focus-visible:outline"
                            placeholder="Email"
                        />
                        {emailError && <p className="text-red-500 text-sm mt-2 text-right">{emailError}</p>}
                    </div>

                    <div className="mb-5 relative">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-slate-200 border border-gray-300 text-lg rounded-lg focus:ring-purple-700 focus:border-purple-700 block w-full p-2.5 py-[0.84rem] px-8 dark:focus:ring-purple-700 dark:focus:border-purple-700 placeholder:font-bold focus-visible:outline-purple-700 focus-visible:outline-1 focus-visible:outline"
                            placeholder="Password"
                        />
                        {passwordError && <p className="text-red-500 text-sm mt-2 text-right">{passwordError}</p>}
                    </div>

                    <button type="submit" className="text-white bg-green-700 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-lg md:text-xl w-full py-3 text-center dark:hover:bg-blue-700 dark:focus:ring-blue-800  transition duration-500 shadow-card hover:translate-y-1 ease-linear">Login</button>
                    <p className="mt-4 w-full text-black tracking-tight text-sm font-semibold text-center">New User?{" "}
                        <a href="/signup" className="text-green-500 font-semibold text-sm group">Sign Up</a>
                    </p>
                </form>
            ) : (
                <div className='text-gray-600 tracking-tight flex flex-col p-2'>
                    <h2 className="text-xl font-bold mb-2 text-center md:text-left"><span className='text-purple-700'>Thanks</span> for signing up!</h2>
                    <p className="text-base font-poppins mt-4 text-center md:text-left">You have Successfully Logged In!</p>
                    <button type="button" onClick={thanksForm} id="dismiss" className='md:max-w-[22rem] font-medium text-lg mt-4 py-3 text-center bg-amber-600 rounded-lg text-white cursor-pointer hover:bg-amber-800 duration-500'> Go Back to Homepage
                    </button>
                </div>
            )}
        </div>
    );
};

export default Login;
