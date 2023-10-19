'use client';

import './../components/styles/userDetails.css';
import { useEffect } from 'react';
import { toCapitaliseFirstLetter } from '@/functions';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import UsersFollow from './usersFollow';
import { useUserDetailsContext } from '@/app/page';

export default function UserDetails() {
  const {userDetails, aPIUserDetails} = useUserDetailsContext();
  const router = useRouter();

  useEffect(() => {
    const { login } = useParams();
  const url = `https://api.github.com/users/${login}`;
  aPIUserDetails(url);
  }, [{useParams}]);

  const handleBacktoUserListClick = () => {
    const path = '/';
    router.push(path);
  };

  return (
    <>
      {userDetails && (
        <>
          <header>
            <section className="userPageHead" aria-label="User Information">
              <h1> {toCapitaliseFirstLetter(userDetails?.login)} </h1>
              <div className="headInfo">
                <p>Repositories: {userDetails?.public_repos}</p>
              </div>
            </section>
          </header>
          <main>
            <section className="userDetailsContainer" aria-label="User Details">
              <div className="detailsBlock">
                {userDetails?.name && (
                  <>
                    <p className="detailsLine">Name:</p>
                    <p className="userInfo">{userDetails?.name}</p>
                  </>
                )}
                {userDetails?.location && (
                  <>
                    <p className="detailsLine">Location:</p>
                    <p className="userInfo">{userDetails?.location}</p>
                  </>
                )}
                {userDetails?.company && (
                  <>
                    <p className="detailsLine">
                      {userDetails?.company?.length > 1 ? 'Companies' : 'Company'}:
                    </p>
                    <p className="userInfo">{userDetails?.company}</p>
                  </>
                )}
              </div>
              <div className="detailsImgContainer">
                <Image
                  className="detailsImg"
                  src={userDetails?.avatar_url}
                  alt={`${userDetails?.login}'s avatar`}
                  width={200}
                  height={200}
                  loading="lazy"
                />
              </div>

              <div className="detailsBlock">
                {userDetails?.twitter_username && (
                  <>
                    <p className="detailsLine">Twitter:</p>
                    <p className="userInfo">@{userDetails?.twitter_username}</p>
                  </>
                )}
                {userDetails?.twitter_username && (
                  <>
                    <p className="detailsLine">Blog:</p>
                    <p className="userInfo">
                      {userDetails?.blog && (
                        <a
                          href={userDetails.blog}
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
              <UsersFollow url={userDetails?.followers_url} />
            </section>
            <hr className="horizontalLines" />

            <div className="userPageBottomBackground">
              <hr className="horizontalLines light" />
              <section aria-label="Following">
                <UsersFollow
                  url={userDetails?.following_url}
                  login={userDetails?.login}
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
