import './App.css';
import { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import { onLoginStatusChange } from './Api/authManager';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getUsers } from './Api/Data/UsersData';


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
            getUsers(user.uid).then()
        });
    }, []);

    if (isLoggedIn === null) {
        return <Spinner className="app-spinner light" />;
    }

  return (
      <div>
          <h1>
              Hi
          </h1>
      </div>
  );
}

export default App;
