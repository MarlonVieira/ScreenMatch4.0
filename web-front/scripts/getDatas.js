// URL base da API
const baseURL = 'http://localhost:8080';

export default function getdatas(endpoint) {
    return fetch(`${baseURL}${endpoint}`)
        .then(response => response.json())
        .catch(error => {
            console.error('Error to acess endpoint /series/top5:', error);
        });
}