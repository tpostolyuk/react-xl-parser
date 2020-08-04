import React from 'react'
import styled from 'styled-components'

const Input = styled.input `
  width: 100%;
  height: 100%;
  opacity: 0;
`

const SheetJSFT = [
  "xlsx", "xlsb", "xlsm", "xls", "xml", "csv", "txt", "ods", "fods", "uos", "sylk", "dif", "dbf", "prn", "qpw", "123", "wb*", "wq*", "html", "htm"
].map(x => { return "." + x; }).join(",");

export const UploadInput = ({ handleFile }) => {
  const handleChange = e => {
		const files = e.target.files;
		if (files && files[0]) handleFile(files[0]);
	};
  return (
    <Input type="file" onChange={handleChange} accept={SheetJSFT} />
  )
}
