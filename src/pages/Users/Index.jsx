import TableUsers from "./TableUsers.jsx";
import Footer from "../../components/Footer/index.jsx";
import React from "react";
import Header from '../../components/Header/index.jsx';


const Users = () => {

    return (
        <div>
            <Header title="Usuarios - UTEQ" description="Registro UTEQ" />
        <div className="page-container">
            <div className="content-wrap">
                <TableUsers />
            </div>
            <Footer/>
        </div>
         </div>
    )
}
export default Users