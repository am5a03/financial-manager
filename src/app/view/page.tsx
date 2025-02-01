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
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

export default function Page() {
  const [start, setStart] = useState<Date | undefined>();
  const [end, setnEnd] = useState<Date | undefined>();
  const [source, setSource] = useState<string>("");

  const { data: txRecords } = trpc.getTransactions.useQuery(
    {
      sources: [source],
    },
    {
      enabled: true,
    },
  );

  const { data: sources } = trpc.getTxSources.useQuery();

  console.log(txRecords);

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
              setSource(source);
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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Currency</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Amount (CAD)</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Cost</TableHead>
            <TableHead>Cost (CAD)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {txRecords?.txs.map((tx) => (
            <TableRow key={tx.id}>
              <TableCell>{format(tx.timestamp, "d-MMM-yyyy")}</TableCell>
              <TableCell>{tx.source}</TableCell>
              <TableCell>{tx.currency}</TableCell>
              <TableCell>{tx.amount}</TableCell>
              <TableCell>{tx.amountInQuoteCurrency as number}</TableCell>
              <TableCell>{tx.type}</TableCell>
              <TableCell>{tx.cost}</TableCell>
              <TableCell>{tx.costInQuoteCurrency as number}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
