import React from "react";
import { Link } from "react-router-dom";
import { Layout } from "antd";
const { Footer } = Layout;
import "./Footer.css";

const Foot = () => {
    return (
        <Footer className="footer-content">
            <div className="footer-links">
                <Link to="/">Inicio</Link>
                <Link to="/acerca">Acerca de</Link>
                <Link to="/contacto">Contacto</Link>
                <Link to="/privacidad">Política de Privacidad</Link>
            </div>
            <div className="footer-info">
                © 2024 UTEQ. Todos los derechos reservados.
            </div>
        </Footer>
    );
};

export default Foot;
