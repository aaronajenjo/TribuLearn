import { TestsContainer } from "@/components/tests-container";
import { learningPaths } from "@/lib/data";

export default function TestsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-headline tracking-tighter">
          Skill Assessment Tests
        </h1>
        <p className="text-muted-foreground mt-1">
          Select a technology and test your knowledge to find your skill level.
        </p>
      </div>
      <TestsContainer technologies={learningPaths} />
    </div>
  );
}
