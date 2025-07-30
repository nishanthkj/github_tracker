import { useState, useCallback } from 'react';

export const useGitHubData = (octokit) => {
  const [issues, setIssues] = useState([]);
  const [prs, setPrs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Helper to fetch multiple pages from REST endpoint (not search API)
const fetchPaginated = async (url, params = {}) => {
  let page = 1;
  const results = [];

  while (true) {
    const { data } = await octokit.request(url, {
      ...params,
      per_page: 100,
      page,
    });

    const items = Array.isArray(data.items) ? data.items : [];
    results.push(...items);  // ✅ safe spreading

    if (items.length < 100) break;
    page++;
  }

  return results;
};

  const fetchData = useCallback(async (username) => {
    if (!octokit || !username) return;

    setLoading(true);
    setError('');

    try {
      console.time('fetchData');

      const [issuesList, prsList] = await Promise.all([
        fetchPaginated('GET /search/issues', {
          q: `author:${username} is:issue`,
          sort: 'created',
          order: 'desc',
        }),
        fetchPaginated('GET /search/issues', {
          q: `author:${username} is:pr`,
          sort: 'created',
          order: 'desc',
        }),
      ]);

      setIssues(issuesList);
      setPrs(prsList);

      console.timeEnd('fetchData');
    } catch (err) {
      setError(err.message || 'Something went wrong while fetching GitHub data.');
    } finally {
      setLoading(false);
    }
  }, [octokit]);

  return {
    issues,
    prs,
    loading,
    error,
    fetchData,
  };
};
