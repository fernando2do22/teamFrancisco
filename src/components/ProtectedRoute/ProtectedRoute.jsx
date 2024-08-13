
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user } = useAuth();

    if (!user || !user[0] || !user[0].roles) {
        // Si el usuario no está autenticado, redirigir al login
        return <Navigate to="/login" replace />;
    }

    const userRoles = user[0].roles.map(role => role.name);

    const hasPermission = allowedRoles.some(role => userRoles.includes(role));

    if (!hasPermission) {
        // Si el usuario no tiene los permisos necesarios, redirigir a una página no autorizada
        return <Navigate to="/unauthorized" replace />;
    }

    // Si el usuario tiene los permisos necesarios, renderizar el componente hijo
    return children;
};

export default ProtectedRoute;
