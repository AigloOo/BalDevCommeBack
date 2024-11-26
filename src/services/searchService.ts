import { frenchDocumentation } from "../translations/documentation.fr";
import { documentationData } from "../data/documentation";

export function searchDocumentation(query: string, language: string) {
  const data = language === "fr" ? frenchDocumentation : documentationData;
  const results = [];

  for (const [category, categoryData] of Object.entries(data)) {
    if (!categoryData.sections) continue;

    for (const [index, section] of categoryData.sections.entries()) {
      const searchableContent = [
        section.title,
        section.content.replace(/<[^>]*>/g, ""),
      ]
        .join(" ")
        .toLowerCase();

      if (searchableContent.includes(query.toLowerCase())) {
        const sectionId = section.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/-+/g, "-")
          .replace(/^-|-$/g, "");

        results.push({
          category,
          title: section.title,
          content:
            section.content.replace(/<[^>]*>/g, "").substring(0, 200) + "...",
          path: `/docs/${category}/${sectionId}`,
          sectionIndex: index,
        });
      }
    }
  }

  return results;
}
