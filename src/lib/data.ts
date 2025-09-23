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
                type: "video",
                title: "C# 101",
                url: "https://www.youtube.com/watch?v=GhQdlIF3sgQ",
                duration: "4h 26m",
              },
            ],
          },
          {
            title: t('technologies.csharp.beginner.module2.title'),
            description: t('technologies.csharp.beginner.module2.description'),
            resources: [
              {
                type: "article",
                title: "C# Data Types Explained",
                url: "https://www.w3schools.com/cs/cs_data_types.php",
              },
            ],
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
                title: "Angular for Beginners",
                url: "https://www.youtube.com/watch?v=3qBXWUpoPHo",
                duration: "9h 53m",
              },
            ],
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
            resources: [
              {
                type: "video",
                title: "Intro to Ionic",
                url: "https://www.youtube.com/watch?v=O2giE-Ja_1I",
                duration: "1h 12m",
              },
            ],
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
            resources: [
              {
                type: "article",
                title: "Blazor: A New Era for C# Web Devs",
                url: "https://dotnet.microsoft.com/en-us/apps/aspnet/web-apps/blazor",
              },
            ],
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
            resources: [
              {
                type: "video",
                title: "Razor Pages in ASP.NET Core",
                url: "https://www.youtube.com/watch?v=a-i0g_a5-3E",
                duration: "3h 48m",
              },
            ],
          },
        ],
      },
      { name: "Intermediate", modules: [] },
      { name: "Advanced", modules: [] },
    ],
  },
];
