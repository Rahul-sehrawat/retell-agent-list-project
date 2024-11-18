"use client";
import { TbPlayerTrackPrevFilled } from "react-icons/tb";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";  

export default function Home() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    async function fetchAgents() {
      try {
        const response = await fetch('/api/agents');
        if (!response.ok) {
          throw new Error('Failed to fetch agents');
        }
        const data = await response.json();  
        setAgents(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchAgents();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;


  const totalPages = Math.ceil(agents.length / rowsPerPage);
  const currentAgents = agents.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;  
    setCurrentPage(page);
  };

  return (
    <div className=' bg-gray-100 h-screen flex flex-col items-center p-10'>
      <h1>List of Agents</h1>
      {agents.length === 0 ? (
        <div>No agents found.</div>
      ) : (
        <>
          <Table className = ' w-[80%] '>
            <TableHeader>
              <TableRow>
                <TableHead>Agent name</TableHead>
                <TableHead>Agent Id</TableHead>
                <TableHead>Language</TableHead>
                <TableHead>Voice ID</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentAgents.map((agent) => (
                <TableRow key={agent.agent_id}>
                  <TableCell className = ' hover:bg-blue-500 '>
                    <Link href={`/agents/${agent.agent_id}`}>{agent.agent_name}</Link>
                  </TableCell>
                  <TableCell>{agent.agent_id}</TableCell>
                  <TableCell>{agent.language}</TableCell>
                  <TableCell>{agent.voice_id}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

        
          <div className="pagination flex justify-center gap-4 mt-10">
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            <TbPlayerTrackPrevFilled  size={30}/>
            </button>
            <span> {currentPage}</span>
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            <TbPlayerTrackNextFilled size={30} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
