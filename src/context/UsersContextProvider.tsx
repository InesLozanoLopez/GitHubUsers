'use client'

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { IUserDetails } from '../interfaces/interfaces';
import { fetchUserDetails, fetchUsersList } from '../api/apiServices';

interface UsersContextProps {
  usersDetails: IUserDetails[];
}

const usersContext = createContext<UsersContextProps | []>({usersDetails: []});

export const useUsersContext = () => {
  return useContext(usersContext) as UsersContextProps;
};

export const UsersContext: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [usersDetails, setUsersDetails] = useState<IUserDetails[]>([]);
  const timeFetchedData = useRef<Date>(new Date(0));

  const fetchData = async () => {
    try {
      const userListFetched = await fetchUsersList();
      const updatedUsers = await Promise.all(
        userListFetched.map(async (user: IUserDetails) => {
          const details = await fetchUserDetails(user.login);
          return { ...user, ...details };
        })
      );
      setUsersDetails(updatedUsers);
      timeFetchedData.current = new Date();

    } catch (error) {
      console.error('Error fetching user list:', error);
    }
}
  
  useEffect(() => {
    const currentTime = new Date();
    const oneHourAgo = currentTime.setHours(currentTime.getHours() - 1)

    if (usersDetails.length === 0 || timeFetchedData.current.getTime() > oneHourAgo ){
      fetchData()
    }
  }, [])

  return (
    <usersContext.Provider value={{usersDetails}}>
      <main>{children}</main>
    </usersContext.Provider>
  );
};

