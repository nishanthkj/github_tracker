import { FormEvent, createElement as h, useState } from "react";
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
  id: string;
  title: string;
  html_url: string;
  repository_url: string;
  state: string;
  created_at: string;
  pull_request?: {
    merged_at?: string;
  };
}

function Home() {
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

  const [tab, setTab] = useState<number>(0);
  const [issueFilter, setIssueFilter] = useState<string>("all");
  const [prFilter, setPrFilter] = useState<string>("all");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    fetchData(username);
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString();
  };

  const filterData = (data: GitHubItem[], filterType: string): GitHubItem[] => {
    switch (filterType) {
      case "open":
        return data.filter((item) => item.state === "open");
      case "closed":
        return data.filter(
          (item) => item.state === "closed" && !item.pull_request?.merged_at
        );
      case "merged":
        return data.filter((item) => item.pull_request?.merged_at);
      default:
        return data;
    }
  };

  const currentData =
    tab === 0 ? filterData(issues, issueFilter) : filterData(prs, prFilter);

  const displayData = paginateData(currentData);

  return h(
    Container,
    {
      maxWidth: "lg",
      sx: {
        display: "flex",
        flexDirection: "column",
        minHeight: "78vh",
        mt: 4,
      },
    },
    [
      h(Paper, { elevation: 1, sx: { p: 2, mb: 4 } }, [
        h("form", { onSubmit: handleSubmit }, [
          h(Box, { sx: { display: "flex", gap: 2 } }, [
            h(TextField, {
              label: "GitHub Username",
              value: username,
              onChange: (e) => setUsername(e.target.value),
              required: true,
              sx: { flex: 1 },
            }),
            h(TextField, {
              label: "Personal Access Token",
              value: token,
              onChange: (e) => setToken(e.target.value),
              type: "password",
              required: true,
              sx: { flex: 1 },
            }),
            h(
              Button,
              {
                type: "submit",
                variant: "contained",
                sx: { minWidth: "120px" },
              },
              "Fetch Data"
            ),
          ]),
        ]),
      ]),

      (authError || dataError) &&
        h(Alert, { severity: "error", sx: { mb: 3 } }, authError || dataError),

      loading
        ? h(
            Box,
            { display: "flex", justifyContent: "center", my: 4 },
            h(CircularProgress)
          )
        : h(Box, null, [
            h(
              Box,
              { sx: { display: "flex", alignItems: "center", gap: 2, mb: 3 } },
              [
                h(
                  Tabs,
                  {
                    value: tab,
                    onChange: (e, newValue) => setTab(newValue),
                    sx: { flex: 1 },
                  },
                  [
                    h(Tab, {
                      label: `Issues (${
                        filterData(issues, issueFilter).length
                      })`,
                    }),
                    h(Tab, {
                      label: `Pull Requests (${
                        filterData(prs, prFilter).length
                      })`,
                    }),
                  ]
                ),
                h(FormControl, { sx: { minWidth: 120 } }, [
                  h(InputLabel, null, "Filter"),
                  h(
                    Select,
                    {
                      value: tab === 0 ? issueFilter : prFilter,
                      onChange: (e) =>
                        tab === 0
                          ? setIssueFilter(e.target.value as string)
                          : setPrFilter(e.target.value as string),
                      label: "Filter",
                    },
                    [
                      h(MenuItem, { value: "all" }, "All"),
                      h(MenuItem, { value: "open" }, "Open"),
                      h(MenuItem, { value: "closed" }, "Closed"),
                      ...(tab === 1
                        ? [h(MenuItem, { value: "merged" }, "Merged")]
                        : []),
                    ]
                  ),
                ]),
              ]
            ),

            h(
              Box,
              {
                sx: {
                  maxHeight: "400px",
                  overflowY: "auto",
                  display: "block",
                },
              },
              [
                h(TableContainer, { sx: { boxShadow: 1 } }, [
                  h(Table, null, [
                    h(
                      TableHead,
                      null,
                      h(TableRow, null, [
                        h(TableCell, { sx: { textAlign: "left" } }, "Title"),
                        h(
                          TableCell,
                          { sx: { textAlign: "center" } },
                          "Repository"
                        ),
                        h(TableCell, { sx: { textAlign: "center" } }, "State"),
                        h(TableCell, { sx: { textAlign: "left" } }, "Created"),
                      ])
                    ),
                    h(
                      TableBody,
                      null,
                      displayData.map((item: GitHubItem) =>
                        h(TableRow, { key: item.id }, [
                          h(
                            TableCell,
                            { sx: { textAlign: "left" } },
                            h(
                              Link,
                              {
                                href: item.html_url,
                                target: "_blank",
                                rel: "noopener noreferrer",
                              },
                              item.title
                            )
                          ),
                          h(
                            TableCell,
                            { sx: { textAlign: "center" } },
                            item.repository_url.split("/").slice(-1)[0]
                          ),
                          h(
                            TableCell,
                            { sx: { textAlign: "center" } },
                            item.pull_request?.merged_at ? "merged" : item.state
                          ),
                          h(
                            TableCell,
                            { sx: { textAlign: "left" } },
                            formatDate(item.created_at)
                          ),
                        ])
                      )
                    ),
                  ]),
                  h(TablePagination, {
                    component: "div",
                    count: currentData.length,
                    page,
                    onPageChange: handleChangePage,
                    rowsPerPage: itemsPerPage,
                    rowsPerPageOptions: [5],
                  }),
                ]),
              ]
            ),
          ]),
    ]
  );
}

export default Home;
