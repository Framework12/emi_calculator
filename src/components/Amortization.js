import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableRow, 
  Paper, 
  TableContainer,
  Collapse,
  IconButton,
  Box,
  Typography,
  CircularProgress,
} from '@mui/material';
import {
  KeyboardArrowDown as ExpandMoreIcon,
  KeyboardArrowUp as ExpandLessIcon,
} from '@mui/icons-material';
import { useState } from 'react';

const Row = ({ row, currencySymbol }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow 
        sx={{
          '&:nth-of-type(odd)': {
            bgcolor: 'background.default',
          },
          '&:hover': {
            bgcolor: 'action.hover',
          },
          transition: 'background-color 0.2s',
        }}
      >
        <TableCell>
          <IconButton
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.month}</TableCell>
        <TableCell align="right">{currencySymbol}{row.payment}</TableCell>
        <TableCell align="right">{currencySymbol}{row.principal}</TableCell>
        <TableCell align="right">{currencySymbol}{row.interest}</TableCell>
        <TableCell align="right">{currencySymbol}{row.balance}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2 }}>
              <Typography variant="h6" gutterBottom component="div">
                Payment Details
              </Typography>
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">Principal:</TableCell>
                    <TableCell align="right">
                      {currencySymbol}{row.principal} ({((parseFloat(row.principal) / parseFloat(row.payment)) * 100).toFixed(2)}%)
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">Interest:</TableCell>
                    <TableCell align="right">
                      {currencySymbol}{row.interest} ({((parseFloat(row.interest) / parseFloat(row.payment)) * 100).toFixed(2)}%)
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export const AmortizationTable = ({ schedule, loading, currencySymbol }) => {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!schedule || schedule.length === 0) return null;

  return (
    <TableContainer 
      component={Paper} 
      elevation={0}
      sx={{
        borderRadius: 2,
        '& .MuiTableCell-root': {
          px: 3,
          py: 2,
        },
      }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell width="48px" sx={{ bgcolor: 'background.paper' }} />
            <TableCell sx={{ fontWeight: 600, bgcolor: 'background.paper' }}>
              Month
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: 600, bgcolor: 'background.paper' }}>
              Payment ({currencySymbol})
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: 600, bgcolor: 'background.paper' }}>
              Principal ({currencySymbol})
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: 600, bgcolor: 'background.paper' }}>
              Interest ({currencySymbol})
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: 600, bgcolor: 'background.paper' }}>
              Balance ({currencySymbol})
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {schedule.map((row) => (
            <Row key={row.month} row={row} currencySymbol={currencySymbol} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};