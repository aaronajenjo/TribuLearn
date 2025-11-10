import { Icons } from "@/components/icons";
import { BrainCircuit } from "lucide-react";

export type Resource = {
  type: "video" | "article" | "course";
  title: string;
  url: string;
  duration?: string;
  source?: "sopra" | "youtube" | "openWebinars" | "percipio" | "udemy";
};

export type Module = {
  title: string;
  description: string;
  sopraResources: Resource[];
  youtubeResources: Resource[];
  udemyResources?: Resource[];
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

export type SoftSkill = {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: React.ElementType;
  imageId: string;
  modules: Module[];
};


type Translator = (key: string,
  params?: { [key: string]: string | number }
) => string;

export const softSkillsData = (t: Translator): SoftSkill[] => [
  {
    id: "communication",
    slug: "communication",
    name: t("softskills.types.communication"),
    description: t("softskills.descriptions.communication"),
    icon: BrainCircuit,
    imageId: "softskill-communication",
    modules: [
      {
        title: "Effective Communication Strategies",
        description: "Learn how to communicate more effectively with your team and clients.",
        sopraResources: [],
        youtubeResources: [],
        udemyResources: []
      }
    ]
  },
  {
    id: "conflict-resolution",
    slug: "conflict-resolution",
    name: t("softskills.types.conflictResolution"),
    description: t("softskills.descriptions.conflictResolution"),
    icon: BrainCircuit,
    imageId: "softskill-conflict",
    modules: []
  },
  {
    id: "leadership",
    slug: "leadership",
    name: t("softskills.types.leadership"),
    description: t("softskills.descriptions.leadership"),
    icon: BrainCircuit,
    imageId: "softskill-leadership",
    modules: []
  },
  {
    id: "teamwork",
    slug: "teamwork",
    name: t("softskills.types.teamwork"),
    description: t("softskills.descriptions.teamwork"),
    icon: BrainCircuit,
    imageId: "softskill-teamwork",
    modules: []
  },
  {
    id: "adaptability",
    slug: "adaptability",
    name: t("softskills.types.adaptability"),
    description: t("softskills.descriptions.adaptability"),
    icon: BrainCircuit,
    imageId: "softskill-adaptability",
    modules: []
  }
];


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
                source: "sopra"
              },
            ],
            youtubeResources: [
              { type: 'video', title: 'C# Tutorial For Beginners - Learn C# in 1 Hour', url: 'https://www.youtube.com/watch?v=gfkTfcpWqAY', duration: '1h' },
              { type: 'video', title: 'C# Full Course for free C#', url: 'https://www.youtube.com/watch?v=wxznTygnRfQ', duration: '6h' },
              { type: 'video', title: 'C# Tutorial - Full Course for Beginners', url: 'https://www.youtube.com/watch?v=GhQdlIFylQ8', duration: '4h 26m' },
              { type: 'video', title: 'Master Design Patterns & SOLID Principles in C# - Full OOP Course for Beginners', url: 'https://www.youtube.com/watch?v=rylaiB2uH2A', duration: '3h 36m' },
              { type: 'video', title: '7 Patrones de Diseño que todo Programador Debería Conocer', url: 'https://www.youtube.com/watch?v=rqOaZf4xMlI', duration: '20m' },
            ],
            udemyResources: [
              {
                type: 'course',
                title: 'Design Patterns in C# and .NET',
                url: 'https://www.udemy.com/course/design-patterns-csharp-dotnet/',
              },
              {
                type: 'course',
                title: 'Introducción al Testing de Software para Principiantes',
                url: 'https://www.udemy.com/course/introduccion-al-testing-de-software-para-principiantes/'
              }
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
                source: "sopra"
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
                source: "sopra"
              },
              {
                type: "course",
                title: "Beginner Entity Framework: Journey",
                url: "https://soprasteria.percipio.com/channels/2a72d751-29dd-11e7-bd7f-0d8c9c4bc919",
                source: "sopra"
              }
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
            udemyResources: [
              {
                type: 'course',
                title: 'C# Intermediate: Classes, Interfaces and OOP',
                url: 'https://www.udemy.com/course/csharp-intermediate-classes-interfaces-and-oop/'
              },
              {
                type: 'course',
                title: 'Curso Entity Framework Core',
                url: 'https://www.udemy.com/course/curso-entity-framework-core/'
              }
            ]
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
                source: "sopra"
              },
              {
                type: "course",
                title: "Advanced Data Access with EF Core: Journey",
                url: "https://soprasteria.percipio.com/courses/9476f300-31c2-11e8-97b6-bfc623ee1d51/videos/8e1b8250-31d6-11e8-97b6-bfc623ee1d51",
                source: "sopra"
              }
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
                type: "course",
                title: ".NET Microservices – Full Course",
                url: "https://www.youtube.com/watch?v=DgVjEo3OGBI&list=PLpXfHEl2fzl7a7p4ntTmdjmNSD1iEYXrm",
                duration: "Multiple videos",
              },
              {
                type: "video",
                title: "Speed Up Your C# Applications - Performance Optimization Made Practical",
                url: "https://www.youtube.com/watch?v=zzNHSeW1nFs",
                duration: "49m",
              },
              {
                type: "course",
                title: "Advanced C# Topics",
                url: "https://www.youtube.com/watch?v=dkFYUUWdQYI&list=PLSr9CPTtmP9js0n4XOmI4vfKeVvlS32PA",
                duration: "Multiple videos"
              }
            ],
            udemyResources: [
              {
                type: 'course',
                title: 'Creando Web APIs Profesionales con ASP.NET Core',
                url: 'https://www.udemy.com/course/creando-web-apis-profesionales-con-aspnet-core-22/'
              },
              {
                type: 'course',
                title: 'C# Advanced Topics: Prepare for Technical Interviews',
                url: 'https://www.udemy.com/course/csharp-advanced/'
              }
            ]
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
                source: "sopra"
              },
              {
                type: "video",
                title: "What's New in Angular 17 & 18",
                url: "https://soprasteria.percipio.com/courses/9d2b542c-d61e-4ffd-a7e0-99df49567f0e/videos/6e3bfbd3-992e-4739-aaf2-6a4b2b5a95f2",
                duration: "35m",
                source: "sopra"
              },
            ],
            youtubeResources: [
              { type: 'video', title: 'Angular for Beginners - Full Course', url: 'https://www.youtube.com/watch?v=3qBXWUpoPHo', duration: '11h 17m' },
              { type: 'video', title: 'Learn Angular - Full Tutorial for Beginners', url: 'https://www.youtube.com/watch?v=f7unUpshmpA', duration: '1h 12m' },
              { type: 'video', title: 'Angular Component Communication', url: 'https://www.youtube.com/watch?v=MtTAfjiZxtk', duration: '20m' },
            ],
            udemyResources: [
              {
                type: 'course',
                title: 'Angular: De Cero a Experto',
                url: 'https://www.udemy.com/course/angular-fernando-herrera',
                duration: '33h'
              },
              {
                type: 'course',
                title: 'Introducción al Testing de Software para Principiantes',
                url: 'https://www.udemy.com/course/introduccion-al-testing-de-software-para-principiantes/'
              }
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
                source: "sopra"
              },
              {
                type: "course",
                title: "Angular: Reactive Programming With RxJS and Observables",
                url: "https://soprasteria.percipio.com/courses/332682fa-aac9-458d-99ee-7994ff79fd33/videos/915a31be-de06-44c0-ba3a-c42422bea6d0",
                source: "sopra"
              },
              {
                type: "course",
                title: "Angular, Reactive, & Observable",
                url: "https://soprasteria.percipio.com/courses/9d1a4440-2b81-11e8-853f-8d6ca00f7963/videos/dd1a3d20-2b81-11e8-853f-8d6ca00f7963",
                source: "sopra"
              }
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
                source: "sopra"
              },
            ],
            youtubeResources: [
              { type: 'course', title: 'Mastering Angular', url: 'https://www.youtube.com/watch?v=R_It2UgUssg&list=PLoC8Q0moRTSgYzCoo5fklvPT40KQVUorx', duration: '54 videos' },
            ],
            udemyResources: [
              {
                type: 'course',
                title: 'Angular con Devops, TDD, Pruebas Unitarias, Pipelines, GIT',
                url: 'https://www.udemy.com/course/angular-con-devops-tdd-pruebas-unitarias-pipelines-git/'
              },
              {
                type: 'course',
                title: 'Angular Avanzado',
                url: 'https://www.udemy.com/course/angular-avanzado-fernando-herrera/'
              }
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
                source: "sopra"
              },
            ],
            youtubeResources: [
              { type: 'video', title: 'Ionic 7 Crash Course | Build a Complete App with Standalone Components', url: 'https://www.youtube.com/watch?v=5Gj4Y8zvl-s', duration: '1h 56m' },
              { type: 'video', title: 'Ionic Tutorial #2 - The Basics (How Ionic Works)', url: 'https://www.youtube.com/watch?v=Fh8MmgWWvMs', duration: '11m' },
              { type: 'video', title: 'Ionic Tutorial #4 - Navigation & Pages', url: 'https://www.youtube.com/watch?v=8xf0X4KEIkg', duration: '14m' },
              { type: 'video', title: 'Ionic Tutorial #8 - Data, Events & Lifecycle Hooks', url: 'https://www.youtube.com/watch?v=E-aXqVe2K1g', duration: '13m' },
            ],
            udemyResources: [
              {
                type: 'course',
                title: 'Introducción al Testing de Software para Principiantes',
                url: 'https://www.udemy.com/course/introduccion-al-testing-de-software-para-principiantes/'
              },
              {
                type: 'course',
                title: 'Aprende Ionic con Proyectos Prácticos',
                url: 'https://www.udemy.com/course/aprende-ionic-con-proyectos-practicos/'
              }
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
            sopraResources: [],
            youtubeResources: [
              { type: 'video', title: 'Ionic Tutorial #9 - HTTP Requests', url: 'https://www.youtube.com/watch?v=_p4lL3dhovY', duration: '11m' },
              { type: 'video', title: 'Ionic Tutorial #13 - Storing Data with Storage', url: 'https://www.youtube.com/watch?v=WshbmpP5JuY', duration: '12m' },
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
            sopraResources: [],
            youtubeResources: [
              { type: 'video', title: 'Ionic Tutorial #19 - Authentication', url: 'https://www.youtube.com/watch?v=PZ8stXVoXjE', duration: '16m' },
              { type: 'video', title: 'Ionic Tutorial #28 - Building for Android & IOS', url: 'https://www.youtube.com/watch?v=4y3AeFDdFVY', duration: '11m' },
            ],
            udemyResources: [
              {
                type: 'course',
                title: 'Ionic & Angular: Advanced Concepts',
                url: 'https://www.udemy.com/course/ionic-angular-advanced-concepts/'
              }
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
            sopraResources: [
              {
                type: "article",
                title: "Blazor: A New Era for C# Web Devs",
                url: "https://dotnet.microsoft.com/en-us/apps/aspnet/web-apps/blazor",
                source: "sopra"
              },
            ],
            youtubeResources: [
              { type: 'course', title: 'Blazor Tutorial for Beginners', url: 'https://www.youtube.com/watch?v=uuzi3SmCLVo&list=PL6n9fhu94yhVowClAs8-6nYnfsOTma14P', duration: '131 videos' },
              { type: 'video', title: 'Blazor in 100 Seconds', url: 'https://www.youtube.com/watch?v=w8imy7LT9zY', duration: '2m 17s' },
            ],
            udemyResources: [
              {
                type: 'course',
                title: 'Introducción al Testing de Software para Principiantes',
                url: 'https://www.udemy.com/course/introduccion-al-testing-de-software-para-principiantes/'
              }
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
            sopraResources: [],
            youtubeResources: [
                { type: 'video', title: 'ASP.NET Core Razor Pages Tutorial', url: 'https://www.youtube.com/watch?v=pmWFzzU_NB4', duration: '3h 48m' },
                { type: 'video', title: 'Razor Pages tutorial for beginners | ASP.NET Core', url: 'https://www.youtube.com/watch?v=oKY60aLOrrs', duration: '40m' },
            ],
            udemyResources: [
              {
                type: 'course',
                title: 'Introducción al Testing de Software para Principiantes',
                url: 'https://www.udemy.com/course/introduccion-al-testing-de-software-para-principiantes/'
              }
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
            sopraResources: [],
            youtubeResources: [
              { type: 'video', title: 'CRUD Operations in Razor Pages in ASP.NET Core', url: 'https://www.youtube.com/watch?v=ZqlvK5UcXnY', duration: '29m' },
            ]
          }
        ]
      },
      { name: "Advanced", modules: [] },
    ],
  },
  {
    id: "java",
    slug: "java",
    name: "Java",
    description: t('technologies.java.description'),
    icon: "java",
    imageId: "tech-java",
    levels: [
      {
        name: "Beginner",
        modules: [
          {
            title: t('technologies.java.beginner.module1.title'),
            description: t('technologies.java.beginner.module1.description'),
            sopraResources: [
              {
                type: "course",
                title: "Journeys: Spring and Spring Boot Track 1: Introduction to Spring",
                url: "https://soprasteria.percipio.com/track/80a077c4-06ed-4e66-bab9-582b7d018f45",
                source: "sopra"
              },
              {
                type: "article",
                title: "Official Spring Projects",
                url: "https://spring.io/projects",
                source: "sopra"
              },
            ],
            youtubeResources: [],
            udemyResources: [
              {
                type: 'course',
                title: 'Introducción al Testing de Software para Principiantes',
                url: 'https://www.udemy.com/course/introduccion-al-testing-de-software-para-principiantes/'
              }
            ]
          }
        ],
      },
      { name: "Intermediate", modules: [] },
      { name: "Advanced", modules: [] },
    ],
  },
  {
    id: "azure",
    slug: "azure",
    name: "Azure",
    description: t('technologies.azure.description'),
    icon: "azure",
    imageId: "tech-azure",
    levels: [
      {
        name: "Beginner",
        modules: [
          {
            title: t('technologies.azure.beginner.module1.title'),
            description: t('technologies.azure.beginner.module1.description'),
            sopraResources: [
              {
                type: 'course',
                title: 'Microsoft Azure Fundamentals: Azure App Service',
                url: 'https://soprasteria.percipio.com/courses/8181e388-d853-48f6-ab59-f249cc5fe6b1/videos/9939d2d4-f5a0-40d5-991a-a724d6ebeb1a',
                source: 'sopra'
              }
            ],
            youtubeResources: []
          }
        ],
      },
      { 
        name: "Intermediate", 
        modules: [
          {
            title: t('technologies.azure.intermediate.module1.title'),
            description: t('technologies.azure.intermediate.module1.description'),
            sopraResources: [
              {
                type: 'course',
                title: 'Developing Solutions for Microsoft Azure: Web Apps',
                url: 'https://soprasteria.percipio.com/courses/fd5ff768-97c5-4a8c-acee-a5c6a18cb005/videos/bd683d8b-d67a-4f7c-a3df-ce2740ac4f54',
                source: 'sopra'
              },
              {
                type: 'course',
                title: 'Developing Solutions for Microsoft Azure: App Service',
                url: 'https://soprasteria.percipio.com/courses/040a4466-ca29-4695-85bb-b256fefbba3a/videos/fb1a74ee-7136-4f0b-8a22-05ceeb5cde3c',
                source: 'sopra'
              }
            ],
            youtubeResources: []
          }
        ] 
      },
      { name: "Advanced", modules: [] },
    ],
  },
];
