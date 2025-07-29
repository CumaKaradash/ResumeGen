import type { ResumeData } from "@/lib/markdown-parser"

interface ResumePreviewProps {
  data: ResumeData
  template: string
}

export function ResumePreview({ data, template }: ResumePreviewProps) {
  const getTemplateStyles = () => {
    switch (template) {
      case "modern":
        return {
          container: "bg-white p-8 max-w-4xl mx-auto",
          header: "border-b-4 border-blue-600 pb-6 mb-6",
          name: "text-3xl font-bold text-gray-900",
          title: "text-xl text-blue-600 mt-2",
          contact: "text-gray-600 mt-4",
          section: "mb-6",
          sectionTitle: "text-xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2 mb-4",
          experience: "mb-4 pb-4 border-b border-gray-100 last:border-b-0",
          jobTitle: "font-semibold text-gray-900",
          company: "text-blue-600",
          date: "text-gray-500 text-sm",
          description: "text-gray-700 mt-2",
        }
      case "classic":
        return {
          container: "bg-white p-8 max-w-4xl mx-auto font-serif",
          header: "text-center border-b-2 border-gray-800 pb-6 mb-6",
          name: "text-3xl font-bold text-gray-900",
          title: "text-lg text-gray-700 mt-2",
          contact: "text-gray-600 mt-4",
          section: "mb-6",
          sectionTitle: "text-lg font-bold text-gray-900 uppercase tracking-wide mb-4",
          experience: "mb-4",
          jobTitle: "font-semibold text-gray-900",
          company: "text-gray-700",
          date: "text-gray-500 text-sm",
          description: "text-gray-700 mt-2",
        }
      case "creative":
        return {
          container: "bg-gradient-to-br from-purple-50 to-pink-50 p-8 max-w-4xl mx-auto",
          header: "bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-lg mb-6",
          name: "text-3xl font-bold",
          title: "text-lg mt-2 opacity-90",
          contact: "mt-4 opacity-90",
          section: "mb-6",
          sectionTitle: "text-xl font-bold text-purple-700 mb-4",
          experience: "bg-white p-4 rounded-lg mb-4 shadow-sm",
          jobTitle: "font-semibold text-gray-900",
          company: "text-purple-600",
          date: "text-gray-500 text-sm",
          description: "text-gray-700 mt-2",
        }
      case "minimal":
        return {
          container: "bg-white p-8 max-w-4xl mx-auto",
          header: "mb-8",
          name: "text-2xl font-light text-gray-900",
          title: "text-lg text-gray-600 mt-1",
          contact: "text-gray-500 mt-3 text-sm",
          section: "mb-8",
          sectionTitle: "text-lg font-light text-gray-900 mb-4",
          experience: "mb-6",
          jobTitle: "font-medium text-gray-900",
          company: "text-gray-600",
          date: "text-gray-400 text-sm",
          description: "text-gray-700 mt-2 text-sm",
        }
      default:
        return {
          container: "bg-white p-8 max-w-4xl mx-auto",
          header: "border-b-4 border-blue-600 pb-6 mb-6",
          name: "text-3xl font-bold text-gray-900",
          title: "text-xl text-blue-600 mt-2",
          contact: "text-gray-600 mt-4",
          section: "mb-6",
          sectionTitle: "text-xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2 mb-4",
          experience: "mb-4 pb-4 border-b border-gray-100 last:border-b-0",
          jobTitle: "font-semibold text-gray-900",
          company: "text-blue-600",
          date: "text-gray-500 text-sm",
          description: "text-gray-700 mt-2",
        }
    }
  }

  const styles = getTemplateStyles()

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.name}>{data.name}</h1>
        {data.title && <p className={styles.title}>{data.title}</p>}
        {data.contact && <p className={styles.contact}>{data.contact}</p>}
      </div>

      {/* Summary */}
      {data.summary && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Özet</h2>
          <p className={styles.description}>{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Deneyim</h2>
          {data.experience.map((exp, index) => (
            <div key={index} className={styles.experience}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className={styles.jobTitle}>{exp.position}</h3>
                  <p className={styles.company}>{exp.company}</p>
                </div>
                <span className={styles.date}>{exp.date}</span>
              </div>
              {exp.description && (
                <div className={styles.description}>
                  {exp.description.split("\n").map((line, i) => (
                    <p key={i} className="mb-1">
                      {line}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Eğitim</h2>
          {data.education.map((edu, index) => (
            <div key={index} className={styles.experience}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className={styles.jobTitle}>{edu.degree}</h3>
                  <p className={styles.company}>{edu.school}</p>
                </div>
                <span className={styles.date}>{edu.date}</span>
              </div>
              {edu.details && <p className={styles.description}>{edu.details}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Yetenekler</h2>
          <div className="space-y-2">
            {data.skills.map((skill, index) => (
              <p key={index} className={styles.description}>
                {skill}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Projeler</h2>
          {data.projects.map((project, index) => (
            <div key={index} className={styles.experience}>
              <div className="flex justify-between items-start mb-2">
                <h3 className={styles.jobTitle}>{project.name}</h3>
                <span className={styles.date}>{project.date}</span>
              </div>
              {project.description && <p className={styles.description}>{project.description}</p>}
              {project.link && <p className="text-blue-600 text-sm mt-1">{project.link}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
