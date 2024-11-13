export default {
  navigation: {
    home: "Home",
    documentation: "Documentation",
    search: "Search",
    guide: "Guide",
  },
  home: {
    title: "Web Development Documentation",
    subtitle: "By the Community, For the Community",
    description:
      "Discover, contribute, and learn from the collective knowledge of developers worldwide.",
    searchPlaceholder: "Search documentation...",
    stats: {
      totalDocs: "Total Documents",
      contributors: "Contributors",
      lastUpdated: "Last Updated",
    },
  },
  documentation: {
    categories: {
      html: "HTML",
      css: "CSS",
      javascript: "JavaScript",
      nodejs: "Node.js",
      react: "React",
    },
    sections: {
      introduction: "Introduction",
      gettingStarted: "Getting Started",
      basics: "Basics",
      advanced: "Advanced",
      examples: "Examples",
      resources: "Resources",
    },
    common: {
      copyCode: "Copy Code",
      preview: "Preview",
      output: "Output",
      console: "Console",
      visual: "Visual",
      shareLink: "Share link",
      linkCopied: "Link copied to clipboard!",
      shareSection: "Share this section",
    },
  },
  search: {
    placeholder: "Search documentation...",
    noResults: "No results found for",
    startTyping: "Start typing to search...",
    filters: {
      all: "All",
      title: "Title",
      content: "Content",
      category: "Category",
    },
    sorting: {
      relevance: "Relevance",
      date: "Date",
      title: "Title",
    },
  },
  errors: {
    notFound: "Page not found",
    serverError: "Server error",
    networkError: "Network error",
    tryAgain: "Try again",
  },
  components: {
    loading: "Loading...",
    showMore: "Show more",
    showLess: "Show less",
    backToTop: "Back to top",
    lastUpdated: "Last updated on",
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
  contribute: {
    banner: {
      title: "Share Your Knowledge",
      description: "Help the community by contributing to the documentation",
      button: "Add Content",
    },
    section: {
      title: "Contribute to Documentation",
      description: "Join our community and share your expertise",
      cards: {
        documentation: {
          title: "Documentation",
          description:
            "Share your knowledge by adding new content or improving existing documentation.",
        },
        code: {
          title: "Code Examples",
          description:
            "Add practical examples and use cases to help other developers.",
        },
        community: {
          title: "Community",
          description:
            "Join an active community of developers and share your experiences.",
        },
      },
      button: "Start Contributing",
    },
    nav: {
      title: "Structure",
      preview: "Preview Configuration",
      github: "GitHub Integration",
      category: "Category",
      contentTitle: "Title",
      content: "Content (HTML)",
      codeExample: "Code Example",
      previewType: "Preview Type",
      previewContent: "Preview Content",
      token: "GitHub Personal Access Token",
      tokenHelp:
        "Create a token with 'repo' scope at GitHub Settings → Developer settings → Personal access tokens. The token needs full 'repo' access to fork the repository and create pull requests.",
      submit: "Submit Documentation",
    },
    sidebar: {
      title: "Want to contribute?",
      description: "Add your expertise to the documentation",
      button: "Add Content",
    },
    page: {
      title: "Contribute to Documentation",
      subtitle:
        "Help us improve by adding new documentation sections. Your contributions make a difference.",
      structure: {
        title: "Structure",
        category: {
          label: "Category",
          options: {
            javascript: "JavaScript",
            html: "HTML",
            css: "CSS",
            react: "React",
            nodejs: "Node.js",
          },
        },
        title_field: "Title",
        content: "Content (HTML)",
        code: "Code Example",
      },
      preview: {
        title: "Preview Configuration",
        type: {
          label: "Preview Type",
          visual: "Visual",
          console: "Console",
        },
        content: "Preview Content",
      },
      github: {
        title: "GitHub Integration",
        token: {
          label: "GitHub Personal Access Token",
          placeholder: "ghp_your_token_here",
          help: "Create a token with 'repo' scope at GitHub Settings → Developer settings → Personal access tokens. The token needs full 'repo' access to fork the repository and create pull requests.",
        },
      },
      submit: {
        button: "Submit Documentation",
        submitting: "Submitting...",
        error: {
          token: "GitHub token is required",
          unknown: "An unknown error occurred",
        },
        success:
          "Documentation submitted successfully! You will be redirected to create a pull request.",
      },
    },
  },
};
