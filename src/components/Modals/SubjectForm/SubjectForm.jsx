import { Button, Form, Input, Modal, notification, Select } from "antd";
import React, { useEffect, useState } from "react";
import { getCarres } from "../../../services/carrers.js";
import { getTeachers } from "../../../services/teachers.js";

const { Option } = Select;

const SubjectForm = ({ visible, onCancel, onSave, idSubject, initialData }) => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const [professors, setProfessors] = useState([]);
    const [careers, setCareers] = useState([]);
    const [data, setData] = useState(idSubject || null);


    const onFinishFailed = (errorInfo) => {
        notification.error({
            message: "No se hizo el cambio",
            description: "Por favor, revise los campos ingresados."
        });
    };

    const handleSave = async () => {
        try {
            const values = await form.validateFields();
            let formData = {};
    
            if (!data) { 
                formData = {
                    name: values.name,
                    professor: values.professor ? [values.professor] : [],
                    career: values.career ? [values.career] : []
                };
                notification.success({
                    message: "¡Materia agregada correctamente!"
                });
            } else { 
                formData = {
                    name: values.name,
                    professor: values.professor ? [values.professor] : initialData.professor.map(prof => prof._id),
                    career: values.career ? [values.career] : initialData.career.map(carr => carr._id)
                };
                notification.success({
                    message: "Materia editada correctamente!"
                });
            }
    
            onSave(formData);
            onCancel();
            form.resetFields();
            setLoading(true);
        } catch (e) {
            console.error(e);
            throw e;
        } finally {
            setLoading(false);
        }
    };
    
    const getProfessors = async () => {
        try {
            const response = await getTeachers();
            setProfessors(response)
        } catch (e) {
            console.error(e)
            throw e
        }
    }
    const gerCarers = async () => {
        try {
            const response = await getCarres();
            setCareers(response)
        } catch (e) {
            console.error(e)
            throw e
        }
    }

    useEffect(() => {
        getProfessors()
        gerCarers()
    }, []);

    const fetchProfessors = async () => {
        try {
            const response = await getTeachers();
            setProfessors(response);
        } catch (e) {
            console.error(e);
            throw e;
        }
    };

    const fetchCareers = async () => {
        try {
            const response = await getCarres();
            setCareers(response);
        } catch (e) {
            console.error(e);
            throw e;
        }
    };

    useEffect(() => {
        // Cargar datos iniciales
        fetchProfessors();
        fetchCareers();
    }, []);
    
    useEffect(() => {
        if (initialData || idSubject) {
            const dataToSet = initialData || idSubject;
    
            form.setFieldsValue({
                name: dataToSet.name,
                professor: dataToSet.professor.length > 0 ? dataToSet.professor[0]._id : null,
                career: dataToSet.career.length > 0 ? dataToSet.career[0]._id : null
            });
        } else {
            form.resetFields();
        }
    }, [initialData, idSubject, form]);
    

    return (
        <Modal
            className="edit-name-modal"
            title={data ? "Editar materia" : "Añadir materia"}
            visible={visible}
            onCancel={() => {
                form.resetFields();
                onCancel();
            }}
            footer={[
                <Button key="cancel" onClick={() => {
                    form.resetFields();
                    onCancel();
                }}>
                    Cancelar
                </Button>,
                <Button key="save" type="primary" onClick={handleSave} loading={loading}>
                    Guardar
                </Button>,
            ]}
        >
            <div style={{ marginBottom: 16 }}>
                <Form
                    form={form}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Por favor ingrese un nombre."
                            }
                        ]}
                    >
                        <Input placeholder="Nombre" />
                    </Form.Item>
    
                    <Form.Item
                        name="professor"
                        rules={[
                            {
                                required: true,
                                message: "Por favor seleccione un profesor."
                            }
                        ]}
                    >
                        <Select placeholder="Seleccione un profesor" allowClear>
                            {professors.map(prof => (
                                <Option key={prof._id} value={prof._id}>
                                    {prof.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
    
                    <Form.Item
                        name="career"
                        rules={[
                            {
                                required: true,
                                message: "Por favor seleccione una carrera."
                            }
                        ]}
                    >
                        <Select placeholder="Seleccione una carrera" allowClear>
                            {careers.map(career => (
                                <Option key={career._id} value={career._id}>
                                    {career.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    );
    
};

export default SubjectForm;
