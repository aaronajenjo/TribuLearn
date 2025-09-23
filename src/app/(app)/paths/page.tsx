import { Icons } from "@/components/icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { learningPaths } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import Link from "next/link";

export default function PathsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-headline tracking-tighter">
          Learning Paths
        </h1>
        <p className="text-muted-foreground mt-1">
          Choose a technology to start your learning journey.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {learningPaths.map((path) => {
          const Icon = Icons[path.icon];
          const image = PlaceHolderImages.find(
            (img) => img.id === path.imageId
          );
          return (
            <Link href={`/paths/${path.slug}`} key={path.id} className="group">
              <Card className="flex flex-col h-full transition-transform transform-gpu group-hover:scale-[1.02] group-hover:shadow-xl">
                <CardHeader className="flex-row items-start gap-4">
                  <div className="p-3 bg-card rounded-lg border">
                    <Icon className="size-8" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="font-headline text-2xl">
                      {path.name}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {path.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 relative aspect-video">
                  {image && (
                    <Image
                      src={image.imageUrl}
                      alt={path.name}
                      fill
                      className="object-cover rounded-md"
                      data-ai-hint={image.imageHint}
                    />
                  )}
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
