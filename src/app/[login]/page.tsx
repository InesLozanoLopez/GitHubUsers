import React from 'react';
import UserDetails from '../../components/userDetails';
import { UsersContext } from '../../context/UsersContextProvider';
import './globals.css'

const AppPage: React.FC = () => {

  return (
    <>
      <UsersContext >
        <UserDetails />
      </UsersContext>
    </>
  );
};

export default AppPage;