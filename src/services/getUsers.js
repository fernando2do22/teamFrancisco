import {storageController} from "./token.js";
import axios from "axios";
import {ENV} from "../utils/constants.js";

export const getUsers = async () => {
    try {
        const token = storageController.getToken()
        const response = await axios.get(`${ENV.API_URL}${ENV.ENDPOINTS.USERS}`, {
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

export const getUser = async (id) => {
    try {
        const token = storageController.getToken()
        const response = await axios.get(`${ENV.API_URL}${ENV.ENDPOINTS.USERS}/${id}`, {
            headers: {
                "x-access-token": token
            },
        })
        return response.data
    } catch (e) {
        console.error(e)
        throw e
    }
}

export const editUser = async (userId, userData) => {
    try {
        const token = await storageController.getToken();
        const url = `${ENV.API_URL}${ENV.ENDPOINTS.USERS}/${userId}`;
        console.log('Sending user data for editing:', userData);
        const response = await axios.put(url, userData, {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token,
            },
        });
        console.log('Response from API:', response);
        return response.data;
    } catch (error) {
        console.error('Error in editUser:', error);
        throw error;
        
    }
};