export default {
  navigation: {
    home: "Accueil",
    documentation: "Documentation",
    search: "Rechercher",
    guide: "Guide",
  },
  home: {
    title: "Documentation Développement Web",
    subtitle: "Par la Communauté, Pour la Communauté",
    description:
      "Découvrez, contribuez et apprenez grâce aux connaissances collectives des développeurs du monde entier.",
    searchPlaceholder: "Rechercher dans la documentation...",
    stats: {
      totalDocs: "Documents Totaux",
      contributors: "Contributeurs",
      lastUpdated: "Dernière Mise à Jour",
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
      gettingStarted: "Pour Commencer",
      basics: "Les Bases",
      advanced: "Avancé",
      examples: "Exemples",
      resources: "Ressources",
    },
    common: {
      copyCode: "Copier le code",
      preview: "Aperçu",
      output: "Résultat",
      console: "Console",
      visual: "Visuel",
      shareLink: "Partager le lien",
      linkCopied: "Lien copié dans le presse-papiers !",
      shareSection: "Partager cette section",
    },
  },
  search: {
    placeholder: "Rechercher dans la documentation...",
    noResults: "Aucun résultat trouvé pour",
    startTyping: "Commencez à taper pour rechercher...",
    filters: {
      all: "Tout",
      title: "Titre",
      content: "Contenu",
      category: "Catégorie",
    },
    sorting: {
      relevance: "Pertinence",
      date: "Date",
      title: "Titre",
    },
  },
  errors: {
    notFound: "Page non trouvée",
    serverError: "Erreur serveur",
    networkError: "Erreur de connexion",
    tryAgain: "Réessayer",
  },
  components: {
    loading: "Chargement...",
    showMore: "Voir plus",
    showLess: "Voir moins",
    backToTop: "Retour en haut",
    lastUpdated: "Dernière mise à jour le",
  },
  features: {
    comprehensive: {
      title: "Documentation Complète",
      description: "Guides détaillés et références pour le développement web",
    },
    interactive: {
      title: "Exemples Interactifs",
      description: "Apprenez en pratiquant avec des exemples de code en direct",
    },
    community: {
      title: "Géré par la Communauté",
      description: "Créé par des développeurs, pour des développeurs",
    },
  },
  contribute: {
    banner: {
      title: "Partagez vos Connaissances",
      description: "Aidez la communauté en contribuant à la documentation",
      button: "Ajouter du Contenu",
    },
    section: {
      title: "Contribuez à la Documentation",
      description: "Rejoignez notre communauté et partagez votre expertise",
      helpText:
        "Un guide détaillé vous accompagnera tout au long du processus de contribution",
      cards: {
        documentation: {
          title: "Documentation",
          description:
            "Partagez vos connaissances en ajoutant de nouveaux contenus ou en améliorant la documentation existante.",
        },
        code: {
          title: "Exemples de Code",
          description:
            "Ajoutez des exemples pratiques et des cas d'utilisation pour aider les autres développeurs.",
        },
        community: {
          title: "Communauté",
          description:
            "Rejoignez une communauté active de développeurs et partagez vos expériences.",
        },
      },
      button: "Commencer à Contribuer",
    },
    nav: {
      title: "Structure",
      preview: "Configuration de l'Aperçu",
      github: "Intégration GitHub",
      category: "Catégorie",
      contentTitle: "Titre",
      content: "Contenu (HTML)",
      codeExample: "Exemple de Code",
      previewType: "Type d'Aperçu",
      previewContent: "Contenu de l'Aperçu",
      token: "Token d'Accès Personnel GitHub",
      tokenHelp:
        "Créez un token avec la portée 'repo' dans Paramètres GitHub → Paramètres développeur → Tokens d'accès personnel. Le token nécessite un accès complet 'repo' pour forker le dépôt et créer des pull requests.",
      submit: "Soumettre la Documentation",
    },
    emptySection: {
      title: "Cette section a besoin de contenu",
      description: "Soyez le premier à contribuer !",
      button: "Contribuer",
    },
    sidebar: {
      title: "Envie de contribuer ?",
      description: "Ajoutez votre expertise à la documentation",
      button: "Ajouter du Contenu",
    },
    page: {
      title: "Contribuer à la Documentation",
      subtitle:
        "Aidez-nous à améliorer en ajoutant de nouvelles sections de documentation. Vos contributions font la différence.",
      structure: {
        title: "Structure",
        category: {
          label: "Catégorie",
          options: {
            javascript: "JavaScript",
            html: "HTML",
            css: "CSS",
            react: "React",
            nodejs: "Node.js",
          },
        },
        title_field: "Titre",
        content: "Contenu (HTML)",
        code: "Exemple de Code",
      },
      preview: {
        title: "Configuration de l'Aperçu",
        type: {
          label: "Type d'Aperçu",
          visual: "Visuel",
          console: "Console",
        },
        content: "Contenu de l'Aperçu",
      },
      github: {
        title: "Intégration GitHub",
        token: {
          label: "Token d'Accès Personnel GitHub",
          placeholder: "ghp_votre_token_ici",
          help: "Créez un token avec la portée 'repo' dans Paramètres GitHub → Paramètres développeur → Tokens d'accès personnel. Le token nécessite un accès complet 'repo' pour forker le dépôt et créer des pull requests.",
        },
      },
      submit: {
        button: "Soumettre la Documentation",
        submitting: "Soumission en cours...",
        error: {
          token: "Le token GitHub est requis",
          unknown: "Une erreur inconnue est survenue",
        },
        success:
          "Documentation soumise avec succès ! Vous allez être redirigé vers la page de création de pull request.",
      },
    },
  },
};
