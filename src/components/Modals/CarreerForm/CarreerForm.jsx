import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, notification } from "antd";

const CarrerForm = ({ visible, onCancel, onSave, idCarrer }) => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        if (idCarrer) {
            form.setFieldsValue({
                name: idCarrer.name
            });
        } else {
            form.resetFields();
        }
    }, [idCarrer, form]);

    const onFinishFailed = (errorInfo) => {
        notification.error({
            message: "No se hizo el cambio",
            description: "Por favor, revise los campos ingresados."
        });
    };

    const handleSave = async () => {
        try {
            const values = await form.validateFields();
            onSave(values);
            notification.success({
                message: idCarrer ? "¡Carrera editada correctamente!" : "¡Carrera agregada correctamente!"
            });
            onCancel();
            setLoading(true);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            className={"edit-name-modal"}
            title={idCarrer ? "Editar carrera" : "Añadir carrera"}
            visible={visible}
            onCancel={() => {
                form.resetFields();
                onCancel();
            }}
            footer={[
                <Button key={"cancel"} onClick={() => {
                    form.resetFields();
                    onCancel();
                }}>
                    Cancelar
                </Button>,
                <Button key={"save"} type={"primary"} onClick={handleSave} loading={loading}>
                    Guardar
                </Button>,
            ]}
        >
            <Form
                form={form}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    name={"name"}
                    rules={[
                        {
                            required: true,
                            message: "Por favor ingrese un nombre."
                        }
                    ]}
                >
                    <Input placeholder="Nombre" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CarrerForm;
