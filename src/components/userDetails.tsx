"use client"

import styles from './../styles/userDetails.module.css';
import { toCapitaliseFirstLetter } from '../utils/functions';
import Image from 'next/image';
import UsersFollow from './usersFollow';
import { useUsersContext } from '../context/UsersContextProvider';
import { IUserDetails } from '../interfaces/interfaces';
import { useRouter, useParams } from 'next/navigation';

const UserDetails: React.FC = () => {
  const router = useRouter();
  const { login } = useParams();
  const {usersDetails} = useUsersContext();


  const handleBacktoUserListClick = () => {
    const path = '/';
    router.replace(path);
  };

  if (!login) {
    handleBacktoUserListClick();
  }
  if(!usersDetails){
    return (
      <>
      <h1>Loading...</h1>
      </>
    )
  }

  const user = usersDetails?.filter((user: IUserDetails) => user.login === login)[0]

  

  return (
    <>
      {user && (
        <>
          <section id={styles.userPageHead} aria-label="User Information">
            <h1> {toCapitaliseFirstLetter(user?.login)} </h1>
            <div className={styles.headInfo}>
              <p>Repositories: {user?.public_repos}</p>
            </div>
          </section>
          <section id={styles.userDetailsContainer} aria-label="User Details">
            <div className={styles.detailsBlock1}>
              {user?.name && (
                <>
                  <p className={styles.detailsLine}>Name:</p>
                  <p className={styles.userInfo}>{user?.name}</p>
                </>
              )}
              {user?.location && (
                <>
                  <p className={styles.detailsLine}>Location:</p>
                  <p className={styles.userInfo}>{user?.location}</p>
                </>
              )}
              {user?.company && (
                <>
                  <p className={styles.detailsLine}>
                    {user?.company?.length > 1 ? 'Companies' : 'Company'}:
                  </p>
                  <p className={styles.userInfo}>{user?.company}</p>
                </>
              )}
            </div>

            <div className={styles.detailsImgContainer}>
              <Image
                className={styles.detailsImg}
                src={user?.avatar_url}
                alt={`${user?.login}'s avatar`}
                width={200}
                height={200}
                loading="lazy"
              />
            </div>

            <div className={styles.detailsBlock2}>
              {user?.twitter_username && (
                <>
                  <p className={styles.detailsLine}>Twitter:</p>
                  <p className={styles.userInfo}>@{user?.twitter_username}</p>
                </>
              )}
              {user?.twitter_username && (
                <>
                  <p className={styles.detailsLine}>Blog:</p>
                  <p className={styles.userInfo}>
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

          <hr className={styles.horizontalLines} />

          <section id="Followers">
            <UsersFollow url={user?.followers_url} />
          </section>

          <hr className={styles.horizontalLines} />

          <div className={styles.userPageBottomBackground}>
            <hr className="horizontalLines light" />

            <section id='Following'>
              <UsersFollow
                url={user?.following_url}
                login={user?.login}
              />
              <Image
                className={styles.catImg}
                src="/catImg.png"
                alt={`Cat imagen`}
                width={100}
                height={100}
                priority={true}
              />
            </section>

            <hr className={`${styles.horizontalLines} ${styles.light}`} />

            <section id={styles.userPageBottom}>
              <button
                type='button'
                className={styles.button}
                title="User List"
                aria-label="Click to Users List"
                onClick={handleBacktoUserListClick}
              >
                Users List
              </button>
            </section>
          </div>
        </>
      )}
    </>
  );
}

export default UserDetails;