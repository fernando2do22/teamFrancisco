import React from 'react';
import { Modal } from 'antd';
import './InfoSubject.css';

const SubjectInfoModal = ({ visible, onCancel, subjectInfo }) => {
    return (
        <Modal
            visible={visible}
            title="Información de la Materia"
            onCancel={onCancel}
            footer={null}
        >
            {subjectInfo && (
                <>
                    <div className="modal-title">{subjectInfo.name}</div>
                    <h4>Profesores:</h4>
                    <ul className="professor-list">
                        {subjectInfo.professor.map(prof => (
                            <li key={prof._id} className="professor-item">
                                <span className="professor-name">{prof.name} {prof.lastname}</span>
                            </li>
                        ))}
                    </ul>
                    <h4>Carreras:</h4>
                    <ul className="career-list">
                        {subjectInfo.career.map(carr => (
                            <li key={carr._id} className="career-item">
                                <span className="career-name">{carr.name}</span>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </Modal>
    );
};

export default SubjectInfoModal;
