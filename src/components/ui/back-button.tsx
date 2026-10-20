"use client";
import { useRouter } from "next/navigation";
import { Button } from "./button";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <Button
      className="size-12 mb-12 glass"
      onClick={handleClick}
      variant={"styleLess"}
    >
      <span className="sr-only">Back</span>
      <ArrowLeft className="size-5" />
    </Button>
  );
}
