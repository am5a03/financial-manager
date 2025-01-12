"use client";
import { DatePicker } from "@/components/ui/datepicker";
import { Button } from "@/components/ui/button";
import FormFeild from "@/components/ui/form/form-field";

export default function Page() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Transactions</h1>
      <form onSubmit={() => {}}>
        <div className="flex gap-4">
          <FormFeild label="Start Date">
            <DatePicker />
          </FormFeild>
          <FormFeild label="End Date">
            <DatePicker />
          </FormFeild>
        </div>
      </form>
    </div>
  );
}
