'Use Client';

import './styles/userCard.css';
import { fetchUserDetails } from '@/apiServices';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { IUserDetails } from '@/interfaces';
import { useRouter } from 'next/navigation';

export default function UserCard({ url }: { url: string }) {
  const [userData, setUserData] = useState<IUserDetails | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchUserDetails({ url, setUserData: setUserData });
  }, [url]);

  const handleMoreInfoClick = (userData: IUserDetails) => {
    const path = `${userData?.login}`;
    router.push(path);
  };

  return (
    <div className="userCard" aria-label="User Information">
      {userData && (
        <div
          arial-label="View more information"
          onClick={() => handleMoreInfoClick(userData)}
        >
          <div className="topCard">
            <div className="avatarImgContainer">
              <Image
                className="avatarImg"
                src={userData?.avatar_url}
                aria-label={`${userData?.login}'s avatar`}
                alt="User avatar"
                width={150}
                height={150}
                loading="lazy"
              />
            </div>
          </div>

          <div className="bottomCard">
            <p className="detailsLine">User name:</p>
            <p className="userInfo">{userData?.login}</p>
            <p className="detailsLine">Name:</p>
            <p className="userInfo">{userData?.name}</p>
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
