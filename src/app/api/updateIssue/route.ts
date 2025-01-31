import axios from 'axios';

export async function POST(req: Request) {
    const { GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO, GITHUB_URL } = process.env;

    if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO || !GITHUB_URL) {
        console.error('❌ Missing environment variables');
        return new Response(JSON.stringify({ message: 'Server misconfiguration: Missing environment variables' }), { status: 500 });
    }

    try {
        const { issue_number, labels } = await req.json();
        const owner = "OWNER";
        const repo = "REPO";
        const issue_number_param = "ISSUE_NUMBER";

        console.log('📤 Sending request to GitHub API...');

        const response = await axios.post(
            // request('POST /repos/{owner}/{repo}/issues/{issue_number}/labels', {
            `${GITHUB_URL}/${GITHUB_OWNER}/${GITHUB_REPO}/issues/${issue_number}/labels`,
            {labels},
            {
                headers: {
                    Authorization: `Bearer ${GITHUB_TOKEN}`,
                    Accept: 'application/vnd.github.v3+json',
                },
            }
        );

        console.log('✅ Issue created:', response.data);

        return new Response(JSON.stringify(response.data), { status: 200 });
    } catch (error: any) {
        console.error('❌ GitHub API Error:', error.response?.data || error.message);
        return new Response(
            JSON.stringify({ message: 'Failed to update issue', error: error.response?.data || error.message }),
            { status: 500 }
        );
    }
}
