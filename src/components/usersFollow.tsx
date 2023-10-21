'use client';

import './../components/styles/userFollow.css';
import { IUserDetails } from '@/interfaces';
import { useState, useEffect } from 'react';
import { fetchUserFollowers, fetchUserFollowing } from '@/apiServices';
import Image from 'next/image';

export default function UsersFollow({
  url,
  login,
}: {
  url: string;
  login?: string;
}) {
  const [usersAvatar, setUsersAvatar] = useState<IUserDetails[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  useEffect(() => {
    if (login) {
      fetchUserFollowing({ login, setUsersAvatar: setUsersAvatar }).then(() =>
        setIsLoading(false),
      );
    } else {
      fetchUserFollowers({ url, setUsersAvatar: setUsersAvatar }).then(() =>
        setIsLoading(false),
      );
    }
  }, [url, login]);

  return (
    <section
      className="followCarrussel"
      aria-label={login ? `Following section` : `Followers section`}
    >
      <div>
        <h3>
          {login
            ? `Following: ${usersAvatar.length}`
            : `Followers: ${usersAvatar.length}`}
        </h3>
      </div>
      {isLoading ? (
        <div className="avatarContainer">
          <div
            aria-label="Loading content"
          >
            <h2>Loading...</h2>
          </div>
        </div>
      ) : (
        <div className="avatarContainer">
          {usersAvatar &&
            usersAvatar.map((user: IUserDetails) => (
              <div
                key={user.id}
                className="avatarImgContainer"
                role="presentation"
                aria-label="Users avatar"
              >
                <Image
                  className="avatarImg"
                  src={user?.avatar_url}
                  alt={`${login}'s ${
                    login
                      ? `Following: ${usersAvatar.length}`
                      : `Followers: ${usersAvatar.length}`
                  }`}
                  width={100}
                  height={100}
                  priority={true}
                />
              </div>
            ))}
        </div>
      )}
    </section>
  );
}
