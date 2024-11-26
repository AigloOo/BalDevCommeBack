import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search as SearchIcon } from "lucide-react";
import { documentationData } from "../data/documentation";
import { motion, AnimatePresence } from "framer-motion";

interface SearchResult {
  category: string;
  title: string;
  content: string;
  path: string;
}

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [results, setResults] = useState<SearchResult[]>([]);

  const performSearch = (searchQuery: string) => {
    const searchResults: SearchResult[] = [];

    Object.entries(documentationData).forEach(([category, data]) => {
      data.sections.forEach((section) => {
        const titleMatch = section.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const contentMatch = section.content
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

        if (titleMatch || contentMatch) {
          const sectionId = section.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");

          searchResults.push({
            category,
            title: section.title,
            content:
              section.content.replace(/<[^>]*>/g, "").slice(0, 150) + "...",
            path: `/docs/${category}#${sectionId}`,
          });
        }
      });
    });

    setResults(searchResults);
  };

  useEffect(() => {
    if (query) {
      performSearch(query);
      setSearchParams({ q: query });
    }
  }, [query, setSearchParams]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-4xl font-bold text-center text-gray-900 mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
      >
        Search Our Documentation
      </motion.h1>

      <motion.div initial={{ y: -20 }} animate={{ y: 0 }} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search documentation..."
          className="w-full px-6 py-4 rounded-xl border-2 border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent shadow-sm hover:shadow-md transition-all duration-200"
        />
        <SearchIcon className="absolute right-4 top-4 h-6 w-6 text-gray-400" />
      </motion.div>

      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="mt-8 space-y-6"
      >
        <AnimatePresence>
          {results.length > 0 ? (
            results.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={result.path}
                  className="block bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
                >
                  <div className="flex items-center space-x-2 text-sm text-indigo-600 mb-2">
                    <span className="capitalize bg-indigo-50 px-3 py-1 rounded-full">
                      {result.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {result.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {result.content}
                  </p>
                </Link>
              </motion.div>
            ))
          ) : query ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-500 text-center text-lg"
            >
              No results found for "{query}"
            </motion.p>
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-500 text-center text-lg"
            >
              Start typing to search...
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
