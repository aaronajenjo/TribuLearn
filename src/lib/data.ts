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
  sopraResources: Resource[];
  youtubeResources: Resource[];
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

type Translator = (key: string,
  params?: { [key: string]: string | number }
) => string;

export const learningPaths = (t: Translator): Technology[] => [
  {
    id: "csharp",
    slug: "csharp",
    name: "C#",
    description: t('technologies.csharp.description'),
    icon: "csharp",
    imageId: "tech-csharp",
    levels: [
      {
        name: "Beginner",
        modules: [
          {
            title: t('technologies.csharp.beginner.module1.title'),
            description: t('technologies.csharp.beginner.module1.description'),
            sopraResources: [
              {
                type: "course",
                title: "C# Development Fundamentals Journey",
                url: "https://soprasteria.percipio.com/journey/be885a23-3ee8-4c14-8407-ea1d3d0c6dab",
              },
            ],
            youtubeResources: [
                { type: 'video', title: 'C# Tutorial For Beginners - Learn C# in 1 Hour', url: 'https://www.youtube.com/watch?v=gfkTfcpWqAY', duration: '1h' },
                { type: 'video', title: 'C# Full Course for free', url: 'https://www.youtube.com/watch?v=wxznTygnRfQ', duration: '6h' },
                { type: 'video', title: 'C# Tutorial - Full Course for Beginners', url: 'https://www.youtube.com/watch?v=GhQdlIFylQ8', duration: '4h 26m' },
                { type: 'video', title: 'Master Design Patterns & SOLID Principles in C# - Full OOP Course for Beginners', url: 'https://www.youtube.com/watch?v=rylaiB2uH2A', duration: '3h 36m' },
                { type: 'video', title: '7 Patrones de Diseño que todo Programador Debería Conocer', url: 'https://www.youtube.com/watch?v=rqOaZf4xMlI', duration: '20m' },
            ]
          },
          {
            title: t('technologies.csharp.beginner.module2.title'),
            description: t('technologies.csharp.beginner.module2.description'),
            sopraResources: [
              {
                type: "article",
                title: "C# Data Types Explained",
                url: "https://www.w3schools.com/cs/cs_data_types.php",
              },
            ],
            youtubeResources: []
          },
        ],
      },
      {
        name: "Intermediate",
        modules: [
          {
            title: t("technologies.csharp.intermediate.module1.title"),
            description: t(
              "technologies.csharp.intermediate.module1.description"
            ),
            sopraResources: [
              {
                type: "course",
                title: "C# Intermediate Learning Track",
                url: "https://soprasteria.percipio.com/track/3ca3af36-ed2c-49b4-92c6-7e02d7b80d22",
              },
              {
                type: "course",
                title: "Web Apps with C# & ASP.NET Track",
                url: "https://soprasteria.percipio.com/track/fed7500e-f1c5-42cf-9b14-2c738633361a",
              },
            ],
            youtubeResources: [
              {
                type: "video",
                title: "Building an API with ASP.NET Core",
                url: "https://www.youtube.com/watch?v=e1hpjbClopA&pp=ygUdYXNwLm5ldCBjb3JlIHdlYiBhcGkgdHV0b3JpYWw%3D",
                duration: "2h 45m",
              },
              {
                type: "video",
                title: "Entity Framework Core Crash Course",
                url: "https://www.youtube.com/watch?v=lOCUFuTyvaE",
                duration: "1h 50m",
              },
              {
                type: "video",
                title: "C# Async/Await Explained",
                url: "https://www.youtube.com/watch?v=5a6WCBftjvw",
                duration: "30m",
              },
            ],
          },
        ],
      },
      { 
        name: "Advanced", 
        modules: [
          {
            title: t("technologies.csharp.advanced.module1.title"),
            description: t("technologies.csharp.advanced.module1.description"),
            sopraResources: [
              {
                type: "course",
                title: "C# Advanced Learning Track",
                url: "https://soprasteria.percipio.com/track/ba25d689-0c0e-4585-92b7-640ed1651c7d",
              },
            ],
            youtubeResources: [],
          },
        ] 
      },
    ],
  },
  {
    id: "angular",
    slug: "angular",
    name: "Angular",
    description: t('technologies.angular.description'),
    icon: "angular",
    imageId: "tech-angular",
    levels: [
      {
        name: "Beginner",
        modules: [
          {
            title: t('technologies.angular.beginner.module1.title'),
            description: t('technologies.angular.beginner.module1.description'),
            sopraResources: [
              {
                type: "course",
                title: "Angular for Beginners",
                url: "https://www.youtube.com/watch?v=3qBXWUpoPHo",
                duration: "9h 53m",
              },
            ],
            youtubeResources: [
                { type: 'video', title: 'Angular for Beginners - Full Course', url: 'https://www.youtube.com/watch?v=k5E2AVpwsko', duration: '11h' },
                { type: 'video', title: 'Learn Angular in 1 Hour', url: 'https://www.youtube.com/watch?v=2-c3f_gA4sQ', duration: '1h' },
                { type: 'video', title: 'Angular Tutorial for Beginners', url: 'https://www.youtube.com/watch?v=k_AlE32zM0w', duration: '2h' },
            ]
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
    description: t('technologies.ionic.description'),
    icon: "ionic",
    imageId: "tech-ionic",
    levels: [
      {
        name: "Beginner",
        modules: [
          {
            title: t('technologies.ionic.beginner.module1.title'),
            description: t('technologies.ionic.beginner.module1.description'),
            sopraResources: [
              {
                type: "video",
                title: "Intro to Ionic",
                url: "https://www.youtube.com/watch?v=O2giE-Ja_1I",
                duration: "1h 12m",
              },
            ],
            youtubeResources: [
                { type: 'video', title: 'Ionic 7 Crash Course', url: 'https://www.youtube.com/watch?v=r2ga-i-s20c', duration: '2h' },
                { type: 'video', title: 'Learn Ionic in 1 Hour', url: 'https://www.youtube.com/watch?v=u5pybe_8YCE', duration: '1h' },
                { type: 'video', title: 'Build Your First Ionic App', url: 'https://www.youtube.com/watch?v=s50z8b3i-4Y', duration: '45m' },
            ]
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
    description: t('technologies.blazor.description'),
    icon: "blazor",
    imageId: "tech-blazor",
    levels: [
      {
        name: "Beginner",
        modules: [
          {
            title: t('technologies.blazor.beginner.module1.title'),
            description: t('technologies.blazor.beginner.module1.description'),
            sopraResources: [
              {
                type: "article",
                title: "Blazor: A New Era for C# Web Devs",
                url: "https://dotnet.microsoft.com/en-us/apps/aspnet/web-apps/blazor",
              },
            ],
            youtubeResources: [
                { type: 'video', title: 'Blazor Full Course for Beginners', url: 'https://www.youtube.com/watch?v=w_x3d5gS4_8', duration: '9h' },
                { type: 'video', title: 'Blazor Crash Course', url: 'https://www.youtube.com/watch?v=p4vG3g0A54A', duration: '2h' },
                { type: 'video', title: 'Learn Blazor in 1 Hour', url: 'https://www.youtube.com/watch?v=M5-3mYf4xVY', duration: '1h' },
            ]
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
    description: t('technologies.razor.description'),
    icon: "razor",
    imageId: "tech-razor",
    levels: [
      {
        name: "Beginner",
        modules: [
          {
            title: t('technologies.razor.beginner.module1.title'),
            description: t('technologies.razor.beginner.module1.description'),
            sopraResources: [
              {
                type: "video",
                title: "Razor Pages in ASP.NET Core",
                url: "https://www.youtube.com/watch?v=a-i0g_a5-3E",
                duration: "3h 48m",
              },
            ],
            youtubeResources: [
                { type: 'video', title: '.NET Core Razor Pages Tutorial', url: 'https://www.youtube.com/watch?v=F0G901I4M44', duration: '2h' },
                { type: 'video', title: 'Razor Pages for Beginners', url: 'https://www.youtube.com/watch?v=iAm_n2iT4fA', duration: '40m' },
                { type: 'video', title: 'Creating a Web App with Razor Pages', url: 'https://www.youtube.com/watch?v=13n5f0f5U6Y', duration: '1h 30m' },
            ]
          },
        ],
      },
      { name: "Intermediate", modules: [] },
      { name: "Advanced", modules: [] },
    ],
  },
];
