import React, { useState } from 'react'
import styled from 'styled-components'
import XLSX from 'xlsx'
import { useDispatch, useSelector } from 'react-redux'
import { UploadInput } from '../UploadInput'
import { setData, setColumns, setFileName } from '../common/actions';
import { makeColumns } from '../lib/utils'

const UploadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 500px;
  height: 400px;
  margin-top: 50px;
  background: ${({ isDragging }) => isDragging ? 'pink' : 'whitesmoke'};
  border: 2px dashed black;
  }
`
const DropZoneTitle = styled.div`
  font-size: 25px;
  text-align: center;
  width: 100%;
  padding: 5px;
`
const SuccessTitle = styled.p`
  color: green;
`

export const DropZone = () => {
  const [isDragging, setIsDragging] = useState(false)
  const fileName = useSelector(state => state.data.fileName)
  const dispatch = useDispatch()

  const handleDragEnter = e => {
    e.preventDefault()
    e.stopPropagation()
    console.log('ENTER')
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true)
    }
  }

  const handleDragLeave = e => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = e => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    const files = e.dataTransfer.files, f = files[0]
    const reader = new FileReader()

    reader.onload = () => {
      if (files.length) {
        handleFile(files[0])
      }
    }
    reader.readAsArrayBuffer(f)
  }

  const handleFile = file => {
    const reader = new FileReader()
		const rABS = !!reader.readAsBinaryString
		reader.onload = e => {
      const bstr = e.target.result
			const wb = XLSX.read(bstr, {type:rABS ? 'binary' : 'array'})
			const wsname = wb.SheetNames[0]
			const ws = wb.Sheets[wsname]
			const data = XLSX.utils.sheet_to_json(ws, { header:1 })
      dispatch(setData(data))
      dispatch(setColumns(makeColumns(ws['!ref'])))
      dispatch(setFileName(file.name))
		}
		if(rABS) reader.readAsBinaryString(file); else reader.readAsArrayBuffer(file);
  }

  return (
    <UploadWrapper isDragging={isDragging} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDrop={handleDrop}>
      <DropZoneTitle>
      {
        fileName ? <SuccessTitle>{fileName} <br />successfully has been uploaded <br /> go to Data Table to see</SuccessTitle> : 'Drop file here'
      }
      </DropZoneTitle>
      <UploadInput handleFile={handleFile} />
    </UploadWrapper>
  )
}
