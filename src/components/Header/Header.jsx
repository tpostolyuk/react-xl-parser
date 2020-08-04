import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import {ToastsContainer, ToastsStore} from 'react-toasts'
import XLSX from 'xlsx'
import { useSelector } from 'react-redux'

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background: #4CAF50;
  width: 100%;
  height: 120px;
  a {
    color: black;
    text-decoration: none;
  }
  a:visited {
    color: black;
    text-decoration: none;
`
const HeaderNav = styled.nav`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
`
const NavItem = styled.h1`
  font-size: 25px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`

export const Header = () => {
  const data = useSelector(state => state.data.parsedData)

  const exportFile = () => {
    if (data.length) {
      const ws = XLSX.utils.aoa_to_sheet(data)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
      XLSX.writeFile(wb, "sheetjs.xlsx")
      ToastsStore.success("File successfully has been exported")
    } else {
      ToastsStore.error("No data to export!")
    }
  }

  return (
    <HeaderWrapper>
      <HeaderNav>
        <NavLink to="/"><NavItem>Upload XLSX</NavItem></NavLink>
        <NavLink to="/table"><NavItem>Data Table</NavItem></NavLink>
        <NavItem onClick={exportFile}>Export Table</NavItem>
        <ToastsContainer store={ToastsStore}/>
      </HeaderNav>
    </HeaderWrapper>
  )
}
