"use client";

import { GenerateRecommendationsOutput, Recommendation } from "@/ai/flows/generate-recommendations";
import { Loader2, Sparkles, Youtube, GraduationCap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import Link from "next/link";
import { Button } from "./ui/button";

interface RecommendationsDisplayProps {
  isLoading: boolean;
  recommendations: GenerateRecommendationsOutput | null;
}

const RecommendationCard = ({ recommendation, Icon }: { recommendation: Recommendation, Icon: React.ElementType }) => (
  <div className="p-4 border rounded-lg bg-card flex items-start gap-4">
    <Icon className="size-8 mt-1 text-primary shrink-0" />
    <div className="flex-1">
      <Link href={recommendation.url} target="_blank" rel="noopener noreferrer">
        <p className="font-semibold hover:underline">{recommendation.title}</p>
      </Link>
      <p className="text-sm text-muted-foreground mt-1">{recommendation.description}</p>
    </div>
  </div>
);


export function RecommendationsDisplay({ isLoading, recommendations }: RecommendationsDisplayProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center flex-col text-center p-8 border rounded-lg bg-muted/50">
        <Sparkles className="mr-2 h-6 w-6 animate-pulse" />
        <p className="mt-2 font-semibold">Generating personalized recommendations...</p>
        <p className="text-sm text-muted-foreground">The AI is analyzing your results to find the best resources for you.</p>
      </div>
    );
  }

  if (!recommendations) {
    return null;
  }
  
  const hasUdemy = recommendations.udemy && recommendations.udemy.length > 0;
  const hasYoutube = recommendations.youtube && recommendations.youtube.length > 0;

  return (
    <div className="space-y-6">
       <h3 className="text-xl font-bold text-center">Personalized Learning Plan</h3>
       {hasUdemy && (
        <div>
          <h4 className="font-semibold text-lg mb-3 flex items-center gap-2"><GraduationCap className="size-5" /> Udemy Courses</h4>
          <div className="space-y-4">
            {recommendations.udemy.map(rec => <RecommendationCard key={rec.url} recommendation={rec} Icon={GraduationCap} />)}
          </div>
        </div>
       )}
       {hasYoutube && (
        <div>
          <h4 className="font-semibold text-lg mb-3 flex items-center gap-2"><Youtube className="size-5" /> YouTube Videos</h4>
           <div className="space-y-4">
            {recommendations.youtube.map(rec => <RecommendationCard key={rec.url} recommendation={rec} Icon={Youtube} />)}
          </div>
        </div>
       )}
       {!hasUdemy && !hasYoutube && (
         <p className="text-center text-muted-foreground">No specific recommendations could be generated at this time.</p>
       )}
    </div>
  );
}
