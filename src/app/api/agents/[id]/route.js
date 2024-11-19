import Retell from 'retell-sdk';

const client = new Retell({apiKey: process.env.RETELL_API_KEY });

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

// this is for editing agent name
export async function PATCH(req) {
  console.log('API route called - PATCH method');
  try {
    const { agentId, agentName } = await req.json();

    // Make a PATCH request to the Retell API
    const updateResponse = await client.agent.update(agentId, {
      agent_name: agentName,
    });

    console.log('Agent updated successfully:', updateResponse);
    return new Response(JSON.stringify(updateResponse), { status: 200 });
  } catch (error) {
    console.error('Error updating agent:', error);
    return new Response(JSON.stringify({ error: 'Failed to update agent' }), { status: 500 });
  }
}