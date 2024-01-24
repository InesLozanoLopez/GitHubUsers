import UsersList from '../components/usersList';
import Image from 'next/image';
import {UsersContext} from '../context/UsersContextProvider';
import './globals.css';


export default function Home() {

  return (
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
        <UsersContext>
          <UsersList/>
        </UsersContext>
    </>
  );
}
