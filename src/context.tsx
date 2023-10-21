'use client'

import { fetchUserDetails, fetchUsersList } from '@/apiServices';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { IUserDetails } from './interfaces';

const usersContext = createContext<{ userDetails: IUserDetails[] }>({ userDetails: [] });

export const useUsersContext = () => {
    return useContext(usersContext);
}

export default function UsersContext({ children }: { children: ReactNode }) {
    const [usersList, setUsersList] = useState<IUserDetails[] | null>(null);

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
            <usersContext.Provider value={{ userDetails: usersList || [] }}>
                <main>
                    {children}
                </main>
            </usersContext.Provider>
        </>
    );
}
