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

interface DocumentationSectionProps {
  section: Section;
  index: number;
}

export function DocumentationSection({
  section,
  index,
}: DocumentationSectionProps) {
  const sectionId = `section-${index}-${section.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <div
      className="documentation-section"
      data-section-index={index}
      id={sectionId}
    >
      <h2>{section.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: section.content }} />
    </div>
  );
}
