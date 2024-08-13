import React from "react";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { generatePDF } from "../../services/subjects";
import Swal from "sweetalert2";
import { useAuth } from "../../hooks/useAuth";

const ButtonPDFSubjects = ({ filteredData }) => {
    const { user } = useAuth();

    
    const handleGeneratePDF = async () => {
        try {
            if (!filteredData || filteredData.length === 0) {
                Swal.fire({
                    title: "¡Advertencia!",
                    text: "No hay materias para generar el PDF.",
                    icon: "warning",
                });
                return;
            }

            const confirmResult = await Swal.fire({
                title: "¿Estás seguro?",
                text: "Se generará un reporte en formato PDF con la lista de materias filtradas. ¿Deseas continuar?",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Generar PDF",
                cancelButtonText: "Cancelar",
            });

            if (confirmResult.isConfirmed) {
                const currentUser = `${user[0].name} ${user[0].lastname}`;
                const currentUserEmail = user[0].email;
                await generatePDF(filteredData, currentUser, currentUserEmail);
                Swal.fire({
                    title: "¡PDF generado!",
                    text: "El reporte en formato PDF ha sido generado exitosamente.",
                    icon: "success",
                });
            }
        } catch (error) {
            console.error("Error al generar el PDF:", error);
            Swal.fire({
                title: "Error",
                text: "Hubo un error al generar el PDF. Por favor, inténtalo de nuevo más tarde.",
                icon: "error",
            });
        }
    };

    return (
        <Button
            type="primary"
            icon={<DownloadOutlined />}
            onClick={handleGeneratePDF}
            style={{ marginLeft: "10px" }}
        >
            Generar PDF
        </Button>
    );
};

export default ButtonPDFSubjects;

