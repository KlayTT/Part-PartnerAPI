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

const createUser = (profile) => new Promise((resolve, reject) => {
    return getToken().then((token) => {
        axios
            .post(`${dbUrl}`, profile, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => resolve(response.data))
            .catch(reject);
    });
});

const updateUser = (profile) => new Promise((resolve, reject) => {
    return getToken().then((token) => {
        axios
            .patch(`${dbUrl}/${profile.firebaseUserId}`, profile, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(() => getUsers().then(resolve))
            .catch(reject);
    });
});

const deleteUserSql = (profile) => new Promise((resolve, reject) => {
    return getToken().then((token) => {
        axios
            .post(`${dbUrl}`, profile, {
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
    deleteUserSql
}