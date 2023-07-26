import React, { Component } from 'react';
import SendRequest from '../services/api/';
import { createStore } from 'redux'
import reducer from './reducers/index'

export default class BaseData extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const store = createStore(reducer);
        const data = SendRequest('http://localhost:3000/api/files/data');
        store.dispatch({
            type: 'DATA_ACTION',
            data: data
        });
    }

    rawData() {
        //store.getState().dataReducer.map( (item, index) => {
            //console.log('item', item);
            //console.log('index', index);
            /*return (
                <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                </tr>
            )*/
        //});
    }

    render() {
        return (
            <div className='container'>
                <table>
                    { this.rawData() }
                </table>
            </div>
        );
    }
}