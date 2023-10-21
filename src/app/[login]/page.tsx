import './../globals.css';
import UserDetails from '../../components/userDetails';
import UsersContext from '@/context';

export default function UserDetailsPage() {
  return (
    <main>
      <UsersContext>
      <div className="main">
        <UserDetails />
      </div>
    </UsersContext>
    </main >
  );
}
