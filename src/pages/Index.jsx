import React, {useEffect, useState} from 'react';
import { Divider, Table } from 'antd';
import {getProducts} from "../services/products.js";
import "../App.css"
import Nav from "../components/Nav/Index.jsx";

const TableProducts = () => {
    const [products, setProducts] = useState([])
    const [selectionType, setSelectionType] = useState('checkbox')

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts()
                const productsWithKey = data.map(product => ({
                    ...product,
                    key: product.id
                }))
                setProducts(productsWithKey)
            } catch (e) {
                console.log(e)
            }
        }
        fetchProducts()
    }, []);

    const columns = [
        {
            tittle: 'Nombre',
            dataIndex: 'name',
        },
        {
            tittle: 'Precio',
            dataIndex: 'price',
        },
        {
            tittle: 'Categoría',
            dataIndex: 'category',
        },
        {
            tittle: 'Imagen',
            dataIndex: 'imgURL',
            render: (url) => <img src={url} alt={"product"} style={{ width: 100 }}></img>
        },
    ]

    // rowSelection object indicates the need for row selection
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    };

    return(
        <div>
            <Nav />
            <div>
                <Divider />
                <div style={{ height: 'calc(85vh - 85px)', overflowY: 'auto' }}>
                    <div className={"products-container"}>
                        <Table
                            rowSelection={{
                                type: selectionType,
                                ...rowSelection,
                            }}
                            columns={ columns }
                            dataSource={ products }
                            scroll={{ y: 400 }}
                        >

                        </Table>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default TableProducts