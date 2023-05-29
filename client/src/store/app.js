// Utilities
import { defineStore } from "pinia";
import axios from "axios";
import { api } from "@/plugins/axios";

export const useAppStore = defineStore("app", {
  state: () => {
    return {
      month: "",
      year: "",
      date: "",
      transactions: [],
      accounts: [],
      categories: [],
      baseUrl: "http://4.193.32.238:3000",
      isLogin: false,
      updateTrans: false,
      rekap: [],
      defaultPage: true,
      pageStatus: false,
      categoryPage: false,
      updateAccount: false,
      accountName: "",
      isLoading: false,
    };
  },
  actions: {
    load() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    },
    async getTransaction() {
      try {
        const { data } = await api.get("/transaction", {
          params: {
            date: this.date,
          },
          headers: {
            access_token: sessionStorage.access_token,
          },
        });
        this.transactions = data;
      } catch (error) {
        console.log(error);
      }
    },
    async getAccount() {
      try {
        const { data } = await api.get("/accounts", {
          headers: {
            access_token: sessionStorage.access_token,
          },
        });
        this.accounts = data;
      } catch (error) {
        console.log(error);
      }
    },
    async getCategory() {
      try {
        const { data } = await api.get("/categories", {
          headers: {
            access_token: sessionStorage.access_token,
          },
        });
        this.categories = data;
      } catch (error) {
        console.log(error);
      }
    },
    async getRekap() {
      try {
        const { data } = await api.get("/rekap", {
          headers: {
            access_token: sessionStorage.access_token,
          },
        });
        this.rekap = data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  persist: { storage: sessionStorage },
});
