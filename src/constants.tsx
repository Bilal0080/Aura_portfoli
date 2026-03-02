import { motion } from "motion/react";
import { Github, Linkedin, Mail, ExternalLink, Code2, Palette, Terminal, Globe } from "lucide-react";

export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  link: string;
  github?: string;
  image: string;
  thumbnail: string;
  year: string;
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "EcoSphere Dashboard",
    description: "A real-time environmental monitoring platform with interactive data visualizations.",
    longDescription: "EcoSphere is a comprehensive environmental monitoring solution designed for city planners. It utilizes real-time sensor data to visualize air quality, noise levels, and traffic patterns. Built with a focus on performance and accessibility, it features complex D3.js visualizations and a highly responsive Tailwind-based UI.",
    tags: ["React", "TypeScript", "D3.js", "Tailwind"],
    link: "#",
    github: "#",
    image: "https://picsum.photos/seed/eco/800/600",
    thumbnail: "https://picsum.photos/seed/eco-thumb/200/200",
    year: "2024"
  },
  {
    id: 2,
    title: "Lumina Creative Studio",
    description: "A high-end digital agency landing page with immersive visual storytelling.",
    longDescription: "Lumina is a showcase of modern web capabilities. It features advanced scroll-triggered animations using Motion and Three.js for 3D elements. The project focuses on creating a cinematic experience for users, pushing the boundaries of traditional web design with fluid transitions and high-fidelity assets.",
    tags: ["Next.js", "Motion", "Three.js", "PostCSS"],
    link: "#",
    github: "#",
    image: "https://picsum.photos/seed/lumina/800/600",
    thumbnail: "https://picsum.photos/seed/lumina-thumb/200/200",
    year: "2023"
  },
  {
    id: 3,
    title: "Synthetix API",
    description: "A robust GraphQL API gateway for managing distributed microservices.",
    longDescription: "Synthetix provides a unified interface for complex microservice architectures. It handles authentication, rate limiting, and data aggregation across multiple backend services. The project includes an automated documentation generator and a real-time monitoring dashboard for API health.",
    tags: ["Node.js", "GraphQL", "Docker", "Redis"],
    link: "#",
    github: "#",
    image: "https://picsum.photos/seed/api/800/600",
    thumbnail: "https://picsum.photos/seed/api-thumb/200/200",
    year: "2024"
  },
  {
    id: 4,
    title: "Personal Portfolio v2",
    description: "A professional portfolio showcasing creative works and technical skills.",
    longDescription: "This portfolio is a live demonstration of my design philosophy and technical stack. It features a custom filtering system, immersive animations, and a focus on typography. It's built to be fast, accessible, and easily maintainable.",
    tags: ["React", "Motion", "Tailwind"],
    link: "https://bilal007.godaddysites.com/",
    github: "#",
    image: "https://picsum.photos/seed/portfolio/800/600",
    thumbnail: "https://picsum.photos/seed/portfolio-thumb/200/200",
    year: "2025"
  }
];

export const SKILLS = [
  { name: "Frontend", icon: <Palette className="w-5 h-5" />, items: ["React", "TypeScript", "Tailwind", "Motion"] },
  { name: "Backend", icon: <Terminal className="w-5 h-5" />, items: ["Node.js", "Express", "PostgreSQL", "Redis"] },
  { name: "Tools", icon: <Code2 className="w-5 h-5" />, items: ["Git", "Docker", "AWS", "Vite"] },
  { name: "Design", icon: <Globe className="w-5 h-5" />, items: ["Figma", "UI/UX", "Responsive Design"] }
];
