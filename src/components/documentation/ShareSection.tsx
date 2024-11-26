import { Facebook, Twitter, Linkedin, Link as LinkIcon } from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

interface ShareSectionProps {
  sectionId: string;
  title: string;
}

export default function ShareSection({ sectionId, title }: ShareSectionProps) {
  const [showToast, setShowToast] = useState(false);
  const location = useLocation();

  const getShareUrl = () => {
    const baseUrl = window.location.origin;
    const path = location.pathname;
    return `${baseUrl}${path}#${sectionId}`;
  };

  const shareUrl = getShareUrl();
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(`${title} | BalDev Documentation`);

  const copyToClipboard = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = shareUrl;
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand("copy");
          setShowToast(true);
          setTimeout(() => setShowToast(false), 2000);
        } catch (err) {
          console.error("Fallback: Oops, unable to copy", err);
        }
        document.body.removeChild(textArea);
      }
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const socialLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <button
          onClick={copyToClipboard}
          className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-indigo-600 hover:border-indigo-600 transition-all duration-200"
        >
          <LinkIcon className="h-4 w-4" />
          <span>Share link</span>
        </button>

        <div className="flex items-center gap-1">
          <a
            href={socialLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-gray-600 hover:text-blue-400 hover:bg-blue-50 rounded-full transition-all duration-200"
            title="Share on Twitter"
          >
            <Twitter className="h-4 w-4" />
          </a>
          <a
            href={socialLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200"
            title="Share on Facebook"
          >
            <Facebook className="h-4 w-4" />
          </a>
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-gray-600 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-all duration-200"
            title="Share on LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        </div>
      </div>

      {showToast && (
        <div className="fixed bottom-4 left-4 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in-up">
          <LinkIcon className="h-4 w-4" />
          <span>Link copied to clipboard!</span>
        </div>
      )}
    </>
  );
}
