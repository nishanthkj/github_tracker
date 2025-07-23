import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Link,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

import { useGitHubAuth } from "../../hooks/useGitHubAuth";
import { useGitHubData } from "../../hooks/useGitHubData";
import { usePagination } from "../../hooks/usePagination";

const ROWS_PER_PAGE = 10;

interface GitHubItem {
  id: number;
  title: string;
  state: string;
  created_at: string;
  pull_request?: { merged_at: string | null };
  repository_url: string;
  html_url: string;
}

const Home: React.FC<{ theme: string }> = ({ theme }) => {
  useEffect(() => {
    console.log("Theme updated in Home:", theme);
  }, [theme]);

  const {
    username,
    setUsername,
    token,
    setToken,
    error: authError,
    getOctokit,
  } = useGitHubAuth();

  const octokit = getOctokit();
  const {
    issues,
    prs,
    loading,
    error: dataError,
    fetchData,
  } = useGitHubData(octokit);

  const { page, itemsPerPage, handleChangePage, paginateData } =
    usePagination(ROWS_PER_PAGE);

  const [tab, setTab] = useState(0);
  const [issueFilter, setIssueFilter] = useState<string>("all");
  const [prFilter, setPrFilter] = useState<string>("all");
  const [searchTitle, setSearchTitle] = useState<string>("");
  const [selectedRepo, setSelectedRepo] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    fetchData(username);
  };

  const formatDate = (dateString: string): string =>
    new Date(dateString).toLocaleDateString();

  const filterData = (data: GitHubItem[], filterType: string): GitHubItem[] => {
    let filteredData = [...data];

    if (filterType === "open" || filterType === "closed" || filterType === "merged") {
      filteredData = filteredData.filter((item) =>
        filterType === "merged"
          ? item.pull_request?.merged_at
          : item.state === filterType
      );
    }

    if (searchTitle) {
      filteredData = filteredData.filter((item) =>
        item.title.toLowerCase().includes(searchTitle.toLowerCase())
      );
    }

    if (selectedRepo) {
      filteredData = filteredData.filter((item) =>
        item.repository_url.includes(selectedRepo)
      );
    }

    if (startDate) {
      filteredData = filteredData.filter(
        (item) => new Date(item.created_at) >= new Date(startDate)
      );
    }
    if (endDate) {
      filteredData = filteredData.filter(
        (item) => new Date(item.created_at) <= new Date(endDate)
      );
    }

    return filteredData;
  };

  const currentData =
    tab === 0 ? filterData(issues, issueFilter) : filterData(prs, prFilter);

  const displayData = paginateData(currentData);

  return (
    <Container
      maxWidth="lg"
      sx={{
        backgroundColor: theme === "dark" ? "#121212" : "#fff",
        color: theme === "dark" ? "#eee" : "#111",
        display: "flex",
        flexDirection: "column",
        minHeight: "78vh",
        mt: 4,
      }}
    >
      {/* Auth Form */}
      <Paper
        elevation={1}
        sx={{
          p: 2,
          mb: 4,
          backgroundColor: theme === "dark" ? "#1e1e1e" : "#f5f5f5",
          color: theme === "dark" ? "#e0e0e0" : "#000",
          border: "1px solid",
          borderColor: theme === "dark" ? "#444" : "#ccc",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <TextField
              label="GitHub Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              sx={{
                flex: 1,
                "& .MuiOutlinedInput-root": {
                  backgroundColor: theme === "dark" ? "#2a2a2a" : "#fff",
                },
              }}
            />
            <TextField
              label="Personal Access Token"
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              required
              sx={{
                flex: 1,
                "& .MuiOutlinedInput-root": {
                  backgroundColor: theme === "dark" ? "#2a2a2a" : "#fff",
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                minWidth: "120px",
                borderRadius: "8px",
                backgroundColor: theme === "dark" ? "#1976d2" : "#1976d2",
                color: "#fff",
                "&:hover": {
                  backgroundColor: theme === "dark" ? "#1565c0" : "#1565c0",
                },
              }}
            >
              Fetch Data
            </Button>
          </Box>
        </form>
      </Paper>

      {/* Filters */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
        <TextField
          label="Search Title"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          sx={{ flexBasis: "23%" }}
        />
        <TextField
          label="Repository"
          value={selectedRepo}
          onChange={(e) => setSelectedRepo(e.target.value)}
          sx={{ flexBasis: "23%" }}
        />
        <TextField
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ flexBasis: "23%" }}
        />
        <TextField
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ flexBasis: "23%" }}
        />
      </Box>

      {/* Tabs and Filter Dropdown */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          mb: 3,
        }}
      >
        <Tabs
          value={tab}
          onChange={(e, newValue) => setTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ flexGrow: 1, minWidth: "200px" }}
        >
          <Tab label={`Issues (${filterData(issues, issueFilter).length})`} />
          <Tab label={`Pull Requests (${filterData(prs, prFilter).length})`} />
        </Tabs>

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>State</InputLabel>
          <Select
            value={tab === 0 ? issueFilter : prFilter}
            onChange={(e) =>
              tab === 0
                ? setIssueFilter(e.target.value as string)
                : setPrFilter(e.target.value as string)
            }
            label="State"
            sx={{
              backgroundColor: theme === "dark" ? "#2a2a2a" : "#fff",
              color: theme === "dark" ? "#eee" : "#000",
            }}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="open">Open</MenuItem>
            <MenuItem value="closed">Closed</MenuItem>
            {tab === 1 && <MenuItem value="merged">Merged</MenuItem>}
          </Select>
        </FormControl>
      </Box>

      {/* Alerts */}
      {(authError || dataError) && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {authError || dataError}
        </Alert>
      )}

      {/* Table or Loader */}
      {loading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          <TableContainer
            component={Paper}
            sx={{
              backgroundColor: theme === "dark" ? "#1e1e1e" : "#fff",
              color: theme === "dark" ? "#eee" : "#111",
            }}
          >
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell align="center">Repository</TableCell>
                  <TableCell align="center">State</TableCell>
                  <TableCell>Created</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayData.map((item: GitHubItem) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Link
                        href={item.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.title}
                      </Link>
                    </TableCell>
                    <TableCell align="center">
                      {item.repository_url.split("/").slice(-1)[0]}
                    </TableCell>
                    <TableCell align="center">
                      {item.pull_request?.merged_at ? "merged" : item.state}
                    </TableCell>
                    <TableCell>{formatDate(item.created_at)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={currentData.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={itemsPerPage}
              rowsPerPageOptions={[5]}
            />
          </TableContainer>
        </Box>
      )}
    </Container>
  );
};

export default Home;
