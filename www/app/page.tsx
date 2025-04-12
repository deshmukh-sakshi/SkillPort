import Image from "next/image";
import Footer from "@/components/footer";
import AnimatedNav from "@/components/animated-nav/server";
import AnimatedHero from "@/components/animated-hero/server";
import AnimatedStats from "@/components/animated-stats/server";
import IntegrationCard from "@/components/integration-card/server";
import ProfileCard from "@/components/profile-card/server";
import HowItWorksCard from "@/components/how-it-works-card/server";
import NextContributorCard from "@/components/next-contributor-card";
import { Compare } from "@/components/ui/compare";
import UsernameForm from "@/components/UsernameForm";

// Types
interface Profile {
  username: string;
  name: string;
  avatar_url: string;
  bio: string;
  followers: number;
  following: number;
  public_repos: number;
  social_accounts?: {
    provider: string;
    url: string;
  }[];
}

async function getProfiles(): Promise<Profile[]> {
  const response = await fetch(
    "https://raw.githubusercontent.com/sunithvs/devb.io/refs/heads/data/docs/data/processed_users.json",
    {
      next: { revalidate: 3600 }, // Revalidate every hour
    },
  );

  if (!response.ok) {
    return [];
  }

  if (response.headers.get("content-type")?.includes("application/json")) {
    const data: Record<string, Profile> = await response.json();

    // For each profile, fetch blog posts if they have a Medium account
    const profilesWithBlogs = await Promise.all(
      Object.values(data).map(async (profile) => {
        return profile;
      }),
    );

    return profilesWithBlogs.slice(-6);
  } else {
    // throw new Error("Unexpected content type");
    return [];
  }
}

async function getContributors(): Promise<Profile[]> {
  try {
    const response = await fetch(
      "https://api.github.com/repos/sunithvs/devb.io/contributors",
      {
        headers: {
          Accept: "application/json",
        },
        next: {
          revalidate: 3600, // Revalidate every hour
        },
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contributorsData = await response.json();

    if (!Array.isArray(contributorsData)) {
      console.error("Contributors data is not an array:", contributorsData);
      return [];
    }

    // Filter out actions-user and fetch full profile data
    const cleanedData = contributorsData.filter(
      (profile) =>
        profile &&
        typeof profile === "object" &&
        profile.login &&
        profile.login !== "actions-user",
    );

    const contributors = await Promise.all(
      cleanedData.map(async (profile) => {
        try {
          const userResponse = await fetch(
            `https://api.github.com/users/${profile.login}`,
            {
              headers: {
                Accept: "application/json",
              },
              next: {
                revalidate: 3600, // Revalidate every hour
              },
            },
          );

          if (!userResponse.ok) {
            throw new Error(`HTTP error! status: ${userResponse.status}`);
          }

          const userData = await userResponse.json();
          return {
            name: userData.name || profile.login,
            username: profile.login,
            avatar_url: profile.avatar_url,
            bio: userData.bio || "No bio available",
            followers: userData.followers || 0,
            following: userData.following || 0,
            public_repos: userData.public_repos || 0,
          };
        } catch (error) {
          console.error(`Error fetching data for ${profile.login}:`, error);
          return {
            name: profile.login,
            username: profile.login,
            avatar_url: profile.avatar_url,
            bio: "No bio available",
            followers: 0,
            following: 0,
            public_repos: 0,
          };
        }
      }),
    );

    return contributors;
  } catch (error) {
    console.error("Error fetching contributors:", error);
    return [];
  }
}

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Effortless Portfolios for{" "}
            <span className="bg-[#B9FF66] px-4 py-1 rounded-lg">Developers</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your GitHub profile tells a story.<br />
            Let us help you narrate it.
          </p>
        </div>

        <UsernameForm />
      </div>
    </main>
  );
}
