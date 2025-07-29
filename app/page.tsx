"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Eye, FileText, Palette } from "lucide-react"
import { ResumePreview } from "@/components/resume-preview"
import { parseMarkdownResume } from "@/lib/markdown-parser"

const defaultMarkdown = `# John Doe
**Software Engineer**
📧 john.doe@email.com | 📱 +1 (555) 123-4567 | 🌐 linkedin.com/in/johndoe | 📍 San Francisco, CA

## Summary
Experienced software engineer with 5+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Passionate about creating scalable solutions and leading development teams.

## Experience

### Senior Software Engineer | TechCorp Inc.
*Jan 2022 - Present*
- Led development of microservices architecture serving 1M+ users
- Implemented CI/CD pipelines reducing deployment time by 60%
- Mentored 3 junior developers and conducted code reviews
- **Technologies:** React, Node.js, AWS, Docker, Kubernetes

### Software Engineer | StartupXYZ
*Jun 2019 - Dec 2021*
- Developed responsive web applications using React and TypeScript
- Built RESTful APIs with Node.js and Express
- Collaborated with design team to implement pixel-perfect UIs
- **Technologies:** React, TypeScript, Node.js, MongoDB

## Education

### Bachelor of Science in Computer Science
*University of California, Berkeley | 2015 - 2019*
- GPA: 3.8/4.0
- Relevant Coursework: Data Structures, Algorithms, Software Engineering

## Skills
- **Frontend:** React, TypeScript, Next.js, Tailwind CSS
- **Backend:** Node.js, Python, Express, FastAPI
- **Database:** PostgreSQL, MongoDB, Redis
- **Cloud:** AWS, Docker, Kubernetes
- **Tools:** Git, Jenkins, Jira, Figma

## Projects

### E-commerce Platform
*Personal Project | 2023*
- Built full-stack e-commerce platform with React and Node.js
- Integrated Stripe payment processing and inventory management
- **GitHub:** github.com/johndoe/ecommerce-platform

### Task Management App
*Open Source | 2022*
- Developed collaborative task management application
- Implemented real-time updates using WebSockets
- **GitHub:** github.com/johndoe/task-manager`

const templates = [
  { id: "modern", name: "Modern", description: "Clean and contemporary design" },
  { id: "classic", name: "Classic", description: "Traditional professional layout" },
  { id: "creative", name: "Creative", description: "Colorful and unique design" },
  { id: "minimal", name: "Minimal", description: "Simple and elegant" },
]

export default function ResumeGenerator() {
  const [markdown, setMarkdown] = useState(defaultMarkdown)
  const [selectedTemplate, setSelectedTemplate] = useState("modern")
  const [activeTab, setActiveTab] = useState("edit")

  const resumeData = parseMarkdownResume(markdown)

  const handleExportPDF = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">ResımeGenMarkdown</h1>
          <p className="text-lg text-gray-600">Markdown'dan otomatik özgeçmiş oluşturucu</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Editor Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Markdown Editor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={markdown}
                  onChange={(e) => setMarkdown(e.target.value)}
                  placeholder="Özgeçmişinizi Markdown formatında yazın..."
                  className="min-h-[500px] font-mono text-sm"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Şablon Seçimi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                  <SelectTrigger>
                    <SelectValue placeholder="Şablon seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {templates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        <div>
                          <div className="font-medium">{template.name}</div>
                          <div className="text-sm text-muted-foreground">{template.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </div>

          {/* Preview Panel */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="edit" className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    Önizleme
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <Button onClick={handleExportPDF} className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                PDF İndir
              </Button>
            </div>

            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-white" id="resume-content">
                  <ResumePreview data={resumeData} template={selectedTemplate} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Instructions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Nasıl Kullanılır?</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Markdown Formatı:</h4>
                <ul className="text-sm space-y-1">
                  <li>
                    <code># İsim</code> - Ana başlık
                  </li>
                  <li>
                    <code>**Pozisyon**</code> - Alt başlık
                  </li>
                  <li>
                    <code>## Bölüm</code> - Bölüm başlıkları
                  </li>
                  <li>
                    <code>### Alt Başlık</code> - Alt bölümler
                  </li>
                  <li>
                    <code>*Tarih*</code> - İtalik metin
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Özellikler:</h4>
                <ul className="text-sm space-y-1">
                  <li>✅ Canlı önizleme</li>
                  <li>✅ PDF export</li>
                  <li>✅ 4 farklı şablon</li>
                  <li>✅ Responsive tasarım</li>
                  <li>✅ Otomatik formatlamaı</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #resume-content, #resume-content * {
            visibility: visible;
          }
          #resume-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}
