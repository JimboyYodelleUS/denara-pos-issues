'use client';

import useSWRInfinite from 'swr/infinite';
import axios from 'axios';
import styles from './styles/GitHubIssues.module.css';
import Li from '../Generic/Li';
import { IIssue } from './types';

// Define fetcher function using Axios
const fetcher = (url: string) => axios.get<IIssue[]>(url).then((res) => res.data);

export default function GitHubIssues() {
  const { data, error, size, setSize, isValidating } = useSWRInfinite<IIssue[]>(
    (index) => `/api/githubIssues`,
    fetcher,
  );

  // Flatten the paginated data
  const issues = data ? data.flat() : [];

  if (error) return (<div style={{marginBottom: "20px"}} key={1}><p>Error loading issues.</p></div>);
  if (!data) return (<div style={{marginBottom: "20px"}} key={1}><p>Loading...</p></div>);

  return (
    <>
      <div style={{marginBottom: "20px"}} key={1}>
        <h1 style={{ textAlign: 'center' }}>GitHub Issues</h1>
      </div>
      <div className={styles.container}>
        <ul className={styles.issueList}>
          {issues.length > 0 ? (
        issues.map((issue) => (
          <div key={issue.id}>
            <Li issue={issue} styleClass={styles.issueItem} labels={issue.labels} />
          </div>
        ))
          ) : (
        <p>No issues found.</p>
          )}
        </ul>
      </div>
    </>
  );
}