import React from 'react';
import '../../components/FormLogin/FormLogin.css'
//import TableSubjects from "./TableSubjects.jsx"
import Footer from "../../components/Footer/index.jsx";
import TableGrade from './TableGrade.jsx';
import Header from '../../components/Header/index.jsx';


// Calificaciones
const Grade = () => {

    return (
        <div>
            <Header title="Calificaciones - UTEQ" description="Calificaciones UTEQ" />
        <div className="page-container">
            <div className="content-wrap">
           <TableGrade/>
            </div>
            <Footer />
        </div>
        </div>
    )
}
export default Grade