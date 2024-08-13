import React, { useState } from "react";
import { Modal, Button, notification } from "antd";
import { usersService } from "../../../services/users";
import './AvatarModal.css';

const AvatarModal = ({ visible, onCancel, onSave }) => {
    const [selectedAvatar, setSelectedAvatar] = useState("");
    const [customUrl, setCustomUrl] = useState("");
    const [error, setError] = useState("");

    // Array de avatares
    const avatarOptions = [
        "https://cdn3d.iconscout.com/3d/premium/thumb/boy-avatar-6299533-5187865.png?f=webp",
        "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-DsBJ-WykKIAdJoxTVgvo2jWPbt_kBwc4Mg&s",
        "https://static.vecteezy.com/system/resources/previews/004/819/327/non_2x/male-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg",
        "https://st2.depositphotos.com/2703645/7303/v/450/depositphotos_73039841-stock-illustration-male-avatar-icon.jpg",
        "https://static.vecteezy.com/system/resources/thumbnails/002/002/257/small_2x/beautiful-woman-avatar-character-icon-free-vector.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQyaYvYq_6lj6ykALDyEpx21Sv9WODUBGoTw&s",
        "https://w7.pngwing.com/pngs/915/511/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon-thumbnail.png",
        "https://png.pngtree.com/png-clipart/20200819/ourlarge/pngtree-female-profile-avatar-elements-png-image_2326125.jpg",
        "https://t4.ftcdn.net/jpg/02/79/66/93/360_F_279669366_Lk12QalYQKMczLEa4ySjhaLtx1M2u7e6.jpg",
    ];

    const handleAvatarClick = (url) => {
        setSelectedAvatar(url);
        setCustomUrl(""); // Limpiar el campo de URL personalizada si se selecciona un avatar
    };

    const handleCustomUrlChange = (e) => {
        setCustomUrl(e.target.value);
        setSelectedAvatar(""); // Limpiar la selección del avatar si se ingresa una URL personalizada
    };

    const handleSave = async () => {
        setError("");
        try {
            let avatarUrl = selectedAvatar;

            if (customUrl) {
                avatarUrl = customUrl;
                // Validar URL
                if (!isValidUrl(customUrl)) {
                    setError("La URL proporcionada no es válida.");
                    return;
                }
            } else if (!selectedAvatar) {
                setError("Por favor, selecciona un avatar o ingresa una URL personalizada.");
                return;
            }

            await usersService.uploadAvatar(avatarUrl);
            notification.success({
                message: 'Éxito',
                description: (
                    <>
                        Avatar actualizado exitosamente.<br /><br />
                        Por favor recargue la página
                    </>
                ),
            });
            onSave(); // Llamar a onSave para actualizar la vista en el componente padre
        } catch (err) {
            setError("Error al actualizar el avatar.");
            console.error(err);
        }
    };

    const isValidUrl = (url) => {
        // Validar si la URL es válida
        try {
            new URL(url);
            return true;
        } catch (e) {
            return false;
        }
    };

    return (
        <Modal
            title="Selecciona un Avatar"
            visible={visible}
            onCancel={onCancel}
            footer={[
                <Button key="back" onClick={onCancel}>
                    Cancelar
                </Button>,
                <Button key="submit" type="primary" onClick={handleSave}>
                    Guardar
                </Button>,
            ]}
        >
            <div className="avatar-modal">
                <div className="avatar-grid">
                    {avatarOptions.map((url, index) => (
                        <div
                            key={index}
                            className={`avatar-item ${selectedAvatar === url ? 'selected' : ''}`}
                            onClick={() => handleAvatarClick(url)}
                        >
                            <img src={url} alt={`Avatar ${index + 1}`} />
                        </div>
                    ))}
                </div>
                <div className="custom-url-container">
                    <input
                        type="text"
                        className="custom-url-input"
                        placeholder="o ingresa una URL personalizada"
                        value={customUrl}
                        onChange={handleCustomUrlChange}
                    />
                    {error && <p className="error-message">{error}</p>}
                </div>
            </div>
        </Modal>
    );
};

export default AvatarModal;
