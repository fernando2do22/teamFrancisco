import React from 'react';
import { Modal, List } from 'antd';
import './InfoCarrer.css';

const CarrerInfoModal = ({ visible, onCancel, carrerInfo }) => {
    return (
        <Modal
            visible={visible}
            title="Información de la Carrera"
            onCancel={onCancel}
            footer={null}
        >
            {carrerInfo ? (
                <>
                    <div className="modal-title" style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '16px' }}>
                        {carrerInfo.career.name}
                    </div>
                    <h4 style={{ fontSize: '16px', marginBottom: '12px' }}>Materias:</h4>
                    {carrerInfo.graders.length > 0 ? (
                        <List
                            dataSource={carrerInfo.graders}
                            renderItem={grader => (
                                <List.Item key={grader._id}>
                                    <List.Item.Meta
                                        title={<span className="subject-name">{grader.name}</span>}
                                        description={<span className="professor-names">Profesor: {grader.professor.map(prof => prof.name).join(', ')}</span>}
                                    />
                                </List.Item>
                            )}
                            bordered
                        />
                    ) : (
                        <p>No asociada a ninguna materia.</p>
                    )}
                </>
            ) : (
                <p>Información de carrera no disponible.</p>
            )}
        </Modal>
    );
};


export default CarrerInfoModal;
