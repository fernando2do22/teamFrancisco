import React from "react";
import {Form, Input} from "antd";

export const FormEdit = ({ form, dataForm }) => {
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    console.log("form modal: ", dataForm)
    if (!dataForm) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{marginBottom: 16}}>
            <Form
                form={form}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    name={"name"}
                    rules={[
                        {
                            required: true,
                            message: "Por favor ingrese un nombre."
                        }
                    ]}
                >
                    <Input
                        placeholder="Nombre"
                    />
                </Form.Item>

                <Form.Item
                    name={"lastname"}
                    rules={[
                        {
                            required: true,
                            message: "Por favor ingrese un nombre."
                        }
                    ]}
                >
                    <Input
                        placeholder="Nombre"
                    />
                </Form.Item>

                {dataForm.roles === "alumno" ?
                    (
                        <Form.Item
                            name={"CURP"}
                            rules={[
                                {
                                    required: true,
                                    message: "Por favor ingrese el CURL."
                                }
                            ]}
                        >
                            <Input
                                placeholder="CURP"
                            />
                        </Form.Item>
                    ) : (
                        <Form.Item
                            name={"email"}
                            rules={[
                                {
                                    required: true,
                                    message: "Por favor agregue un correo."
                                }
                            ]}
                        >
                            <Input
                                placeholder="Correo"
                            />
                        </Form.Item>
                    )
                }
            </Form>
        </div>
    );
};