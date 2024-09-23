import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Autocomplete, Box, TextField, Typography } from '@mui/material';
import { useState, useEffect } from 'react';

import top100Films from '../dummy/top100Films';
import moment from 'moment';
import { Link } from 'react-router-dom';

const columns: GridColDef[] = [
  { 
    field: 'id', 
    headerName: 'ID', 
    width: 70,
    renderCell: ({ id }) => <Link to={`/details/${id}`}>{ id }</Link>
  },
  { field: 'title', headerName: 'Title', width: 130 },
  { field: 'author', headerName: 'Author', width: 130 },
  {
    field: 'publishDate',
    headerName: 'Publish Date',
    type: 'date',
    sortable: false,
    width: 120,
    valueFormatter: (dateTo) => {
      return moment(dateTo,'DD-MM-YYYY').format('DD-MM-YYYY')
    }
  },
  {
    field: 'description',
    headerName: 'Description',
    description: 'Description of the book.',
    sortable: false,
    width: 300,
  },
  {
    field: 'isbn',
    headerName: 'ISBN',
    description: 'ISBN number.',
    sortable: false,
    width: 200,
  },
  {
    field: 'coverPhoto',
    headerName: 'Cover Photo',
    description: 'Cover photo of the book',
    sortable: false,
    width: 160,
    renderCell: (params) => <img width={40} src={params.value} />
  },
];

const rows = [
  { id: 1, title: 'Snow', author: 'Jon', description: 'Lorem ipsum dolor semit', publishDate: '18-03-2010', isbn: '83-123213-4324', coverPhoto: 'http://localhost:8100/images/cat-1.jpg'},
  { id: 2, title: 'Lannister', author: 'Cersei', description: 'Lorem ipsum dolor semit', publishDate: '18-03-2010', isbn: '83-123213-4324', coverPhoto: 'http://localhost:8100/images/cat-1.jpg'},
  { id: 3, title: 'Lannister', author: 'Jaime', description: 'Lorem ipsum dolor semit', publishDate: '18-03-2010', isbn: '83-123213-4324', coverPhoto: 'http://localhost:8100/images/cat-1.jpg'},
  { id: 4, title: 'Stark', author: 'Arya', description: 'Lorem ipsum dolor semit', publishDate: '18-03-2010', isbn: '83-123213-4324', coverPhoto: 'http://localhost:8100/images/cat-1.jpg'},
  { id: 5, title: 'Targaryen', author: 'Daenerys', description: 'Lorem ipsum dolor semit', publishDate: '18-03-2010', isbn: '83-123213-4324', coverPhoto: 'http://localhost:8100/images/cat-1.jpg'},
  { id: 6, title: 'Melisandre', author: 'Bla', description: 'Lorem ipsum dolor semit', publishDate: '18-03-2010', isbn: '83-123213-4324', coverPhoto: 'http://localhost:8100/images/cat-1.jpg'},
];

const paginationModel = { page: 0, pageSize: 5 };

export default function HomePage() {

  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8100/books')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setBooks(data);
      });
  }, []);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', gap: '40px', margin: '20px 0'}}>
        <Typography>Search for</Typography>
        <Autocomplete
          disablePortal
          options={top100Films}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Book Title or Author" />}
        />
      </Box>
      <Paper sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>
    </Box>
  );
}