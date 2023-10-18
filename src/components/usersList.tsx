'use client';

import './styles/usersList.css';
import { IUserFetch } from '@/interfaces';
import { useState, useEffect } from 'react';
import UserCard from './userCard';
import { fetchUsersList } from '@/apiServices';

export default function UserList() {
  const [userData, setUserData] = useState<IUserFetch[]>([]);

  useEffect(() => {
    fetchUsersList({ setUserData });
  }, []);

  return (
    <div className="listOfUsersContainer">
      <div className="listOfUsersBackground"></div>
      {userData && (
        <ul className="gridListOfUsers">
          {userData.map((user: IUserFetch) => (
            <li key={user.id}>
              <UserCard url={user.url} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
