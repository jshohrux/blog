import { defineStore } from "pinia";
import AuthService from "../service/auth";

export const useStoreData = defineStore("dataStore", {
  state: () => {
    return {
      user: null,
      isLoading: false,
      error: null,
      isLogedIn: false,
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
    },

    

  },
});
