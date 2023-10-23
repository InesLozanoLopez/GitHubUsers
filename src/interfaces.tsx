export interface IUserDetails {
  userData: any;
  login: string;
  id: number;
  avatar_url: string;
  data: {
    avatar_url: string;
    url: string;
    followers_url: string;
    following_url: string;
    subscriptions_url: string;
    organizations_url: string;
    name: string;
    company: string;
    blog: string;
    location: string;
    email: string | null;
    bio: string | null;
    twitter_username: string;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: string;
    updated_at: string;
  }
}
