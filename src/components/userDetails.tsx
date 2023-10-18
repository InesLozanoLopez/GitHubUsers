'use client';

import './../components/styles/userDetails.css';
import { IUserDetails } from '../interfaces';
import { useState, useEffect } from 'react';
import { fetchUserDetails } from '@/apiServices';
import { toCapitaliseFirstLetter } from '@/functions';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import UsersFollow from './usersFollow';

export default function UserDetails() {
  const [userData, setUserData] = useState<IUserDetails | null>(null);
  const { login } = useParams();
  const url = `https://api.github.com/users/${login}`;
  const router = useRouter();

  useEffect(() => {
    fetchUserDetails({ url, setUserData: setUserData });
  }, [url]);

  const handleBacktoUserListClick = () => {
    const path = '/';
    router.push(path);
  };

  return (
    <>
      {userData && (
        <>
          <header>
            <section className="userPageHead" aria-label="User Information">
              <h1> {toCapitaliseFirstLetter(userData?.login)} </h1>
              <div className="headInfo">
                <p>Repositories: {userData?.public_repos}</p>
              </div>
            </section>
          </header>
          <main>
            <section className="userDetailsContainer" aria-label="User Details">
              <div className="detailsBlock">
                {userData?.name && (
                  <>
                    <p className="detailsLine">Name:</p>
                    <p className="userInfo">{userData?.name}</p>
                  </>
                )}
                {userData?.location && (
                  <>
                    <p className="detailsLine">Location:</p>
                    <p className="userInfo">{userData?.location}</p>
                  </>
                )}
                {userData?.company && (
                  <>
                    <p className="detailsLine">
                      {userData?.company?.length > 1 ? 'Companies' : 'Company'}:
                    </p>
                    <p className="userInfo">{userData?.company}</p>
                  </>
                )}
              </div>
              <div className="detailsImgContainer">
                <Image
                  className="detailsImg"
                  src={userData?.avatar_url}
                  alt={`${userData?.login}'s avatar`}
                  width={200}
                  height={200}
                  loading="lazy"
                />
              </div>

              <div className="detailsBlock">
                {userData?.twitter_username && (
                  <>
                    <p className="detailsLine">Twitter:</p>
                    <p className="userInfo">@{userData?.twitter_username}</p>
                  </>
                )}
                {userData?.twitter_username && (
                  <>
                    <p className="detailsLine">Blog:</p>
                    <p className="userInfo">
                      {userData?.blog && (
                        <a
                          href={userData.blog}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Link to the blog
                        </a>
                      )}
                    </p>
                  </>
                )}
              </div>
            </section>

            <hr className="horizontalLines" />
            <section aria-label="Followers">
              <UsersFollow url={userData?.followers_url} />
            </section>
            <hr className="horizontalLines" />

            <div className="userPageBottomBackground">
              <hr className="horizontalLines light" />
              <section aria-label="Following">
                <UsersFollow
                  url={userData?.following_url}
                  login={userData?.login}
                />
                <Image
                  className="catImg"
                  src="/catImg.png"
                  alt={`Cat imagen`}
                  width={100}
                  height={100}
                  priority={true}
                />
              </section>
              <hr className="horizontalLines light" />

              <section className="userPageBottom">
                <button
                  className="button"
                  title="User List"
                  aria-label="Click to Users List"
                  onClick={() => handleBacktoUserListClick()}
                >
                  Users List
                </button>
              </section>
            </div>
          </main>
        </>
      )}
    </>
  );
}
