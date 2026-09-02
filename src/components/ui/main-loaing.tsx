import { Quantum } from "ldrs/react";
import "ldrs/react/Quantum.css";

export default function MainLoaing() {
  return (
    <div className=" w-full h-full flex items-center justify-center">
      {/* <Quantum size="45" speed="1.75" color="oklch(60.6% 0.25 292.717)" /> */}
      <Quantum size="100" speed="1.75" color="oklch(60.6% 0.25 292.717)" />
    </div>
  );
}
