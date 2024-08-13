import {storageController} from "./token.js";
import axios from "axios";
import {ENV} from "../utils/constants.js";

export const getTeachers = async () => {
    try {
        const token = storageController.getToken()
        const response = await axios.get(`${ENV.API_URL}${ENV.ENDPOINTS.USERS}${ENV.ENDPOINTS.TEACHERS}`, {
            headers: {
                "x-access-token": token
            }
        })
        return response.data
    } catch (e) {
        console.error(e)
        throw e
    }
}