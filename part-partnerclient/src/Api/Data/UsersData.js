import axios from 'axios';
import { getToken } from '../authManager';

const dbUrl = 'https://localhost:7297/api/users';

const getUsers = () => new Promise((resolve, reject) => {
    return getToken().then((token) => {
        axios
            .get(`${dbUrl}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => resolve(response.data))
            .catch(reject);
    });
});

const getUsersByFuid = (firebaseUserId) => new Promise((resolve, reject) => {
    return getToken().then((token) => {
        axios
            .get(`${dbUrl}/${firebaseUserId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => resolve(response.data))
            .catch(reject);
    });
});

const createUser = (user) => new Promise((resolve, reject) => {
    return getToken().then((token) => {
        axios
            .post(`${dbUrl}`, user, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => resolve(response.data))
            .catch(reject);
    });
});

const updateUser = (user) => new Promise((resolve, reject) => {
    return getToken().then((token) => {
        axios
            .post(`${dbUrl}`, user, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(() => getUsers().then(resolve))
            .catch(reject);
    });
});

const deleteUser = (user) => new Promise((resolve, reject) => {
    return getToken().then((token) => {
        axios
            .post(`${dbUrl}`, user, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(() => getUsers().then(resolve))
            .catch(reject);
    });
});

export {
    getUsers,
    getUsersByFuid,
    createUser,
    updateUser,
    deleteUser
}