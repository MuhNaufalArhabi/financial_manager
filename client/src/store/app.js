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
      baseUrl: "http://localhost:3000",
      isLogin: false,
      updateTrans: false,
      rekap: [],
      defaultPage: true,
      pageStatus: false,
      categoryPage: false,
      updateAccount: false,
      accountName: ''
    };
  },
  actions: {
    async getTransaction() {
      try {
        const { data } = await api.get('/transaction', {
          params: {
            date: this.date
          },
          headers: {
            access_token: sessionStorage.access_token
          }
        })
        this.transactions = data;
      } catch (error) {
        console.log(error);
      }
    },
    async getAccount() {
      try {
        const { data } = await axios({
          method: "GET",
          url: this.baseUrl + "/accounts",
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
        const { data } = await axios({
          method: "GET",
          url: this.baseUrl + "/categories",
          headers: {
            access_token: sessionStorage.access_token,
          },
        });
        this.categories = data;
      } catch (error) {
        console.log(error);
      }
    },
    async getRekap(){
      try {
        const { data } = await api.get('/rekap', {
          headers: {
            access_token: sessionStorage.access_token
          }
        })
        this.rekap = data
      } catch (error) {
        console.log(error)
      }
    }
  },
  getters: {
    formatNumber: ()=> (num)=> {
      return num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
    }
  },
  persist: { storage: sessionStorage },
});
