"use client";

import { trpc } from "@/trpc/client";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Page() {
  const { mutateAsync: submitTransactionBatch, isPending } =
    trpc.submitTransactionBatch.useMutation();

  const { toast } = useToast();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const file = formData.get("csv_file") as File;
    console.log(file);
    //
    if (file.size === 0) {
      toast({
        title: "Error",
        description: "Please select a file before submitting!",
      });
      return;
    }

    try {
      const base64File = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file); // Read file as Base64
      });
      // Pass the file to the server action
      await submitTransactionBatch({ csv: base64File });
      toast({
        title: "Success",
        description: "File processed successfully",
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      toast({
        title: "Error",
        description: `Failed to process file. Reason=${error}`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Batch Transaction Upload</h1>
      <form onSubmit={onSubmit}>
        <input type="file" name="csv_file" />
        <div className="flex justify-start mt-4 gap-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {isPending ? "Uploading..." : "Submit"}
          </button>
          <button
            type="button"
            // onClick={() => reset()}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
