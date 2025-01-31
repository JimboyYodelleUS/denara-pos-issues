import axios from 'axios';
import { ICreateIssueParams } from './types';

const createIssue = async (createIssueParams: ICreateIssueParams) => {
    const { title, body, labels, user } = createIssueParams;
    return await axios.post('/api/createIssue', { title, body, labels, user });
}

const updateIssue = async (issue_number: number, labels: string[]) => {
    return await axios.post('/api/updateIssue', { issue_number, labels });
}

const validateUserFromGitHub = async (username: string) => { 
    return await axios.get(`/api/validateUserFromGitHub?username=${username}`);
}


export {
    createIssue,
    updateIssue,
    validateUserFromGitHub
}