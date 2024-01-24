'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';
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
  
  useEffect(() => {
    const fetchData = async () => {
        try {
          console.log('fetched');
          const userListFetched = await fetchUsersList();
          const updatedUsers = await Promise.all(
            userListFetched.map(async (user: IUserDetails) => {
              const details = await fetchUserDetails(user.login);
              return { ...user, ...details };
            })
          );
          setUsersDetails(updatedUsers);
          localStorage.setItem('cachedUsersData', JSON.stringify(updatedUsers));

        } catch (error) {
          console.error('Error fetching user list:', error);
        }
    }
    
    const cachedData = localStorage.getItem('cachedUsersData');
    if (cachedData){
      setUsersDetails(JSON.parse(cachedData))
    } else {
      fetchData()
    }

  }, [])
  return (
    <usersContext.Provider value={{usersDetails}}>
      <main>{children}</main>
    </usersContext.Provider>
  );
};

