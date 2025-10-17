import { Icons } from "@/components/icons";

export type Resource = {
  type: "video" | "article" | "course";
  source: "sopra" | "youtube";
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
            resources: [
              {
                type: "course",
                source: "sopra",
                title: "C# Development Fundamentals Journey",
                url: "https://sopra.percipio.com/journey/be885a23-3ee8-4c14-8407-ea1d3d0c6dab",
              },
              { type: 'video', source: 'youtube', title: 'C# Tutorial For Beginners - Learn C# in 1 Hour', url: 'https://www.youtube.com/watch?v=gfkTfcpWqAY', duration: '1h' },
              { type: 'video', source: 'youtube', title: 'C# Full Course for free C#', url: 'https://www.youtube.com/watch?v=wxznTygnRfQ', duration: '6h' },
              { type: 'video', source: 'youtube', title: 'C# Tutorial - Full Course for Beginners', url: 'https://www.youtube.com/watch?v=GhQdlIFylQ8', duration: '4h 26m' },
              { type: 'video', source: 'youtube', title: 'Master Design Patterns & SOLID Principles in C# - Full OOP Course for Beginners', url: 'https://www.youtube.com/watch?v=rylaiB2uH2A', duration: '3h 36m' },
              { type: 'video', source: 'youtube', title: '7 Patrones de Diseño que todo Programador Debería Conocer', url: 'https://www.youtube.com/watch?v=rqOaZf4xMlI', duration: '20m' },
            ]
          },
          {
            title: t('technologies.csharp.beginner.module2.title'),
            description: t('technologies.csharp.beginner.module2.description'),
            resources: [
              {
                type: "article",
                source: "sopra",
                title: "C# Data Types Explained",
                url: "https://www.w3schools.com/cs/cs_data_types.php",
              },
            ]
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
            resources: [
              {
                type: "course",
                source: "sopra",
                title: "C# Intermediate Learning Track",
                url: "https://sopra.percipio.com/track/fed7500e-f1c5-42cf-9b14-2c738633361a",
              },
              {
                type: "video",
                source: "youtube",
                title: "Building REST API using ASP.NET Core and Entity Framework Core",
                url: "https://www.youtube.com/watch?v=e1hpjbClopA",
                duration: "2h 45m",
              },
              {
                type: "video",
                source: "youtube",
                title: "5 Design Patterns That Are ACTUALLY Used By Developers",
                url: "https://www.youtube.com/watch?v=YMAwgRwjEOQ",
                duration: "30m",
              },
              {
                type: "video",
                source: "youtube",
                title: "C# Async/Await Explained in 20 Minutes",
                url: "https://www.youtube.com/watch?v=5a6WCBftjvw",
                duration: "20m",
              },
              {
                type: "video",
                source: "youtube",
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
            resources: [
              {
                type: "course",
                source: "sopra",
                title: "C# Advanced Learning Track",
                url: "https://sopra.percipio.com/track/ba25d689-0c0e-4585-92b7-640ed1651c7d",
              },
              {
                type: "video",
                source: "youtube",
                title: "Advanced C# – LINQ Tutorial",
                url: "https://www.youtube.com/watch?v=5l2qA3Pc83M",
                duration: "27m",
              },
              {
                type: "video",
                source: "youtube",
                title: "5 Design Patterns That Are ACTUALLY Used By Developers",
                url: "https://www.youtube.com/watch?v=YMAwgRwjEOQ",
                duration: "30m",
              },
              {
                type: "course",
                source: "youtube",
                title: ".NET Microservices – Full Course",
                url: "https://www.youtube.com/watch?v=DgVjEo3OGBI&list=PLpXfHEl2fzl7a7p4ntTmdjmNSD1iEYXrm",
                duration: "Multiple videos",
              },
              {
                type: "video",
                source: "youtube",
                title: "Speed Up Your C# Applications - Performance Optimization Made Practical",
                url: "https://www.youtube.com/watch?v=zzNHSeW1nFs",
                duration: "49m",
              },
              {
                type: "course",
                source: "youtube",
                title: "Advanced C# Topics",
                url: "https://www.youtube.com/watch?v=dkFYUUWdQYI&list=PLSr9CPTtmP9js0n4XOmI4vfKeVvlS32PA",
                duration: "Multiple videos"
              }
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
            resources: [
              {
                type: "course",
                source: "sopra",
                title: "Angular Beginner Journey",
                url: "https://sopra.percipio.com/channels/f3619a61-1944-11e7-b488-c198130a9b04/view/6c3e8841-d56a-45d2-a6dd-36ac704c9d8d?tab=WATCH",
              },
              {
                type: "video",
                source: "sopra",
                title: "What's New in Angular 17 & 18",
                url: "https://sopra.percipio.com/courses/9d2b542c-d61e-4ffd-a7e0-99df49567f0e/videos/6e3bfbd3-992e-4739-aaf2-6a4b2b5a95f2",
                duration: "35m"
              },
              { type: 'video', source: 'youtube', title: 'Angular for Beginners - Full Course', url: 'https://www.youtube.com/watch?v=3qBXWUpoPHo', duration: '11h 17m' },
              { type: 'video', source: 'youtube', title: 'Learn Angular - Full Tutorial for Beginners', url: 'https://www.youtube.com/watch?v=f7unUpshmpA', duration: '1h 12m' },
              { type: 'video', source: 'youtube', title: 'Angular Component Communication', url: 'https://www.youtube.com/watch?v=MtTAfjiZxtk', duration: '20m' },
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
            resources: [
              {
                type: "course",
                source: "sopra",
                title: "Angular Intermediate Journey",
                url: "https://sopra.percipio.com/channels/f3619a61-1944-11e7-b488-c198130a9b04/view/a11bcb81-3461-4631-89be-586006d1d293?tab=WATCH",
              },
              { type: 'video', source: 'youtube', title: 'Angular Dependency Injection - A Deep Dive', url: 'https://www.youtube.com/watch?v=OFPIGlxunL0', duration: '25m' },
              { type: 'video', source: 'youtube', title: 'Angular Migration from v14 to v17', url: 'https://www.youtube.com/watch?v=fbCfniJT_JA', duration: '30m' },
              { type: 'video', source: 'youtube', title: 'Are Modules required in Angular 19?', url: 'https://www.youtube.com/watch?v=x5PZwb4XurU', duration: '15m' },
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
            resources: [
              {
                type: "course",
                source: "sopra",
                title: "Angular Advanced Journey",
                url: "https://sopra.percipio.com/channels/f3619a61-1944-11e7-b488-c198130a9b04/view/8f0be60e-27a4-4470-95a8-4b57e1ca48e4?tab=WATCH",
              },
              { type: 'course', source: 'youtube', title: 'Mastering Angular', url: 'https://www.youtube.com/watch?v=R_It2UgUssg&list=PLoC8Q0moRTSgYzCoo5fklvPT40KQVUorx', duration: '54 videos' },
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
            resources: [
              {
                type: "video",
                source: "sopra",
                title: "Intro to Ionic",
                url: "https://www.youtube.com/watch?v=O2giE-Ja_1I",
                duration: "1h 12m",
              },
              { type: 'video', source: 'youtube', title: 'Ionic 7 Crash Course | Build a Complete App with Standalone Components', url: 'https://www.youtube.com/watch?v=5Gj4Y8zvl-s', duration: '1h 56m' },
              { type: 'video', source: 'youtube', title: 'Ionic Tutorial #2 - The Basics (How Ionic Works)', url: 'https://www.youtube.com/watch?v=Fh8MmgWWvMs', duration: '11m' },
              { type: 'video', source: 'youtube', title: 'Ionic Tutorial #4 - Navigation & Pages', url: 'https://www.youtube.com/watch?v=8xf0X4KEIkg', duration: '14m' },
              { type: 'video', source: 'youtube', title: 'Ionic Tutorial #8 - Data, Events & Lifecycle Hooks', url: 'https://www.youtube.com/watch?v=E-aXqVe2K1g', duration: '13m' },
            ]
          },
        ],
      },
      { 
        name: "Intermediate", 
        modules: [
          {
            title: t('technologies.ionic.intermediate.module1.title'),
            description: t('technologies.ionic.intermediate.module1.description'),
            resources: [
              { type: 'video', source: 'youtube', title: 'Ionic Tutorial #9 - HTTP Requests', url: 'https://www.youtube.com/watch?v=_p4lL3dhovY', duration: '11m' },
              { type: 'video', source: 'youtube', title: 'Ionic Tutorial #13 - Storing Data with Storage', url: 'https://www.youtube.com/watch?v=WshbmpP5JuY', duration: '12m' },
            ]
          }
        ] 
      },
      { 
        name: "Advanced", 
        modules: [
          {
            title: t('technologies.ionic.advanced.module1.title'),
            description: t('technologies.ionic.advanced.module1.description'),
            resources: [
              { type: 'video', source: 'youtube', title: 'Ionic Tutorial #19 - Authentication', url: 'https://www.youtube.com/watch?v=PZ8stXVoXjE', duration: '16m' },
              { type: 'video', source: 'youtube', title: 'Ionic Tutorial #28 - Building for Android & IOS', url: 'https://www.youtube.com/watch?v=4y3AeFDdFVY', duration: '11m' },
            ]
          }
        ] 
      },
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
            resources: [
              {
                type: "article",
                source: "sopra",
                title: "Blazor: A New Era for C# Web Devs",
                url: "https://dotnet.microsoft.com/en-us/apps/aspnet/web-apps/blazor",
              },
              { type: 'course', source: 'youtube', title: 'Blazor Tutorial for Beginners', url: 'https://www.youtube.com/watch?v=uuzi3SmCLVo&list=PL6n9fhu94yhVowClAs8-6nYnfsOTma14P', duration: '131 videos' },
              { type: 'video', source: 'youtube', title: 'Blazor in 100 Seconds', url: 'https://www.youtube.com/watch?v=w8imy7LT9zY', duration: '2m 17s' },
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
            resources: [
              { type: 'video', source: 'youtube', title: 'Blazor Components | Ep 3 | Blazor for Beginners', url: 'https://www.youtube.com/watch?v=G910vWOdhQ8&list=PLzewa6pjbr3IQEUfNiK2SROQC1NuKl6PV&index=3', duration: '27m' },
              { type: 'video', source: 'youtube', title: 'Blazor Forms and Validation | Ep 5 | Blazor for Beginners', url: 'https://www.youtube.com/watch?v=3Gr83lIaENg&list=PLzewa6pjbr3IQEUfNiK2SROQC1NuKl6PV&index=5', duration: '26m' },
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
            resources: [
              { type: 'video', source: 'youtube', title: 'Authentication in Blazor | Ep 12 | Blazor for Beginners', url: 'https://www.youtube.com/watch?v=iq2btD9WufI&list=PLzewa6pjbr3IQEUfNiK2SROQC1NuKl6PV&index=12', duration: '24m' },
              { type: 'video', source: 'youtube', title: 'Publishing a Blazor App | Ep 16 | Blazor for Beginners', url: 'https://www.youtube.com/watch?v=vi51RBc_TkY&list=PLzewa6pjbr3IQEUfNiK2SROQC1NuKl6PV&index=16', duration: '10m' },
              { type: 'video', source: 'youtube', title: 'How to deploy Blazor app to Azure | Blazor for Beginners', url: 'https://www.youtube.com/watch?v=oprGTwdpDKk&list=PLzewa6pjbr3IQEUfNiK2SROQC1NuKl6PV&index=24', duration: '9m' },
              { type: 'video', source: 'youtube', title: 'Publish to IIS | Ep 28 | Blazor for Beginners', url: 'https://www.youtube.com/watch?v=STtxYvPxPl4&list=PLzewa6pjbr3IQEUfNiK2SROQC1NuKl6PV&index=28', duration: '10m' },
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
            resources: [
                { type: 'video', source: 'youtube', title: 'ASP.NET Core Razor Pages Tutorial', url: 'https://www.youtube.com/watch?v=pmWFzzU_NB4', duration: '3h 48m' },
                { type: 'video', source: 'youtube', title: 'Razor Pages tutorial for beginners | ASP.NET Core', url: 'https://www.youtube.com/watch?v=oKY60aLOrrs', duration: '40m' },
            ]
          },
        ],
      },
      { 
        name: "Intermediate", 
        modules: [
          {
            title: t('technologies.razor.intermediate.module1.title'),
            description: t('technologies.razor.intermediate.module1.description'),
            resources: [
              { type: 'video', source: 'youtube', title: 'CRUD Operations in Razor Pages in ASP.NET Core', url: 'https://www.youtube.com/watch?v=ZqlvK5UcXnY', duration: '29m' },
            ]
          }
        ]
      },
      { name: "Advanced", modules: [] },
    ],
  },
];

    