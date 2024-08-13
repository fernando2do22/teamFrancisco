import React from 'react';
import TableCarrers from "./TableCarrers.jsx";
import '../../components/FormLogin/FormLogin.css'
import Footer from "../../components/Footer/index.jsx";
import Header from '../../components/Header/index.jsx';

const Carrers = () => {
    return (
        <div>
            <Header title="Carreras - UTEQ" description="Carreras UTEQ" />
            <div className="page-container">
                <div className="content-wrap">
                    <TableCarrers />
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default Carrers;
