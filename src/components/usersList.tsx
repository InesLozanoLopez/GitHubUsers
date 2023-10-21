import './styles/usersList.css';
import { IUserDetails } from '@/interfaces';
import UserCard from './userCard';
import UsersContext from '@/context';

export default function UserList() {

  return (
    <>
    <UsersContext> 
      <>
      {({ userDetails}: {userDetails: IUserDetails[] | null }) => (
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
      )}
      </>
      </UsersContext>
      </>
      );
}
