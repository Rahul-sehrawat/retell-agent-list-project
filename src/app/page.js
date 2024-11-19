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
      <h1 className="text-2xl font-bold mb-6 text-gray-800">List of Agents</h1>
      {agents.length === 0 ? (
        <div className="text-gray-600 text-lg">No agents found.</div>
      ) : (
        <>
          <Table className = ' w-[80%] g-white shadow-lg rounded-lg '>
            <TableHeader className="bg-gray-200">
              <TableRow>
                <TableHead className="p-4 text-left text-gray-700">Agent name</TableHead>
                <TableHead className="p-4 text-left text-gray-700">Agent Id</TableHead>
                <TableHead className="p-4 text-left text-gray-700">Language</TableHead>
                <TableHead className="p-4 text-left text-gray-700">Voice ID</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentAgents.map((agent) => (
                <TableRow key={agent.agent_id} className="hover:bg-blue-100 transition-colors duration-200">
                  <TableCell className = ' p-4'>
                    <Link href={`/agents/${agent.agent_id}`}className="text-blue-600 hover:underline">{agent.agent_name}</Link>
                  </TableCell>
                  <TableCell>{agent.agent_id}</TableCell>
                  <TableCell>{agent.language}</TableCell>
                  <TableCell>{agent.voice_id}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

        
          <div className="pagination flex justify-center gap-4 mt-10">
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}
              className="p-2 bg-gray-300 rounded-full hover:bg-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed">
            <TbPlayerTrackPrevFilled  size={24}/>
            </button>
            <span className="text-lg font-medium"> {currentPage}</span>
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}  className="p-2 bg-gray-300 rounded-full hover:bg-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed">
            <TbPlayerTrackNextFilled size={24} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

