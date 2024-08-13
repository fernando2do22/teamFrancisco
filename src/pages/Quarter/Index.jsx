import React from 'react';
import '../../components/FormLogin/FormLogin.css'
import Footer from "../../components/Footer/index.jsx";
import Header from '../../components/Header/index.jsx';
import TableQuarters from './TableQuarter.jsx';


// Cuatrimestres
const Quarter = () => {

    return (
        <div>
            <Header title="Cuatrimestres - UTEQ" description="Cuatrimestres UTEQ" />
        <div className="page-container">
            <div className="content-wrap">
        <TableQuarters/>
            </div>
            <Footer />
        </div>
        </div>
    )
}
export default Quarter