import './App.css';
import firebase from 'firebase/compat/app';


const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
};
firebase.initializeApp(firebaseConfig);

function App() {
  return (
      <>
          <h1>
              Hi
          </h1>
      </>
  );
}

export default App;
