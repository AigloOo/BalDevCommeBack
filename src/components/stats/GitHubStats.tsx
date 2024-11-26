import {
  Star,
  GitFork,
  Eye,
  GitPullRequest,
  GitCommit,
  AlertCircle,
} from "lucide-react";
import { motion } from "framer-motion";

interface GitHubStatsProps {
  stats: {
    stars: number;
    forks: number;
    watchers: number;
    commits: number;
    pullRequests: number;
    openIssues: number;
  };
}

export default function GitHubStats({ stats }: GitHubStatsProps) {
  const statItems = [
    { icon: <Star className="h-6 w-6" />, value: stats.stars, label: "Stars" },
    {
      icon: <GitFork className="h-6 w-6" />,
      value: stats.forks,
      label: "Forks",
    },
    {
      icon: <Eye className="h-6 w-6" />,
      value: stats.watchers,
      label: "Watchers",
    },
    {
      icon: <GitCommit className="h-6 w-6" />,
      value: stats.commits,
      label: "Commits",
    },
    {
      icon: <GitPullRequest className="h-6 w-6" />,
      value: stats.pullRequests,
      label: "Pull Requests",
    },
    {
      icon: <AlertCircle className="h-6 w-6" />,
      value: stats.openIssues,
      label: "Open Issues",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="mt-16 bg-white rounded-2xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-all duration-300"
    >
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-2xl font-bold text-gray-900 mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
      >
        GitHub Statistics
      </motion.h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {statItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className="group relative flex flex-col items-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-indigo-500 to-purple-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-xl" />
            <motion.div
              whileHover={{ scale: 1.2, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="text-indigo-600 mb-3"
            >
              {item.icon}
            </motion.div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {item.value}
            </div>
            <div className="text-sm font-medium text-gray-600">
              {item.label}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
