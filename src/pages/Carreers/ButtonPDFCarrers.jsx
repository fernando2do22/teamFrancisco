import React from "react";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { generatePDF } from "../../services/carrers";
import Swal from "sweetalert2";
import { usersService } from "../../services/users";
import { useAuth } from "../../hooks/useAuth";

const ButtonPDFCarrers = ({ filteredData, currentUser, currentUserEmail }) => {

    const { user } = useAuth();

    const handleGeneratePDF = async () => {
        try {
            if (!filteredData || filteredData.length === 0) {
                Swal.fire({
                    title: "¡Advertencia!",
                    text: "No hay carreras para generar el PDF.",
                    icon: "warning",
                });
                return;
            }

            const confirmResult = await Swal.fire({
                title: "¿Estás seguro?",
                text: "Se generará un reporte en formato PDF con la lista de carreras filtradas. ¿Deseas continuar?",
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
            console.error("Error generating PDF:", error);
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

export default ButtonPDFCarrers;
