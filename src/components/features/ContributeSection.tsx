import { Link } from "react-router-dom";
import { useTranslation } from "../../hooks/useTranslation";
import { Github, BookOpen, Code, Users } from "lucide-react";

export default function ContributeSection() {
  const { t } = useTranslation();

  const contributionSteps = [
    {
      icon: <BookOpen className="h-6 w-6 text-indigo-600" />,
      bgColor: "bg-indigo-100",
      title: t("contribute.section.cards.documentation.title"),
      description: t("contribute.section.cards.documentation.description"),
      examples: [
        "Guides d'utilisation",
        "Concepts fondamentaux",
        "Bonnes pratiques",
      ],
    },
    {
      icon: <Code className="h-6 w-6 text-purple-600" />,
      bgColor: "bg-purple-100",
      title: t("contribute.section.cards.code.title"),
      description: t("contribute.section.cards.code.description"),
      examples: [
        "Exemples de code",
        "Cas d'utilisation",
        "Solutions techniques",
      ],
    },
    {
      icon: <Users className="h-6 w-6 text-pink-600" />,
      bgColor: "bg-pink-100",
      title: t("contribute.section.cards.community.title"),
      description: t("contribute.section.cards.community.description"),
      examples: [
        "Retours d'expérience",
        "Conseils pratiques",
        "Astuces de développement",
      ],
    },
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 rounded-2xl my-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {t("contribute.section.title")}
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            {t("contribute.section.description")}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {contributionSteps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className={`${step.bgColor} rounded-lg p-3 inline-block`}>
                {step.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                {step.title}
              </h3>
              <p className="mt-2 text-gray-600">{step.description}</p>
              <ul className="mt-4 space-y-2">
                {step.examples.map((example, i) => (
                  <li
                    key={i}
                    className="flex items-center text-sm text-gray-500"
                  >
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                    {example}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center space-y-4">
          <Link
            to="/contribute"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
          >
            <Github className="h-5 w-5 mr-2" />
            {t("contribute.section.button")}
          </Link>
          <p className="text-sm text-gray-500">
            {t("contribute.section.helpText")}
          </p>
        </div>
      </div>
    </div>
  );
}
