import axios from "axios";
export default axios.create({
    baseURL: 'http://localhost:4000/api',
    // baseURL: 'http://178.128.207.34/api',
})