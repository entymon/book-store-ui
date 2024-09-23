import { Box, Button, Container, Typography } from '@mui/material'
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { API_URL } from '../constants';
import moment, { Moment } from 'moment';

export type BookType = {
  title: string;
  author: string;
  description: string;
  isbn: string;
  publishDate: Moment;
  coverPhoto: string;
}

function DetailsPage() {

  const emptyBook: BookType = {
    title: '',
    author: '',
    description: '',
    isbn: '',
    publishDate: moment(),
    coverPhoto: '',
  }

  let { id } = useParams();
  const [book, setBook] = useState(emptyBook)

  useEffect(() => {
    fetch(`${API_URL}/book/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setBook(data);
      });
  }, []);

  return (
    <Container>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px', justifyContent: 'center' }}>
        <Box sx={{ display: { xs: 'none', sm: 'block', marginTop: '30px' } }}>
          <Button variant="contained" component={Link} to="/" sx={{ color: '#000', marginRight: 5, backgroundColor: '#FFF' }}>
              Back
          </Button>
        </Box>

        <Box>
          <Typography variant='body1' fontWeight={900}>Title</Typography>
          <Typography variant='h6'>{ book.title }</Typography>
        </Box>

        <Box>
          <Typography variant='body1' fontWeight={900}>Author</Typography>
          <Typography variant='h6'>{ book.author }</Typography>
        </Box>

        <Box>
          <Typography variant='body1' fontWeight={900}>Descripton</Typography>
          <Typography variant='h6'>{ book.description }</Typography>
        </Box>

        <Box>
          <Typography variant='body1' fontWeight={900}>ISBN</Typography>
          <Typography variant='h6'>{ book.isbn }</Typography>
        </Box>

        <Box>
          <Typography variant='body1' fontWeight={900}>Publish Date</Typography>
          <Typography variant='h6'>{ moment(book.publishDate.date.toString()).format('DD-MM-YYYY') }</Typography>
        </Box>

        <Box>
          { book.coverPhoto ? (<img src={book.coverPhoto} width={200}/>) : null }
        </Box>
      </Box>
    </Container>
  )
}

export default DetailsPage
