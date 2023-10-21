'use client'

import './../components/styles/userDetails.css';
import { toCapitaliseFirstLetter } from '@/functions';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import UsersFollow from './usersFollow';
import { useUsersContext } from '@/app/page';

export default function UserDetails() {
  const usersList = useUsersContext();
  console.log(usersList);
  const { login } = useParams();
  const user = usersList.userDetails.find((user) => user.login === login);

  const router = useRouter();

  const handleBacktoUserListClick = () => {
    const path = '/';
    router.push(path);
  };

  return (
    <>
       {user && (
        <>
          <header>
            <section className="userPageHead" aria-label="User Information">
              <h1> {toCapitaliseFirstLetter(user?.login)} </h1>
              <div className="headInfo">
                <p>Repositories: {user?.public_repos}</p>
              </div>
            </section>
          </header>
          <main>
            <section className="userDetailsContainer" aria-label="User Details">
              <div className="detailsBlock">
                {user?.name && (
                  <>
                    <p className="detailsLine">Name:</p>
                    <p className="userInfo">{user?.name}</p>
                  </>
                )}
                {user?.location && (
                  <>
                    <p className="detailsLine">Location:</p>
                    <p className="userInfo">{user?.location}</p>
                  </>
                )}
                {user?.company && (
                  <>
                    <p className="detailsLine">
                      {user?.company?.length > 1 ? 'Companies' : 'Company'}:
                    </p>
                    <p className="userInfo">{user?.company}</p>
                  </>
                )}
              </div>
              <div className="detailsImgContainer">
                <Image
                  className="detailsImg"
                  src={user?.avatar_url}
                  alt={`${user?.login}'s avatar`}
                  width={200}
                  height={200}
                  loading="lazy"
                />
              </div>

              <div className="detailsBlock">
                {user?.twitter_username && (
                  <>
                    <p className="detailsLine">Twitter:</p>
                    <p className="userInfo">@{user?.twitter_username}</p>
                  </>
                )}
                {user?.twitter_username && (
                  <>
                    <p className="detailsLine">Blog:</p>
                    <p className="userInfo">
                      {user?.blog && (
                        <a
                          href={user.blog}
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
              <UsersFollow url={user?.followers_url} />
            </section>
            <hr className="horizontalLines" />

            <div className="userPageBottomBackground">
              <hr className="horizontalLines light" />
              <section aria-label="Following">
                <UsersFollow
                  url={user?.following_url}
                  login={user?.login}
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
