import { Button, Form, Input, Modal, notification } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { validatePassword } from "../../../utils/validation.js";
import React, { useState } from "react";
import { changePass } from "../../../services/changePass.js";

const ChangePass = ({ visible, onCancel }) => {
    const [registerError, setRegisterError] = useState(false);
    const [messageError, setMessageError] = useState('');
    const [loading, setLoading] = useState(false);

    const [form] = Form.useForm();

    const onFinishFailed = (errorInfo) => {
        setRegisterError(true);
        notification.error({
            message: "No se hizo el cambio",
            description: "Por favor, revise los campos ingresados."
        });
    };

    const handleSave = async () => {
        try {
            const values = await form.validateFields();
            setLoading(true);
            await changePass(values.password);
            notification.success({
                message: "Contraseña actualizada correctamente"
            });
            onCancel();
            form.resetFields();
        } catch (errorInfo) {
            console.error('Failed:', errorInfo);
            setRegisterError(true);
            setMessageError(errorInfo.response?.data?.message || 'Ocurrió un error al actualizar la contraseña.');
            notification.error({
                message: "No se hizo el cambio",
                description: messageError
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            className={"edit-name-modal"}
            title={"Cambiar Contraseña"}
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
            <div style={{ marginBottom: 16 }}>
                <Form
                    form={form}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        name={"password"}
                        rules={[
                            {
                                required: true,
                                message: "Por favor ingrese su contraseña."
                            }
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className={"site-form-item-icon"} />}
                            type="password"
                            placeholder="Contraseña"
                        />
                    </Form.Item>

                    <Form.Item
                        name={"password-repet"}
                        rules={[
                            {
                                required: true,
                                message: "Por favor repita su contraseña."
                            },
                            ({ getFieldValue }) => validatePassword({ getFieldValue })
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className={"site-form-item-icon"} />}
                            type="password"
                            placeholder="Repetir Contraseña"
                        />
                    </Form.Item>

                    {registerError && <p style={{ color: 'red' }}>Falló el registro: {messageError} </p>}
                </Form>
            </div>
        </Modal>
    );
};

export default ChangePass;
