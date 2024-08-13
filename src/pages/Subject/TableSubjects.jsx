import React, { useEffect, useState } from 'react';
import { Col, Row, Table, notification } from 'antd';
import Nav from "../../components/Nav/Index.jsx";
import { addSubject, deleteSubject, editSubject, getSubjects, getSubject } from "../../services/subjects.js";
import Buttons from "./Buttons.jsx";
import SubjectForm from "../../components/Modals/SubjectForm/SubjectForm.jsx";
import Button from "./ButtonAdd.jsx";
import Swal from 'sweetalert2';
import ButtonPDFSubject from './ButtonPDFSubject';
import "./stiles.css";
import SubjectInfoModal from '../../components/Modals/SubjectForm/InfoSubject.jsx';

const TableSubjects = () => {
    const [subjects, setSubjects] = useState([]);
    const [visibleModal, setVisibleModal] = useState(false);
    const [currentSubject, setCurrentSubject] = useState(null);
    const [selectedSubjectInfo, setSelectedSubjectInfo] = useState(null);
    const [infoModalVisible, setInfoModalVisible] = useState(false);

    const handleVisibleModal = () => {
        setVisibleModal(!visibleModal);
    };

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const data = await getSubjects();
                setSubjects(data);
            } catch (e) {
                console.log(e);
            }
        };
        fetchSubjects();
    }, []);

    const handleSave = async (formData) => {
        try {
            if (currentSubject) {
                const updatedData = {
                    name: formData.name || currentSubject.name,
                    professor: formData.professor.length > 0 ? formData.professor : currentSubject.professor.map(prof => prof._id),
                    career: formData.career.length > 0 ? formData.career : currentSubject.career.map(carr => carr._id)
                };
                await editSubject(currentSubject._id, updatedData.name, updatedData.professor, updatedData.career);
                notification.success({
                    message: "¡Materia actualizada correctamente!"
                });
            } else {
                await addSubject(formData.name, formData.professor, formData.career);
                notification.success({
                    message: "¡Materia agregada correctamente!"
                });
            }
    
            const data = await getSubjects();
            setSubjects(data);
            setCurrentSubject(null);
            setVisibleModal(false);
        } catch (error) {
            console.error('Failed:', error);
            notification.error({
                message: 'Error',
                description: 'Por favor, revise los campos ingresados.'
            });
        }
    };
    

    const editSubjectModal = (subject) => {
        setCurrentSubject(subject);
        setVisibleModal(true);
    };

    const dropSubject = async (id) => {
        try {
            const result = await Swal.fire({
                title: '¿Estás seguro?',
                text: 'Una vez eliminado, no podrás recuperar esta materia.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminar!',
                cancelButtonText: 'Cancelar'
            });

            if (result.isConfirmed) {
                await deleteSubject(id);
                const data = await getSubjects();
                setSubjects(data);
                Swal.fire(
                    '¡Eliminado!',
                    'Materia eliminada correctamente.',
                    'success'
                );
            }
        } catch (e) {
            console.error(e);
        }
    };

    const showSubjectInfo = async (id) => {
        try {
            const data = await getSubject(id);
            setSelectedSubjectInfo(data);
            setInfoModalVisible(true);
        } catch (e) {
            console.error(e);
        }
    };

    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            align: 'center',
            width: '30%', // Ajusta el ancho de la columna
        },
        {
            title: 'Profesor',
            dataIndex: 'professor',
            align: 'center',
            width: '30%', // Ajusta el ancho de la columna
            render: professors => professors.map(prof => `${prof.name} ${prof.lastname}`).join(', ')
        },
        {
            title: 'Carrera',
            dataIndex: 'career',
            align: 'center',
            width: '30%', // Ajusta el ancho de la columna
            render: careers => careers.map(career => career.name).join(', ')
        },
        {
            title: 'Acciones',
            dataIndex: 'actions',
            align: 'center',
            width: '10%', // Ajusta el ancho de la columna
            render: (_, record) => (
                <Buttons
                    record={record}
                    editSubject={editSubjectModal}
                    dropSubject={dropSubject}
                    toggleModal={handleVisibleModal}
                />
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
                            <h1 style={{ margin: 0, marginLeft: '40px' }}>Materias</h1>
                        </Col>
                        <Col>
                            <div style={{ margin: 0, marginRight: '40px' }}>
                                <Button toggleModal={handleVisibleModal} />
                                <ButtonPDFSubject filteredData={subjects} />
                            </div>
                        </Col>
                    </Row>
                    <div className="subjects-container" style={{ textAlign: 'center' }}>
                        <Table
                            columns={columns}
                            dataSource={subjects}
                            scroll={{ y: 400 }} 
                            rowKey="_id"
                            style={{ margin: '0 auto', width: '90%' }} // Ampliar el ancho de la tabla
                        />
                    </div>
                </div>
            </div>
    
            <SubjectForm
                visible={visibleModal}
                onCancel={() => {
                    setVisibleModal(false);
                    setCurrentSubject(null);
                }}
                onSave={handleSave}
                idSubject={currentSubject}
                initialData={currentSubject} 
            />
    
            {selectedSubjectInfo && (
                <SubjectInfoModal
                    visible={infoModalVisible}
                    onCancel={() => setInfoModalVisible(false)}
                    subjectInfo={selectedSubjectInfo} 
                />
            )}
        </>
    );
};

export default TableSubjects;
