import React, { useEffect, useState } from "react";
import { ExternalLink, Award, Clock } from "lucide-react";

interface Contributor {
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

interface BadgeConfig {
  label: string;
  color: string;
  icon: React.ReactNode;
}

export default function Contributors() {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);

  const specialBadges: Record<string, BadgeConfig> = {
    AigloOo: {
      label: "Founder",
      color: "bg-gradient-to-r from-purple-600 to-indigo-600",
      icon: <Award className="h-4 w-4" />,
    },
    "7lele": {
      label: "Early Contributor",
      color: "bg-gradient-to-r from-amber-500 to-orange-600",
      icon: <Clock className="h-4 w-4" />,
    },
  };

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/repos/AigloOo/BalDevCommeBack/contributors"
        );
        const data = await response.json();
        setContributors(data);
      } catch (error) {
        console.error("Error fetching contributors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContributors();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Our Contributors
        </h2>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {contributors.map((contributor) => (
            <a
              key={contributor.login}
              href={contributor.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="flex flex-col items-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all transform hover:-translate-y-1">
                <div className="relative">
                  <img
                    src={contributor.avatar_url}
                    alt={contributor.login}
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 group-hover:border-indigo-500 transition-colors"
                  />
                  <ExternalLink className="absolute -top-1 -right-1 h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="mt-3 text-center">
                  <p className="text-sm font-medium text-gray-900">
                    {contributor.login}
                  </p>
                  {specialBadges[contributor.login] && (
                    <div
                      className={`py-1 inline-flex items-center px-2  rounded-full text-xs font-medium text-white mt-1 ${
                        specialBadges[contributor.login].color
                      }`}
                    >
                      {specialBadges[contributor.login].icon}
                      <span className="ml-1">
                        {specialBadges[contributor.login].label}
                      </span>
                    </div>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    {contributor.contributions} contributions
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
