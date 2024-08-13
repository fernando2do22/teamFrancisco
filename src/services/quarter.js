import axios from "axios";
import { ENV } from "../utils/constants.js";
import {storageController} from "./token.js";


export const getQuarters= async () => {
    try {
        const token = storageController.getToken();
        const response = await axios.get(`${ENV.API_URL}${ENV.ENDPOINTS.QUARTER}`, {
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            }
        });
        return response.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
};

export const addQuarter = async (data) => {
    try {
        const token = storageController.getToken();
        const response = await axios.post(
            `${ENV.API_URL}${ENV.ENDPOINTS.QUARTER}`,
            data,
            {
                headers: {
                    "x-access-token": token
                }
            }
        );
        return response.data;
    } catch (e) {
        console.error("Error al añadir el cuatrimestre:", e.response ? e.response.data : e.message);
        throw e;
    }
};


export const editQuarter = async (id, data) => {
    try {
        const token = storageController.getToken();
        const response = await axios.put(`${ENV.API_URL}${ENV.ENDPOINTS.QUARTER}/${id}`, 
            data,
            {
                headers: {
                    "x-access-token": token
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error al editar el cuatrimestre: ', error);
        throw error;
    }
};



export const deleteQuarter = async (id) => {
    try {
        const token = storageController.getToken();
        const response = await axios.delete(`${ENV.API_URL}${ENV.ENDPOINTS.QUARTER}/${id}`, {
            headers: {
                "x-access-token": token
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error al eliminar: ', error);
        throw error;
    }
};
