// API Client Implementation 


// Dependencies 
import axios from 'axios';


// Components & Necessary Files 


// API Client 
const apiClient = axios.create({ 
    baseURL: 'http://127.0.0.1:5000/api'
});

export default apiClient;