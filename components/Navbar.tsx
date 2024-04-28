"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Button from './button';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase/config';
import { db } from '@/app/firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { NAV_LINKS } from "@/constants";

const Navbar = () => {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const usersCollectionRef = collection(db, 'users');
        const q = query(usersCollectionRef, where('uid', '==', user.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          setFirstName(userData.firstName);
          setLastName(userData.lastName);
        });
      }
    };

    fetchUserData();
  }, [user]);

  const handleSignout = async () => {
    console.log('Sign out successfully');
    try {
      await auth.signOut();
      router.push('/login');

    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="flexBetween max-container padding-container relative z-30 py-5">
      <Link href="/">
        <Image src="/PlantUs.svg" alt="logo" width={85} height={40} />
      </Link>

      <ul className="hidden h-full gap-12 lg:flex">
        {NAV_LINKS.map((link) => (
          <li key={link.key}>
            <Link href={link.href} key={link.key} className="regular-16 text-gray-50 flexCenter cursor-pointer pb-1.5 transition-all hover:text-green-600 hover:font-bold">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {user ? (
        <div className="lg:flexCenter space-x-4">
          <p className="text-gray-500">Welcome, {firstName} {lastName}</p>
          <div className="flexCenter gap-3 rounded-full border border-green-50 bg-green-50 px-8 py-5 text-white">
          <button onClick={handleSignout} className="bold-16 whitespace-nowrap cursor-pointer">Signout</button>
          </div>
        </div>
      ) : (
        <Button
          href="/login"
          title="Login"
          icon="/user.svg"
          variant="btn_green"
          type='button'
        />
      )}

      <div className="block lg:hidden">
        <Image 
          src="menu.svg"
          alt="menu"
          width={32}
          height={32}
          className="cursor-pointer"
        />
      </div>
    </nav>
  );
};

export default Navbar;
