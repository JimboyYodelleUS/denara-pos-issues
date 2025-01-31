import axios from 'axios';

export async function GET(req: Request) {
  const { GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO, GITHUB_URL } = process.env;

  try {
    const response = await axios.get(
      `${GITHUB_URL}/${GITHUB_OWNER}/${GITHUB_REPO}/issues`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
        },
      }
    );
    console.log('✅ Issues fetched:', response.data);
    return new Response(JSON.stringify(response.data), {
      status: 200,
    });
  } catch (error: any) {
    console.error('❌ GitHub API Error:', error.response?.data);
    return new Response(
      JSON.stringify({ message: 'Failed to fetch issues', error: error.response?.data }),
      {
        status: 500,
      }
    );
  }
}
