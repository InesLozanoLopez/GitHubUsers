import './styles/userCard.css';
import Image from 'next/image';
import { IUserDetails } from '@/interfaces';
import { useRouter } from 'next/navigation';

export default function UserCard({ user }: { user: IUserDetails }) {
  const userDetails = user;
  const router = useRouter();

  const handleMoreInfoClick = (userData: IUserDetails) => {
    const path = `${userData?.login}`;
    router.push(path);
  };

  return (
    <div className="userCard" aria-label="User Information">
      {userDetails && (
        <div
          arial-label="View more information"
          onClick={() => handleMoreInfoClick(userDetails)}
        >
          <div className="topCard">
            <div className="avatarImgContainer">
              <Image
                className="avatarImg"
                src={userDetails?.data.avatar_url}
                aria-label={`${userDetails?.login}'s avatar`}
                alt="User avatar"
                width={150}
                height={150}
                loading="lazy"
              />
            </div>
          </div>

          <div className="bottomCard">
            <p className="detailsLine">User name:</p>
            <p className="userInfo">{userDetails?.login}</p>
            <p className="detailsLine">Name:</p>
            <p className="userInfo">{userDetails?.data.name}</p>
          </div>
          <button
            title="More information"
            aria-label="Click for more Information"
            className="detailsLine moreInfo"
          >
            + Details
          </button>
        </div>
      )}
    </div>
  );
}
