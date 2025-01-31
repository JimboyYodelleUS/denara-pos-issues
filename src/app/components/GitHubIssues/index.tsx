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






// 'use client';

// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import styles from './styles/GitHubIssues.module.css';
// import Li from '../Generic/Li';
// import { IIssue } from './types';

// export default function GitHubIssues() {
//   const [issues, setIssues] = useState<IIssue[]>([]);
//   const [page, setPage] = useState(1);

//   useEffect(() => {
//     async function fetchIssues() {
//       try {
//         const res = await axios.get(`/api/githubIssues`);
//         setIssues((prevIssues) => [...prevIssues, ...res.data]);
//       } catch (error) {
//         console.error('Error fetching issues:', error);
//       }
//     }

//     fetchIssues();
//   }, [page]);

//   return (
//     <>
//       <div key="labels-header">
//         <h1 style={{ textAlign: 'center' }}>GitHub Issues</h1>
//       </div>
//       <div className={styles.container}>

//         <ul className={styles.issueList}>
//           {issues.length > 0 ? (
//             issues.map((issue) => (
//               <div key={issue.id}>
//                 <Li issue={issue} styleClass={styles.issueItem} />
//               </div>
//             ))
//           ) : (
//             <p>No issues found.</p>
//           )}
//         </ul>
//       </div>
//     </>
//   );
// }
