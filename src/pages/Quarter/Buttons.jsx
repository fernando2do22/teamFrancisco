import { Button, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const Buttons = ({ record, toggleModal, editQuarter, deleteQuarter }) => {
    const handleClick = () => {
        editQuarter(record); // Pasar el objeto completo para editar
        toggleModal(); // Abrir el modal
    };

    const handleClickDelete = () => {
        deleteQuarter(record.id);
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
