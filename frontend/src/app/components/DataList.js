import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { fetchTableFiles } from '../features/data';
import { Table } from 'react-bootstrap';

const DataList = () => {

    const dispatch = useDispatch();

    useEffect( ()=> {
        dispatch(fetchTableFiles());
    }, [dispatch]);

    const rawData = useSelector(state => state.tableData.tableFiles);

    function generateTableItems(data) {
        const objTable = [];
        if(rawData.success === true && data.length > 0) {
            data.map( item => {
                if(item.lines.length){
                    item.lines.map( dt => {
                        objTable.push({file: item.file, ...dt});
                    })
                }
            });
        }
        return objTable;
    }

    function renderTableData() {
        const { data } = rawData;
        const tableData = generateTableItems(data);

        return tableData.map((item, index) => {
            const { file, text, number, hex } = item;
            return (
                <tr key={index}>
                    <td>{ file }</td>
                    <td>{ text }</td>
                    <td>{ number }</td>
                    <td>{ hex }</td>
                </tr>
            );
        });
    }

    function getHeaderItems(data) {
        let headerRender=['FileName'];
        data.map((item) => {
            if(item.lines.length){
                item.lines.map(data => {
                    Object.keys(data).map((key) => {
                        if(headerRender.indexOf(key) === -1){
                            headerRender.push(key);
                        }
                    });
                })
            }
        });
        return headerRender;
    }

    function renderTableHeader() {
        const { data } = rawData;
        if(rawData.success === true && data.length > 0) {
            const header = getHeaderItems(data);
            return header.map((key, index) => {
                return <th key={index}>{key.toUpperCase()}</th>
            })
        }
    }

    return (
        <div>
            <div className="table-title">
                <h3>Challenge toolbox</h3>
            </div>
            <Table>
                <thead>
                    <tr>{renderTableHeader()}</tr>
                </thead>
                <tbody>
                    {renderTableData()}
                </tbody>
            </Table>
        </div>
    );
}

export { DataList };