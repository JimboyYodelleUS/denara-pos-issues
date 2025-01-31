import GitHubIssues from './components/GitHubIssues';
import CreateIssue from './components/CreateIssue';

export default function Home() {
  return (
    <div style={{backgroundColor: "darkgray"}}>
      <h1 style={{ textAlign: 'center' }}>GitHub Issues Tracker</h1>
      <CreateIssue />
      <GitHubIssues />
    </div>
  );
}
