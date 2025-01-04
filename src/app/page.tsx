import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/ModeToggle";
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
          href="/view"
          className="bg-green-500 text-white px-6 py-3 rounded shadow"
        >
          View Records
        </Link>
      </div>
    </div>
  );
}
