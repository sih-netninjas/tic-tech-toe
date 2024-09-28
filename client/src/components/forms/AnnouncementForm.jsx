import React, { useState } from "react";

const AnnouncementForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");
  const [className, setClassName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/announcements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          branch,
          semester,
          className,
        }),
      });

      if (!response.ok) {
        throw new Error("Error creating announcement");
      }

      const data = await response.json();
      setMessage(`Announcement created successfully: ${data.title}`);
      // Clear form fields
      setTitle("");
      setDescription("");
      setBranch("");
      setSemester("");
      setClassName("");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">Create Announcement</h2>
      {message && <p className="text-red-500">{message}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="p-2 border rounded"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Branch ID"
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          required
          className="p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Semester"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          required
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Class Name"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          required
          className="p-2 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white py-2 rounded">
          Submit Announcement
        </button>
      </form>
    </div>
  );
};

export default AnnouncementForm;
