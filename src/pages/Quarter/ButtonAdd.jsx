import {Button, Space} from "antd";
import {PlusOutlined} from "@ant-design/icons";

const ButtonAdd = ({ toggleModal }) => {

    const handleClickAdd = () => {
        toggleModal()
    }

    return (
        <Space>
            <Button
                style={{ height:"40px", width:"80px"}}
                onClick={handleClickAdd}
                type="primary"
                icon={<PlusOutlined />}
                title={"Añadir"}
            />
        </Space>
    );
}
export default ButtonAdd