"use client"
import React, { useState } from 'react';
import { db } from '@/app/firebase/config';
import { collection, addDoc } from 'firebase/firestore';

const Contact = () => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, 'contactus'), {
        email,
        subject,
        message
      });
      console.log("Document written with ID: ", docRef.id);
      // Optionally, you can clear the form fields here
      setEmail('');
      setSubject('');
      setMessage('');
      window.location.href="/"
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <section className="bg-white p-6 md:p-0 md:pl-8 md:pr-8 md:pt-4 md:pb-10 w-full rounded-lg shadow-card border-2">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900">Contact Us</h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.</p>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-slate-200 border border-gray-300 text-lg rounded-lg focus:ring-purple-700 focus:border-purple-700 block w-full p-2.5 py-[0.84rem] px-8 dark:focus:ring-purple-700 dark:focus:border-purple-700 placeholder:font-bold focus-visible:outline-purple-700 focus-visible:outline-1 focus-visible:outline" placeholder="name@mail.com" required />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 ">Subject</label>
            <input type="text" id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} className="bg-slate-200 border border-gray-300 text-lg rounded-lg focus:ring-purple-700 focus:border-purple-700 block w-full p-2.5 py-[0.84rem] px-8 dark:focus:ring-purple-700 dark:focus:border-purple-700 placeholder:font-bold focus-visible:outline-purple-700 focus-visible:outline-1 focus-visible:outline" placeholder="Let us know how we can help you" required />
          </div>
          <div className="sm:col-span-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 ">Your message</label>
            <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} className="bg-slate-200 border border-gray-300 text-lg rounded-lg focus:ring-purple-700 focus:border-purple-700 block w-full p-2.5 py-[0.84rem] px-8 dark:focus:ring-purple-700 dark:focus:border-purple-700 placeholder:font-bold focus-visible:outline-purple-700 focus-visible:outline-1 focus-visible:outline" placeholder="Leave a comment..."></textarea>
          </div>
          <button type="submit" className="text-white bg-green-700 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-lg md:text-xl w-full py-3 text-center dark:hover:bg-blue-700 dark:focus:ring-blue-800  transition duration-500 shadow-card hover:translate-y-1 ease-linear ">Send a message</button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
