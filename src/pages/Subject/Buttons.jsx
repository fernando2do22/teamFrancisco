import { Button, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const Buttons = ({ record, toggleModal, editSubject, dropSubject }) => {
    // Cambiar el nombre de `idSubject` a `editSubject` para más claridad
    const handleClick = () => {
        editSubject(record); // Pasar el objeto completo para editar
        toggleModal(); // Abrir el modal
    };

    // Constante para eliminar
    const handleClickDelete = () => {
        dropSubject(record._id);
    };

    return (
        <Space>
            <Button
                onClick={handleClick}
                type="primary"
                icon={<EditOutlined />}
                title={"Editar"}
            />
            <Button
                onClick={handleClickDelete}
                type="primary"
                danger
                icon={<DeleteOutlined />}
                title={"Eliminar"}
            />
        </Space>
    );
};

export default Buttons;
