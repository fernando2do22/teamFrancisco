import { Button, Form, Input, Modal, notification, Select } from "antd";
import React, { useEffect, useState } from "react";
import { getQuarters, addQuarter, editQuarter } from "../../../services/quarter.js";
import { getSubjects } from "../../../services/subjects.js";

const { Option } = Select;

const QuarterForm = ({ visible, onCancel, onSave, initialData }) => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const [grades, setGrades] = useState([]);
    const [quarters, setQuarters] = useState([]);

    const onFinishFailed = (errorInfo) => {
        notification.error({
            message: "No se hizo el cambio",
            description: "Por favor, revise los campos ingresados."
        });
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            const values = await form.validateFields();
            const formData = {
                quarter: parseInt(values.quarter, 10),
                grades: values.grades
            };

            if (initialData) {
                // Editar cuatrimestre existente
                await editQuarter(initialData._id, formData);
                notification.success({
                    message: '¡Actualizado!',
                    description: 'Cuatrimestre actualizado correctamente.'
                });
            } else {
                // Añadir nuevo cuatrimestre
                await addQuarter(formData);
                notification.success({
                    message: '¡Añadido!',
                    description: 'Cuatrimestre añadido correctamente.'
                });
            }

            form.resetFields();
            onSave();
        } catch (e) {
            console.error(e);
            notification.error({
                message: '¡Error!',
                description: 'Hubo un problema al intentar guardar el cuatrimestre.'
            });
        } finally {
            setLoading(false);
        }
    };

    const fetchSubjects = async () => {
        try {
            const response = await getSubjects();
            setGrades(response);
        } catch (e) {
            console.error(e);
            notification.error({
                message: 'Error al obtener las materias',
                description: 'No se pudo cargar la lista de materias.'
            });
        }
    };

    const fetchQuarters = async () => {
        try {
            const response = await getQuarters();
            setQuarters(response);
        } catch (e) {
            console.error(e);
            throw e;
        }
    };

    useEffect(() => {
        fetchSubjects();
        fetchQuarters();
    }, []);

    useEffect(() => {
        if (initialData) {
            form.setFieldsValue({
                quarter: initialData.quarter,
                grades: Array.isArray(initialData.grades) ? initialData.grades.map(grade => grade._id) : []
            });
        } else {
            form.resetFields();
        }
    }, [initialData, form]);
    

    return (
        <Modal
            title={initialData ? "Modificar cuatrimestre" : "Añadir cuatrimestre"}
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
                    {initialData ? "Actualizar" : "Guardar"}
                </Button>,
            ]}
        >
            <Form
                form={form}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    name="quarter"
                    label="Número de Cuatrimestre"
                    rules={[
                        {
                            required: true,
                            message: "Por favor ingrese el número de cuatrimestre."
                        }
                    ]}
                >
                    <Input type="number" min={1} placeholder="Número de cuatrimestre" />
                </Form.Item>

                <Form.Item
                    name="grades"
                    label="Materias"
                    rules={[
                        {
                            required: true,
                            message: "Por favor seleccione las materias."
                        }
                    ]}
                >
                    <Select mode="multiple" placeholder="Seleccione las materias">
                        {grades.map(grade => (
                            <Option key={grade._id} value={grade._id}>
                                {grade.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default QuarterForm;
