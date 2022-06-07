import axios from 'axios';

const dbUrl = 'https://localhost:7297/api/parts';

const getParts = () => new Promise((resolve, reject) => {
    axios.get(`${dbUrl}`)
        .then((response) => {
            resolve(Object.values(response.data));
        })
        .catch(reject);
});

export default getParts;