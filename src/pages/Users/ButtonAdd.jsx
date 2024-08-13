import {Button, Space} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import React, { useState } from 'react';
import AddUser from '../../components/Modals/AddUser/AddUser.jsx'; 

const ButtonAdd = () => {
    const [visibleAddUserModal, setVisibleAddUserModal] = useState(false); 

    const toggleAddUserModal = () => {
        setVisibleAddUserModal(!visibleAddUserModal);
    };

    return (
        <Space>
            <Button
                style={{ height: "40px", width: "80px" }}
                onClick={toggleAddUserModal} 
                type="primary"
                icon={<PlusOutlined />}
                title={"Añadir"}
            />
            <AddUser
                visible={visibleAddUserModal}
                onClose={toggleAddUserModal} 
            />
        </Space>
    );
}

export default ButtonAdd;