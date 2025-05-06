import { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  TablePagination,
  Button,
} from "@mui/material";
import { CalculateOutlined as CalculateIcon } from "@mui/icons-material";
import { FileDownloadOutlined as DownloadIcon } from "@mui/icons-material";
import { Info as InfoIcon } from "@mui/icons-material";
import { CalculatorForm } from "../components/Form";
import { AmortizationTable } from "../components/Amortization";
import * as XLSX from "xlsx";

const currencies = [
  { value: "USD", label: "$", name: "US Dollar" },
  { value: "EUR", label: "€", name: "Euro" },
  { value: "GBP", label: "£", name: "British Pound" },
  { value: "INR", label: "₹", name: "Indian Rupee" },
  { value: "JPY", label: "¥", name: "Japanese Yen" },
  { value: "CNY", label: "¥", name: "Chinese Yuan" },
  { value: "AUD", label: "A$", name: "Australian Dollar" },
  { value: "CAD", label: "C$", name: "Canadian Dollar" },
  { value: "CHF", label: "Fr", name: "Swiss Franc" },
  { value: "AED", label: "د.إ", name: "UAE Dirham" },
  { value: "SGD", label: "S$", name: "Singapore Dollar" },
  { value: "NZD", label: "NZ$", name: "New Zealand Dollar" },
];

const Home = () => {
  const [loanDetails, setLoanDetails] = useState({
    monthlyPayment: 0,
    totalPayment: 0,
    totalInterest: 0,
  });
  const [amortizationSchedule, setAmortizationSchedule] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  const handleCalculate = (principal, rate, months) => {
    const monthlyRate = rate / 12 / 100;
    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    const totalPayment = monthlyPayment * months;
    const totalInterest = totalPayment - principal;

    setLoanDetails({
      monthlyPayment: monthlyPayment.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
    });

    let balance = principal;
    const schedule = [];

    for (let month = 1; month <= months; month++) {
      const interest = balance * monthlyRate;
      const principalPaid = monthlyPayment - interest;
      balance = Math.max(0, balance - principalPaid);

      schedule.push({
        month,
        payment: monthlyPayment.toFixed(2),
        principal: principalPaid.toFixed(2),
        interest: interest.toFixed(2),
        balance: balance.toFixed(2),
      });
    }

    setAmortizationSchedule(schedule);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleExport = () => {
    const currencyName =
      currencies.find((c) => c.value === selectedCurrency)?.value || "USD";
    const excelData = amortizationSchedule.map((row) => ({
      Month: row.month,
      [`Payment (${getCurrencySymbol()})`]: row.payment,
      [`Principal (${getCurrencySymbol()})`]: row.principal,
      [`Interest (${getCurrencySymbol()})`]: row.interest,
      [`Balance (${getCurrencySymbol()})`]: row.balance,
    }));

    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Amortization");
    XLSX.writeFile(wb, `amortization_schedule_${currencyName}.xlsx`);
  };

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
  };

  const getCurrencySymbol = () => {
    const currency = currencies.find((c) => c.value === selectedCurrency);
    return currency?.label || "$";
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        bgcolor: "background.default",
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", md: "450px" },
          borderRight: { md: "1px solid" },
          borderColor: "divider",
          display: "flex",
          flexDirection: "column",
          minHeight: { xs: "auto", md: "100vh" },
          bgcolor: "background.paper",
          boxShadow: { xs: "0 2px 8px rgba(0,0,0,0.1)", md: "none" },
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            p: 3,
            borderBottom: "1px solid",
            borderColor: "divider",
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box
            sx={{
              bgcolor: "primary.light",
              p: 1,
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CalculateIcon sx={{ fontSize: 28, color: "primary.main" }} />
          </Box>
          <Typography variant="h5" fontWeight="600" color="text.primary">
            Loan Calculator
          </Typography>
        </Box>

        <Box
          sx={{
            p: 3,
            overflow: "auto",
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              bgcolor: "divider",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-track": {
              bgcolor: "background.default",
              borderRadius: "4px",
            },
          }}
        >
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            Enter your loan details below to calculate EMI and view amortization
            schedule
          </Typography>

          <CalculatorForm
            onCalculate={handleCalculate}
            onCurrencyChange={handleCurrencyChange}
            selectedCurrency={selectedCurrency}
          />
        </Box>

        <Box
          sx={{
            p: 3,
            borderTop: "1px solid",
            borderColor: "divider",
            bgcolor: "background.default",
          }}
        >
          <Button
            fullWidth
            variant="text"
            color="primary"
            startIcon={<InfoIcon />}
            sx={{
              py: 1.5,
              textTransform: "none",
              fontWeight: 500,
            }}
          >
            How the Calculator Works
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: { xs: "500px", md: "100vh" },
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            p: { xs: 2, md: 3 },
            borderBottom: "1px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  bgcolor: "primary.main",
                  height: "100%",
                  minHeight: "140px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <Typography
                  color="primary.contrastText"
                  gutterBottom
                  variant="subtitle1"
                  sx={{ opacity: 0.9 }}
                >
                  Monthly Payment
                </Typography>
                <Typography
                  color="primary.contrastText"
                  variant="h3"
                  fontWeight="bold"
                >
                  {loanDetails.monthlyPayment
                    ? `${getCurrencySymbol()}${loanDetails.monthlyPayment.toLocaleString()}`
                    : `${getCurrencySymbol()}0.00`}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  height: "100%",
                  minHeight: "140px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  bgcolor: "background.default",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <Typography
                  color="text.secondary"
                  gutterBottom
                  variant="subtitle1"
                >
                  Total Payment
                </Typography>
                <Typography variant="h3" fontWeight="bold">
                  {loanDetails.totalPayment
                    ? `${getCurrencySymbol()}${loanDetails.totalPayment.toLocaleString()}`
                    : `${getCurrencySymbol()}0.00`}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  height: "100%",
                  minHeight: "140px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  bgcolor: "error.light",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <Typography
                  color="error.contrastText"
                  gutterBottom
                  variant="subtitle1"
                  sx={{ opacity: 0.9 }}
                >
                  Total Interest
                </Typography>
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  color="error.contrastText"
                >
                  {loanDetails.totalInterest
                    ? `${getCurrencySymbol()}${loanDetails.totalInterest.toLocaleString()}`
                    : `${getCurrencySymbol()}0.00`}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        {amortizationSchedule.length > 0 ? (
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              bgcolor: "background.default",
            }}
          >
            <Box
              sx={{
                p: { xs: 2, md: 3 },
                borderBottom: "1px solid",
                borderColor: "divider",
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: { xs: 2, sm: 0 },
                justifyContent: "space-between",
                alignItems: { xs: "stretch", sm: "center" },
                bgcolor: "background.paper",
              }}
            >
              <Typography variant="h6" fontWeight="600">
                Amortization Schedule
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth={false}
                size="medium"
                startIcon={<DownloadIcon />}
                onClick={handleExport}
                sx={{
                  py: 1.5,
                  px: 4,
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 500,
                  boxShadow: "none",
                  "&:hover": {
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  },
                }}
              >
                Export
              </Button>
            </Box>
            <Box
              sx={{
                flex: 1,
                overflow: "auto",
                p: { xs: 1, md: 3 },
                "&::-webkit-scrollbar": {
                  width: "8px",
                },
                "&::-webkit-scrollbar-thumb": {
                  bgcolor: "divider",
                  borderRadius: "4px",
                },
                "&::-webkit-scrollbar-track": {
                  bgcolor: "background.default",
                  borderRadius: "4px",
                },
              }}
            >
              <Box
                sx={{
                  overflowX: "auto",
                  width: "100%",
                  "&::-webkit-scrollbar": {
                    height: "8px",
                  },
                }}
              >
                <AmortizationTable
                  schedule={amortizationSchedule.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )}
                  currencySymbol={getCurrencySymbol()}
                />
              </Box>
            </Box>
            <TablePagination
              component="div"
              count={amortizationSchedule.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{
                borderTop: "1px solid",
                borderColor: "divider",
                bgcolor: "background.paper",
                "& .MuiTablePagination-toolbar": {
                  px: { xs: 1, md: 3 },
                  flexWrap: "wrap",
                },
                "& .MuiTablePagination-select": {
                  borderRadius: 1,
                },
              }}
            />
          </Box>
        ) : (
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 3,
              bgcolor: "background.default",
            }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 4,
                textAlign: "center",
                borderRadius: 3,
                maxWidth: 500,
                width: "100%",
                bgcolor: "background.paper",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
            >
              <Box
                sx={{
                  bgcolor: "primary.light",
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 3,
                }}
              >
                <CalculateIcon color="primary" sx={{ fontSize: 40 }} />
              </Box>
              <Typography variant="h6" fontWeight="600" gutterBottom>
                EMI Calculator
              </Typography>
              <Typography
                color="text.secondary"
                sx={{ mb: 3, maxWidth: 400, mx: "auto" }}
              >
                Enter your loan details to calculate your monthly payments and
                view the complete amortization schedule.
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  px: 4,
                  fontWeight: 500,
                }}
              >
                How It Works
              </Button>
            </Paper>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Home;
