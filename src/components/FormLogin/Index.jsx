import React, { useState } from 'react';
import { Button, Form, Input, Card } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import './FormLogin.css';
import routes from '/src/routes/routes.js';
import authService from '/src/services/auth.js';
import { useAuth } from '/src/hooks/useAuth.js';
import { useNavigate } from 'react-router-dom';

const FormLogin = () => {
    const [loginError, setLoginError] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const useAuthData = useAuth();
    const { login } = useAuthData;

    const onFinish = async (values) => {
        setLoading(true);
        setLoginError(false);
    
        try {
            const response = await authService.loginF(values.email, values.password);
            if (response && response.data) {
                localStorage.setItem('token', response.data.token);
                login(response.data.token);
                navigate('/');
            } else {
                console.error("Error en el inicio de sesión: Respuesta inesperada");
                setLoginError(true);
            }
        } catch (e) {
            console.error("Error en el inicio de sesión: " + (e.response ? e.response.data : e.message));
            setLoginError(true);
        } finally {
            setLoading(false);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        setLoginError(true);
    };

    const [passwordVisible, setPasswordVisible] = useState(false); // Estado para visibilidad de contraseña

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <Card
            title="Bienvenido de nuevo"
            bordered={false}
            className="responsive-card"
            style={{
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
                borderRadius: '8px',
                padding: '20px',
                color: '#fff'
            }}
        >
            {loginError && <p style={{ color: 'red' }}>Credenciales incorrectas. Inténtalo de nuevo.</p>}
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
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Por favor ingrese su correo."
                        }
                    ]}
                >
                    <Input
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="Correo electrónico"
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
                        placeholder="Contraseña"
                        suffix={
                            <span onClick={togglePasswordVisibility}>
                                {passwordVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                            </span>
                        }
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
                        Iniciar Sesión
                    </Button>
                    <a href={routes.loginAlumno}>Soy un alumno</a>
                </Form.Item>
                
                <div className="login-links">
                   
                    <a href={routes.registerRoute}>Regístrate</a>
                </div>
               
                
            </Form>
        </Card>
    );
};

export default FormLogin;
