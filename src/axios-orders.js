import axios from 'axios';

const axiosInstancs = axios.create({
    baseURL: 'https://burgerbuilder-1e570.firebaseio.com/'
})

export default axiosInstancs;