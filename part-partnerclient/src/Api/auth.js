import firebase from 'firebase/compat/app';

const signOutUser = () => new Promise((resolve, reject) => {
    firebase.auth().signOut().then(resolve).catch(reject);
});

export default signOutUser;
