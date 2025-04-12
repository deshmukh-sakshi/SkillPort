"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UsernameForm() {
  const router = useRouter();
  const [usernames, setUsernames] = useState({
    github: "",
    leetcode: "",
    codeforces: "",
    codechef: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!usernames.github.trim()) return;
    
    // Navigate to the profile page with GitHub username
    router.push(`/${usernames.github}`);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto space-y-4">
      <div className="space-y-4">
        <div>
          <label htmlFor="github" className="block text-sm font-medium text-gray-700 mb-1">
            GitHub Username *
          </label>
          <input
            type="text"
            id="github"
            required
            placeholder="Enter your GitHub username"
            value={usernames.github}
            onChange={(e) => setUsernames(prev => ({ ...prev, github: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B9FF66] focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="leetcode" className="block text-sm font-medium text-gray-700 mb-1">
            LeetCode Username (optional)
          </label>
          <input
            type="text"
            id="leetcode"
            placeholder="Enter your LeetCode username"
            value={usernames.leetcode}
            onChange={(e) => setUsernames(prev => ({ ...prev, leetcode: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B9FF66] focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="codeforces" className="block text-sm font-medium text-gray-700 mb-1">
            CodeForces Username (optional)
          </label>
          <input
            type="text"
            id="codeforces"
            placeholder="Enter your CodeForces username"
            value={usernames.codeforces}
            onChange={(e) => setUsernames(prev => ({ ...prev, codeforces: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B9FF66] focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="codechef" className="block text-sm font-medium text-gray-700 mb-1">
            CodeChef Username (optional)
          </label>
          <input
            type="text"
            id="codechef"
            placeholder="Enter your CodeChef username"
            value={usernames.codechef}
            onChange={(e) => setUsernames(prev => ({ ...prev, codechef: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B9FF66] focus:border-transparent"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
      >
        Generate Portfolio
      </button>
    </form>
  );
} 