import {
  TopLayout,
  TopLayoutDescription,
  TopLayoutTitle,
} from "@/components/layout/top-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";

export default function PromptsScreen() {
  return (
    <div className="flex w-full flex-col gap-10">
      <div className="flex w-full items-end justify-between">
        {/* Top Title and Description of page */}
        <TopLayout>
          <TopLayoutTitle>Prompts</TopLayoutTitle>
          <TopLayoutDescription>
            Here you will find your prompts
          </TopLayoutDescription>
        </TopLayout>

        {/* Table Controls and New Button */}
        <div className="flex h-[40px] items-center gap-3">
          <div className="relative flex h-full items-center">
            <Input placeholder="Search" className="h-full max-w-56 pr-9" />
            <Image
              src="/assets/svg/search.svg"
              alt="Search"
              width={16}
              height={16}
              className="absolute right-3"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="table_action" size="medium">
              <span className="text-p2 font-semibold">Filter</span>
              <Image
                src="/assets/svg/filter.svg"
                alt="Filter"
                width={20}
                height={20}
              />
            </Button>
            <Button variant="table_action" size="medium">
              <span className="text-p2 font-semibold">Sort By</span>
              <Image
                src="/assets/svg/sortby.svg"
                alt="Filter"
                width={20}
                height={20}
              />
            </Button>
          </div>
          <Button size="small" className="max-h-10 w-32 font-medium">
            New Prompt
          </Button>
        </div>
      </div>

      {/* Prompts Table */}
    </div>
  );
}
