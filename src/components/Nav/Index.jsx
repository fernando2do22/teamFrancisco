import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Layout, Menu, Typography } from "antd";
import Logo from "../Logo/index.jsx";
import DrawerComponent from "../Drawer/Index.jsx";
import "./Nav.css";
import { useAuth } from "../../hooks/useAuth.js";

const { Header } = Layout;
const { Text } = Typography;

const Nav = () => {
    const location = useLocation();
    const { user } = useAuth();

    const tabs = [
        { key: "home", label: "Inicio", url: "/", allowedRoles: ['alumno', 'profesor', 'servicios_escolares'] },
        { key: "carreras", label: "Carreras", url: "/carreras", allowedRoles: ['servicios_escolares'] },
        { key: "materias", label: "Materias", url: "/materias", allowedRoles: ['servicios_escolares'] },
        { key: "usuarios", label: "Usuarios", url: "/usuarios", allowedRoles: [ 'servicios_escolares'] },
        { key: "estadisticas", label: "Estadisticas", url: "/estadisticas", allowedRoles: [ 'servicios_escolares'] },
        { key: "calificaciones", label: "Calificaciones", url: "/calificaciones", allowedRoles: ['profesor','alumno'] },
        { key: "cuatrimestres", label: "Cuatrimestres", url: "/quarter", allowedRoles: ['servicios_escolares'] },
    ];

    const hasRole = (roles) => {
        if (!user || !user[0] || !user[0].roles) {
            return false;
        }
        const userRoles = user[0].roles.map(role => role.name);
        return roles.some(role => userRoles.includes(role));
    };

    const visibleTabs = tabs.filter(tab => hasRole(tab.allowedRoles));

    const selectedKey = visibleTabs.find(tab => location.pathname === tab.url)?.key;

    return (
        <Header className="header-content">
            <Link to="/">
                <Logo />
            </Link>
            <Menu
                theme="light"
                mode="horizontal"
                selectedKeys={[selectedKey]}
                className="menu-items" // Clase para estilos específicos del menú
            >
                {visibleTabs.map(tab => (
                    <Menu.Item key={tab.key}>
                        <Link to={tab.url}>{tab.label}</Link>
                    </Menu.Item>
                ))}
            </Menu>
            <DrawerComponent />
            {user ? (
                <Text className="user-name" style={{ marginRight: '25px', color: '#fff' }}>
                    {user[0].name} {/* Mostrar nombre del usuario */}
                </Text>
            ) : null}
        </Header>
    );
};


export default Nav;
