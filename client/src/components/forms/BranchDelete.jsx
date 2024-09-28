"use client";

import { useState } from "react";

const BranchDeleteForm = () => {
  const [branchCode, setBranchCode] = useState("");
  const [message, setMessage] = useState("");

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/branches/${branchCode}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Error deleting branch");

      const result = await response.json();
      setMessage(`Successfully deleted branch: ${result.branchName}`);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-semibold">Delete Branch</h1>
      <input
        type="text"
        placeholder="Enter Branch Code"
        value={branchCode}
        onChange={(e) => setBranchCode(e.target.value)}
        className="border rounded p-2"
      />
      <button
        onClick={handleDelete}
        className="bg-red-400 text-white p-2 rounded-md"
      >
        Delete Branch
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default BranchDeleteForm;
