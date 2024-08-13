import {Button, Space} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";

const Buttons = ({ record, toggleModal, idUser, idSubject, dropSubject }) => {

    const handleClick = () => {
        idUser(record._id);
        toggleModal()
    }

    // Constante para eliminar
    const handleClickDelete = () => {
        dropSubject(record._id)
    }

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