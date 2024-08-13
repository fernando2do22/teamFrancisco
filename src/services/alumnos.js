import {storageController} from "./token.js";
import axios from "axios";
import {ENV} from "../utils/constants.js";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Swal from 'sweetalert2';

export const getAlumno = async (id) => {
    try {
        const token = storageController.getToken()
        const response = await axios.get(`${ENV.API_URL}${ENV.ENDPOINTS.SUBJECTS}/${id}`, {
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

// Obtener todos los alumnos
/*export const getAllStudents = async () => {
    try {
        const token = storageController.getToken();
        const response = await axios.get(`${ENV.API_URL}$${ENV.ENDPOINTS.STUDENTS}/students/`, {
            headers: {
                "Content-Type": "application/json",
                "x-access-token": `Bearer ${token}`
            }
        });
        return response.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
};*/

// Obtener todos los alumnos
export const getAllStudents = async () => {
    try {
        const token = storageController.getToken();
        const response = await axios.get(`${ENV.API_URL}${ENV.ENDPOINTS.USERS}/students/`, {
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



//Get Grade
export const getGrade = async (id) => {
    try {
        const token = storageController.getToken()
        const response = await axios.get(`${ENV.API_URL}${ENV.ENDPOINTS.CALIFICACIONES}/${id}`, {
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

export const getSubject = async () => {
    try {
        const token = storageController.getToken()
        const response = await axios.get(`${ENV.API_URL}${ENV.ENDPOINTS.CALIFICACIONES}`, {
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

export const addGrade = async (data) => {
    console.log("Enviando datos para agregar calificación:", data);
    try {
        const token = storageController.getToken();
        const response = await axios.post(`${ENV.API_URL}${ENV.ENDPOINTS.CALIFICACIONES}`, data, {
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            }
        });
        return response.data;
    } catch (e) {
        console.error("Error al agregar calificación:", e);
        throw e;
    }
};













export const generatePDFGrade = (alumno, grades) => {
    if (!alumno) {
        Swal.fire({
            title: "¡Error!",
            text: "No se ha seleccionado un alumno.",
            icon: "error",
        });
        return;
    }

    if (!grades || grades.length === 0) {
        Swal.fire({
            title: "¡Advertencia!",
            text: "No hay calificaciones para generar el PDF.",
            icon: "warning",
        });
        return;
    }

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Reporte de Calificaciones', 14, 22);

    const date = new Date().toLocaleString();
    doc.setFontSize(12);
    doc.text(`Fecha: ${date}`, 14, 32);

    doc.text(`Alumno: ${alumno.name} ${alumno.lastname}`, 14, 42);
    doc.text(`CURP: ${alumno.CURP}`, 14, 52);

    const columns = [
        { header: 'Materia', dataKey: 'name' },
        { header: 'Parcial', dataKey: 'parcial' },
        { header: 'Grado', dataKey: 'grado' },
        { header: 'Calificación', dataKey: 'subject' },
    ];

    const rows = grades.map(grade => ({
        name: grade.grade[0].name,
        parcial: grade.parcial,
        grado: grade.grado,
        subject: grade.subject,
    }));

    doc.autoTable({
        startY: 63,
        head: [columns.map(col => col.header)],
        body: rows.map(row => columns.map(col => row[col.dataKey])),
    });

    doc.save('Reporte_Calificaciones.pdf');

    Swal.fire({
        title: "¡Éxito!",
        text: "El reporte ha sido generado correctamente.",
        icon: "success",
    });
};
