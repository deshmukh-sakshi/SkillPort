"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";

export default function StatsPage({ params }: { params: { username: string } }) {
  const username = use(Promise.resolve(params.username));

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo-full.png"
              alt="devb.io"
              width={120}
              height={40}
              className="h-8 w-auto"
            />
          </Link>
          <Link href={`/${username}`} className="text-sm text-gray-600 hover:text-black">
            Back to Profile
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto relative overflow-hidden">
          <div className="w-full h-[800px] relative">
            <iframe 
              src={`https://codolio.com/profile/${username}`}
              className="absolute top-[-60px] left-0 w-full h-[calc(100%+60px)] border-0 rounded-lg"
              title="Coding Stats"
              scrolling="no"
            />
          </div>
        </div>
      </main>
    </div>
  );
} 