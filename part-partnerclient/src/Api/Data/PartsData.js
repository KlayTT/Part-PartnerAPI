import axios from 'axios';

const dbUrl = 'https://localhost:7297/api/parts';

const getParts = () => new Promise((resolve, reject) => {
    axios.get(`${dbUrl}`)
        .then((response) => {
            resolve(Object.values(response.data));
        })
        .catch(reject);
});

const getSinglePart = (id) => new Promise((resolve, reject) => {
    axios.get(`${dbUrl}/${id}`)
        .then((response) => resolve(response.data))
        .catch(reject);
});

const createParts = (obj) => new Promise((resolve, reject) => {
    axios
        .post(`${dbUrl}`, obj)
        .then((response) => resolve(response.data))
        .catch(reject);
});

const updateParts = (updateObj) => new Promise((resolve, reject) => {
    axios
        .patch(`${dbUrl}/${updateObj.id}`, updateObj)
        .then(() => getParts().then(resolve))
        .catch(reject);
});


const deleteParts = (id) => new Promise((resolve, reject) => {
    axios
        .delete(`${dbUrl}/${id}`)
        .then(() => getParts().then(resolve))
        .catch(reject);
});

export {
    getParts,
    getSinglePart,
    createParts,
    updateParts,
    deleteParts,
};