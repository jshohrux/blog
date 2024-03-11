import axios from "./axios";

const CategoriesService = {
    register (user){
        return axios.post('v1/auth/register', { ...user },{headers:{'Content-Type': 'application/json;'}})
    },
    login (user){
        return axios.post('v1/auth/login', {...user},{headers:{'Content-Type': 'application/json;'}})
    },
    categor(){
        return axios.get('categories',{headers:{'Content-Type': 'application/json;'}})
    },
}

export default CategoriesService
