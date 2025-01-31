'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './styles/CreateIssue.module.css';
import Button from '../Generic/Button';
import Input from '../Generic/Input';
import TextArea from '../Generic/TextArea';
import { labelOptions } from '../Utils';
import { createIssue, updateIssue, validateUserFromGitHub } from '../Utils/request';

export default function CreateIssue() {
  const [githubUsername, setGithubUsername] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [labels, setLabels] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [labelOptionsArr, setLabelOptionsArr] = useState<ILabel[]>(labelOptions);

  useEffect(() => { 
    setLabels(labelOptionsArr.filter((l) => l.is_selected).map((l) => l.name));
  }, [labelOptionsArr]);

  const handleLabelClick = (label: string) => {
    const newLabels = labelOptionsArr.map((l) => {
      if (l.name === label) {
        l.is_selected = !l.is_selected;
      }
      return l;
    });

    setLabelOptionsArr(newLabels);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const is_user_validated = await validateUserFromGitHub(githubUsername);
      const user = is_user_validated.data as any
      console.log('✅ User validated:', user);
      const createIssueParams = { 
        title: title, 
        body: `Reported by @github-${githubUsername}\n\n${body}`, 
        labels: labels, 
        user: user
       };
      const response = await createIssue(createIssueParams);
      const issue_number = response.data.number;
      const responseAddLabel = await updateIssue(issue_number, labels);
      console.log('✅ Issue created response:', response.data);
      console.log('✅ Issue created responseAddLabel:', responseAddLabel.data);
      if (response.status === 200) {
        alert('Issue created successfully!');
        setTitle('');
        setBody('');
        setLabels([]);
        setGithubUsername('');
        setLabelOptionsArr(labelOptionsArr.map((l) => {
          l.is_selected = false;
          return l;
        }));
      }
    } catch (error: any) {
      const dataErrorMessage = error.response?.data.error.message || error.message;
      const dataErrorStatus = error.response?.data.error.status || error.status;
      console.log(dataErrorMessage)
      console.log(dataErrorStatus)
      console.log('❌ Error creating issue:', dataErrorMessage);
      console.log("❌ Error creating issue status:", dataErrorStatus);
      if (dataErrorStatus === '404' && dataErrorMessage === 'Not Found') {
        alert('User not found on GitHub');
      } else if (dataErrorStatus === 422) {
        alert('Invalid request');
      } else if (dataErrorStatus === 401) {
        alert('Unauthorized');
      } else {
        alert('Failed to create issue');
      }
    }

    setLoading(false);
  };

  return (
    <div className={styles.formContainer}>
      <h2>Create a New Issue</h2>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Issue Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required={true}
        />
        <Input
          type="text"
          placeholder="Github Username"
          value={githubUsername}
          onChange={(e) => setGithubUsername(e.target.value)}
          required={true}
        />
        <TextArea
          placeholder="Issue Description"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required={true}
        />
        <div key="labels-header">
          <h1 style={{ textAlign: 'center' }}>Labels</h1>
        </div>
        <div key="labels-container" style={{ textAlign: 'center' }} className={styles.labelContainer}>
        </div>
        <div key="labels-buttons" className={styles.labelContainer}>
          {labelOptionsArr.map((label) => (
            <Button
              key={label.name}
              is_selected={label.is_selected}
              styleClass={label.class}
              label={label.name}
              onClick={() => handleLabelClick(label.name)}
            />
          ))}
        </div>
        <button className={styles.button} type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Issue'}
        </button>
      </form>
    </div>
  );
}
