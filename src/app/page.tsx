import './globals.css';
import UsersList from './../components/usersList';
import Image from 'next/image';

export default function Home() {
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
      <main>
        <UsersList />
      </main>
    </>
  );
}
