import { useParams, Navigate, useLocation, Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { useEffect, useState, useCallback } from "react";
import { ChevronRight, BookOpen, X, Menu } from "lucide-react";
import { useTranslation } from "../hooks/useTranslation";
import Sidebar from "../components/layout/Sidebar";
import ContributeBanner from "../components/features/ContributeBanner";
import { documentationData } from "../data/documentation";
import ShareSection from "../components/documentation/ShareSection";
import { toast } from "../ui/Toast";

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

interface DocumentationData {
  [key: string]: Documentation;
}

export default function Documentation() {
  const { category } = useParams();
  const location = useLocation();
  const { currentLanguage, t } = useTranslation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const currentDocs = (documentationData as DocumentationData)[
    category as string
  ];

  const scrollToSection = useCallback(
    (sectionId: string) => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
        const newUrl = `/docs/${category}#${sectionId}`;
        window.history.pushState({}, "", newUrl);
      }
    },
    [category]
  );

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash) {
      setTimeout(() => {
        scrollToSection(hash);
      }, 100);
    }
  }, [location.hash, scrollToSection]);

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

  const sanitizeHTML = (html: string | undefined) => {
    if (!html) return { __html: "" };
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  const handleCopyCode = async (code: string | undefined) => {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      toast({
        title: t("documentation.common.copyCode"),
        description: t("documentation.common.linkCopied"),
        duration: 2000,
      });
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
              {currentDocs?.sections.map((section, index) => {
                const { title, content } = getTranslatedContent(section);
                const sectionId = title
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/-+/g, "-")
                  .replace(/^-|-$/g, "");

                return (
                  <section
                    key={sectionId}
                    id={sectionId}
                    className="mb-12 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
                    data-section-index={index}
                  >
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold text-gray-900">
                        {title}
                      </h2>
                      <ShareSection sectionId={sectionId} title={title} />
                    </div>

                    <div
                      className="prose max-w-none"
                      dangerouslySetInnerHTML={sanitizeHTML(content)}
                    />

                    {section.code && (
                      <div className="mt-6 relative">
                        <div className="absolute right-2 top-2">
                          <button
                            onClick={() => handleCopyCode(section.code)}
                            className="bg-gray-800 text-white px-3 py-1 rounded-md text-sm hover:bg-gray-700 transition-colors"
                          >
                            {t("documentation.common.copyCode")}
                          </button>
                        </div>
                        <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
                          <code>{section.code}</code>
                        </pre>
                      </div>
                    )}

                    {section.preview && (
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-3">
                          {t("documentation.common.preview")}
                        </h3>
                        <div className="border rounded-lg p-4">
                          <div
                            dangerouslySetInnerHTML={sanitizeHTML(
                              section.preview.html
                            )}
                          />
                        </div>
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
