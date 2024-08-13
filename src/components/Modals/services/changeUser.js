import axios from "axios";
import { ENV } from "/src/utils/constants.js";
import {jwtDecode} from "jwt-decode";

export const changeUser = async (name, lastname) => {
    const roles = ["servicios_escolares"]
    const tokenDec = localStorage.getItem("token")
    const decoded = jwtDecode(tokenDec)
    const id = decoded.id

    return axios.put(`${ENV.API_URL}${ENV.ENDPOINTS.USERS}/${id}`, {
        name,
        lastname,
        roles
    }, {
        headers: {
            "x-access-token": tokenDec
        }
    })
}

export default {
    changeUser
}