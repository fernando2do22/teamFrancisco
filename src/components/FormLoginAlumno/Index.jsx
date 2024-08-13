import React, { useState } from 'react';
import { Button, Form, Input, Card } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import './FormLoginAlumno.css';
import routes from '/src/routes/routes.js';
import authService from '../../services/auth';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const FormLoginAlumno = () => {
    const [loginError, setLoginError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [curpVisible, setCurpVisible] = useState(false); // Estado para visibilidad del campo CURP
    const navigate = useNavigate();
    const useAuthData = useAuth();
    const { login } = useAuthData;

    const onFinish = async (values) => {
        setLoading(true);
        setLoginError(false);

        try {
            const response = await authService.loginFAlumno(values.studentId, values.CURP);
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

    const toggleCurpVisibility = () => {
        setCurpVisible(!curpVisible);
    };

    return (
        <Card
            title="Bienvenido, Alumno!"
            bordered={false}
            className="responsive-card"
            style={{
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
                borderRadius: '8px',
                padding: '20px',
                color: '#fff',
                // backgroundColor: '#2c2c2c' // Fondo oscuro para el tema
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
                    name="studentId"
                    rules={[
                        {
                            required: true,
                            message: "Por favor ingrese su matrícula."
                        }
                    ]}
                >
                    <Input
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="Matrícula"
                    />
                </Form.Item>

                <Form.Item
                    name="CURP"
                    rules={[
                        {
                            required: true,
                            message: "Por favor ingrese su CURP."
                        }
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type={curpVisible ? 'text' : 'password'}
                        placeholder="CURP"
                        suffix={
                            <span onClick={toggleCurpVisibility}>
                                {curpVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                            </span>
                        }
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button docente-button"
                        loading={loading}
                    >
                        Iniciar Sesión
                    </Button>
                </Form.Item>

            </Form>

            <div className="extra-buttons">
                <a
                    href={routes.loginRoute}
                    className="docente-button"
                >
                    Inicio de sesión para docentes
                </a>
            </div>
        </Card>
    );
};

export default FormLoginAlumno;
