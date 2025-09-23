import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { learningPaths } from "@/lib/data";
import { Icons } from "@/components/icons";
import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
  ChartStyle,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 273 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: "Modules Completed",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export default function Dashboard() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Continue Learning</CardTitle>
            <CardDescription>
              Pick up where you left off in your C# journey.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="flex items-center gap-4">
              <Icons.csharp className="size-12 shrink-0" />
              <div className="w-full">
                <h3 className="font-semibold">Variables and Data Types</h3>
                <p className="text-sm text-muted-foreground">C# Beginner Path</p>
                <Progress value={66} className="mt-2 h-2" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/paths/csharp">
                Resume Path <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Overall Progress</CardTitle>
            <CardDescription>Your activity in the last 6 months.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Achievements</CardTitle>
            <CardDescription>Milestones you've reached.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow space-y-4">
            <div className="flex items-center gap-4">
              <CheckCircle className="size-6 text-accent" />
              <div>
                <h3 className="font-semibold">First Steps</h3>
                <p className="text-sm text-muted-foreground">
                  Completed your first module.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <BookOpen className="size-6 text-primary" />
              <div>
                <h3 className="font-semibold">Pathfinder</h3>
                <p className="text-sm text-muted-foreground">
                  Started a new learning path.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-bold font-headline mb-4">
          Explore Learning Paths
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {learningPaths.map((path) => {
            const image = PlaceHolderImages.find(
              (img) => img.id === path.imageId
            );
            const Icon = Icons[path.icon];
            return (
              <Link href={`/paths/${path.slug}`} key={path.id} className="group">
                <Card className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
                  <div className="relative h-40 w-full">
                    {image && (
                      <Image
                        src={image.imageUrl}
                        alt={path.name}
                        fill
                        className="object-cover"
                        data-ai-hint={image.imageHint}
                      />
                    )}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Icon className="size-16 text-white" />
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle>{path.name}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {path.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
