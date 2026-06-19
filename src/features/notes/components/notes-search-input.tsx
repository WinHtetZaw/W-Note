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

export default function NotesSearchInput() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState("");
  // const [value, setValue] = useState(searchParams.get("q") ?? "");

  const handleSearch = () => {
    if (!value.trim()) {
      return;
    }
    const params = new URLSearchParams(searchParams.toString());
    params.set("q", value);
    // if (value.trim()) {
    //   params.set("q", value.trim());
    // } else {
    //   params.delete("q");
    // }

    router.replace(`${pathname}?${params}`);
  };

  const handleEnterClick = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleClear = () => {
    setValue("");
  };

  return (
    <>
      {/* <div className="flex flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-xl">
        <Search className="size-5 text-zinc-500" />

        <input
          placeholder="Search notes..."
          className="w-full bg-transparent outline-none placeholder:text-zinc-500"
        />
      </div> */}
      <InputGroup className="flex-1">
        <InputGroupInput
          value={value}
          onBlur={handleSearch}
          onKeyUp={handleEnterClick}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search..."
        />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <Button
            // type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleClear}
            variant={"ghost"}
            size={"icon"}
          >
            <XIcon className="size-5" />
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </>
  );
}
