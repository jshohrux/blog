import axios from "./axios";

const ChatService = {
    sendMessage(data){
        return axios.post('send_message', {...data},{headers:{'Content-Type': 'application/json;'}})
    },
    convirsation(){
        return axios.get('chatUserList',{headers:{'Content-Type': 'application/json;'}})
    },
    convirsationShowByRoomId(id){
        return axios.get('roomInformation/'+id,{headers:{'Content-Type': 'application/json;'}})
    },
    Conversation(data){
        return axios.post('conversation',{...data},{headers:{'Content-Type': 'application/json;'}})
    },
}

export default ChatService
