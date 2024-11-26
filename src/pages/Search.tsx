import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Search as SearchIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { searchDocumentation } from "../services/searchService";

interface SearchResult {
  category: string;
  title: string;
  content: string;
  path: string;
  sectionIndex: number;
}

export default function Search() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [results, setResults] = useState<SearchResult[]>([]);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const handleSearch = useCallback(
    (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setResults([]);
        return;
      }

      try {
        const searchResults = searchDocumentation(searchQuery, i18n.language);
        setResults(searchResults);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      }
    },
    [i18n.language]
  );

  const handleResultClick = (result: SearchResult) => {
    const path = `/docs/${result.category}`;
    navigate(path, {
      state: { scrollToSection: result.sectionIndex },
    });

    setTimeout(() => {
      const sectionId = result.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      handleSearch(query);
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [query, handleSearch]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
      >
        {t("search.title", "Search Documentation")}
      </motion.h1>

      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("search.placeholder")}
          className="w-full px-6 py-4 rounded-xl border-2 border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent shadow-sm hover:shadow-md transition-all duration-200"
        />
        <SearchIcon className="absolute right-4 top-4 h-6 w-6 text-gray-400" />
      </div>

      <div className="mt-8">
        <AnimatePresence initial={false}>
          {results.length > 0 && (
            <motion.div className="space-y-6">
              {results.map((result, index) => (
                <motion.div
                  key={`${result.category}-${result.sectionIndex}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <button
                    onClick={() => handleResultClick(result)}
                    className="w-full text-left block bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
                  >
                    <div className="flex items-center space-x-2 text-sm text-indigo-600 mb-2">
                      <span className="capitalize bg-indigo-50 px-3 py-1 rounded-full">
                        {t(
                          `documentation.categories.${result.category}`,
                          result.category
                        )}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {result.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {result.content}
                    </p>
                  </button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence initial={false}>
          {!results.length && query && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-gray-500 text-center text-lg"
            >
              {t("search.noResults").replace("{query}", query)}
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence initial={false}>
          {!query && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-gray-500 text-center text-lg"
            >
              {t("search.startTyping")}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
