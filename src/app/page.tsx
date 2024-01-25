"use client"

import UsersList from '../components/usersList';
import Image from 'next/image';
import { UsersContext } from '../context/UsersContextProvider';
import './globals.css';
import UserDetails from '@/components/userDetails';
import { useEffect, useState } from 'react';


export default function Home() {
  const [user, setUser] = useState<string | null>(null);

  const handleStorageChange = () => {
    const login = localStorage.getItem('userLogin');

    if (login) {
      setUser(login);
    }
    if(login === null){
      setUser(null)
    }
  }

  useEffect(() => {
    window.addEventListener('click', handleStorageChange);

    return () => {
      window.removeEventListener('click', handleStorageChange);
    };
  },[]);

  return (
    <UsersContext>

      {!user ? (
        <>
              <div className='homePageHead'>
              <h1 className='title'>GitHub&apos;s users:</h1>
              <Image
                className='catImg'
                src="/catImg.png"
                alt={`Cat imagen`}
                width={100}
                height={100}
                priority={true}
              />
            </div>
          <UsersList />
          </>
          ) : (
        <UserDetails />
      )}

    </UsersContext>
  );
}
