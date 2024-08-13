import React, { useState } from 'react';
import { Button, Form, Input, Card } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './FormRegister.css';
import routes from '/src/routes/routes.js';
import authService from '../../services/auth.js';
import { validatePassword } from '../../utils/validation.js';

const FormRegister = () => {
    const [registerError, setRegisterError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [messageError, setMessageError] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false); // Estado para visibilidad de contraseña
    const navigate = useNavigate();

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        setRegisterError(true);
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const onFinish = async (values) => {
        setLoading(true);
        setRegisterError(false);
        try {
            await authService.register(values.name, values.lastname, values.email, values.password);
            console.log('Registro exitoso');
            navigate('/');
        } catch (e) {
            console.error('Error en el registro: ', e.response.data);
            setRegisterError(true);
            setMessageError(e.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card
            title="Regístrate para iniciar sesión"
            bordered={false}
            className="responsive-card"
            style={{
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
                borderRadius: '8px',
                padding: '20px',
                color: '#fff'
            }}
        >
            <Form
                name="normal_login"
                className="login_form"
                initialValues={{
                    remember: true
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Por favor ingrese su nombre."
                        }
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Nombre" />
                </Form.Item>

                <Form.Item
                    name="lastname"
                    rules={[
                        {
                            required: true,
                            message: "Por favor ingrese su apellido."
                        }
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Apellido" />
                </Form.Item>

                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Por favor ingrese su correo."
                        }
                    ]}
                >
                    <Input
                        prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Correo electrónico"
                    />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Por favor ingrese su contraseña."
                        }
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type={passwordVisible ? 'text' : 'password'}
                        placeholder="Contraseña"
                        suffix={
                            <span onClick={togglePasswordVisibility}>
                                {passwordVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                            </span>
                        }
                    />
                </Form.Item>

                <Form.Item
                    name="password-repet"
                    rules={[
                        {
                            required: true,
                            message: "Por favor repita su contraseña."
                        },
                        ({ getFieldValue }) => validatePassword({ getFieldValue })
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type={passwordVisible ? 'text' : 'password'}
                        placeholder="Repetir Contraseña"
                        suffix={
                            <span onClick={togglePasswordVisibility}>
                                {passwordVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                            </span>
                        }
                    />
                </Form.Item>

                <Form.Item>
                    {registerError && <p style={{ color: 'red' }}>Falló el registro: {messageError} </p>}
                    <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
                        Registrar
                    </Button>
                </Form.Item>

                Ya tienes tu cuenta <a href={routes.loginRoute}>Inicia sesión</a>
            </Form>
        </Card>
    );
};

export default FormRegister;