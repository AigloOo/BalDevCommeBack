import { documentationData } from "../data/documentation";

const translations = {
  en: {
    navigation: {
      documentation: "Documentation",
      search: "Search",
      home: "Home",
    },
    home: {
      title: "Web Development Documentation",
      subtitle: "By the Community, For the Community",
      description:
        "Discover, contribute, and learn from the collective knowledge of developers worldwide.",
      searchPlaceholder: "Search documentation...",
    },
    features: {
      comprehensive: {
        title: "Comprehensive Documentation",
        description: "Detailed guides and references for web development",
      },
      interactive: {
        title: "Interactive Examples",
        description: "Learn by doing with live code examples",
      },
      community: {
        title: "Community Driven",
        description: "Created by developers, for developers",
      },
    },
  },
  fr: {
    navigation: {
      documentation: "Documentation",
      search: "Rechercher",
      home: "Accueil",
    },
    home: {
      title: "Documentation Développement Web",
      subtitle: "Par la Communauté, Pour la Communauté",
      description:
        "Découvrez, contribuez et apprenez grâce aux connaissances collectives des développeurs du monde entier.",
      searchPlaceholder: "Rechercher dans la documentation...",
    },
    features: {
      comprehensive: {
        title: "Documentation Complète",
        description: "Guides détaillés et références pour le développement web",
      },
      interactive: {
        title: "Exemples Interactifs",
        description:
          "Apprenez en pratiquant avec des exemples de code en direct",
      },
      community: {
        title: "Géré par la Communauté",
        description: "Créé par des développeurs, pour des développeurs",
      },
    },
  },
};

export function getTranslation(language: string, path: string): string {
  const pathParts = path.split(".");
  let result: Record<string, unknown> =
    translations[language as keyof typeof translations];

  for (const part of pathParts) {
    if (result && typeof result === "object" && part in result) {
      result = result[part] as Record<string, unknown>;
    } else {
      return path;
    }
  }

  if (typeof result !== "string") {
    return path;
  }

  return result;
}

export function getDocumentationInLanguage(language: string, category: string) {
  const docs = documentationData[category as keyof typeof documentationData];
  if (!docs) return null;

  return {
    ...docs,
    sections: docs.sections.map((section) => ({
      ...section,
      title:
        getTranslation(
          language,
          `documentation.${category}.${section.title}`
        ) || section.title,
      content:
        getTranslation(
          language,
          `documentation.${category}.${section.content}`
        ) || section.content,
    })),
  };
}
