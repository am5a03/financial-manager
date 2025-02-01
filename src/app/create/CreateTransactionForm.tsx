"use client";
import { DatePicker } from "@/components/ui/datepicker";
import FormField from "@/components/ui/form/form-field";
import { trpc } from "@/trpc/client";
import { TransactionType } from "@/types";

export default function CreateTransactionForm() {
  const { mutateAsync: submitTransaction, isPending: isSubmittingTransaction } =
    trpc.submitTransaction.useMutation();

  const onSubmit = async (e) => {
    e.preventDefault();
    await submitTransaction({
      currency: "HKD",
      type: TransactionType.Income,
      amount: 1.1,
      date: new Date(),
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Transaction Record</h1>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-4">
          <FormField label="Date">
            <DatePicker onDateChanged={(d) => {}} />
          </FormField>
          <FormField label="Amount">
            <input
              type="number"
              id="amount"
              // {...register("amount", { required: true })}
              className="border rounded px-2 py-1 flex-grow"
            />
          </FormField>
          <FormField label="Currency">
            <select
              id="currency"
              // {...register("currency", { required: true })}
              className="border rounded px-2 py-1 flex-grow"
            >
              {["CAD", "HKD", "JPY", "GBP", "USD"].map((code) => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label="Type">
            <select
              id="type"
              // {...register("currency", { required: true })}
              className="border rounded px-2 py-1 flex-grow"
            >
              {Object.values(TransactionType).map((code) => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
            </select>
          </FormField>
          <div className="flex justify-end gap-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
            <button
              type="button"
              // onClick={() => reset()}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Reset
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
