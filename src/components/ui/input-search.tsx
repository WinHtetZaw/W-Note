"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search, XIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { KeyboardEvent, useState } from "react";
import { Button } from "@/components/ui/button";

export default function InputSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState("");

  const handleSearch = () => {
    if (!value.trim()) {
      handleSearchParamsClear();
      return;
    }
    const params = new URLSearchParams(searchParams.toString());
    params.set("q", value);

    router.replace(`${pathname}?${params}`);
  };

  const handleEnterClick = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleInputClear = () => {
    setValue("");
  };

  const handleSearchParamsClear = () => {
    handleInputClear();
    const params = new URLSearchParams(searchParams.toString());
    params.delete("q");
    router.replace(`${pathname}?${params}`);
  };

  const handleOnBlur = () => {
    if (!value.trim()) {
      return;
    }
    handleSearch();
  };

  //   const handleRecent = () => {
  //     const params = new URLSearchParams(searchParams.toString());
  //     params.set("sort", "date");
  //     params.set("order", "desc");
  //     router.replace(`${pathname}?${params}`);
  //   };

  return (
    <div className="mt-10 flex flex-col gap-4 lg:flex-row">
      <InputGroup className="group flex-1 pl-2">
        <InputGroupInput
          className=" text-[1rem] placeholder:text-zinc-500 placeholder:tracking-wider"
          value={value}
          onBlur={handleOnBlur}
          onKeyUp={handleEnterClick}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search . . ."
        />
        {/* <InputGroupAddon>
          <Search className="size-5 text-muted group-focus-within:text-zinc-200" />
        </InputGroupAddon> */}
        <InputGroupAddon align="inline-end">
          <Button
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleInputClear}
            variant={"ghost"}
            size={"icon"}
            className="hover:bg-transparent hover:text-current"
          >
            <XIcon className="size-5 text-zinc-500 group-focus-within:text-zinc-200" />
          </Button>
        </InputGroupAddon>
      </InputGroup>

      <Button
        // onClick={handleSearchParamsClear}
        onClick={handleSearch}
        variant="outline"
        className="w-fit p-4"
      >
        <Search className="size-6 text-muted group-focus-within:text-zinc-200" />
      </Button>

      {/* <Button onClick={handleRecent} variant="outline" className="w-fit">
        Recent
      </Button> */}
    </div>
  );
}
