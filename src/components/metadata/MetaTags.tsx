import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface MetaTagsProps {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
}

export default function MetaTags({
  title = "Web Development Documentation",
  description = "Discover, contribute, and learn from the collective knowledge of developers worldwide.",
  image = "/og-image.png",
  type = "website",
}: MetaTagsProps) {
  const location = useLocation();

  useEffect(() => {
    document.title = title;

    const metaTags = [
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: image },
      { property: "og:type", content: type },
      {
        property: "og:url",
        content: `https://baldev.jean-winter.fr${location.pathname}`,
      },
    ];

    metaTags.forEach(({ property, content }) => {
      const elements = document.getElementsByTagName("meta");
      for (let i = 0; i < elements.length; i++) {
        if (elements[i].getAttribute("property") === property) {
          elements[i].setAttribute("content", content);
        }
      }
    });
  }, [title, description, image, type, location]);

  return null;
}
