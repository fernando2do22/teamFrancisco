//import {jwtDecode} from "jwt-decode";
import {ENV} from '../utils/constants';
import { authFetch } from "../utils/authFetch";
import {jwtDecode} from "jwt-decode";
import { storageController } from './token';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const getMe = async (token) => {
    try{
        console.log(token);
        const decoded = jwtDecode(token)
        const userId = decoded.id
        const url = `${ENV.API_URL}${ENV.ENDPOINTS.USERS}/${userId}`
        const response = await  authFetch(url)
        return await response.json()
    }catch(error){
        console.log(error);
    }
}

const addUser = async (userData) => {
    try {
        const token = await storageController.getToken();
        const url = `${ENV.API_URL}${ENV.ENDPOINTS.USERS}`;
        console.log('Sending user data:', userData);
        const response = await axios.post(url, userData, {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token,
            },
        });
        console.log('Response from API:', response);
        return response.data;
    } catch (error) {
        console.error('Error in addUser:', error);
        throw error;
    }
};





export const getRoles = async () => {
    try {
        const url = `${ENV.API_URL}${ENV.ENDPOINTS.ROLES_USERS}`;
        console.log(`Fetching roles from ${url}`);
        const response = await authFetch(url);
        if (!response.ok) {
            throw new Error(`Error fetching roles: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Roles fetched successfully:', data);
        return data;
    } catch (error) {
        console.error('Error in getRoles:', error);
        throw error;
    }
};

export const deleteUser = async (id) => {
    try {
        const token = storageController.getToken()
        const response = await axios.delete(`${ENV.API_URL}${ENV.ENDPOINTS.USERS}/${id}`, {
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

export const getUsers = async () => {
    try {
        const token = await storageController.getToken();
        const url = `${ENV.API_URL}${ENV.ENDPOINTS.USERS}`;
        const response = await axios.get(url, {
            headers: {
                'x-access-token': token,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

const generatePDF = (users, currentUser, currentUserEmail) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Reporte de Usuarios', 14, 22);

    const date = new Date().toLocaleString();
    doc.setFontSize(12);
    doc.text(`Fecha: ${date}`, 14, 32);

    doc.text(`Autor: ${currentUser} (${currentUserEmail})`, 14, 42);

    const columns = [
        { header: 'Nombre', dataKey: 'name' },
        { header: 'Apellido', dataKey: 'lastname' },
        { header: 'Email', dataKey: 'email' },
        { header: 'Rol', dataKey: 'roles' }
    ];

    const rows = users.map(user => ({
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        roles: user.roles.map(role => role.name).join(', ')
    }));

    doc.autoTable({
        startY: 53,
        head: [columns.map(col => col.header)],
        body: rows.map(row => columns.map(col => row[col.dataKey]))
    });

    doc.save('Reporte_Usuarios.pdf');
};

const uploadAvatar = async (avatarUrl) => {
    try {
        const token = await storageController.getToken(); // Obtener el token
        const url = `${ENV.API_URL}${ENV.ENDPOINTS.AVATAR}`;
        const data = { url: avatarUrl };
        const response = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error in uploadAvatar:', error.response || error.message || error);
        throw error;
    }
};


  export const usersService = {
      getMe,
      addUser,
      getRoles,
      deleteUser,
      getUsers,
      generatePDF,
      uploadAvatar
  };
