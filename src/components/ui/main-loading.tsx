import { Tailspin } from "ldrs/react";
import "ldrs/react/Tailspin.css";

export default function MainLoading() {
  return (
    <div className=" w-full h-full -mt-18 flex items-center justify-center">
      <Tailspin
        size="40"
        stroke="5"
        speed="0.9"
        color="oklch(60.6% 0.25 292.717)"
      />
    </div>
  );
}
