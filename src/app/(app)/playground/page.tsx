import { PlaygroundForm } from "@/components/playground-form";

export default function PlaygroundPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-headline tracking-tighter">
          AI Code Playground
        </h1>
        <p className="text-muted-foreground mt-1">
          Sharpen your skills with unlimited, AI-generated coding exercises.
        </p>
      </div>
      <PlaygroundForm />
    </div>
  );
}
