import { Octokit } from '@octokit/rest';
import { IUserDetails, IUserFetch } from './interfaces';

export const fetchUsersList = async ({
  setUserData,
}: {
  setUserData: React.Dispatch<IUserFetch[]>;
}) => {
  const octokit = new Octokit();
  try {
    const response = await octokit.request<any>('GET /users', {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });
    if (response) {
      const data: IUserFetch[] = await response.data.map(
        (user: IUserFetch) => ({
          id: user.id,
          url: user.url,
        }),
      );
      setUserData(data);
    }
  } catch (error) {
    throw error;
  }
};

export const fetchUserDetails = async ({
  url,
  setUserData,
}: {
  url: string;
  setUserData: React.Dispatch<IUserDetails>;
}) => {
  try {
    const response = await fetch(url);
    if (response) {
      const userDetails: IUserDetails = await response.json();
      setUserData(userDetails);
    }
  } catch (error) {
    throw error;
  }
};

export const fetchUserFollowers = async ({
  url,
  setUsersAvatar,
}: {
  url: string;
  setUsersAvatar: React.Dispatch<IUserDetails[]>;
}) => {
  try {
    const response = await fetch(url);
    if (response) {
      const userFollower: IUserDetails[] = await response.json();
      setUsersAvatar(userFollower);
    } else {
      throw new Error(`Error ${response}`);
    }
  } catch (error) {
    throw error;
  }
};

export const fetchUserFollowing = async ({
  login,
  setUsersAvatar,
}: {
  login: string;
  setUsersAvatar: React.Dispatch<IUserDetails[]>;
}) => {
  const octokit = new Octokit();
  try {
    const response = await octokit.request('GET /users/{login}/following', {
      login: login,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });
    if (response) {
      const data: IUserDetails[] = await response.data;
      setUsersAvatar(data);
    }
  } catch (error) {
    throw error;
  }
};
