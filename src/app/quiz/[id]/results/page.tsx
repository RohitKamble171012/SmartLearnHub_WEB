// src/app/quiz/[id]/results/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getResults } from "../../../../lib/quizApi";

export default function ResultsPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params?.id[0] : params?.id;
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    if (!id) return;
    let mounted = true;
    getResults(id)
      .then((data)=> { if (mounted) setResults(Array.isArray(data) ? data : []); })
      .catch((err)=> {
        console.error("Failed to fetch results", err);
        alert("Failed to load results");
      })
      .finally(()=> mounted && setLoading(false));
    return ()=> { mounted = false; };
  },[id]);

  if (loading) return <div className="p-6">Loading results…</div>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Results</h2>
      
      {/* Desktop Table */}
      <div className="hidden md:block">
        <table className="w-full border rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Student</th>
              <th className="p-2">Score</th>
              <th className="p-2">Submitted At</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r:any)=>(
              <tr key={r._id} className="border-t">
                <td className="p-2">{r.student?.fullName || r.student?.email || "Student"}</td>
                <td className="p-2 text-center">{r.score}</td>
                <td className="p-2 text-center">{new Date(r.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {results.map((r:any)=>(
          <div key={r._id} className="border rounded-lg p-3 bg-white shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <div className="font-semibold text-sm">
                {r.student?.fullName || r.student?.email || "Student"}
              </div>
              <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-bold">
                {r.score}
              </div>
            </div>
            <div className="text-xs text-gray-600">
              Submitted: {new Date(r.createdAt).toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      {results.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No results found
        </div>
      )}
    </div>
  );
}
