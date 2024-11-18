"use client";
import { useEffect, useState } from "react";
import CustomBox from "@/components/ui/Custombox";

export default function AgentPage({ params }) {
  const { id } = params;
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAgentDetails() {
      try {
        const response = await fetch(`/api/agents/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch agent details');
        }
        const data = await response.json();
        setAgent(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchAgentDetails();
  }, [id]);

  if (loading) return <div>Loading agent details...</div>;
  if (error) return <div>Error: {error}</div>;

  if (!agent) return <div>No agent found.</div>;

  return (
    <div className="flex justify-center m-10  ">
      <CustomBox agent_name = {agent.agent_name} agent_id = {agent.agent_id}/>
    </div>
  );
}



