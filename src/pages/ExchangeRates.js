import { useState, useEffect, useCallback } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  InputAdornment,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Search as SearchIcon,
  Refresh as RefreshIcon,
  ArrowUpward as ArrowUpIcon,
  ArrowDownward as ArrowDownIcon,
} from "@mui/icons-material";
import { currencies } from "../constants/currencies";

export const ExchangeRates = () => {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchRates = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_EXCHANGE_RATE_BASE_URL}/${process.env.REACT_APP_EXCHANGE_RATE_API_KEY}/latest/USD`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      if (data.result === "success") {
        const ratesArray = Object.entries(data.conversion_rates)
          .map(([code, rate]) => ({
            code,
            rate,
            name: currencies.find((c) => c.value === code)?.name || code,
          }))
          .sort((a, b) =>
            sortDirection === "asc"
              ? a.code.localeCompare(b.code)
              : b.code.localeCompare(a.code)
          );

        setRates(ratesArray);
        setLastUpdated(new Date());
        setError(null);
      } else {
        throw new Error(data.error || "Failed to fetch rates");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message || "Failed to fetch exchange rates");
      setRates([]);
    } finally {
      setLoading(false);
    }
  }, [sortDirection]);

  useEffect(() => {
    fetchRates();
    const interval = setInterval(fetchRates, 60000);
    return () => clearInterval(interval);
  }, [fetchRates]);

  const handleSort = () => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const filteredRates = rates.filter(
    (rate) =>
      rate.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rate.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 1200, mx: "auto" }}>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, md: 3 },
          mb: 3,
          borderRadius: 2,
          background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
          color: "white",
        }}
      >
        <Typography variant="h4" fontWeight="600" gutterBottom>
          Live Exchange Rates
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.9 }}>
          Real-time currency exchange rates against USD
        </Typography>
        {lastUpdated && (
          <Typography
            variant="caption"
            sx={{ display: "block", mt: 1, opacity: 0.8 }}
          >
            Last updated: {lastUpdated.toLocaleTimeString()}
          </Typography>
        )}
      </Paper>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <TextField
          placeholder="Search currency..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          sx={{
            flex: { xs: "1 1 100%", sm: "0 1 300px" },
            bgcolor: "background.paper",
            borderRadius: 1,
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Chip
            label={`${filteredRates.length} currencies`}
            color="primary"
            variant="outlined"
          />
          <Tooltip title="Refresh rates">
            <IconButton onClick={fetchRates} disabled={loading} color="primary">
              <RefreshIcon />
              {loading && (
                <CircularProgress
                  size={24}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: "-12px",
                    marginLeft: "-12px",
                  }}
                />
              )}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Paper
        elevation={0}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <TableContainer sx={{ maxHeight: "calc(100vh - 300px)" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ cursor: "pointer" }} onClick={handleSort}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    Currency Code
                    {sortDirection === "asc" ? (
                      <ArrowUpIcon />
                    ) : (
                      <ArrowDownIcon />
                    )}
                  </Box>
                </TableCell>
                <TableCell>Currency Name</TableCell>
                <TableCell align="right">Rate (USD)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRates
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((rate) => (
                  <TableRow
                    key={rate.code}
                    sx={{
                      "&:nth-of-type(odd)": { bgcolor: "action.hover" },
                      transition: "all 0.2s",
                      "&:hover": {
                        bgcolor: "action.selected",
                        transform: "translateX(4px)",
                      },
                    }}
                  >
                    <TableCell>
                      <Chip
                        label={rate.code}
                        size="small"
                        color="primary"
                        variant="outlined"
                        sx={{ minWidth: 80 }}
                      />
                    </TableCell>
                    <TableCell>{rate.name}</TableCell>
                    <TableCell align="right">
                      <Typography
                        component="span"
                        sx={{
                          fontFamily: "monospace",
                          fontWeight: 600,
                        }}
                      >
                        {rate.rate.toFixed(4)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={filteredRates.length}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          rowsPerPageOptions={[25, 50, 100]}
        />
      </Paper>
    </Box>
  );
};
