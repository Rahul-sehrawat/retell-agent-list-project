import Retell from 'retell-sdk';

const client = new Retell({
  apiKey: process.env.RETELL_API_KEY, 
});

export async function GET(request, { params }) {
  const { id } = params; 

  try {
    const agentResponse = await client.agent.retrieve(id);

    if (!agentResponse) {
      return new Response(JSON.stringify({ error: 'Agent not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(agentResponse), { status: 200 });
  } catch (error) {
    console.error('Error fetching agent details:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch agent details' }), { status: 500 });
  }
}
