import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`

const Table = styled.table`
  text-align: center;
  border: 1px solid black;
  width: 100%;
  td, th {
    border: 1px solid #ddd;
    padding: 8px;
  }
  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
  tr:hover {
    background-color: #ddd;
  }
  th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: center;
    background-color: #4CAF50;
    color: white;
  }
`

const FallbackTitle = styled.h1`
  a {
    text-decoration: none;
    color: blue;
  }
  a:visited {
    text-decoration: none;
    color: blue;
  }
  a:hover {
    text-decoration: underline;
  }
`


export const TableComponent = () => {
  const cols = useSelector(state => state.data.cols)
  const data = useSelector(state => state.data.parsedData)

  return (
    <TableWrapper>
      {
        cols.length && data.length 
        ? (
          <Table>
            <thead>
              <tr>{cols.map((c) => <th key={c.key}>{c.name}</th>)}</tr>
            </thead>
            <tbody>
              {data.map((r,i) => <tr key={i}>
				      {cols.map(c => <td key={c.key}>{ r[c.key] }</td>)}
              </tr>)}
            </tbody>
          </Table>
          ) : (
          <FallbackTitle>No data uploaded, please upload data in <NavLink to="/">Upload XLSX</NavLink></FallbackTitle>
        )
      }
      
    </TableWrapper>
  )
}
