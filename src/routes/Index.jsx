import React from "react";
import { useRoutes } from "react-router-dom";
import Login from "../pages/Login/Index.jsx";
import Home from "../pages/Home/Index.jsx";
import Register from "../pages/Register/Index.jsx";
import { useAuth } from "../hooks/useAuth.js";
import Carrers from "../pages/Carreers/Index.jsx";
import Statistics from "../pages/Statistics/Index.jsx";
import Subjects from "../pages/Subject/Index.jsx";
import Users from "../pages/Users/Index.jsx";
import LoginAlumno from "../pages/LoginAlumno/Index.jsx";
import Grade from "../pages/Grade/Index.jsx";
import Unauthorized from "../pages/Unauthorized/Index.jsx"; 
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute.jsx"; 
import Inicio from "../pages/Inicio/Index.jsx";
import Quarter from "../pages/Quarter/Index.jsx";

const AppRoutes = () => {
    const { user } = useAuth();
    let routes = useRoutes([
        { path: '/', element: user ? <Home /> : <Inicio /> },
        { path: '/carreras', element: <Carrers /> },
        { path: '/materias', element: user ? <Subjects /> : <Login /> },
        { path: '/estadisticas', element: user ? <Statistics /> : <Login /> },
        { path: '/login', element: user ? <Home /> : <Login /> },
        
        {
            path: '/usuarios',
            element: (
                <ProtectedRoute allowedRoles={['servicios_escolares']}>
                    
                    <Users />
                </ProtectedRoute>
            )
        },
        {
            path: '/quarter', 
            element: (
                <ProtectedRoute allowedRoles={['servicios_escolares']}>
                    <Quarter />
                </ProtectedRoute>
            )
        },
        { path: '/login', element: <Login /> },
        { path: '/loginAlumno', element: <LoginAlumno /> },
        { path: '/register', element: <Register /> },
        {
            path: '/calificaciones',
            element: (
                <ProtectedRoute allowedRoles={['profesor','alumno']}>
                    <Grade />
                </ProtectedRoute>
            )
        },
        { path: '/unauthorized', element: <Unauthorized /> }
    ]);
    return routes;
}

export default AppRoutes;