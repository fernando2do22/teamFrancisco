import axios from "axios";
import { ENV } from "/src/utils/constants.js";

const register = async (name, lastname, email, password) => {
    return axios.post(`${ENV.API_URL}${ENV.ENDPOINTS.REGISTER}`, {
        name,
        lastname,
        email,
        password,
        roles: ["servicios_escolares"]
    }, {
        headers: {
            "x-access-token": ENV.STORAGE.TOKEN
        }
    })
}

const loginF = async (email, password) => {
    return axios.post(`${ENV.API_URL}${ENV.ENDPOINTS.LOGIN}`, {
        email,
        password
    })
}

const loginFAlumno = async (studentId, curp) => {
    return axios.post(`${ENV.API_URL}${ENV.ENDPOINTS.LOGIN}`, {
        studentId,
        CURP: curp
    })
};

export default {
    register,
    loginF,
    loginFAlumno
}