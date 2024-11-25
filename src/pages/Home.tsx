import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  Code2,
  Layout,
  Terminal,
  Database,
  BookOpen,
  Users,
} from "lucide-react";
import { useTranslation } from "../hooks/useTranslation";
import GitHubStats from "../components/stats/GitHubStats";
import Contributors from "../components/features/Contributors";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalDocs: 0,
    totalContributors: 0,
    lastUpdated: "",
    stars: 0,
    forks: 0,
    openIssues: 0,
    watchers: 0,
    commits: 0,
    pullRequests: 0,
  });
  const { t } = useTranslation();

  const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
  const REPO_OWNER = "AigloOo";
  const REPO_NAME = "BalDevCommeBack";

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [repoResponse, commitsResponse, pullsResponse] =
          await Promise.all([
            fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`, {
              headers: {
                Accept: "application/vnd.github.v3+json",
                ...(GITHUB_TOKEN && { Authorization: `token ${GITHUB_TOKEN}` }),
              },
            }),
            fetch(
              `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/commits`,
              {
                headers: {
                  Accept: "application/vnd.github.v3+json",
                  ...(GITHUB_TOKEN && {
                    Authorization: `token ${GITHUB_TOKEN}`,
                  }),
                },
              }
            ),
            fetch(
              `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/pulls`,
              {
                headers: {
                  Accept: "application/vnd.github.v3+json",
                  ...(GITHUB_TOKEN && {
                    Authorization: `token ${GITHUB_TOKEN}`,
                  }),
                },
              }
            ),
          ]);

        const [repoData, commitsData, pullsData] = await Promise.all([
          repoResponse.json(),
          commitsResponse.json(),
          pullsResponse.json(),
        ]);

        setStats({
          totalDocs: repoData.size || 0,
          totalContributors: repoData.subscribers_count || 0,
          lastUpdated: repoData.updated_at
            ? new Date(repoData.updated_at).toLocaleDateString()
            : "",
          stars: repoData.stargazers_count || 0,
          forks: repoData.forks_count || 0,
          openIssues: repoData.open_issues_count || 0,
          watchers: repoData.watchers_count || 0,
          commits: Array.isArray(commitsData) ? commitsData.length : 0,
          pullRequests: Array.isArray(pullsData) ? pullsData.length : 0,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        setStats({
          totalDocs: 0,
          totalContributors: 0,
          lastUpdated: "",
          stars: 0,
          forks: 0,
          openIssues: 0,
          watchers: 0,
          commits: 0,
          pullRequests: 0,
        });
      }
    };

    fetchData();
  }, []);

  const features = [
    {
      icon: <BookOpen className="h-8 w-8 text-indigo-600" />,
      title: t("features.comprehensive.title"),
      description: t("features.comprehensive.description"),
    },
    {
      icon: <Users className="h-8 w-8 text-indigo-600" />,
      title: t("features.community.title"),
      description: t("features.community.description"),
    },
    {
      icon: <Code2 className="h-8 w-8 text-indigo-600" />,
      title: t("features.interactive.title"),
      description: t("features.interactive.description"),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-16 pb-12 md:pt-24 md:pb-20">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">{t("home.title")}</span>
              <span className="block text-indigo-600 mt-2">
                {t("home.subtitle")}
              </span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-500">
              {t("home.description")}
            </p>

            <div className="mt-8">
              <form onSubmit={handleSearch} className="max-w-xl mx-auto">
                <div className="relative rounded-full shadow-sm">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t("home.searchPlaceholder")}
                    className="block w-full pl-6 pr-12 py-4 rounded-full border-2 border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2"
                  >
                    <Search className="h-5 w-5 text-gray-400 hover:text-indigo-600" />
                  </button>
                </div>
              </form>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="relative group bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-indigo-500 to-indigo-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
                  <div className="flex flex-col items-center">
                    <div className="mb-4">{feature.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500 text-center">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <GitHubStats stats={stats} />
            <Contributors />
          </div>
        </div>

        <div className="py-12 border-t border-gray-200">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Link to="/docs/html" className="group">
              <div className="relative rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-indigo-500 to-indigo-600 transform origin-bottom scale-x-0 group-hover:scale-x-100 transition-transform"></div>
                <Code2 className="h-8 w-8 text-indigo-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900">HTML</h3>
                <p className="mt-2 text-gray-500">
                  Core HTML concepts, semantic markup, and accessibility best
                  practices.
                </p>
              </div>
            </Link>

            <Link to="/docs/css" className="group">
              <div className="relative rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-indigo-500 to-indigo-600 transform origin-bottom scale-x-0 group-hover:scale-x-100 transition-transform"></div>
                <Layout className="h-8 w-8 text-indigo-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900">CSS</h3>
                <p className="mt-2 text-gray-500">
                  Modern layouts, animations, and responsive design techniques.
                </p>
              </div>
            </Link>

            <Link to="/docs/javascript" className="group">
              <div className="relative rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-indigo-500 to-indigo-600 transform origin-bottom scale-x-0 group-hover:scale-x-100 transition-transform"></div>
                <Terminal className="h-8 w-8 text-indigo-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900">
                  JavaScript
                </h3>
                <p className="mt-2 text-gray-500">
                  Modern JavaScript features, async programming, and best
                  practices.
                </p>
              </div>
            </Link>

            <Link to="/docs/nodejs" className="group">
              <div className="relative rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-indigo-500 to-indigo-600 transform origin-bottom scale-x-0 group-hover:scale-x-100 transition-transform"></div>
                <Database className="h-8 w-8 text-indigo-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900">Node.js</h3>
                <p className="mt-2 text-gray-500">
                  Server-side JavaScript, APIs, and backend development.
                </p>
              </div>
            </Link>

            <Link to="/docs/react" className="group">
              <div className="relative rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-indigo-500 to-indigo-600 transform origin-bottom scale-x-0 group-hover:scale-x-100 transition-transform"></div>
                <Code2 className="h-8 w-8 text-indigo-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900">React</h3>
                <p className="mt-2 text-gray-500">
                  Components, hooks, state management, and React patterns.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
