import './styles/usersList.css';
import { IUserDetails } from '@/interfaces';
import UserCard from './userCard';
import { useUsersContext } from '@/app/page';

export default function UserList() {
  const { userDetails } = useUsersContext();

  return (
    <div className="listOfUsersContainer">
      <div className="listOfUsersBackground"></div>
      {userDetails && (
        <ul className="gridListOfUsers">
          {userDetails.map((user: IUserDetails) => (
            <li key={user.id}>
              <UserCard user={user} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
