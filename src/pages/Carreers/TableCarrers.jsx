import React, { useEffect, useState } from 'react';
import { Col, Row, Table } from 'antd';
import Nav from '../../components/Nav/Index';
import ButtonAdd from './ButtonAdd';
import CarrerForm from '../../components/Modals/CarreerForm/CarreerForm';
import Buttons from './Buttons';
import { getCarres, editCarrer, deleteCarrer, addCarrer, getInfoCarrers } from '../../services/carrers.js';
import Swal from 'sweetalert2';
import '../../App.css';
import CarrerInfoModal from '../../components/Modals/CarreerForm/InfoCarrer.jsx';
import ButtonPDFCarrers from './ButtonPDFCarrers';

const TableCarrers = () => {
    const [carrers, setCarrers] = useState([]);
    const [visibleModal, setVisibleModal] = useState(false);
    const [currentCarrer, setCurrentCarrer] = useState(null);
    const [selectedCarrerInfo, setSelectedCarrerInfo] = useState(null);
    const [infoModalVisible, setInfoModalVisible] = useState(false);

    const handleVisibleModal = () => {
        setVisibleModal(!visibleModal);
    };

    useEffect(() => {
        const fetchCarrers = async () => {
            try {
                const data = await getCarres();
                setCarrers(data);
            } catch (e) {
                console.log(e);
            }
        };
        fetchCarrers();
    }, []);

    const handleSave = async (form) => {
        try {
            if (!currentCarrer) {
                await addCarrer(form.name);
            } else {
                await editCarrer(currentCarrer._id, form.name);
            }
            const data = await getCarres();
            setCarrers(data);

            if (data) {
                setCarrers(data);
            }

            setCurrentCarrer(null);
            setVisibleModal(false); // Cerrar la modal después de guardar
        } catch (error) {
            console.error('Failed:', error);
        }
    };

    const editCarrerModal = (carrer) => {
        setCurrentCarrer(carrer);
        setVisibleModal(true);
    };

    const dropCarrer = async (id) => {
        try {
            const response = await deleteCarrer(id);
            if (response) {
                const data = await getCarres();
                setCarrers(data);

                Swal.fire({
                    title: '¡Eliminado!',
                    text: 'Carrera eliminada correctamente.',
                    icon: 'success'
                });
            } else {
                Swal.fire({
                    title: '¡Error!',
                    text: 'No se pudo eliminar la carrera, inténtelo más tarde.',
                    icon: 'error'
                });
            }
        } catch (e) {
            console.error(e);
        }
    };

    const showCarrerInfo = async (id) => {
        try {
            const data = await getInfoCarrers(id);
            setSelectedCarrerInfo(data);
            setInfoModalVisible(true);
        } catch (e) {
            console.error(e);
        }
    };

    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            align: 'center'
        },
        {
            title: 'Acciones',
            dataIndex: 'actions',
            align: 'center',
            render: (_, record) => (
                <Buttons record={record} editCarrerModal={editCarrerModal} dropCarrer={dropCarrer} showCarrerInfo={showCarrerInfo} />
            ),
        }
    ];

    return (
        <>
            <div className="page-container">
                <Nav />
                <div className="content-wrap">
                <Row justify="space-between" align="middle" style={{ marginBottom: '20px', marginTop: '20px' }}>
                <Col>
                            <h1 style={{ margin: 0, marginLeft: '40px' }}>Carreras</h1>
                        </Col>

                        <Col>
                        <div style={{ margin: 0, marginRight: '40px' }}>
                            <ButtonAdd toggleModal={handleVisibleModal} />
                            <ButtonPDFCarrers filteredData={carrers} /> {/* Pasa filteredData */}
                            </div>
                        </Col>
                    </Row>
                    <div className="products-container">
                        <Table
                            columns={columns}
                            dataSource={carrers}
                            scroll={{ y: 400 }}
                        />
                    </div>
                </div>
            </div>

            <CarrerForm
                visible={visibleModal}
                onCancel={() => {
                    setVisibleModal(false);
                    setCurrentCarrer(null);
                }}
                onSave={handleSave}
                idCarrer={currentCarrer}
            />
            
            <CarrerInfoModal
                visible={infoModalVisible}
                onCancel={() => setInfoModalVisible(false)}
                carrerInfo={selectedCarrerInfo}
            />
        </>
    );
};
export default TableCarrers;