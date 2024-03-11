import { defineStore } from "pinia";
import AuthService from "../service/auth";
import PostService from "../service/post";
import ChatService from "../service/chat";

export const useStoreData = defineStore("dataStore", {
    state: () => {
        return {
            isLogedIn: false,
            isLoading: false,
            user: null,
            error: null,
            post: null,
            conversation: null,
            roomData: null,
        };
    },
    actions: {
        register(user) {
            return new Promise((resolve, reject) => {
                this.isLogedIn = null;
                this.isLoading = true;
                AuthService.register(user)
                    .then((response) => {
                        this.isLogedIn = true;
                        this.error = null;
                        console.log(response);
                        // this.user = response.data.user;
                        resolve(response.data);
                    })
                    .catch((error) => {
                        this.error = error.response;
                        this.isLogedIn = false;
                        reject(error);
                    })
                    .finally(() => {
                        this.isLoading = false;
                        this.count = 1;
                    });
            });
        },

        login(user) {
            return new Promise((resolve, reject) => {
                this.isLoading = true;
                AuthService.login(user)
                    .then((response) => {
                        this.isLogedIn = true;
                        this.error = null;
                        console.log(response);
                        if (response.data.user != null) {
                            this.user = response.data.user;
                            localStorage.setItem("authenticated", "true");
                            window.localStorage.setItem("token", response.data.access_token);
                        }
                        resolve(response.data);
                    })
                    .catch((error) => {
                        this.error = error;

                        this.isLogedIn = false;
                        reject(error.response.data);
                    })
                    .finally(() => {
                        this.isLoading = false;
                        this.count = 1;
                    });
            });
        },

        users() {
            return new Promise((resolve) => {
                this.isLoading = true;
                AuthService.user()
                    .then((response) => {
                        console.log(response);
                        this.user = response.data.user;
                        this.isLogedIn = true;
                        this.error = null;
                        resolve(response.data.user);
                    })
                    .catch(() => {
                        this.user = null;
                        this.isLogedIn = false;
                        this.isLoading = false;
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            });
        },

        logout() {
            this.user = null;
            this.isLogedIn = false;

            this.message = "Tizimdan chiqildi";
            this.code = 201;

            localStorage.removeItem("token");
            localStorage.removeItem("authenticated");
        },

        homePost() {
            return new Promise((resolve) => {
                this.isLoading = true;
                PostService.homePost()
                    .then((response) => {
                        console.log(response);
                        this.post = response.data;
                        this.error = null;
                        resolve(response.data);
                    })
                    .catch(() => {
                        this.post = null;
                        this.isLoading = false;
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            });
        },
        chatUserList() {
            return new Promise((resolve) => {
                this.isLoading = true;
                ChatService.convirsation()
                    .then((response) => {
                        console.log(response);
                        this.conversation = response.data;
                        this.error = null;
                        resolve(response.data);
                    })
                    .catch(() => {
                        this.conversation = null;
                        this.isLoading = false;
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            });
        },
        roomInfo(id) {
            return new Promise((resolve) => {
                this.isLoading = true;
                ChatService.convirsationShowByRoomId(id)
                    .then((response) => {
                        console.log(response);
                        this.roomData = response.data;
                        this.error = null;
                        resolve(response.data);
                    })
                    .catch(() => {
                        this.roomData = null;
                        this.isLoading = false;
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            });
        },
        sendMess(data) {
            return new Promise((resolve, reject) => {
                this.isLoading = true;
                ChatService.sendMessage(data)
                    .then((response) => {
                        console.log(response);
                        this.roomData = response.data;
                        this.error = null;
                        resolve(response.data);
                    })
                    .catch((error) => {
                        this.error = error;
                        this.roomData = null;
                        reject(error.response.data);
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            });
        },


    },
});
