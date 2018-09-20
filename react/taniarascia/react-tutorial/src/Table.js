import React, { Component } from 'react';


class Table extends Component {
    render() {
        return (
            <table>
                <thead>
                    <tr>
                        <th> Name </th>
                        <th> Job </th>
                    </tr>
                </thead>
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
            </table>
        );
    }
}

export default Table;