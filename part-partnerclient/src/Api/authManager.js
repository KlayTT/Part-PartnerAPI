import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const _apiUrl = "https://localhost:7297";

const _doesUserExist = (firebaseUserId) => {
    return getToken().then((token) =>
        fetch(`${_apiUrl}/DoesUserExist/${firebaseUserId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resp => resp.ok));
};

export const getToken = () => {
    const currentUser = firebase.auth().currentUser;
    if (!currentUser) {
        throw new Error("Cannot get current user. Did you forget to login?");
    }
    return currentUser.getIdToken();
};

export const login = (email, pw) => {
    return firebase.auth().signInWithEmailAndPassword(email, pw)
        .then((signInResponse) => _doesUserExist(signInResponse.user.uid))
        .then((doesUserExist) => {
            if (!doesUserExist) {

                // If we couldn't find the user in our app's database, we should logout of firebase
                logout();

                throw new Error("Something's wrong. The user exists in firebase, but not in the application database.");
            } else {
                _onLoginStatusChangedHandler(true);
            }
        }).catch(err => {
            console.error(err);
            throw err;
        });
};

export const logout = () => {
    firebase.auth().signOut()
};