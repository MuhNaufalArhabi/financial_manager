import axios from "axios";

export const api = axios.create({
    baseURL: 'https://financialmanager-production-5fce.up.railway.app',
})
