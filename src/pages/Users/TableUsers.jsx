import Nav from "../../components/Nav/Index.jsx";
import { Col, Row, Table, message } from "antd";
import Button from "./ButtonAdd.jsx";
import React, { useEffect, useState } from "react";
import { getUsers, getUser, editUser } from "../../services/getUsers.js";
import "../../App.css"
import UserForm from "../../components/Modals/UserForm/UserForm.jsx";
import Buttons from "../Users/Buttons.jsx";
import Swal from 'sweetalert2';
import ButtonPDF from "./ButtonPDF.jsx";
import { deleteUser, getRoles } from "../../services/users.js";

const TableUsers = () => {
    const [products, setProducts] = useState([]);
    const [roles, setRoles] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [visibleModal, setVisibleModal] = useState(false);
    const [currentId, serCurrentId] = useState(null);
    const [isRoleAlumno, setIsRoleAlumno] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getUsers();
                setProducts(data);
                setFilteredData(data);
            } catch (e) {
                console.log(e);
            }
        };

        const fetchRoles = async () => {
            try {
                const data = await getRoles();
                setRoles(data.roles);
            } catch (e) {
                console.error(e);
            }
        };

        fetchProducts();
        fetchRoles();
    }, []);

    const data = async (idUser) => {
        const response = await getUser(idUser);
        if (response[0].roles[0].name === "alumno") {
            const dataResponse = {
                id: idUser,
                name: response[0].name,
                lastname: response[0].lastname,
                CURP: response[0].CURP,
                roles: response[0].roles[0].name
            };
            serCurrentId(dataResponse);
        } else {
            const dataResponse = {
                id: idUser,
                name: response[0].name,
                lastname: response[0].lastname,
                email: response[0].email,
                roles: response[0].roles[0].name
            };
            serCurrentId(dataResponse);
        }
    };

    const handleEditUser = async (userData) => {
        try {
            await editUser(userData.id, userData);
            const updatedUsers = products.map(user => (user.id === userData.id ? userData : user));
            setProducts(updatedUsers);
            message.success('¡Usuario actualizado correctamente!');
            toggleModal();
        } catch (error) {
            console.error('Error editing user:', error);
            message.error('Error al editar el usuario. Inténtalo de nuevo más tarde.');
        }
    };

    const dropUser = async (id) => {
        try {
            const response = await deleteUser(id);
            if (response) {
                const data = await getUsers();
                const usersWithKey = data.map(user => ({
                    ...user,
                    key: user._id
                }));
                setProducts(usersWithKey);
                setFilteredData(usersWithKey);
            } else {
                Swal.fire({
                    title: "¡Error!",
                    text: "No se pudo eliminar el usuario, inténtelo más tarde.",
                    icon: "error"
                });
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "¿Deseas borrar este usuario?",
            text: "No se podrá recuperar después.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Borrar"
        }).then((result) => {
            if (result.isConfirmed) {
                dropUser(id);
                Swal.fire(
                    "¡Eliminado!",
                    "Usuario eliminado correctamente.",
                    "success"
                );
            }
        });
    };

    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
            render: (name) => name.toUpperCase(),
            filters: products
                .filter((product, index, self) =>
                    index === self.findIndex((p) => p.name === product.name)
                )
                .map((product) => ({
                text: product.name.toUpperCase(),
                value: product.name
            })),
            onFilter: (value, record) => record.name.startsWith(value),
            filterSearch: true,
            width: '20%',
        },
        {
            title: 'Apellidos',
            dataIndex: 'lastname',
            key: 'lastname',
            align: 'center',
            render: (lastname) => lastname.toUpperCase(),
            filters: products
                .filter((product, index, self) =>
                    index === self.findIndex((p) => p.lastname === product.lastname)
                )
                .map((product) => ({
                text: product.lastname.toUpperCase(),
                value: product.lastname
            })),
            onFilter: (value, record) => record.lastname.startsWith(value),
            filterSearch: true,
            width: '20%',
        },
        {
            title: 'Email/Matricula',
            dataIndex: 'email',
            key: 'email',
            align: 'center',
            render: (email, record) => email || record.studentId,
            filters: products.map((product) => ({
                text: product.email || product.studentId,
                value: product.email || product.studentId,
            })),
            onFilter: (value, record) => {
                const email = record?.email || record?.studentId || '';
                return email.toString().startsWith(value);
            },
            filterSearch: true,
            width: '20%',
        },
        {
            title: 'Rol',
            dataIndex: 'roles',
            key: 'roles',
            align: 'center',
            render: (roles) => roles[0]?.name.toUpperCase() || 'Sin rol',
            filters: roles.map((role) => ({
                text: role.name.toUpperCase(),
                value: role.name
            })),
            onFilter: (value, record) => record.roles[0]?.name.startsWith(value),
            filterSearch: true,
            width: '20%',
        },
        {
            title: 'Acciones',
            dataIndex: 'actions',
            align: 'center',
            render: (_, record) => (
                <Buttons record={record} toggleModal={toggleModal} idUser={data} dropSubject={handleDelete} />
            ),
        }
    ];

    if (isRoleAlumno) {
        columns.splice(3, 0, {
            title: 'CURP',
            dataIndex: 'CURP',
            key: 'CURP',
            align: 'center',
            render: (curp) => curp ? curp.toUpperCase() : 'N/A',
            filters: products
                .filter(product => product.CURP)
                .map((product) => ({
                    text: product.CURP.toUpperCase(),
                    value: product.CURP
                })),
            onFilter: (value, record) => record.CURP ? record.CURP.startsWith(value) : false,
            filterSearch: true,
            width: '20%',
        });
    }

    const toggleModal = () => {
        setVisibleModal(!visibleModal);
    };


    const onChange = (pagination, filters, sorter, extra) => {
        const hasAlumnoRole = extra.currentDataSource.some(data =>
            data.roles.some(role => role.name === 'alumno')
        );
        setIsRoleAlumno(hasAlumnoRole)
        setFilteredData(extra.currentDataSource);
    };

    return (
        <>
           <div className="page-container">
                <Nav />
                <div className="content-wrap">
                    <Row justify="space-between" align="middle" style={{ marginBottom: '20px', marginTop: '20px' }}>
                        <Col>
                            <h1 style={{ margin: 0, marginLeft: '40px' }}>Usuarios</h1>
                        </Col>
                        <Col>
                            <div style={{ margin: 0, marginRight: '40px' }}>
                                <Button />
                                <ButtonPDF filteredData={filteredData} />
                            </div>
                        </Col>
                    </Row>
                    <div>
                        <div className={"products-container"}>
                            <Table
                                columns={columns}
                                dataSource={products}
                                pagination={{ pageSize: 5 }}
                                onChange={onChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <UserForm
                visible={visibleModal}
                onCancel={toggleModal}
                idUser={currentId}
                onSave={handleEditUser}
            />
        </>
    );
};

export default TableUsers;
