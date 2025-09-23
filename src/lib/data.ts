import { Icons } from "@/components/icons";

export type Resource = {
  type: "video" | "article" | "course";
  title: string;
  url: string;
  duration?: string;
};

export type Module = {
  title: string;
  description: string;
  resources: Resource[];
  quiz?: {
    title: string;
    questions: any[];
  };
};

export type Level = {
  name: "Beginner" | "Intermediate" | "Advanced";
  modules: Module[];
};

export type Technology = {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: keyof typeof Icons;
  imageId: string;
  levels: Level[];
};

export const learningPaths: Technology[] = [
  {
    id: "csharp",
    slug: "csharp",
    name: "C#",
    description: "Master C#, a versatile language for web, mobile, and game development.",
    icon: "csharp",
    imageId: "tech-csharp",
    levels: [
      {
        name: "Beginner",
        modules: [
          {
            title: "Introduction to C# and .NET",
            description: "Understand the basics of C#, its syntax, and the .NET framework.",
            resources: [{ type: "video", title: "C# 101", url: "#", duration: "1h 30m" }],
          },
          {
            title: "Variables and Data Types",
            description: "Learn about different data types, variables, and type conversion.",
            resources: [{ type: "article", title: "C# Data Types Explained", url: "#" }],
          },
        ],
      },
      { name: "Intermediate", modules: [] },
      { name: "Advanced", modules: [] },
    ],
  },
  {
    id: "angular",
    slug: "angular",
    name: "Angular",
    description: "Build powerful single-page applications with Google's front-end framework.",
    icon: "angular",
    imageId: "tech-angular",
    levels: [
      {
        name: "Beginner",
        modules: [
          {
            title: "Getting Started with Angular",
            description: "Set up your first Angular project and understand its architecture.",
            resources: [{ type: "course", title: "Angular for Beginners", url: "#", duration: "5h" }],
          },
        ],
      },
      { name: "Intermediate", modules: [] },
      { name: "Advanced", modules: [] },
    ],
  },
  {
    id: "ionic",
    slug: "ionic",
    name: "Ionic",
    description: "Develop cross-platform mobile apps with a single codebase using web technologies.",
    icon: "ionic",
    imageId: "tech-ionic",
    levels: [
      {
        name: "Beginner",
        modules: [
          {
            title: "Ionic Framework Fundamentals",
            description: "Learn the core concepts of Ionic for building mobile apps.",
            resources: [{ type: "video", title: "Intro to Ionic", url: "#", duration: "2h 15m" }],
          },
        ],
      },
      { name: "Intermediate", modules: [] },
      { name: "Advanced", modules: [] },
    ],
  },
  {
    id: "blazor",
    slug: "blazor",
    name: "Blazor",
    description: "Create interactive web UIs using C# instead of JavaScript.",
    icon: "blazor",
    imageId: "tech-blazor",
    levels: [
      {
        name: "Beginner",
        modules: [
          {
            title: "Introduction to Blazor",
            description: "Explore how Blazor lets you build client-side web apps with .NET.",
            resources: [{ type: "article", title: "Blazor: A New Era for C# Web Devs", url: "#" }],
          },
        ],
      },
      { name: "Intermediate", modules: [] },
      { name: "Advanced", modules: [] },
    ],
  },
  {
    id: "razor",
    slug: "razor",
    name: "Razor",
    description: "Build dynamic web pages with this powerful template engine for ASP.NET.",
    icon: "razor",
    imageId: "tech-razor",
    levels: [
      {
        name: "Beginner",
        modules: [
          {
            title: "Razor Syntax Essentials",
            description: "Master the syntax for embedding server-based code into webpages.",
            resources: [{ type: "video", title: "Razor Pages in ASP.NET Core", url: "#", duration: "3h" }],
          },
        ],
      },
      { name: "Intermediate", modules: [] },
      { name: "Advanced", modules: [] },
    ],
  },
];
