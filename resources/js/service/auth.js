import axios from "./axios";

const AuthService = {
    register (user){
        return axios.post('auth/register', { ...user },{headers:{'Content-Type': 'application/json;'}})
    },
    login (user){
        return axios.post('auth/login', {...user},{headers:{'Content-Type': 'application/json;'}})
    },
    user(){
        return axios.get('auth/me',{headers:{'Content-Type': 'application/json;'}})
    },
}

export default AuthService
