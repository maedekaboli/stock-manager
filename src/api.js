import axios from 'axios';

const instance =axios.create({
    baseURL: 'https://stockmanager.mooo.com/api/products/',
})

export default instance;