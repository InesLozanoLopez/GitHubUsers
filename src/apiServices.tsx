import { Octokit } from '@octokit/rest';
import { IUserDetails } from './interfaces';

export const fetchUsersList = async () => {
  const octokit = new Octokit();
  try {
    const response = await octokit.request<any>('GET /users', {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
      per_page: 10,
    });
    if (response) {
      return response;
    }
  } catch (error) {
    throw error;
  }
};

export const fetchUserDetails = async (
  login: string) => {
  try {
    const octokit = new Octokit();
    const response = await octokit.request(`GET /users/${login}`, {
      username: 'USERNAME',
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })
    if (response) {
      return response;
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
