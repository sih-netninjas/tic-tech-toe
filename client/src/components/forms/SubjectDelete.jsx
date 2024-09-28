"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../../components/InputFields"; // Adjust the path as necessary

// Validation schema
const deleteSchema = z.object({
  subjectId: z.string().min(1, { message: "Subject ID is required!" }),
});

const SubjectDeleteForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(deleteSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await fetch(
        `http://localhost:5000/subjects/${data.subjectId}`,
        {
          // Ensure this matches your API route
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Error deleting subject");

      const result = await response.json();
      console.log("Deleted Subject:", result);
      // Handle success (e.g., show a success message)
    } catch (error) {
      console.error("Error deleting subject:", error);
      // Handle error (e.g., show an error message)
    }
  });

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">Delete Subject</h1>
      <InputField
        label="Subject ID"
        name="subjectId"
        register={register}
        error={errors.subjectId}
      />
      <button className="bg-red-400 text-white p-2 rounded-md">
        Delete Subject
      </button>
    </form>
  );
};

export default SubjectDeleteForm;
