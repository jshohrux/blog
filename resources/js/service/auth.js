import axios from "./axios";

const AuthService = {
    register (user){
        return axios.post('v1/auth/register', { ...user },{headers:{'Content-Type': 'application/json;'}})
    },
    login (user){
        return axios.post('v1/auth/login', {...user},{headers:{'Content-Type': 'application/json;'}})
    },
    user(){
        return axios.get('me',{headers:{'Content-Type': 'application/json;'}})
    },
}

export default AuthService
