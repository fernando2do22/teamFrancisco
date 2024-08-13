import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Input } from "antd";
import { FormEdit } from "./FormEdit.jsx";

const UserForm = ({ visible, onCancel, idUser, onSave }) => {
    const [data, setData] = useState(idUser || null);
    const [form] = Form.useForm();

    useEffect(() => {
        if (idUser) {
            setData(idUser);
            if (idUser.roles !== "alumno") {
                form.setFieldsValue({
                    name: idUser.name,
                    lastname: idUser.lastname,
                    email: idUser.email,
                });
            } else {
                form.setFieldsValue({
                    name: idUser.name,
                    lastname: idUser.lastname,
                    CURP: idUser.CURP,
                });
            }
        } else {
            form.resetFields();
        }
    }, [idUser, form]);

    const handleSave = () => {
        form.validateFields()
            .then(values => {
                const userData = { ...data, ...values };
                onSave(userData);
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    };

    return (
        <Modal
            className={"edit-name-modal"}
            title={data ? "Editar Usuario" : "Agregar Usuario"}
            visible={visible}
            onCancel={() => {
                form.resetFields();
                onCancel();
            }}
            footer={[
                <Button
                    key={"cancel"}
                    onClick={() => {
                        form.resetFields();
                        onCancel();
                    }}
                >
                    Cancelar
                </Button>,
                <Button
                    key={"save"}
                    type={"primary"}
                    onClick={handleSave}
                >
                    Guardar
                </Button>
            ]}
        >
            <div>
                {data?.roles === "alumno" ? (
                    <FormEdit form={form} dataForm={data} />
                ) : (
                    <FormEdit form={form} dataForm={data} />
                )}
            </div>
        </Modal>
    );
};

export default UserForm;
