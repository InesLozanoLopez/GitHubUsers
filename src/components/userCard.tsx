'use Client'
import styles from './../styles/userCard.module.css';
import Image from 'next/image';
import { IUserDetails } from '../interfaces/interfaces';

export default function UserCard({ user }: { user: IUserDetails }) {
  const userDetails = user;

  const handleMoreInfoClick = () => {
    localStorage.setItem('userLogin', userDetails.login);
  };

  return (
    <div className={styles.userCard} aria-label="User Information">
      {userDetails && (
        <div
          aria-label="View more information"
          onClick={() => handleMoreInfoClick()}
        >
          <div className={styles.topCard}>
            <div className="avatarImgContainer">
              <Image
                className={styles.avatarImg}
                src={userDetails?.avatar_url}
                aria-label={`${userDetails?.login}'s avatar`}
                alt="User avatar"
                width={150}
                height={150}
                loading="lazy"
              />
            </div>
          </div>

          <div className={styles.bottomCard}>
            <p className={styles.detailsLine}>User name:</p>
            <p className={styles.userInfo}>{userDetails?.login}</p>
            <p className={styles.detailsLine}>Name:</p>
            <p className={styles.userInfo}>{userDetails?.name}</p>
          </div>
          <button
            title="More information"
            aria-label="Click for more Information"
            className={`${styles.detailsLine} ${styles.button}`}
          >
            + Details
          </button>
        </div>
      )}
    </div>
  );
}
