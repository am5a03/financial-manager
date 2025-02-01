"use client";
import { useToast } from "@/hooks/use-toast";
import { trpc } from "@/trpc/client";

export default function Page() {
  const { mutateAsync: submitTransactionCustomBatch, isPending } =
    trpc.submitTransactionCustomBatch.useMutation();

  const { toast } = useToast();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      await submitTransactionCustomBatch({
        csv: formData.get("input")?.toString() ?? "",
      });
      toast({
        title: "Success",
        description: "File processed successfully",
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      toast({
        title: "Error",
        description: `Failed to process. Reason=${error}`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Batch Transaction Custom (using CSV inputs)
      </h1>
      <form onSubmit={onSubmit}>
        <textarea
          name="input"
          style={{
            width: "600px",
            height: "400px",
          }}
        />
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
