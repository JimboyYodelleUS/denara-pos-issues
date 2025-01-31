import axios from 'axios';

export async function GET(req: Request) {
    const { GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO, GITHUB_URL, GITHUB_USER_URL } = process.env;

    if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO || !GITHUB_URL) {
        console.error('❌ Missing environment variables');
        return new Response(JSON.stringify({ message: 'Server misconfiguration: Missing environment variables' }), { status: 500 });
    }

    try {

        const query_1 = req.url.split("?")[1];
        const requestParams = new URLSearchParams(query_1);
        const username = requestParams.get('username');
        const response = await axios.get(
            `${GITHUB_USER_URL}/${username}`,
            {
                headers: {
                    Authorization: `Bearer ${GITHUB_TOKEN}`,
                    Accept: 'application/vnd.github.v3+json',
                },
            }
        );

        return new Response(JSON.stringify(response.data), { status: 200 });
    } catch (error: any) {
        console.error('❌ GitHub API Error:', error.response?.data || error.message);
        return new Response(
            JSON.stringify({ message: 'Failed to validate user', error: error.response?.data || error.message }),
            { status: 500 }
        );
    }
}
