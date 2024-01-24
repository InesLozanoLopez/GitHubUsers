'use client'

import style from './../styles/usersList.module.css';
import { IUserDetails } from '../interfaces/interfaces';
import UserCard from './userCard';
import { useUsersContext } from '../context/UsersContextProvider';

const UserList: React.FC = () => {
  const {usersDetails} = useUsersContext();

  return (
    <>
      <div className={style.listOfUsersContainer}>
        <div className={style.listOfUsersBackground}></div>
        {usersDetails && (
          <ul className={style.gridListOfUsers}>
            {usersDetails.map((user: IUserDetails) => (
              <li key={user.id}>
                <UserCard user={user} />
              </li>
            ))}
          </ul>
        )}
      </div>
   </>
  );
}

export default UserList;
