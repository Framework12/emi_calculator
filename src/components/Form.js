import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  Select,
  MenuItem,
} from "@mui/material";

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

export const CalculatorForm = ({
  onCalculate,
  onCurrencyChange,
  selectedCurrency,
}) => {
  const [principal, setPrincipal] = useState();
  const [rate, setRate] = useState();
  const [tenure, setTenure] = useState();
  const [errors, setErrors] = useState({});

  const validateInputs = () => {
    const newErrors = {};
    if (principal <= 0) newErrors.principal = "Amount must be greater than 0";
    if (rate <= 0) newErrors.rate = "Rate must be greater than 0";
    if (tenure <= 0) newErrors.tenure = "Tenure must be greater than 0";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateInputs()) {
      onCalculate(principal, rate, tenure);
    }
  };

  const handlePrincipalChange = (e) => {
    const value = Math.max(0, Number(e.target.value));
    setPrincipal(value);
  };

  const handleRateChange = (e) => {
    const value = Math.max(0, Number(e.target.value));
    setRate(value);
  };

  const handleTenureChange = (e) => {
    const value = Math.max(0, Number(e.target.value));
    setTenure(value);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Typography variant="h6" gutterBottom>
        Loan Calculator
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
          <TextField
            fullWidth
            label="Loan Amount"
            type="number"
            value={principal}
            onChange={handlePrincipalChange}
            inputProps={{ min: "0" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {currencies.find((c) => c.value === selectedCurrency)?.label}
                </InputAdornment>
              ),
            }}
            error={!!errors.principal}
            helperText={errors.principal}
          />
          <Select
            value={selectedCurrency}
            onChange={(e) => onCurrencyChange(e.target.value)}
            size="small"
            sx={{
              minWidth: 100,
              mt: 1,
              "& .MuiSelect-select": {
                py: 1.5,
              },
            }}
          >
            {currencies.map((currency) => (
              <MenuItem
                key={currency.value}
                value={currency.value}
                sx={{
                  display: "flex",
                  gap: 1,
                  alignItems: "center",
                }}
              >
                <span>{currency.label}</span>
                <span>{currency.value}</span>
              </MenuItem>
            ))}
          </Select>
        </Box>

        <TextField
          fullWidth
          label="Interest Rate"
          type="number"
          value={rate}
          onChange={handleRateChange}
          inputProps={{ min: "0", step: "0.1" }}
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          }}
          error={!!errors.rate}
          helperText={errors.rate}
          sx={{ mt: 3 }}
        />

        <TextField
          fullWidth
          label="Loan Term (Months)"
          type="number"
          value={tenure}
          onChange={handleTenureChange}
          inputProps={{ min: "0" }}
          error={!!errors.tenure}
          helperText={errors.tenure}
          sx={{ mt: 3 }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          sx={{
            mt: 3,
            py: 1.5,
            fontSize: "1.1rem",
            borderRadius: 2,
            textTransform: "none",
            bgcolor: "primary.main",
            "&:hover": {
              bgcolor: "primary.dark",
            },
          }}
        >
          Calculate EMI
        </Button>
      </form>
    </Box>
  );
};
