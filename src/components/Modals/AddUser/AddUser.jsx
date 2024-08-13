import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, Button, message } from 'antd';
import axios from 'axios';
import { ENV } from '../../../utils/constants';
import { usersService } from '../../../services/users';

const { Option } = Select;

const AddUser = ({ visible, onClose }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        try {
            const rolesData = await usersService.getRoles();
            setRoles(rolesData.roles);
        } catch (error) {
            console.error('Error fetching roles:', error);
            message.error('Error al obtener roles.');
        }
    };

    const handleFinish = async (values) => {
        setLoading(true);
        try {
            const { role, ...userData } = values;
            const selectedRole = roles.find(r => r._id === role); 
            if (!selectedRole) {
                throw new Error('Rol seleccionado no encontrado.');
            }

            console.log('User data to register:', userData);
            await usersService.addUser({ ...userData, roles: [selectedRole.name] }); 
            message.success('Usuario creado exitosamente.');
            form.resetFields();
            onClose();
        } catch (error) {
            console.error('Error creating user:', error);
            message.error('Error al crear el usuario.');
        }
        setLoading(false);
    };

    return (
        <Modal
            visible={visible}
            title="Nuevo Usuario"
            onCancel={onClose}
            footer={[
                <Button key="back" onClick={onClose}>
                    Cancelar
                </Button>,
                <Button key="submit" type="primary" loading={loading} onClick={() => form.submit()}>
                    Crear
                </Button>,
            ]}
        >
            <Form form={form} onFinish={handleFinish}>
                <Form.Item
                    name="role"
                    label="Rol"
                    rules={[{ required: true, message: 'Por favor, seleccione un rol' }]}
                >
                    <Select placeholder="Seleccione un rol">
                        {roles.map(role => (
                            <Option key={role._id} value={role._id}>
                                {role.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="name"
                    label="Nombre"
                    rules={[{ required: true, message: 'Por favor, ingrese el nombre' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="lastname"
                    label="Apellido"
                    rules={[{ required: true, message: 'Por favor, ingrese el apellido' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="CURP"
                    label="CURP (solo para alumno)"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Correo electrónico (solo para profesor/servicios escolares)"
                >
                    <Input type="email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Contraseña (solo para profesor/servicios escolares)"
                >
                    <Input.Password />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddUser;
