import React from 'react';
import { useTable } from 'react-table';

const AlertsTable = ({ data }) => {
    const columns = React.useMemo(() => [
        { Header: 'Timestamp', accessor: 'timestamp' },
        { Header: 'Source IP', accessor: 'src_ip' },
        { Header: 'Source Port', accessor: 'src_port' },
        { Header: 'Destination IP', accessor: 'dest_ip' },
        { Header: 'Destination Port', accessor: 'dest_port' },
        { Header: 'Protocol', accessor: 'proto' },
        { Header: 'Signature', accessor: 'alert.signature' },
        { Header: 'Category', accessor: 'alert.category' },
        { Header: 'Severity', accessor: 'alert.severity' },
    ], []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });

    return (
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => (
                                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            ))}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default AlertsTable;
