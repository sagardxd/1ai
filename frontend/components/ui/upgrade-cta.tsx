"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Crown, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useCredits } from "@/hooks/useCredits";

interface UpgradeCTAProps {
  variant?: "banner" | "card" | "minimal";
  className?: string;
}

export const UpgradeCTA: React.FC<UpgradeCTAProps> = ({ 
  variant = "banner", 
  className = "" 
}) => {
  const { userCredits, isLoading } = useCredits();

  // Don't show if loading, user is premium, or has sufficient credits
  if (isLoading || !userCredits || userCredits.isPremium || userCredits.credits > 2) {
    return null;
  }

  const getBannerContent = () => {
    if (userCredits.credits === 0) {
      return {
        title: "You're out of credits!",
        subtitle: "Upgrade to Pro to continue chatting with unlimited access",
        urgency: "high"
      };
    } else if (userCredits.credits <= 1) {
      return {
        title: `Only ${userCredits.credits} credit${userCredits.credits === 1 ? '' : 's'} left`,
        subtitle: "Upgrade now to avoid interruptions in your workflow",
        urgency: "medium"
      };
    } else {
      return {
        title: "Running low on credits",
        subtitle: "Upgrade to Pro for unlimited AI conversations",
        urgency: "low"
      };
    }
  };

  const content = getBannerContent();

  if (variant === "minimal") {
    return (
      <div className={`flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 ${className}`}>
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-purple-500" />
          <span className="text-sm font-medium">
            {userCredits.credits} credit{userCredits.credits === 1 ? '' : 's'} remaining
          </span>
        </div>
        <Link href="/pricing">
          <Button size="sm" variant="outline" className="h-8">
            Upgrade
            <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </Link>
      </div>
    );
  }

  if (variant === "card") {
    return (
      <Card className={`border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-blue-500/5 ${className}`}>
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-purple-500/10">
                <Crown className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{content.title}</h3>
                <p className="text-muted-foreground text-sm mt-1">
                  {content.subtitle}
                </p>
              </div>
            </div>
            <Link href="/pricing">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                <Crown className="mr-2 h-4 w-4" />
                Upgrade to Pro
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Default banner variant
  return (
    <div className={`relative overflow-hidden rounded-lg border border-purple-500/20 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 p-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full ${
            content.urgency === 'high' ? 'bg-red-500/10' : 
            content.urgency === 'medium' ? 'bg-orange-500/10' : 
            'bg-purple-500/10'
          }`}>
            {content.urgency === 'high' ? (
              <Zap className={`h-5 w-5 ${
                content.urgency === 'high' ? 'text-red-500' : 
                content.urgency === 'medium' ? 'text-orange-500' : 
                'text-purple-500'
              }`} />
            ) : (
              <Crown className="h-5 w-5 text-purple-500" />
            )}
          </div>
          <div>
            <h3 className="font-semibold">{content.title}</h3>
            <p className="text-muted-foreground text-sm">
              {content.subtitle}
            </p>
          </div>
        </div>
        <Link href="/pricing">
          <Button 
            className={`${
              content.urgency === 'high' 
                ? 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700'
                : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
            }`}
          >
            <Crown className="mr-2 h-4 w-4" />
            Upgrade Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
      
      {/* Animated background gradient */}
      <div className="absolute inset-0 opacity-20 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 animate-pulse" />
    </div>
  );
};

export default UpgradeCTA;
