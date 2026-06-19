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

export default function NotesSearchBar() {
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

  const handleInputClear = () => {
    setValue("");
  };

  const handleSearchParamsClear = () => {
    handleInputClear();
    const params = new URLSearchParams(searchParams.toString());
    params.delete("q");
    router.replace(`${pathname}?${params}`);
  };

  return (
    <div className="mt-10 flex flex-col gap-4 lg:flex-row">
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
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleInputClear}
            variant={"ghost"}
            size={"icon"}
            className="hover:bg-transparent hover:text-current"
          >
            <XIcon className="size-5" />
          </Button>
        </InputGroupAddon>
      </InputGroup>

      <Button
        onClick={handleSearchParamsClear}
        variant="outline"
        className="w-fit"
      >
        All Notes
      </Button>

      <Button variant="outline" className="w-fit">
        Recent
      </Button>
    </div>
  );
}
