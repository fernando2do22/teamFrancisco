import React from 'react';
import LayoutComponent from "../../components/Layout/LayoutComponent.jsx";
import ImageButton from "../../components/ImageButton/Index.jsx";
import FormRegister from "../../components/FormRegister/Index.jsx";
import Header from '../../components/Header/index.jsx';


const Register = () => {
    return (
        <div>
            <Header title="Registrate - UTEQ" description="Registro UTEQ" />
        <LayoutComponent
            leftColSize={{ xs: 24, sm: 12, md: 8, lg: 6 }}
            rightColSize={{ xs: 24, sm: 12, md: 16, lg: 18 }}
            leftContent={<ImageButton />}
            rightContent={<FormRegister />}
           
        />
         </div>
    );
};

export default Register;
