import axios from "axios";
import { ENV } from "/src/utils/constants.js";
import {jwtDecode} from "jwt-decode";
import {storageController} from "./token.js";

export const changeUser = async (name, lastname) => {
    try {
        const roles = ["servicios_escolares"]
        const tokenDec = storageController.getToken()
        console.log(tokenDec)
        const decoded = jwtDecode(tokenDec)
        const id = decoded.id

        const response = await axios.put(`${ENV.API_URL}${ENV.ENDPOINTS.USERS}/${id}`, {
            name,
            lastname,
            roles
        }, {
            headers: {
                "x-access-token": tokenDec
            }
        })
        return response.data.user
    } catch (e) {
        console.log(e)
        throw e
    }
}

export default {
    changeUser
}