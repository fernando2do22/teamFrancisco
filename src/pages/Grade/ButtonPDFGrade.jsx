import React from 'react';
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { generatePDFGrade } from '../../services/alumnos.js';
import Swal from 'sweetalert2';

const ButtonPDFGrade = ({ alumno, grades }) => {
    const handleClick = () => {
        if (!alumno) {
            Swal.fire({
                title: "¡Error!",
                text: "No se ha seleccionado un alumno.",
                icon: "error",
            });
        } else if (!grades || grades.length === 0) {
            Swal.fire({
                title: "¡Advertencia!",
                text: "No hay calificaciones para generar el PDF.",
                icon: "warning",
            });
        } else {
            generatePDFGrade(alumno, grades);
        }
    };

    return (
        <Button
            type="primary"
            icon={<DownloadOutlined />}
            onClick={handleClick}
            style={{ marginLeft: "10px" }}
        >
            Generar PDF
        </Button>
    );
};

export default ButtonPDFGrade;
