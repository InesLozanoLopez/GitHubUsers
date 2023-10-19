import './globals.css';
import UsersList from './../components/usersList';
import Image from 'next/image';
import { fetchUserDetails } from '@/apiServices';
import { createContext, useContext, useState } from 'react';
import {IUserDetails} from './../interfaces';

const usersDetailsContext = createContext<{userDetails: IUserDetails | null; aPIUserDetails: (url:string) => void}>({
  userDetails: null,
  aPIUserDetails: () => {},
});

export const useUserDetailsContext = () => {
  return useContext(usersDetailsContext);
}

export default function Home() {
  const [userDetails, setUserDetails] = useState<IUserDetails | null>(null);

  const aPIUserDetails = (url: string) => {
    fetchUserDetails({ url, setUserData: setUserDetails });
  };


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
      <usersDetailsContext.Provider value={{ userDetails, aPIUserDetails }}>
        <main>
          <UsersList />
        </main>
      </usersDetailsContext.Provider>
    </>
  );
}
