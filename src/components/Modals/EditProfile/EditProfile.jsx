import { Button, Input, Modal, notification } from "antd";
import {useEffect, useState} from "react";
import { validateFullName } from "./validation.js";

const EditProfile = ({ visible, name, lastName, onCancel, onSave }) => {
    const [editedName, setEditedName] = useState(name);
    const [editedLastName, setEditedLastName] = useState(lastName);
    const [errorsAlert, setErrorsAlert] = useState(false);
    const [errors, setErrors] = useState("");

    useEffect(() => {
        if (name, lastName) {
            setEditedName(name);
            setEditedLastName(lastName)
        }
    }, [name, lastName]);

    const handleSave = () => {
        try {
            // Función para las validaciones
            if (!validateFullName(editedName, editedLastName)) {
                // Mostrar mensaje de error si el nombre no es válido
                setErrors("Por favor ingrese un nombre válido sin números ni caracteres especiales, excepto la letra 'ñ' y acentos.");
                setErrorsAlert(true);
                notification.error({
                    message: "No se hizo el cambio",
                    description: "Por favor ingrese un nombre válido sin números ni caracteres especiales, excepto la letra 'ñ' y acentos."
                });
                return;
            }

            onSave(editedName, editedLastName);
            onCancel();
            notification.success({
                message: "Usuario editado correctamente!"
            });

            setErrors("");
            setErrorsAlert(false);

        } catch (error) {
            notification.error({
                message: "No se hizo el cambio",
                description: "Ocurrió un error al guardar los cambios."
            });
        }
    };

    return (
        <Modal
            className={"edit-name-modal"}
            title={"Editar Nombre"}
            visible={visible}
            onCancel={onCancel}
            footer={[
                <Button key={"cancel"} onClick={onCancel}>
                    Cancelar
                </Button>,
                <Button key={"save"} type={"primary"} onClick={handleSave}>
                    Guardar
                </Button>,
            ]}
        >
            <div style={{ marginBottom: 16 }}>
                {errorsAlert ? (
                    <div style={{ color: "red", marginBottom: 12 }}>
                        {errors}
                    </div>
                ) : null}
                <Input
                    value={editedName.toString()}
                    onChange={(e) => setEditedName(e.target.value)}
                    placeholder="Ingrese el nombre(s)"
                    style={{ marginBottom: 12 }}
                />
                <Input
                    value={editedLastName}
                    onChange={(e) => setEditedLastName(e.target.value)}
                    placeholder="Ingrese los apellidos"
                />
            </div>
        </Modal>
    );
}

export default EditProfile;
