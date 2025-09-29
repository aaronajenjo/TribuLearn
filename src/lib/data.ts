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
                { type: 'video', title: 'C# Full Course for free C#', url: 'https://www.youtube.com/watch?v=wxznTygnRfQ', duration: '6h' },
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
                url: "https://soprasteria.percipio.com/track/fed7500e-f1c5-42cf-9b14-2c738633361a",
              },
            ],
            youtubeResources: [
              {
                type: "video",
                title: "Building REST API using ASP.NET Core and Entity Framework Core",
                url: "https://www.youtube.com/watch?v=e1hpjbClopA",
                duration: "2h 45m",
              },
              {
                type: "video",
                title: "5 Design Patterns That Are ACTUALLY Used By Developers",
                url: "https://www.youtube.com/watch?v=YMAwgRwjEOQ",
                duration: "30m",
              },
              {
                type: "video",
                title: "C# Async/Await Explained in 20 Minutes",
                url: "https://www.youtube.com/watch?v=5a6WCBftjvw",
                duration: "20m",
              },
              {
                type: "video",
                title: "Entity Framework Core Crash Course",
                url: "https://www.youtube.com/watch?v=lOCUFuTyvaE",
                duration: "1h 50m",
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
            youtubeResources: [
              {
                type: "video",
                title: "Advanced C# – LINQ Tutorial",
                url: "https://www.youtube.com/watch?v=5l2qA3Pc83M",
                duration: "27m",
              },
              {
                type: "video",
                title: "5 Design Patterns That Are ACTUALLY Used By Developers",
                url: "https://www.youtube.com/watch?v=YMAwgRwjEOQ",
                duration: "30m",
              },
              {
                type: "video",
                title: ".NET Microservices – Full Course",
                url: "https://www.youtube.com/watch?v=DgVjEo3OGBI&list=PLpXfHEl2fzl7a7p4ntTmdjmNSD1iEYXrm",
                duration: "1h 14m",
              },
              {
                type: "video",
                title: "Speed Up Your C# Applications - Performance Optimization Made Practical",
                url: "https://www.youtube.com/watch?v=zzNHSeW1nFs",
                duration: "49m",
              },
            ],
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
                title: "Angular Beginner Journey",
                url: "https://soprasteria.percipio.com/channels/f3619a61-1944-11e7-b488-c198130a9b04/view/6c3e8841-d56a-45d2-a6dd-36ac704c9d8d?tab=WATCH",
              },
              {
                type: "video",
                title: "What's New in Angular 17 & 18",
                url: "https://soprasteria.percipio.com/courses/9d2b542c-d61e-4ffd-a7e0-99df49567f0e/videos/6e3bfbd3-992e-4739-aaf2-6a4b2b5a95f2",
                duration: "35m"
              }
            ],
            youtubeResources: [
                { type: 'video', title: 'Angular for Beginners - Full Course', url: 'https://www.youtube.com/watch?v=3qBXWUpoPHo', duration: '11h' },
                { type: 'video', title: 'Learn Angular - Full Tutorial for Beginners', url: 'https://www.youtube.com/watch?v=f7unUpshmpA', duration: '1h' },
                { type: 'video', title: 'Angular Component Communication', url: 'https://www.youtube.com/watch?v=MtTAfjiZxtk', duration: '20m' },
            ]
          },
        ],
      },
      { 
        name: "Intermediate", 
        modules: [
          {
            title: t('technologies.angular.intermediate.module1.title'),
            description: t('technologies.angular.intermediate.module1.description'),
            sopraResources: [
              {
                type: "course",
                title: "Angular Intermediate Journey",
                url: "https://soprasteria.percipio.com/channels/f3619a61-1944-11e7-b488-c198130a9b04/view/a11bcb81-3461-4631-89be-586006d1d293?tab=WATCH",
              },
            ],
            youtubeResources: [
              { type: 'video', title: 'Angular Dependency Injection - A Deep Dive', url: 'https://www.youtube.com/watch?v=OFPIGlxunL0', duration: '25m' },
              { type: 'video', title: 'Angular Migration from v14 to v17', url: 'https://www.youtube.com/watch?v=fbCfniJT_JA', duration: '30m' },
              { type: 'video', title: 'Are Modules required in Angular 19?', url: 'https://www.youtube.com/watch?v=x5PZwb4XurU', duration: '15m' },
            ]
          },
        ] 
      },
      { 
        name: "Advanced", 
        modules: [
          {
            title: t('technologies.angular.advanced.module1.title'),
            description: t('technologies.angular.advanced.module1.description'),
            sopraResources: [
              {
                type: "course",
                title: "Angular Advanced Journey",
                url: "https://soprasteria.percipio.com/channels/f3619a61-1944-11e7-b488-c198130a9b04/view/8f0be60e-27a4-4470-95a8-4b57e1ca48e4?tab=WATCH",
              },
            ],
            youtubeResources: [
              { type: 'course', title: 'Mastering Angular', url: 'https://www.youtube.com/watch?v=R_It2UgUssg&list=PLoC8Q0moRTSgYzCoo5fklvPT40KQVUorx', duration: '54 videos' },
            ]
          },
        ] 
      },
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
                { type: 'video', title: 'Ionic 7 Crash Course | Build a Complete App with Standalone Components', url: 'https://www.youtube.com/watch?v=r2ga-i-s20c', duration: '2h' },
                { type: 'video', title: 'Learn Ionic in 1 Hour', url: 'https://www.youtube.com/watch?v=u5pybe_8YCE', duration: '1h' },
                { type: 'video', title: 'Build Your First Ionic App: A Beginner\'s Guide', url: 'https://www.youtube.com/watch?v=s50z8b3i-4Y', duration: '45m' },
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
              { type: 'course', title: 'Blazor Tutorial for Beginners', url: 'https://www.youtube.com/watch?v=uuzi3SmCLVo&list=PL6n9fhu94yhVowClAs8-6nYnfsOTma14P', duration: '131 videos' },
              { type: 'video', title: 'Blazor in 100 Seconds', url: 'https://www.youtube.com/watch?v=w8imy7LT9zY', duration: '2m 17s' },
            ]
          },
        ],
      },
      { 
        name: "Intermediate", 
        modules: [
          {
            title: t('technologies.blazor.intermediate.module1.title'),
            description: t('technologies.blazor.intermediate.module1.description'),
            sopraResources: [],
            youtubeResources: [
              { type: 'video', title: 'Blazor Components | Ep 3 | Blazor for Beginners', url: 'https://www.youtube.com/watch?v=G910vWOdhQ8&list=PLzewa6pjbr3IQEUfNiK2SROQC1NuKl6PV&index=3', duration: '27m' },
              { type: 'video', title: 'Blazor Forms and Validation | Ep 5 | Blazor for Beginners', url: 'https://www.youtube.com/watch?v=3Gr83lIaENg&list=PLzewa6pjbr3IQEUfNiK2SROQC1NuKl6PV&index=5', duration: '26m' },
            ]
          }
        ] 
      },
      { 
        name: "Advanced", 
        modules: [
          {
            title: t('technologies.blazor.advanced.module1.title'),
            description: t('technologies.blazor.advanced.module1.description'),
            sopraResources: [],
            youtubeResources: [
              { type: 'video', title: 'Authentication in Blazor | Ep 12 | Blazor for Beginners', url: 'https://www.youtube.com/watch?v=iq2btD9WufI&list=PLzewa6pjbr3IQEUfNiK2SROQC1NuKl6PV&index=12', duration: '24m' },
              { type: 'video', title: 'Publishing a Blazor App | Ep 16 | Blazor for Beginners', url: 'https://www.youtube.com/watch?v=vi51RBc_TkY&list=PLzewa6pjbr3IQEUfNiK2SROQC1NuKl6PV&index=16', duration: '10m' },
              { type: 'video', title: 'How to deploy Blazor app to Azure | Blazor for Beginners', url: 'https://www.youtube.com/watch?v=oprGTwdpDKk&list=PLzewa6pjbr3IQEUfNiK2SROQC1NuKl6PV&index=24', duration: '9m' },
              { type: 'video', title: 'Publish to IIS | Ep 28 | Blazor for Beginners', url: 'https://www.youtube.com/watch?v=STtxYvPxPl4&list=PLzewa6pjbr3IQEUfNiK2SROQC1NuKl6PV&index=28', duration: '10m' },
            ]
          }
        ] 
      },
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
                { type: 'video', title: '.NET Core Razor Pages Tutorial for Beginners', url: 'https://www.youtube.com/watch?v=F0G901I4M44', duration: '2h' },
                { type: 'video', title: 'Razor Pages for Beginners', url: 'https://www.youtube.com/watch?v=iAm_n2iT4fA', duration: '40m' },
                { type: 'video', title: 'Creating a Web App with Razor Pages and Entity Framework Core', url: 'https://www.youtube.com/watch?v=13n5f0f5U6Y', duration: '1h 30m' },
            ]
          },
        ],
      },
      { name: "Intermediate", modules: [] },
      { name: "Advanced", modules: [] },
    ],
  },
];
