import Image from 'next/image';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/app/firebase/config';
import { db } from '@/app/firebase/config';
import { collection, addDoc } from 'firebase/firestore';

const Signup = () => {
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSignUp = async (firstName, lastName, email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const usersCollectionRef = collection(db, 'users');
      await addDoc(usersCollectionRef, {
        uid: user.uid,
        firstName: firstName,
        lastName: lastName,
        email: email,
      });

      console.log('User signed up successfully:', user);
      setSuccessMessage('Thanks for signing up!');
      setFormSubmitted(true);
      window.location.href = "/login";
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const firstNameInput = (document.getElementById('firstName') as HTMLInputElement).value;
    const lastNameInput = (document.getElementById('lastName') as HTMLInputElement).value;
    const emailInput = (document.getElementById('email') as HTMLInputElement).value;
    const passwordInput = (document.getElementById('password') as HTMLInputElement).value;

    if (firstNameInput.trim() === '') {
      setFirstNameError('First Name cannot be empty');
    } else {
      setFirstNameError('');
    }

    if (lastNameInput.trim() === '') {
      setLastNameError('Last Name cannot be empty');
    } else {
      setLastNameError('');
    }

    if (emailInput.trim() === '') {
      setEmailError('Email cannot be empty');
    } else {
      setEmailError('');
    }

    if (passwordInput.trim() === '') {
      setPasswordError('Password cannot be empty');
    } else {
      setPasswordError('');
    }

    if (firstNameInput && lastNameInput && emailInput && passwordInput) {
      handleSignUp(firstNameInput, lastNameInput, emailInput, passwordInput);
    }
  };

  return (
    <div className="bg-white p-6 md:p-0 md:pl-8 md:pr-8 md:pt-4 md:pb-10 w-full rounded-lg shadow-card border-2">
      {!formSubmitted && (
        <form className="w-full mx-auto" onSubmit={handleSubmit}>
          <p className="text-center tracking-tight font-bold text-2xl">Signup</p>
          <div className="mb-5 mt-5 relative">
            <input type="text" id="firstName" className="peer-invalid:text-red-500 bg-slate-200 border border-gray-300 text-lg font-bold text-black rounded-lg focus:ring-purple-700 placeholder:font-bold focus:border-purple-700 block w-full p-2.5 py-[0.84rem] px-8 dark:focus:border-purple-700 focus-visible:outline-purple-700 focus-visible:outline-1 focus-visible:outline}" placeholder="First Name" />
            {firstNameError && <p className="text-red-500 text-sm mt-2 text-right">{firstNameError}</p>}
          </div>
          <div className="mb-5 mt-5 relative">
            <input type="text" id="lastName" className="bg-slate-200 border border-gray-300  text-lg rounded-lg focus:ring-purple-700 focus:border-purple-700 placeholder:font-bold font-bold block w-full p-2.5 py-[0.84rem] px-8 dark:focus:ring-purple-700 dark:focus:border-purple-700  focus-visible:outline-purple-700 focus-visible:outline-1 focus-visible:outline" placeholder="Last Name" />
            {lastNameError && <p className="text-red-500 text-sm mt-2 text-right">{lastNameError}</p>}
          </div>
          <div className="mb-5 mt-5 relative">
            <input type="email" id="email" className="bg-slate-200 border border-gray-300  text-lg rounded-lg focus:ring-purple-700 focus:border-purple-700 placeholder:font-bold font-bold block w-full p-2.5 py-[0.84rem] px-8 dark:focus:ring-purple-700 dark:focus:border-purple-700  focus-visible:outline-purple-700 focus-visible:outline-1 focus-visible:outline" placeholder="Email" />
            {emailError && <p className="text-red-500 text-sm mt-2 text-right">{emailError}</p>}
          </div>
          <div className="mb-5 relative">
            <input
              type="password"
              id="password"
              className="bg-slate-200 border border-gray-300 text-lg rounded-lg focus:ring-purple-700 focus:border-purple-700 block w-full p-2.5 py-[0.84rem] px-8 dark:focus:ring-purple-700 dark:focus:border-purple-700 placeholder:font-bold focus-visible:outline-purple-700 focus-visible:outline-1 focus-visible:outline"
              placeholder="Password"
            />
            {passwordError && <p className="text-red-500 text-sm mt-2 text-right">{passwordError}</p>}
          </div>
          <button
            type="submit"
            className="text-white bg-green-700 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-lg md:text-xl w-full py-3 text-center dark:hover:bg-blue-700 dark:focus:ring-blue-800  transition duration-500 shadow-card hover:translate-y-1 ease-linear "
          >
            Register
          </button>
        </form>
      )}
      {formSubmitted && (
        <div className="text-gray-600 tracking-tight flex flex-col p-2">
          <h2 className="text-xl font-bold mb-2 text-center md:text-left">
            <span className="text-purple-700">Thanks</span> for signing up!
          </h2>
          <p className="text-base font-poppins mt-4 text-center md:text-left">
            Please check your email <span className="font-medium text-black">{emailError}</span> to confirm
            your registration.
          </p>
          <button
            type="button"
            onClick={() => setFormSubmitted(false)}
            id="dismiss"
            className="md:max-w-[22rem] font-medium text-lg mt-4 py-3 text-center bg-amber-600 rounded-lg text-white cursor-pointer hover:bg-amber-800 duration-500"
          >
            Dismiss message
          </button>
        </div>
      )}
    </div>
  );
};

export default Signup;
