import axios from "axios";
import {ENV} from "../utils/constants.js";

export const changePass = async (password) => {
    const tokenDec = localStorage.getItem("token")

    return axios.post(`${ENV.API_URL}${ENV.ENDPOINTS.USERS}/reset-password-token`, {
        password
    }, {
        headers: {
            "x-access-token": tokenDec
        }
    })
}

export default {
    changePass
}