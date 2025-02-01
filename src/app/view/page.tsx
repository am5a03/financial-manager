"use client";
import { DatePicker } from "@/components/ui/datepicker";
import { Button } from "@/components/ui/button";
import FormFeild from "@/components/ui/form/form-field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { trpc } from "@/trpc/client";
import type { TransactionType } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

export default function Page() {
  const { data: txRecords } = trpc.getTransactions.useQuery(
    {},
    {
      enabled: true,
    },
  );

  const { data: sources } = trpc.getTxSources.useQuery();

  const [start, setStart] = useState<Date | undefined>();
  const [end, setnEnd] = useState<Date | undefined>();
  const [source, setSource] = useState<string>();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Transactions</h1>
      <form onSubmit={() => {}}>
        <div className="flex gap-4">
          <FormFeild label="Start">
            <DatePicker
              onDateChanged={(d) => {
                console.log(d);
              }}
            />
          </FormFeild>
          <FormFeild label="End">
            <DatePicker
              onDateChanged={(d) => {
                console.log(d);
              }}
            />
          </FormFeild>
          <Select
            onValueChange={(source) => {
              console.log(source);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Source" />
            </SelectTrigger>
            <SelectContent>
              {sources?.map((source) => (
                <SelectItem value={source} key={source}>
                  {source}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </form>
    </div>
  );
}
