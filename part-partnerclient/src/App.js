import './App.css';
import { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner } from 'reactstrap';
import { onLoginStatusChange } from './Api/authManager';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getUsers } from './Api/Data/UsersData';
import PublicRoutes from './Routes/PublicRoutes';
import NavbarComponent from './Components/Navbar';


const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
};
firebase.initializeApp(firebaseConfig);

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    useEffect(() => {
        onLoginStatusChange(setIsLoggedIn);

        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                getUsers(user.uid).then(() => {
                    if (user.isLoggedIn === null) {
                        return <Spinner className="app-spinner light" />;
                    }
                })
            }
        });
    }, []);

  return (
      <div>
          <NavbarComponent isLoggedIn={isLoggedIn} />
          <PublicRoutes isLoggedIn={isLoggedIn} />
      </div>
  );
}

export default App;
