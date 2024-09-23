import { Link } from 'react-router-dom'

import '../App.css'
import { Box } from '@mui/material'

function Navbar() {
  return (
    <Box sx={{
        display: 'flex',
        flexDirection: 'row'
    }}>
        <Box>
            <Link to="/">Books</Link>
        </Box>
        <Box>
            <Link to="/create">Add New</Link>
        </Box>
    </Box>
  )
}

export default Navbar