import './App.css';
import 'firebase/compat/auth';


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
