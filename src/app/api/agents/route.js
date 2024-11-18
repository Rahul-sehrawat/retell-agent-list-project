import Retell from 'retell-sdk';

const client = new Retell({
  apiKey: process.env.RETELL_API_KEY,  
});

export async function GET() {
  console.log('API route called- everthing is fine'); 
  try {
    const agentResponses = await client.agent.list();
    console.log('Retell API response:', agentResponses); 
    return new Response(JSON.stringify(agentResponses), { status: 200 });
  } catch (error) {
    console.error('Error fetching agents:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch agents' }), { status: 500 });
  }
}

