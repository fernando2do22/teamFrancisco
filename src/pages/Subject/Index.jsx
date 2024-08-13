import React from 'react';
import '../../components/FormLogin/FormLogin.css'
import TableSubjects from "./TableSubjects.jsx"
import Footer from "../../components/Footer/index.jsx";
import Header from '../../components/Header/index.jsx';

// home
const Subjects = () => {

    return (
        <div>
            <Header title="Materias - UTEQ" description="Calificaciones UTEQ" />
        <div className="page-container">
            <div className="content-wrap">
            <TableSubjects />
            </div>
            <Footer />
        </div>
        </div>
    )
}
export default Subjects