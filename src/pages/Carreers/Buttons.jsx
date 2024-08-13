import React from 'react';
import { Button, Space } from 'antd';
import { EditOutlined, DeleteOutlined, MoreOutlined, InfoCircleOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';


const Buttons = ({ record, editCarrerModal, dropCarrer, showCarrerInfo  }) => {
    const confirmDelete = () => {
        dropCarrer(record._id);
    };

    const handleDelete = () => {
        Swal.fire({
            title: '¿Deseas borrar esta carrera?',
            text: 'No se podrá recuperar después.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Borrar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                confirmDelete();
            }
        });
    };

    return (
        <Space>
            <Button type="primary" icon={<EditOutlined />} onClick={() => editCarrerModal(record)}></Button>

            <Button type="primary" danger icon={<DeleteOutlined />}
            title={"Eliminar"}
            onClick={handleDelete}></Button>
            
            <Button type="primary"  icon={<InfoCircleOutlined />} onClick={() => showCarrerInfo(record._id)}>Consultar</Button>
        </Space>
    );
};

export default Buttons;