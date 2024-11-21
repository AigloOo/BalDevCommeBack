import { useParams, Link, Navigate } from "react-router-dom";
import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import { ChevronRight, BookOpen, X, Menu } from "lucide-react";
import { useTranslation } from "../hooks/useTranslation";
import Sidebar from "../components/layout/Sidebar";
import ShareSection from "../components/documentation/ShareSection";
import ContributeBanner from "../components/features/ContributeBanner";
import { documentationData } from "../data/documentation";

interface Section {
  title: string;
  content: string;
  code?: string;
  preview?: {
    type: string;
    html?: string;
    output?: string;
  };
  translations?: {
    [lang: string]: {
      title: string;
      content: string;
    };
  };
}

interface Documentation {
  title: string;
  sections: Section[];
  translations?: {
    [lang: string]: {
      title: string;
    };
  };
}

export default function Documentation() {
  const { category } = useParams();
  const { currentLanguage, getDocumentation } = useTranslation();
  const [currentDocs, setCurrentDocs] = useState<Documentation | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (category) {
      const translatedDocs = getDocumentation(category);
      if (translatedDocs) {
        setCurrentDocs(JSON.parse(translatedDocs));
      } else {
        const defaultDocs =
          documentationData[category as keyof typeof documentationData];
        setCurrentDocs(defaultDocs);
      }
    }
  }, [category, currentLanguage, getDocumentation]);

  const scrollToHash = () => {
    setTimeout(() => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        const element = document.getElementById(hash);
        if (element) {
          const headerOffset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }
    }, 300);
  };

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [location.hash, category]);

  useEffect(() => {
    const handleHashChange = () => {
      scrollToHash();
    };

    if (location.hash) {
      scrollToHash();
    }

    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [location.hash, category]);

  if (!currentDocs) {
    return <Navigate to="/docs/javascript" replace />;
  }

  const getTranslatedContent = (section: Section) => {
    if (currentLanguage === "en") {
      return {
        title: section.title,
        content: section.content,
      };
    }

    return {
      title: section.translations?.[currentLanguage]?.title ?? section.title,
      content:
        section.translations?.[currentLanguage]?.content ?? section.content,
    };
  };

  const getTranslatedTitle = (docs: Documentation) => {
    if (currentLanguage === "en") {
      return docs.title;
    }
    return docs.translations?.[currentLanguage]?.title ?? docs.title;
  };

  const sanitizeHTML = (html: string) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  const handleCopyCode = async (code: string | undefined) => {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden fixed bottom-4 right-4 z-50 bg-indigo-600 text-white p-3 rounded-full shadow-lg"
      >
        {isSidebarOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      <div
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:sticky top-0 h-screen w-64 transition-transform duration-300 ease-in-out z-40 md:z-0 overflow-y-auto`}
      >
        <Sidebar />
      </div>

      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <ContributeBanner />
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
            <Link to="/" className="hover:text-gray-900">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link to="/docs" className="hover:text-gray-900">
              Documentation
            </Link>
            {category && (
              <>
                <ChevronRight className="h-4 w-4" />
                <span className="text-gray-900 capitalize">{category}</span>
              </>
            )}
          </div>

          <div className="prose prose-indigo max-w-none">
            <h1 className="flex items-center space-x-3 text-4xl font-bold text-gray-900">
              <BookOpen className="h-8 w-8 text-indigo-600" />
              <span>{getTranslatedTitle(currentDocs)}</span>
            </h1>
            <div className="mt-8 space-y-12">
              {currentDocs?.sections &&
                Array.isArray(currentDocs.sections) &&
                currentDocs.sections.map((section, index) => {
                  const translatedSection = getTranslatedContent(section);
                  const sectionId = section.title
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/(^-|-$)/g, "")
                    .trim();

                  return (
                    <section
                      key={index}
                      id={sectionId}
                      className="bg-white rounded-lg shadow-sm p-6 scroll-mt-24"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h2 className="text-2xl font-bold text-gray-900">
                          {translatedSection.title}
                        </h2>
                        <ShareSection
                          sectionId={sectionId}
                          title={translatedSection.title}
                        />
                      </div>
                      <div
                        className="prose prose-indigo max-w-none"
                        dangerouslySetInnerHTML={sanitizeHTML(
                          translatedSection.content
                        )}
                      />

                      {section.code && (
                        <div className="mt-4">
                          <div className="relative bg-gray-900 rounded-lg p-4 shadow-lg border border-gray-700">
                            <div className="flex items-center mb-2 bg-gray-800 rounded-t-lg p-2 -mt-4 -mx-4 border-b border-gray-700">
                              <div className="flex space-x-2">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                              </div>
                              <span className="ml-4 text-sm text-gray-400">
                                Code
                              </span>
                              <button
                                onClick={() => handleCopyCode(section.code)}
                                className="ml-auto p-1 text-gray-400 hover:text-white rounded"
                              >
                                Copy Code
                              </button>
                            </div>
                            <pre className="text-sm text-gray-100 overflow-x-auto font-mono">
                              <code>{section.code}</code>
                            </pre>
                          </div>
                          {section.preview && (
                            <div className="mt-4">
                              <h4 className="text-sm font-medium text-gray-500 mb-2">
                                Preview
                              </h4>
                              {section.preview.type === "visual" &&
                              section.preview.html ? (
                                <div
                                  className="border rounded-lg p-4 bg-white"
                                  dangerouslySetInnerHTML={sanitizeHTML(
                                    section.preview.html
                                  )}
                                />
                              ) : (section.preview.type === "output" ||
                                  section.preview.type === "console") &&
                                (section.preview.output ||
                                  section.preview.html) ? (
                                <div className="bg-gray-900 rounded-lg p-4 shadow-lg border border-gray-700">
                                  <div className="flex items-center mb-2 bg-gray-800 rounded-t-lg p-2 -mt-4 -mx-4 border-b border-gray-700">
                                    <div className="flex space-x-2">
                                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    </div>
                                    <span className="ml-4 text-sm text-gray-400">
                                      {section.preview.type === "console"
                                        ? "Console"
                                        : "Output"}
                                    </span>
                                  </div>
                                  <pre className="text-sm text-green-400 font-mono">
                                    {section.preview.output ||
                                      section.preview.html}
                                  </pre>
                                </div>
                              ) : null}
                            </div>
                          )}
                        </div>
                      )}
                    </section>
                  );
                })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
