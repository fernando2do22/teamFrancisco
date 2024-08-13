import React from 'react';
import LayoutComponent from "../../components/Layout/LayoutComponent.jsx";
import ImageButton from "../../components/ImageButton/Index.jsx";
import FormLoginAlumno from "../../components/FormLoginAlumno/Index.jsx";

const Register = () => {
    return (
        <LayoutComponent
            leftColSize={{ xs: 24, sm: 12, md: 8, lg: 6 }}
            rightColSize={{ xs: 24, sm: 12, md: 16, lg: 18 }}
            leftContent={<ImageButton />}
            rightContent={<FormLoginAlumno />}
        />
    );
};

export default Register;