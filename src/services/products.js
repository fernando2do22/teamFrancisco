import axios from "axios";
import { ENV } from "../utils/constants.js";

export const getProducts = async () => {
    try {
        const response = await axios.get(`${ENV.API_URL}${ENV.ENDPOINTS.CARRERS}`)
        return response.data
    } catch (e) {
        console.log('Error al obtener las carreras: ', e)
        throw e
    }
}