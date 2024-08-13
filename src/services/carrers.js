import axios from "axios";
import { ENV } from "../utils/constants.js";
import {storageController} from "./token.js";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const generatePDF = (carrers, currentUser, currentUserEmail) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Reporte de Carreras', 14, 22);

    const date = new Date().toLocaleString();
    doc.setFontSize(12);
    doc.text(`Fecha: ${date}`, 14, 32);

    doc.text(`Autor: ${currentUser} (${currentUserEmail})`, 14, 42);

    const columns = [
        { header: 'Nombre', dataKey: 'name' },
    ];

    const rows = carrers.map(carrer => ({
        name: carrer.name,
    }));

    doc.autoTable({
        startY: 53,
        head: [columns.map(col => col.header)],
        body: rows.map(row => columns.map(col => row[col.dataKey]))
    });

    doc.save('Reporte_Carreras.pdf');
};

export const getCarres = async () => {
    try {
        const response = await axios.get(`${ENV.API_URL}${ENV.ENDPOINTS.CARRERS}`);
        return response.data;
    } catch (e) {
        console.log('Error al obtener las carreras: ', e);
        throw e;
    }
}

export const addCarrer = async (name) => {
    try {
        const token = storageController.getToken();
        const response = await axios.post(`${ENV.API_URL}${ENV.ENDPOINTS.CARRERS}`, {
            name
        }, {
            headers: {
                "x-access-token": token
            }
        });
        return response.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
};

export const editCarrer = async (id, newName) => {
    try {
        const token = storageController.getToken();
        const response = await axios.put(`${ENV.API_URL}${ENV.ENDPOINTS.CARRERS}/${id}`, {
            name: newName
        }, {
            headers: {
                "x-access-token": token
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error al editar la carrera: ', error);
        throw error;
    }
};

export const deleteCarrer = async (id) => {
    try {
        const token = storageController.getToken();
        const response = await axios.delete(`${ENV.API_URL}${ENV.ENDPOINTS.CARRERS}/${id}`, {
            headers: {
                "x-access-token": token
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error al eliminar la carrera: ', error);
        throw error;
    }
};

export const getInfoCarrers = async (id) => {
    try {
        const token = storageController.getToken();
        const response = await axios.get(`${ENV.API_URL}${ENV.ENDPOINTS.CARRERSINFO}/${id}`, {
            headers: {
                "x-access-token": token
            }
        });
        return response.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export default {
    getCarres,
    addCarrer,
    editCarrer,
    deleteCarrer,
    getInfoCarrers,
    generatePDF
};