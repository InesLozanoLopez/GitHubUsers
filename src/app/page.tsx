'use client'

import './globals.css';
import UsersList from './../components/usersList';
import Image from 'next/image';
import { fetchUserDetails, fetchUsersList } from '@/apiServices';
import { createContext, useContext, useEffect, useState } from 'react';
import { IUserDetails } from './../interfaces';

const usersContext = createContext<{ userDetails: IUserDetails[] }>({ userDetails: [] });

export const useUsersContext = () => {
  return useContext(usersContext);
}

export default function Home() {
  const [usersList, setUsersList] = useState<IUserDetails[] | []>([]);

  useEffect(() => {
    const fetchUserListAndUpdateList = async () => {
      try {
        const userListFetched = await fetchUsersList();
        const usersData = userListFetched.data;
        const updatedUsers = await Promise.all(
          usersData.map(async (user: IUserDetails) => {
            const details = await fetchUserDetails(user.url);
            return { ...user, ...details };
          })
        );
        setUsersList(updatedUsers)
      } catch (error) {
        console.log(error)
      }
    };
    fetchUserListAndUpdateList();
  }, []);


  return (
    <>
      <header>
        <div className="homePageHead">
          <h1 className="title">GitHub&apos;s users:</h1>
          <Image
            className="catImg"
            src="/catImg.png"
            alt={`Cat imagen`}
            width={100}
            height={100}
            priority={true}
          />
        </div>
      </header>
      <usersContext.Provider value={{ userDetails: usersList || [] }}>
        <main>
          <UsersList />
        </main>
      </usersContext.Provider>
    </>
  );
}
