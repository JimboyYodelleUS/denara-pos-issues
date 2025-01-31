import axios from 'axios';

export async function POST(req: Request) {
  const { GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO, GITHUB_URL } = process.env;
  
  if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO || !GITHUB_URL) {
    console.error('❌ Missing environment variables');
    return new Response(JSON.stringify({ message: 'Server misconfiguration: Missing environment variables' }), { status: 500 });
  }

  try {
    const { title, body, user } = await req.json();
    
    console.log('📤 Sending request to GitHub API...');

    const response = await axios.post(
      `${GITHUB_URL}/${GITHUB_OWNER}/${GITHUB_REPO}/issues`,
      { title, body, user },
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
      JSON.stringify({ message: 'Failed to create issue', error: error.response?.data || error.message }),
      { status: 500 }
    );
  }
}
