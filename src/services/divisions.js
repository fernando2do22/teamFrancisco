import axios from 'axios';
import { ENV } from "../utils/constants.js";

export const getDivisions = async () => {
    try {
        const response = await axios.get(`${ENV.API_URL}${ENV.ENDPOINTS.DIVISIONS}`);
        return response.data;
    } catch (e) {
        console.log('Error al obtener las divisiones: ', e);
        throw e;
    }
}

export default getDivisions;
