import React, { useEffect, useState } from 'react'
import {Button, IconButton, TextField} from '@mui/material'
import {AiOutlineSearch} from 'react-icons/ai';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
export default function Search() {
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    async function fetchingData() {
      await fetch('http://34.207.151.201:3000/fetchData', {
        method: 'GET'
      }).then(async (response) => {
        let data = await response.json();
        setData(data.data)
        setFilteredData(data.data)
      }
      )
    }
    fetchingData();
  }, [])
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e) => {
    setSearchInput(e.target.value)
    let query = e.target.value

    const filtered = data.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(query.toLowerCase())
      ));
    setFilteredData(filtered);
  }
  const navigate=useNavigate()
  return (
    <div> <h2>
      <center>Vendors List </center>
    </h2>
   
    <div  style={{display:'flex', justifyContent:"space-around", margin:"2rem"}}>
    <TextField
    variant='outlined'
        label="Search"
        value={searchInput}
        onChange={handleChange}
        
        InputProps={{
          endAdornment: (
            <IconButton edge="end">
              <AiOutlineSearch />
            </IconButton>
          ),
        }}
      />
       <Button variant='outlined' onClick={()=>navigate('/')}>Go Back To Form</Button>

  
     </div>
      <div className='container-fluid'>
      <TableContainer component={Paper} elevation={5} style={{ maxHeight: 'calc(100vh - 180px)', overflow: 'auto' }}>
      <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Project</TableCell>
              <TableCell>Vendor Code</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.project}</TableCell>
                <TableCell>{item.vendor_code}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
    </div>
  )
}
