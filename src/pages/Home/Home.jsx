'use client';
import { useState, useEffect, useRef } from "react";

const Home = () => {
  const [username, setUserName] = useState("");  // Track username input
  const [token, setToken] = useState("");  // Track GitHub token input
  const [userData, setUserData] = useState(null);  // Store user profile data
  const [issues, setIssues] = useState([]);  // Store issues data
  const [pullRequests, setPullRequests] = useState([]);  // Store PR data
  const [loading, setLoading] = useState(false);  // Loading state
  const [error, setError] = useState(null);  // Error state
  const [issueStatus, setIssueStatus] = useState("all");  // Issue status filter
  const [prStatus, setPrStatus] = useState("all");  // PR status filter
  const [labels, setLabels] = useState("");  // Labels filter
  const [currentPageIssues, setCurrentPageIssues] = useState(1);  // Current page for issues
  const [currentPagePRs, setCurrentPagePRs] = useState(1);  // Current page for PRs
  const [issuesPerPage, setIssuesPerPage] = useState(5);  // Number of issues per page
  const [prPerPage, setPrPerPage] = useState(5);  // Number of PRs per page
  const inputRef = useRef(null);

  // Fetch user data, issues, and pull requests with pagination
  const fetchData = async () => {
    if (!username || !token) return; // If no username or token, do nothing

    setLoading(true); // Set loading to true
    setError(null); // Reset any previous errors
    setUserData(null);
    setIssues([]);
    setPullRequests([]);

    try {
      // Fetch user data from GitHub API
      const userResponse = await fetch(`https://api.github.com/users/${username}`, {
        headers: {
          'Authorization': `token ${token}`  // Include token in the request
        }
      });

      if (!userResponse.ok) throw new Error('User not found');
      const userData = await userResponse.json();
      setUserData(userData); // Set the fetched user data

      // Fetch repositories from GitHub API
      const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`, {
        headers: {
          'Authorization': `token ${token}`  // Include token in the request
        }
      });
      if (!reposResponse.ok) throw new Error('Failed to fetch repositories');
      const reposData = await reposResponse.json();

      // Fetch issues and pull requests for each repository
      const allIssues = [];
      const allPullRequests = [];

      for (const repo of reposData) {
        // Fetch issues for each repository with pagination
        const issuesResponse = await fetch(`https://api.github.com/repos/${username}/${repo.name}/issues?state=${issueStatus}&labels=${labels}&per_page=${issuesPerPage}&page=${currentPageIssues}`, {
          headers: {
            'Authorization': `token ${token}`  // Include token in the request
          }
        });
        const issuesData = await issuesResponse.json();

        allIssues.push(...issuesData);

        // Fetch pull requests for each repository with pagination
        const pullsResponse = await fetch(`https://api.github.com/repos/${username}/${repo.name}/pulls?state=${prStatus}&labels=${labels}&per_page=${prPerPage}&page=${currentPagePRs}`, {
          headers: {
            'Authorization': `token ${token}`  // Include token in the request
          }
        });
        const pullsData = await pullsResponse.json();

        allPullRequests.push(...pullsData);
      }

      setIssues(allIssues); // Set issues data
      setPullRequests(allPullRequests); // Set pull requests data

    } catch (err) {
      setError(err.message); // Set error message if API call fails
    } finally {
      setLoading(false); // Set loading to false after request
    }
  };

  // Handle input changes
  const handleUser = (e) => setUserName(e.target.value);
  const handleToken = (e) => setToken(e.target.value);
  const handleIssueStatus = (e) => setIssueStatus(e.target.value);
  const handlePrStatus = (e) => setPrStatus(e.target.value);
  const handleLabelFilter = (e) => setLabels(e.target.value);

  const handlePageChangeIssues = (newPage) => {
    setCurrentPageIssues(newPage);
  };

  const handlePageChangePRs = (newPage) => {
    setCurrentPagePRs(newPage);
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    fetchData(); // Fetch data when form is submitted
  };

  return (
    <div className="flex flex-col justify-between min-h-screen bg-gradient-to-br from-purple-100 via-gray-200 to-gray-300">
      {/* Main Content */}
      <main className="flex flex-col justify-center items-center flex-grow px-8 sm:px-4 py-16">

        {/* Search Form */}
        <form
          className="flex flex-col sm:flex-row justify-center items-center w-full sm:w-2/3 lg:w-1/2 h-1/3 space-y-6 sm:space-y-0"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col sm:flex-row items-center bg-white rounded-full shadow-lg p-3 w-full sm:w-4/5">
            {/* GitHub Logo inside search bar */}
            <div className="px-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.172c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.083-.729.083-.729 1.205.084 1.838 1.238 1.838 1.238 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.304.762-1.604-2.665-.305-5.467-1.332-5.467-5.93 0-1.31.469-2.381 1.236-3.221-.123-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.98-.399 3-.405 1.02.006 2.043.139 3 .405 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.241 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.807 5.624-5.479 5.921.43.371.823 1.102.823 2.222v3.293c0 .322.218.694.825.576 4.765-1.588 8.199-6.084 8.199-11.385 0-6.627-5.373-12-12-12z" />
              </svg>
            </div>

            {/* Search Input GitHub username */}
            <input
              type="text"
              placeholder="Enter GitHub username"
              className="w-full px-4 py-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-purple-400 rounded-full"
              value={username}
              onChange={handleUser}
              ref={inputRef}
            />
          </div>

          {/* Add margin-top between username and token input */}
          <div className="mt-4 w-full sm:w-4/5"> {/* Same width for token input */}
            <input
              type="password"
              placeholder="Enter GitHub token"
              className="ml-6 px-4 py-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-purple-400 rounded-full"
              value={token}
              style={{ width: "85%" }}
              onChange={handleToken}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-purple-500 text-white p-3 rounded-full hover:bg-purple-600 transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 flex items-center justify-center mt-4"
            disabled={loading} // Disable button when loading
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </form>

        {/* Display user data */}
        {loading && <p className="mt-4 text-gray-600">Loading...</p>}

        {error && <p className="mt-4 text-red-600">{error}</p>}

        {userData && (
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-semibold">User Profile</h2>
            <img
              src={userData.avatar_url}
              alt="User Avatar"
              className="w-24 h-24 rounded-full mx-auto mt-4"
            />
            <p className="mt-2 text-lg font-bold">{userData.name}</p>
            <p className="text-sm text-gray-500">{userData.login}</p>
            <p className="mt-2 text-gray-700">{userData.bio}</p>
            <a
              href={userData.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 text-purple-600 hover:underline"
            >
              Visit Profile
            </a>
          </div>
        )}

        {/* Display filters */}
        <div className="mt-8 space-y-4">
          <div className="flex space-x-4">
            <div className="flex flex-col">
              <label htmlFor="issueStatus" className="text-sm text-gray-600">Issue Status</label>
              <select
                id="issueStatus"
                value={issueStatus}
                onChange={handleIssueStatus}
                className="px-4 py-2 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                <option value="all">All</option>
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="prStatus" className="text-sm text-gray-600">PR Status</label>
              <select
                id="prStatus"
                value={prStatus}
                onChange={handlePrStatus}
                className="px-4 py-2 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                <option value="all">All</option>
                <option value="open">Open</option>
                <option value="closed">Closed</option>
                <option value="merged">Merged</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="labels" className="text-sm text-gray-600">Labels</label>
              <input
                id="labels"
                type="text"
                placeholder="Filter by labels"
                value={labels}
                onChange={handleLabelFilter}
                className="px-4 py-2 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
          </div>
        </div>

        {/* Display Issues */}
        {issues.length > 0 && (
          <div className="mt-8 overflow-x-auto">
            <h3 className="text-xl font-semibold">Issues</h3>
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-6 py-3 text-left">Title</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Labels</th>
                  <th className="px-6 py-3 text-left">Link</th>
                </tr>
              </thead>
              <tbody>
                {issues.map(issue => (
                  <tr key={issue.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-3">{issue.title}</td>
                    <td className="px-6 py-3">{issue.state}</td>
                    <td className="px-6 py-3">
                      {issue.labels.length > 0 ? (
                        issue.labels.map(label => (
                          <span key={label.id} className="mr-2 text-sm text-gray-600">{label.name}</span>
                        ))
                      ) : (
                        <span className="text-sm text-gray-400">No labels</span>
                      )}
                    </td>
                    <td className="px-6 py-3">
                      <a
                        href={issue.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 hover:underline"
                      >
                        View Issue
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls for Issues */}
            <div className="mt-4 flex justify-center space-x-4">
              <button
                onClick={() => handlePageChangeIssues(currentPageIssues - 1)}
                disabled={currentPageIssues === 1}
                className="px-4 py-2 bg-purple-500 text-white rounded-full disabled:opacity-50"
              >
                Previous
              </button>
              <span className="self-center text-gray-600">Page {currentPageIssues}</span>
              <button
                onClick={() => handlePageChangeIssues(currentPageIssues + 1)}
                disabled={issues.length < issuesPerPage}
                className="px-4 py-2 bg-purple-500 text-white rounded-full disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Display Pull Requests */}
        {pullRequests.length > 0 && (
          <div className="mt-8 overflow-x-auto">
            <h3 className="text-xl font-semibold">Pull Requests</h3>
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-6 py-3 text-left">Title</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Labels</th>
                  <th className="px-6 py-3 text-left">Link</th>
                </tr>
              </thead>
              <tbody>
                {pullRequests.map(pr => (
                  <tr key={pr.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-3">{pr.title}</td>
                    <td className="px-6 py-3">{pr.state}</td>
                    <td className="px-6 py-3">
                      {pr.labels.length > 0 ? (
                        pr.labels.map(label => (
                          <span key={label.id} className="mr-2 text-sm text-gray-600">{label.name}</span>
                        ))
                      ) : (
                        <span className="text-sm text-gray-400">No labels</span>
                      )}
                    </td>
                    <td className="px-6 py-3">
                      <a
                        href={pr.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 hover:underline"
                      >
                        View PR
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls for PRs */}
            <div className="mt-4 flex justify-center space-x-4">
              <button
                onClick={() => handlePageChangePRs(currentPagePRs - 1)}
                disabled={currentPagePRs === 1}
                className="px-4 py-2 bg-purple-500 text-white rounded-full disabled:opacity-50"
              >
                Previous
              </button>
              <span className="self-center text-gray-600">Page {currentPagePRs}</span>
              <button
                onClick={() => handlePageChangePRs(currentPagePRs + 1)}
                disabled={pullRequests.length < prPerPage}
                className="px-4 py-2 bg-purple-500 text-white rounded-full disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
