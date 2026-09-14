"use client";

import { Button } from "@/components/ui/button";
import { showSuccessToast } from "@/components/ui/custom-toast";
import React from "react";

export default function TestToast() {
  const handleClick = () => {
    showSuccessToast(
      "Workspace transferred",
      "Ownership has been successfully transferred.",
    );
  };
  return <Button onClick={handleClick}>TestToast</Button>;
}
