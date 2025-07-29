export interface ResumeData {
  name: string
  title: string
  contact: string
  summary: string
  experience: Array<{
    position: string
    company: string
    date: string
    description: string
  }>
  education: Array<{
    degree: string
    school: string
    date: string
    details: string
  }>
  skills: string[]
  projects: Array<{
    name: string
    date: string
    description: string
    link: string
  }>
}

export function parseMarkdownResume(markdown: string): ResumeData {
  const lines = markdown.split("\n")
  const data: ResumeData = {
    name: "",
    title: "",
    contact: "",
    summary: "",
    experience: [],
    education: [],
    skills: [],
    projects: [],
  }

  let currentSection = ""
  let currentItem: any = {}
  let descriptionLines: string[] = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()

    if (!line) continue

    // Main title (name)
    if (line.startsWith("# ")) {
      data.name = line.substring(2).trim()
      continue
    }

    // Subtitle (title/position)
    if (line.startsWith("**") && line.endsWith("**") && !line.includes(":")) {
      data.title = line.substring(2, line.length - 2).trim()
      continue
    }

    // Contact info (contains email, phone, etc.)
    if (line.includes("@") || line.includes("📧") || line.includes("📱") || line.includes("🌐")) {
      data.contact = line
      continue
    }

    // Section headers
    if (line.startsWith("## ")) {
      // Save previous item if exists
      if (currentItem.position || currentItem.degree || currentItem.name) {
        if (descriptionLines.length > 0) {
          currentItem.description = descriptionLines.join("\n")
        }

        if (currentSection === "Experience") {
          data.experience.push(currentItem)
        } else if (currentSection === "Education") {
          data.education.push(currentItem)
        } else if (currentSection === "Projects") {
          data.projects.push(currentItem)
        }
      }

      currentSection = line.substring(3).trim()
      currentItem = {}
      descriptionLines = []
      continue
    }

    // Handle different sections
    if (currentSection === "Summary") {
      if (!line.startsWith("#")) {
        data.summary += (data.summary ? " " : "") + line
      }
    } else if (currentSection === "Experience" || currentSection === "Education" || currentSection === "Projects") {
      if (line.startsWith("### ")) {
        // Save previous item
        if (currentItem.position || currentItem.degree || currentItem.name) {
          if (descriptionLines.length > 0) {
            currentItem.description = descriptionLines.join("\n")
          }

          if (currentSection === "Experience") {
            data.experience.push(currentItem)
          } else if (currentSection === "Education") {
            data.education.push(currentItem)
          } else if (currentSection === "Projects") {
            data.projects.push(currentItem)
          }
        }

        // Start new item
        currentItem = {}
        descriptionLines = []

        const titleLine = line.substring(4).trim()
        if (titleLine.includes("|")) {
          const parts = titleLine.split("|").map((p) => p.trim())
          if (currentSection === "Experience") {
            currentItem.position = parts[0]
            currentItem.company = parts[1] || ""
          } else if (currentSection === "Education") {
            currentItem.degree = parts[0]
            currentItem.school = parts[1] || ""
          } else if (currentSection === "Projects") {
            currentItem.name = parts[0]
          }
        } else {
          if (currentSection === "Experience") {
            currentItem.position = titleLine
          } else if (currentSection === "Education") {
            currentItem.degree = titleLine
          } else if (currentSection === "Projects") {
            currentItem.name = titleLine
          }
        }
      } else if (line.startsWith("*") && line.endsWith("*")) {
        // Date line
        currentItem.date = line.substring(1, line.length - 1).trim()
      } else if (line.startsWith("- ") || line.startsWith("* ")) {
        // Description bullet point
        descriptionLines.push(line.substring(2))
      } else if (line.startsWith("**") && line.endsWith("**")) {
        // Bold text (like Technologies)
        descriptionLines.push(line)
      } else if (!line.startsWith("#")) {
        // Regular description line
        if (currentSection === "Education" && line.includes("GPA")) {
          currentItem.details = (currentItem.details || "") + line + "\n"
        } else if (currentSection === "Projects" && line.includes("GitHub")) {
          currentItem.link = line
        } else {
          descriptionLines.push(line)
        }
      }
    } else if (currentSection === "Skills") {
      if (line.startsWith("- ")) {
        data.skills.push(line.substring(2))
      } else if (!line.startsWith("#")) {
        data.skills.push(line)
      }
    }
  }

  // Save last item
  if (currentItem.position || currentItem.degree || currentItem.name) {
    if (descriptionLines.length > 0) {
      currentItem.description = descriptionLines.join("\n")
    }

    if (currentSection === "Experience") {
      data.experience.push(currentItem)
    } else if (currentSection === "Education") {
      data.education.push(currentItem)
    } else if (currentSection === "Projects") {
      data.projects.push(currentItem)
    }
  }

  return data
}
