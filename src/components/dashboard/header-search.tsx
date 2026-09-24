"use client";

import { Search } from "lucide-react";
import React, { KeyboardEvent, useState } from "react";
import { Button } from "../ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

export default function HeaderSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams<{ workspaceId: string }>();
  const searchParams = useSearchParams();
  const [value, setValue] = useState("");

  const { workspaceId } = params;

  if (!workspaceId) return null;

  const handleSearch = () => {
    if (!value.trim()) {
      handleSearchParamsClear();
      return;
    }
    const params = new URLSearchParams(searchParams.toString());
    params.set("q", value);

    router.replace(`/dashboard/w/${workspaceId}/notes?${params}`);
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

  //   const handleOnBlur = () => {
  //     if (!value.trim()) {
  //       return;
  //     }
  //     handleSearch();
  //   };

  return (
    <>
      <InputGroup className="group flex-1 pl-2 overflow-hidden max-w-100">
        <InputGroupInput
          className=" text-[1rem] placeholder:text-zinc-500 placeholder:tracking-wider"
          value={value}
          onKeyUp={handleEnterClick}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search . . ."
        />
        <InputGroupAddon className="hidden md:block">
          <Search className="size-5 text-muted group-focus-within:text-zinc-200" />
        </InputGroupAddon>
        <InputGroupAddon
          align="inline-end"
          className="p-0 h-full group/icon hover:bg-foreground/10 md:hidden"
        >
          <Button
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleSearch}
            variant={"styleLess"}
            size={"icon"}
            className="px-5 h-full  border-l-border rounded-s-none"
          >
            <Search className="size-5 text-zinc-500 group-hover/icon:text-icon group-focus-within:text-zinc-200" />
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </>
  );
}
