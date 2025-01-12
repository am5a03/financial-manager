import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-3xl font-bold mb-6">
        Welcome to Your Income Tracker
      </h1>
      <p className="mb-6 text-lg">
        Track and manage your income effortlessly with simple tools.
      </p>
      <div className="flex justify-center gap-6">
        <Link
          href="/create"
          className="bg-blue-500 text-white px-6 py-3 rounded shadow"
        >
          Create a Record
        </Link>
        <Link
          href="/batch"
          className="bg-blue-500 text-white px-6 py-3 rounded shadow"
        >
          Batch Upload
        </Link>
        <Link
          href="/view"
          className="bg-green-500 text-white px-6 py-3 rounded shadow"
        >
          View Records
        </Link>
        <Link
          href="/manage/fx"
          className="bg-green-500 text-white px-6 py-3 rounded shadow"
        >
          Manage FX Rates
        </Link>
      </div>
    </div>
  );
}
