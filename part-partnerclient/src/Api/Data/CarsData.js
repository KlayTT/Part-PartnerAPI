import axios from 'axios';

const dbUrl = 'https://localhost:7297/api/cars';

const getCars = (uid) => new Promise((resolve, reject) => {
    axios.get(`${dbUrl}/uid="${uid}"`)
        .then((response) => {
            resolve(Object.values(response.data));
        })
        .catch(reject);
});

export default getCars;