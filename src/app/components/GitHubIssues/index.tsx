'use client';

import useSWRInfinite from 'swr/infinite';
import axios from 'axios';
import styles from './styles/GitHubIssues.module.css';
import Li from '../Generic/Li';
import { IIssue } from './types';
import { useState } from 'react';

// Define fetcher function using Axios
const fetcher = (url: string) => axios.get<IIssue[]>(url).then((res) => res.data);

export default function GitHubIssues() {
  const { data, error, size, setSize, isValidating } = useSWRInfinite<IIssue[]>(
    (index) => `/api/githubIssues`,
    fetcher,
  );
  const [searchTerm, setSearchTerm] = useState('');

  // Flatten the paginated data
  const issues = data ? data.flat() : [];
  const filteredIssues = issues.filter((issue) =>
    issue.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) return (<div style={{marginBottom: "20px"}} key={1}><p>Error loading issues.</p></div>);
  if (!data) return (<div style={{marginBottom: "20px"}} key={1}><p>Loading...</p></div>);

  return (
    <>
      <div style={{ marginBottom: '20px' }} key={1}>
        <h1 style={{ textAlign: 'center' }}>GitHub Issues</h1>
        <input
          type="text"
          placeholder="Search issues"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ display: 'block', margin: '0 auto', padding: '10px', width: '80%' }}
        />
      </div>
      <div className={styles.container}>
        <ul className={styles.issueList}>
          {filteredIssues.length > 0 ? (
            filteredIssues.map((issue) => (
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
// import { useState } from 'react';

// const [searchTerm, setSearchTerm] = useState('');

// const filteredIssues = issues.filter((issue) =>
//   issue.title.toLowerCase().includes(searchTerm.toLowerCase())
// );

// return (
//   <>
//     <div style={{ marginBottom: '20px' }} key={1}>
//       <h1 style={{ textAlign: 'center' }}>GitHub Issues</h1>
//       <input
//         type="text"
//         placeholder="Search issues"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         style={{ display: 'block', margin: '0 auto', padding: '10px', width: '80%' }}
//       />
//     </div>
//     <div className={styles.container}>
//       <ul className={styles.issueList}>
//         {filteredIssues.length > 0 ? (
//           filteredIssues.map((issue) => (
//             <div key={issue.id}>
//               <Li issue={issue} styleClass={styles.issueItem} labels={issue.labels} />
//             </div>
//           ))
//         ) : (
//           <p>No issues found.</p>
//         )}
//       </ul>
//     </div>
//   </>
// );