import { BaseMember } from '../types/members'

export interface Client extends BaseMember {
  link: string
  type: string
  description: string
  techStack: string[]
  purpose: string
  date: string
  pms: string[]
  screenshots: string[]
}

export const clientProjects: Client[] = [
  {
    name: "Joy",
    title: "AI Wellness Platform",
    link: "https://joy-app.com",
    type: "AI Wellness Platform",
    image: "/images/joy-logo.png",
    description: "At MDB, we brought the vision of Joy to reality, an innovative AI wellness platform. Utilizing cutting-edge AI, Joy analyzes emotions through voice, offering users personalized wellness practices.",
    techStack: ["Python", "React Native", "AI/ML"],
    purpose: "Mental Health Apps",
    date: "Spring 2024",
    pms: ["Amol", "Aldrin"],
    screenshots: [
      "/images/joy-screenshot1.png",
      "/images/joy-screenshot2.png",
      "/images/joy-screenshot3.png"
    ]
  },
  {
    name: "EduTech",
    title: "Learning Management System",
    link: "https://edutech-app.com",
    type: "Learning Management System",
    image: "/images/edutech-logo.png",
    description: "A comprehensive online learning platform that revolutionizes how students and educators interact with educational content through interactive courses and real-time assessments.",
    techStack: ["React", "Node.js", "MongoDB"],
    purpose: "Education Technology",
    date: "Fall 2023",
    pms: ["Sarah", "Mike"],
    screenshots: [
      "/images/edutech-screenshot1.png",
      "/images/edutech-screenshot2.png"
    ]
  },
  {
    name: "HealthConnect",
    title: "Healthcare Portal",
    link: "https://healthconnect-app.com",
    type: "Healthcare Portal",
    image: "/images/healthconnect-logo.png",
    description: "Secure patient management system with advanced appointment scheduling and comprehensive medical records management for healthcare providers.",
    techStack: ["Vue.js", "Python", "PostgreSQL"],
    purpose: "Healthcare Solutions",
    date: "Spring 2023",
    pms: ["Emma", "David"],
    screenshots: [
      "/images/healthconnect-screenshot1.png",
      "/images/healthconnect-screenshot2.png",
      "/images/healthconnect-screenshot3.png"
    ]
  }
]
