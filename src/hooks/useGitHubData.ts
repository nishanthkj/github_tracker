import { useState, useCallback } from 'react';

export const useGitHubData = (octokit: any) => {
    
  const [issues, setIssues] = useState([]);
  const [prs, setPrs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [totalIssues, setTotalIssues] = useState(0);
  const [totalPrs, setTotalPrs] = useState(0);

  const fetchPaginated = async (username: string, type: string, page = 1, per_page = 10) => {

    const q = `author:${username} is:${type}`;
    const response = await octokit.request('GET /search/issues', {
      q,
      sort: 'created',
      order: 'desc',
      per_page,
      page,
    });

    return {
      items: response.data.items,
      total: response.data.total_count,
    };
  };

  const fetchData = useCallback(
    async (username: string, page = 1, perPage = 10) => {

      if (!octokit || !username) return;

      setLoading(true);
      setError('');

      try {
        const [issueRes, prRes] = await Promise.all([
          fetchPaginated(username, 'issue', page, perPage),
          fetchPaginated(username, 'pr', page, perPage),
        ]);

        setIssues(issueRes.items);
        setPrs(prRes.items);
        setTotalIssues(issueRes.total);
        setTotalPrs(prRes.total);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [octokit]
  );

  return {
    issues,
    prs,
    totalIssues,
    totalPrs,
    loading,
    error,
    fetchData,
  };
};
