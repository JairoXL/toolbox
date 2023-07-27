import React, { Component } from 'react';
import { useSelector } from 'react-redux';
import { getTableData } from '../../api/server';

export const DataList = () => {
    getTableData().then((response) => {
       console.log(response);
    }).catch(e => {
        console.warn(e)
    });

    //const data = useSelector(state => state.data);

    return (
        <div>
            <h1>Data List</h1>
        </div>
    );
}