import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getTableFiles } from '../features/data';
import { useSelector } from 'react-redux';

const DataList = () => {

    const dispatch = useDispatch();
    const { data } = useSelector(state => state.data);

    const [dataTable, setDataTable] = useState([]);

    useEffect( ()=> {
        dispatch(getTableFiles());
    }, [dispatch]);

    useEffect( ()=> {
        if(data) setDataTable(data);
    }, [data]);

    function renderTableData(fileName) {
        if(dataTable.length > 0) {
            return dataTable.map((data, index) => {
                const { text, number, hex } = data;
                return (
                    <tr key={index}>
                        <td>{ fileName }</td>
                        <td>{ text }</td>
                        <td>{ number }</td>
                        <td>{ hex }</td>
                    </tr>
                )
            })
        }
    }

    function renderTableHeader() {
        if(dataTable.length > 0) {
            let header = Object.keys(dataTable[0]);
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
            <table>
                <thead>
                    <tr>{renderTableHeader()}</tr>
                </thead>
                <tbody>
                    {renderTableData()}
                </tbody>
            </table>
        </div>
    );
}

export { DataList };