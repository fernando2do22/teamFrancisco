import React, { useEffect, useState } from 'react';
import { Col, Row, Select, Table } from 'antd';
import Nav from '../../components/Nav/Index';
import Swal from 'sweetalert2';
import '../../App.css';
import { getQuarters, deleteQuarter, editQuarter, addQuarter } from '../../services/quarter';
import ButtonAdd from './ButtonAdd';
import Buttons from "./Buttons.jsx";
import QuarterForm from '../../components/Modals/Quarter/QuarterForm.jsx';

const { Option } = Select;

const TableQuarters = () => {
    const [quarters, setQuarters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCareer, setSelectedCareer] = useState(null);
    const [selectedQuarter, setSelectedQuarter] = useState(null);
    const [visibleModal, setVisibleModal] = useState(false);
    const [currentQuarter, setCurrentQuarter] = useState(null);

    const handleVisibleModal = () => {
        setVisibleModal(!visibleModal);
        if (!visibleModal) setCurrentQuarter(null);  
    };

    useEffect(() => {
        const fetchQuarters = async () => {
            try {
                setLoading(true);
                const data = await getQuarters();
                setQuarters(data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };

        fetchQuarters();
    }, []);

    const handleCareerChange = (value) => {
        setSelectedCareer(value);
        setSelectedQuarter(null);
    };

    const handleQuarterChange = (value) => {
        setSelectedQuarter(value);
    };

    const uniqueCareers = [...new Set(quarters.map(item => item.grades.career._id))];
    const uniqueQuarters = [...new Set(quarters
        .filter(quarter => quarter.grades.career._id === selectedCareer)
        .map(quarter => quarter.quarter))];

    const filteredQuarters = quarters.filter(quarter => 
        (!selectedCareer || quarter.grades.career._id === selectedCareer) &&
        (!selectedQuarter || quarter.quarter === selectedQuarter)
    );

    const dataSource = filteredQuarters.map(item => ({
        quarter: item.quarter,
        careerName: item.grades.career.name,
        subject: item.grades.name,
        id: item._id
    }));

    const columns = [
        {
            title: 'Cuatrimestre',
            dataIndex: 'quarter',
            align: 'center',
        },
        {
            title: 'Materia',
            dataIndex: 'subject',
            align: 'center',
        },
        {
            title: 'Carrera',
            dataIndex: 'careerName',
            align: 'center',
        },
        {
            title: 'Acciones',
            dataIndex: 'actions',
            align: 'center',
            render: (_, record) => (
                <Buttons
                    record={record}
                    editQuarter={() => editQuarterModal(record.id)}
                    deleteQuarter={() => deleteQuarterHandler(record.id)}
                />
            ),
        }
    ];

    const editQuarterModal = (id) => {
        setCurrentQuarter(id);
        setVisibleModal(true);
    };

    const deleteQuarterHandler = async (id) => {
        try {
            const response = await deleteQuarter(id);
            if (response) {
                setQuarters(quarters.filter(q => q._id !== id));
                Swal.fire({
                    title: '¡Eliminado!',
                    text: 'Cuatrimestre eliminado correctamente.',
                    icon: 'success'
                });
            } else {
                Swal.fire({
                    title: '¡Error!',
                    text: 'No se pudo eliminar el cuatrimestre, inténtelo más tarde.',
                    icon: 'error'
                });
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
            <div className="page-container">
                <Nav />
                <div className="content-wrap">
                    <Row justify="space-between" align="middle" style={{ marginBottom: '20px', marginTop: '20px' }}>
                        <Col span={6}>
                            <Select
                                placeholder="Selecciona una carrera"
                                style={{ width: '100%' }}
                                onChange={handleCareerChange}
                                value={selectedCareer}
                            >
                                {uniqueCareers.map(careerId => (
                                    <Option key={careerId} value={careerId}>
                                        {quarters.find(q => q.grades.career._id === careerId)?.grades.career.name || `Carrera ${careerId}`}
                                    </Option>
                                ))}
                            </Select>
                        </Col>
                        <Col>
                            <div style={{ margin: 0, marginRight: '40px' }}>
                                <ButtonAdd toggleModal={handleVisibleModal} />
                            </div>
                        </Col>
                        <Col span={6}>
                            <Select
                                placeholder="Selecciona un cuatrimestre"
                                style={{ width: '100%' }}
                                onChange={handleQuarterChange}
                                value={selectedQuarter}
                                disabled={!selectedCareer}
                            >
                                {uniqueQuarters.map((quarter, index) => (
                                    <Option key={index} value={quarter}>
                                        {quarter}
                                    </Option>
                                ))}
                            </Select>
                        </Col>
                    </Row>
                    <div className="products-container">
                        <Table
                            columns={columns}
                            dataSource={dataSource}
                            rowKey={(record) => `${record.quarter}-${record.subject}`}
                            scroll={{ y: 400 }}
                            loading={loading}
                        />
                    </div>
                </div>
            </div>
            <QuarterForm
                visible={visibleModal}
                onCancel={() => setVisibleModal(false)}
                onSave={async (data) => {
                    if (currentQuarter) {
                        await editQuarter(currentQuarter, data);
                        setQuarters(quarters.map(q => (q._id === currentQuarter ? { ...q, ...data } : q)));
                        Swal.fire({
                            title: '¡Actualizado!',
                            text: 'Cuatrimestre actualizado correctamente.',
                            icon: 'success'
                        });
                    } else {
                        const newQuarter = await addQuarter(data);
                        setQuarters([...quarters, newQuarter]);
                        Swal.fire({
                            title: '¡Añadido!',
                            text: 'Cuatrimestre añadido correctamente.',
                            icon: 'success'
                        });
                    }
                    setVisibleModal(false);
                }}
                initialData={currentQuarter ? quarters.find(q => q._id === currentQuarter) : null}
            />
        </>
    );
};

export default TableQuarters;
