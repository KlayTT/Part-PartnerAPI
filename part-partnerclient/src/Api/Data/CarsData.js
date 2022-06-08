import axios from 'axios';

const dbUrl = 'https://localhost:7297/api/cars';

const getCars = () => new Promise((resolve, reject) => {
    axios.get(`${dbUrl}`)
        .then((response) => {
            resolve(Object.values(response.data));
        })
        .catch(reject);
});

const getSingleCar = (id) => new Promise((resolve, reject) => {
    axios.get(`${dbUrl}/${id}`)
        .then((response) => resolve(response.data))
        .catch(reject);
});

const createCars = (obj) => new Promise((resolve, reject) => {
    axios
        .post(`${dbUrl}`, obj)
        .then((response) => resolve(response.data))
        .catch(reject);
});

const updateCars = (obj) => ((resolve, reject) => {
    axios
        .patch(`${dbUrl}/${obj.id}`, obj)
        .then(() => getCars().then(resolve))
        .catch(reject);

});

const deleteCars = (id) => new Promise((resolve, reject) => {
    axios
        .delete(`${dbUrl}/${id}`)
        .then(() => getCars().then(resolve))
        .catch(reject);
});

export {
    getCars,
    getSingleCar,
    createCars,
    updateCars,
    deleteCars,
};