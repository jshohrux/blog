import axios from "./axios";

const PostService = {
    register (user){
        return axios.post('v1/auth/register', { ...user },{headers:{'Content-Type': 'application/json;'}})
    },
    login (user){
        return axios.post('v1/auth/login', {...user},{headers:{'Content-Type': 'application/json;'}})
    },
    homePost(){
        return axios.get('home-posts',{headers:{'Content-Type': 'application/json;'}})
    },
}

export default PostService
