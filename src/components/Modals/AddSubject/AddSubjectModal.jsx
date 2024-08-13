import React, { useState, useEffect } from 'react';
import { Modal, Form, Select, Input, Button, message } from 'antd';
import { getAllStudents } from '../../../services/alumnos.js';
import { addGrade } from '../../../services/alumnos.js';
import "./AddSubjectModal.css";

const { Option } = Select;

const AddSubjectModal = ({ isVisible, onClose, subjectId, fetchGrades }) => {
    const [form] = Form.useForm();
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchStudents = async () => {
            setLoading(true);
            try {
                const studentsResponse = await getAllStudents();
                setStudents(studentsResponse.filter(student => student.roles.some(role => role.name === 'alumno')));
            } catch (error) {
                console.error("Error al obtener los alumnos:", error);
                message.error("Error al obtener los alumnos. Por favor, intenta de nuevo.");
            }
            setLoading(false);
        };

        if (isVisible) {
            fetchStudents();
        }
    }, [isVisible]);

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            const { parcial, grado, student, subject } = values;

            await addGrade({
                grade: [subjectId],
                student: [student],
                parcial,
                grado,
                subject: Number(subject) 
            });

            message.success("Calificación agregada correctamente.");
            form.resetFields();
            onClose();
        } catch (error) {
            console.error("Error al agregar calificación:", error);
            message.error("Error al agregar calificación. Por favor, intenta de nuevo.");
        }
    };

    return (
        <Modal
            title="Agregar Calificación"
            visible={isVisible}
            onCancel={onClose}
            onOk={handleOk}
            okText="Agregar"
            cancelText="Cancelar"
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="student"
                    label="Selecciona el Alumno"
                    rules={[{ required: true, message: 'Selecciona un alumno' }]}
                >
                    <Select placeholder="Selecciona un alumno" allowClear>
                        {students.map(student => (
                            <Option key={student._id} value={student._id}>
                                {student.name} {student.lastname}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="parcial"
                    label="Parcial"
                    rules={[{ required: true, message: 'Selecciona el parcial' }]}
                >
                    <Select placeholder="Selecciona el parcial">
                        <Option value={1}>Primero</Option>
                        <Option value={2}>Segundo</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="grado"
                    label="Grado"
                    rules={[{ required: true, message: 'Selecciona el grado' }]}
                >
                    <Select placeholder="Selecciona el grado">
                        {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
                            <Option key={num} value={num}>
                                {num}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="subject"
                    label="Calificacion"
                    rules={[
                        { required: true, message: 'Ingresa una calificación' },
                        {
                            validator: (_, value) => {
                                if (value < 0 || value > 10) {
                                    return Promise.reject('La calificación debe estar entre 0 y 10');
                                }
                                return Promise.resolve();
                            }
                        }
                    ]}
                >
                    <Input
                        type="number"
                        min={0}
                        max={10}
                        step={1}
                        placeholder="0-10"
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddSubjectModal;