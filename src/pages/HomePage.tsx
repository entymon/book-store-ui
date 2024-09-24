/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Autocomplete, Box, TextField, Typography } from '@mui/material';
import { useState, useEffect } from 'react';

// import top100Films from '../dummy/top100Films';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { API_URL } from '../constants';

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
    valueFormatter: (dateTo: any) => {
      return moment(dateTo.date,'DD-MM-YYYY').format('DD-MM-YYYY')
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

const paginationModel = { page: 1, pageSize: 10 };

export default function HomePage() {

  const [books, setBooks] = useState([]);
  const [searchBooks, setSearchBooks] = useState([]);

  useEffect(() => {
    getAll()
  }, []);

  const getAll = () => {
    fetch(`${API_URL}/books`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setBooks(data.data);
      });
  }

  const doSearch = (phrase: string) => {
    fetch(`${API_URL}/search/${phrase}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setSearchBooks(data);
      });
  }

  const getOne = (id: number) => {
    fetch(`${API_URL}/book/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setSearchBooks([(data as never)]);
        setBooks([(data as never)]);
      });
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', gap: '40px', margin: '20px 0'}}>
        <Typography>Search for</Typography>
        <Autocomplete
          disablePortal
          options={searchBooks}
          getOptionLabel={(options: { title: string; author: string; id: number }) => `${options.title} - ${options.author}`}
          sx={{ width: 300 }}
          renderInput={(params) => {
            return (<TextField {...params} label="Book Title or Author" />)
          }}
          onInputChange={(event) => {
            doSearch((event.target as any).value)
          }}
          onChange={(_event, value, reason: string) => { 
            if (reason === 'clear') {
              getAll()
            } else {
              getOne((value as any).id)
            }
          }}
        />
      </Box>
      <Paper sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={books}
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