import axios from 'axios';
import { IUserDetails } from '../interfaces/interfaces';

const githubApi= axios.create({
  baseURL : 'https://api.github.com',
  headers :  {'X-GitHub-Api-Version': '2022-11-28'}
}) 

export const fetchUsersList = async () => {
  try {
    const response = await githubApi.get('/users', {
      params: {
        per_page: 10,
      },
    });
    if (response) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const fetchUserDetails = async (
  login: string) => {
  try {
    const response = await githubApi.get(`/users/${login}`);
    if (response) {
      return response.data;
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
  try {
    const response = await githubApi.get(`/users/${login}/following`, {
    });
    if (response) {
      const data: IUserDetails[] = await response.data;
      setUsersAvatar(data);
    }
  } catch (error) {
    throw error;
  }
};
