import React, { useEffect, useState } from "react";
import { Drawer, Avatar, Button } from "antd";
import { FormOutlined, MailOutlined, UserOutlined, CalendarOutlined, SafetyOutlined } from "@ant-design/icons";
import "./Drawer.css";
import { useAuth } from "../../hooks/useAuth.js";
import EditProfile from "../Modals/EditProfile/EditProfile.jsx";
import { changeUser } from "../../services/changeUser.js";
import ChangePass from "../Modals/ChangePass/ChangePass.jsx"
import AvatarModal from "../Modals/Avatar/AvatarModal.jsx";

const DrawerComponent = () => {
    const [open, setOpen] = useState(false);
    const { user, logout } = useAuth();
    const [editName, setEditName] = useState("");
    const [editLastName, setEditLastName] = useState("");
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editModalVisiblePass, setEditModalVisiblePass] = useState(false);
    const [avatarModalVisible, setAvatarModalVisible] = useState(false); // Estado para controlar el modal de avatar

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (!user) {
            return;
        }
        setEditName(user[0].name);
        setEditLastName(user[0].lastname);
    }, [user]);

    const toggleEditModal = () => {
        setEditModalVisible(!editModalVisible);
    };

    const toggleChangePass = () => {
        setEditModalVisiblePass(!editModalVisiblePass);
    };

    const toggleAvatarModal = () => {
        setAvatarModalVisible(!avatarModalVisible); // Función para abrir/cerrar el modal de avatar
    };

    const handleSaveEditedName = async (newName, newLastName) => {
        setEditModalVisible(false);
        try {
            const data = await changeUser(newName, newLastName);
            setEditName(data.name);
            setEditLastName(data.lastname);
        } catch (error) {
            console.log(error);
        }
    };

    const handleAvatarSave = () => {
        toggleAvatarModal(); // Cierra el modal de avatar
        // Actualizar la vista del avatar aquí si es necesario
    };

    const defaultAvatar = "https://cdn3d.iconscout.com/3d/premium/thumb/boy-avatar-6299533-5187865.png?f=webp";

    const signIn = () => {
        if (user) {
            return (
                <Avatar
                    src={user[0].avatar || defaultAvatar}
                    onClick={showDrawer}
                    size={44}
                    style={{ backgroundColor: "#004AAD", cursor: "pointer" }}
                    icon={<UserOutlined />}
                />
            );
        } else {
            return (
                <Button type="primary" href="/login">
                    Iniciar Sesión
                </Button>
            );
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <>
            {signIn()}
            <Drawer title="Mi Perfil" onClose={onClose} open={open} height="auto">
                {user ? (
                    <div className="drawer-content">
                        <div className="drawer-avatar">
                            <Avatar size={64} src={user[0].avatar || defaultAvatar} />
                        </div>
                        <Button type="primary" onClick={toggleAvatarModal} className="edit-avatar-button">
                            Editar Imagen
                        </Button> {/* Botón de editar imagen debajo del avatar */}
                        {user[0].roles.some(role => role.name === 'alumno') ? (
                            <div className="drawer-item">
                                <UserOutlined className="drawer-icon" />
                                <div className="drawer-text-container">
                                    <span className="drawer-text">Matrícula:</span>
                                    <span className="drawer-value">{user[0].studentId}</span>
                                </div>
                            </div>
                        ) : (
                            <div className="drawer-item">
                                <MailOutlined className="drawer-icon" />
                                <div className="drawer-text-container">
                                    <span className="drawer-text">Correo:</span>
                                    <span className="drawer-value">{user[0].email}</span>
                                </div>
                            </div>
                        )}
                        <div className="drawer-item">
                            <UserOutlined className="drawer-icon" />
                            <div className="drawer-text-container">
                                <span className="drawer-text">Nombre:</span>
                                <span className="drawer-value">{editName.toUpperCase()} {editLastName.toUpperCase()}</span>
                            </div>
                            <Button type="primary" onClick={toggleEditModal} className="edit-button">
                                <FormOutlined /> Editar
                            </Button>
                        </div>
                        <div className="drawer-item">
                            <CalendarOutlined className="drawer-icon" />
                            <div className="drawer-text-container">
                                <span className="drawer-text">Cuenta creada el:</span>
                                <span className="drawer-value">{formatDate(user[0].createdAt)}</span>
                            </div>
                        </div>
                        <div className="drawer-item">
                            <SafetyOutlined className="drawer-icon" />
                            <div className="drawer-text-container">
                                <span className="drawer-text">Roles:</span>
                                <span className="drawer-value">{user[0].roles.map(role => role.name).join(', ')}</span>
                            </div>
                        </div>
                        <div className="btn-container">
                            <button onClick={toggleChangePass} className="btn-drawer-pass">Cambiar Contraseña</button>
                            <button onClick={logout} className="btn-drawer">Cerrar Sesión</button>
                        </div>
                    </div>
                ) : null}
            </Drawer>
            <EditProfile
                visible={editModalVisible}
                name={editName.toString() || ""}
                lastName={editLastName.toString() || ""}
                onCancel={toggleEditModal}
                onSave={handleSaveEditedName}
            />
            <ChangePass
                visible={editModalVisiblePass}
                onCancel={toggleChangePass}
            />
            <AvatarModal
                visible={avatarModalVisible}
                onCancel={toggleAvatarModal}
                onSave={handleAvatarSave}
            />
        </>
    );
};

export default DrawerComponent;