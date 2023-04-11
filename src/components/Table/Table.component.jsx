import React from 'react'
import './Table.styles.css';
const T = ({ children }) => {
    return (
        <div className='rounded-lg table-parent mt-10'>
            <table className='table-auto w-full'>{children}</table>
        </div>
    )
}

const Tr = ({ children }) => {
    return (
        <tr className='p-2'>{children}</tr>
    )
}

const Th = ({ children }) => {
    return (
        <th><div className='p-3'>{children}</div></th>
    )
}

const Td = ({ children }) => {
    return (
        <td><div className='p-3'>{children}</div></td>
    )
}

const Table = {
    T,
    Tr,
    Th,
    Td
}

export default Table