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
import { motion } from "framer-motion";

export default function Home() {
  const [SearchQuery, setSearchQuery] = useState("");
  const Navigate = useNavigate();
  const [Stats, setStats] = useState({
    TotalDocs: 0,
    TotalContributors: 0,
    LastUpdated: "",
    Stars: 0,
    Forks: 0,
    OpenIssues: 0,
    Watchers: 0,
    Commits: 0,
    PullRequests: 0,
  });
  const { t } = useTranslation();

  const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
  const REPO_OWNER = "AigloOo";
  const REPO_NAME = "BalDevCommeBack";

  const HandleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (SearchQuery.trim()) {
      Navigate(`/search?q=${encodeURIComponent(SearchQuery.trim())}`);
    }
  };

  useEffect(() => {
    const FetchData = async () => {
      try {
        const [RepoResponse, CommitsResponse, PullsResponse] =
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

        const [RepoData, CommitsData, PullsData] = await Promise.all([
          RepoResponse.json(),
          CommitsResponse.json(),
          PullsResponse.json(),
        ]);

        setStats({
          TotalDocs: RepoData.size || 0,
          TotalContributors: RepoData.subscribers_count || 0,
          LastUpdated: RepoData.updated_at
            ? new Date(RepoData.updated_at).toLocaleDateString()
            : "",
          Stars: RepoData.stargazers_count || 0,
          Forks: RepoData.forks_count || 0,
          OpenIssues: RepoData.open_issues_count || 0,
          Watchers: RepoData.watchers_count || 0,
          Commits: Array.isArray(CommitsData) ? CommitsData.length : 0,
          PullRequests: Array.isArray(PullsData) ? PullsData.length : 0,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        setStats({
          TotalDocs: 0,
          TotalContributors: 0,
          LastUpdated: "",
          Stars: 0,
          Forks: 0,
          OpenIssues: 0,
          Watchers: 0,
          Commits: 0,
          PullRequests: 0,
        });
      }
    };

    FetchData();
  }, []);

  const Features = [
    {
      icon: <BookOpen className="h-10 w-10 text-indigo-600" />,
      title: t("features.comprehensive.title"),
      description: t("features.comprehensive.description"),
    },
    {
      icon: <Users className="h-10 w-10 text-indigo-600" />,
      title: t("features.community.title"),
      description: t("features.community.description"),
    },
    {
      icon: <Code2 className="h-10 w-10 text-indigo-600" />,
      title: t("features.interactive.title"),
      description: t("features.interactive.description"),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-indigo-50">
      <div className="max-w-6xL mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="pt-20 pb-16 md:pt-28 md:pb-24"
        >
          <div className="text-center">
            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl md:text-5xl w-11/12 mx-auto "
            >
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                {t("home.title")}
              </span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="block text-indigo-600 mt-3"
              >
                {t("home.subtitle")}
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 max-w-2xl mx-auto text-xl text-gray-600 leading-relaxed"
            >
              {t("home.description")}
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-10"
            >
              <form onSubmit={HandleSearch} className="max-w-xl mx-auto">
                <div className="relative rounded-full shadow-lg">
                  <input
                    type="text"
                    value={SearchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t("home.searchPlaceholder")}
                    className="block w-full pl-8 pr-14 py-5 rounded-full border-2 border-indigo-100 focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-300 text-lg"
                  />
                  <button
                    type="submit"
                    className="absolute right-5 top-1/2 transform -translate-y-1/2"
                  >
                    <Search className="h-6 w-6 text-indigo-600 hover:text-indigo-800 transition-colors duration-200" />
                  </button>
                </div>
              </form>
            </motion.div>

            <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-3">
              {Features.map((Feature, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 * index }}
                  key={index}
                  className="relative group bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-indigo-500 to-purple-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl" />
                  <div className="flex flex-col items-center">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                      className="mb-6"
                    >
                      {Feature.icon}
                    </motion.div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {Feature.title}
                    </h3>
                    <p className="text-gray-600 text-center leading-relaxed">
                      {Feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <GitHubStats stats={Stats} />
            <Contributors />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="py-16 border-t border-gray-100"
        >
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                to: "/docs/html",
                icon: <Code2 className="h-10 w-10 text-indigo-600 mb-5" />,
                title: "HTML",
                description:
                  "Core HTML concepts, semantic markup, and accessibility best practices.",
              },
              {
                to: "/docs/css",
                icon: <Layout className="h-10 w-10 text-indigo-600 mb-5" />,
                title: "CSS",
                description:
                  "Modern layouts, animations, and responsive design techniques.",
              },
              {
                to: "/docs/javascript",
                icon: <Terminal className="h-10 w-10 text-indigo-600 mb-5" />,
                title: "JavaScript",
                description:
                  "Modern JavaScript features, async programming, and best practices.",
              },
              {
                to: "/docs/nodejs",
                icon: <Database className="h-10 w-10 text-indigo-600 mb-5" />,
                title: "Node.js",
                description:
                  "Server-side JavaScript, APIs, and backend development.",
              },
              {
                to: "/docs/react",
                icon: <Code2 className="h-10 w-10 text-indigo-600 mb-5" />,
                title: "React",
                description:
                  "Components, hooks, state management, and React patterns.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.to}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index }}
                whileHover={{ y: -8 }}
              >
                <Link to={item.to} className="group">
                  <div className="relative rounded-2xl p-8 bg-white shadow-xl hover:shadow-2xl transition-all duration-300">
                    <div className="absolute inset-x-0 bottom-0 h-3 bg-gradient-to-r from-indigo-500 to-purple-600 transform origin-bottom scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl"></div>
                    {item.icon}
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
