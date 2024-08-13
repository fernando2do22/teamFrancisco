import axios from "axios";
import { ENV } from "../utils/constants.js";
import {storageController} from "./token.js";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
export const getSubjects = async () => {
    try {
        const tokenDec = localStorage.getItem("token")
        const response = await axios.get(`${ENV.API_URL}${ENV.ENDPOINTS.SUBJECTS}`, {
            headers: {
                "x-access-token": tokenDec
            }
        })
        return response.data
    } catch (e) {
        console.log('Error al obtener las materias: ', e)
        throw e
    }
}

export const getSubject = async (id) => {
    try {
        const tokenDec = localStorage.getItem("token")
        const response = await axios.get(`${ENV.API_URL}${ENV.ENDPOINTS.SUBJECTS}/${id}`, {
            headers: {
                "x-access-token": tokenDec
            }
        })
        return response.data
    } catch (e) {
        console.log('Error al obtener las materias: ', e)
        throw e
    }
}

export const addSubject = async (name, professor, career) => {
    try {
        const token = storageController.getToken();

        // Validar que los campos no estén vacíos
        if (!name || !professor || !career) {
            throw new Error('Todos los campos son obligatorios.');
        }

        // Validar que el ID de la carrera sea un valor válido (ajusta esto según tu lógica de validación)
        if (!Array.isArray(career) || career.some(id => typeof id !== 'string')) {
            throw new Error('El ID de la carrera no es válido.');
        }

        console.log('Request data:', { name, professor, career });

        const response = await axios.post(`${ENV.API_URL}${ENV.ENDPOINTS.SUBJECTS}`, {
            name,
            professor,
            career
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



export const editSubject = async (id, name, professor = [], career = []) => {
    try {
        const token = storageController.getToken();
        const response = await axios.put(`${ENV.API_URL}${ENV.ENDPOINTS.SUBJECTS}/${id}`, {
            name,
            professor,
            career
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
}


export const deleteSubject = async (id) => {
    try {
        const token = storageController.getToken()
        const response = await axios.delete(`${ENV.API_URL}${ENV.ENDPOINTS.SUBJECTS}/${id}`, {
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

export const generatePDF = (subjects, currentUser, currentUserEmail) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Reporte de Materias', 14, 22);

    const date = new Date().toLocaleString();
    doc.setFontSize(12);
    doc.text(`Fecha: ${date}`, 14, 32);

    doc.text(`Autor: ${currentUser} (${currentUserEmail})`, 14, 42);

    const columns = [
        { header: 'Nombre', dataKey: 'name' },
        { header: 'Profesor', dataKey: 'professor' },
        { header: 'Carrera', dataKey: 'career' }
    ];

    const rows = subjects.map(subject => ({
        name: subject.name,
        professor: subject.professor.map(prof => `${prof.name} ${prof.lastname}`).join(', '),
        career: subject.career.map(carr => carr.name).join(', ')
    }));

    doc.autoTable({
        startY: 53,
        head: [columns.map(col => col.header)],
        body: rows.map(row => columns.map(col => row[col.dataKey]))
    });

    doc.save('Reporte_Materias.pdf');
};

export default {
    getSubjects,
    addSubject,
    getSubject,
    editSubject,
    deleteSubject,
    generatePDF
}