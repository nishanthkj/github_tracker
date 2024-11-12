import { Octokit } from '@octokit/core';
import { createElement as h, useState, useCallback } from 'react';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
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
} from '@mui/material';

function Home() {
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');
  const [issues, setIssues] = useState([]);
  const [prs, setPrs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tab, setTab] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(5);
  const [issueFilter, setIssueFilter] = useState('all');
  const [prFilter, setPrFilter] = useState('all');

  const fetchData = useCallback(async () => {
    if (!username || !token) return;

    setLoading(true);
    setError('');

    try {
      const octokit = new Octokit({ auth: token });

      // Fetch issues
      const issuesResponse = await octokit.request('GET /search/issues', {
        q: `author:${username} is:issue`,
        sort: 'created',
        order: 'desc',
        per_page: 100,
      });

      // Fetch PRs
      const prsResponse = await octokit.request('GET /search/issues', {
        q: `author:${username} is:pr`,
        sort: 'created',
        order: 'desc',
        per_page: 100,
      });

      setIssues(issuesResponse.data.items);
      setPrs(prsResponse.data.items);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [username, token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const filterData = (data, filterType) => {
    switch (filterType) {
      case 'open':
        return data.filter(item => item.state === 'open');
      case 'closed':
        return data.filter(item => item.state === 'closed' && !item.pull_request?.merged_at);
      case 'merged':
        return data.filter(item => item.pull_request?.merged_at);
      default:
        return data;
    }
  };

  const currentData = tab === 0
    ? filterData(issues, issueFilter)
    : filterData(prs, prFilter);

  const displayData = currentData.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  return h(Container, { maxWidth: 'lg', sx: { display: 'flex', flexDirection: 'column', minHeight: '78vh', mt: 4 } }, [
    h(Paper, { elevation: 1, sx: { p: 2, mb: 4 } }, [
    //  h(Typography, { variant: 'h4', component: 'h1', gutterBottom: true }, ''),
      h('form', { onSubmit: handleSubmit }, [
        h(Box, { sx: { display: 'flex', gap: 2 } }, [
          h(TextField, {
            label: 'GitHub Username',
            value: username,
            onChange: (e) => setUsername(e.target.value),
            required: true,
            sx: { flex: 1 },
          }),
          h(TextField, {
            label: 'Personal Access Token',
            value: token,
            onChange: (e) => setToken(e.target.value),
            type: 'password',
            required: true,
            sx: { flex: 1 },
          }),
          h(Button, {
            type: 'submit',
            variant: 'contained',
            sx: { minWidth: '120px' },
          }, 'Fetch Data'),
        ]),
      ]),
    ]),

    error && h(Alert, { severity: 'error', sx: { mb: 3 } }, error),

    loading ?
      h(Box, { display: 'flex', justifyContent: 'center', my: 4 }, h(CircularProgress)) :
      h(Box, null, [
        h(Box, { sx: { display: 'flex', alignItems: 'center', gap: 2, mb: 3 } }, [
          h(Tabs, {
            value: tab,
            onChange: (e, newValue) => setTab(newValue),
            sx: { flex: 1 },
          }, [
            h(Tab, { label: `Issues (${filterData(issues, issueFilter).length})` }),
            h(Tab, { label: `Pull Requests (${filterData(prs, prFilter).length})` }),
          ]),
          h(FormControl, { sx: { minWidth: 120 } }, [
            h(InputLabel, null, 'Filter'),
            h(Select, {
              value: tab === 0 ? issueFilter : prFilter,
              onChange: (e) => tab === 0 ? setIssueFilter(e.target.value) : setPrFilter(e.target.value),
              label: 'Filter',
            }, [
              h(MenuItem, { value: 'all' }, 'All'),
              h(MenuItem, { value: 'open' }, 'Open'),
              h(MenuItem, { value: 'closed' }, 'Closed'),
              ...(tab === 1 ? [h(MenuItem, { value: 'merged' }, 'Merged')] : []),
            ]),
          ]),
        ]),

        h(TableContainer, { component: Paper }, [
          h(Table, null, [
            h(TableHead, null,
              h(TableRow, null, [
                h(TableCell, null, 'Title'),
                h(TableCell, null, 'Repository'),
                h(TableCell, null, 'State'),
                h(TableCell, null, 'Created'),
              ])
            ),
            h(TableBody, null,
              displayData.map((item) =>
                h(TableRow, { key: item.id }, [
                  h(TableCell, null,
                    h(Link, {
                      href: item.html_url,
                      target: '_blank',
                      rel: 'noopener noreferrer',
                    }, item.title)
                  ),
                  h(TableCell, null, item.repository_url.split('/').slice(-1)[0]),
                  h(TableCell, null, item.pull_request?.merged_at ? 'merged' : item.state),
                  h(TableCell, null, formatDate(item.created_at)),
                ])
              )
            ),
          ]),
          h(TablePagination, {
            component: 'div',
            count: currentData.length,
            page,
            onPageChange: handleChangePage,
            rowsPerPage,
            rowsPerPageOptions: [5],
          }),
        ]),
      ]),
  ]);
}

export default Home;
