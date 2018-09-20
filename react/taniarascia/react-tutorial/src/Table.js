import React, { Component } from 'react';


const TableHeader = () => {
    return (
        <thead>
            <tr>
                <th> Name </th>
                <th> Job </th>
            </tr>
        </thead>
    );
}

const TableBody = () => {
    return (
        <tbody>
            <tr>
                <th>Charlie</th>
                <th>Janitor</th>
            </tr>
            <tr>
                <th>Mac</th>
                <th>Bouncer</th>
            </tr>
            <tr>
                <th>Dee</th>
                <th>Aspiring actress</th>
            </tr>
            <tr>
                <th>Dennis</th>
                <th>Bartender</th>
            </tr>
        </tbody>
    );
}

class Table extends Component {
    render() {
        return (
            <table>
                <TableHeader />
                <TableBody />
            </table>
        );
    }
}

export default Table;