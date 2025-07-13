import {
  TopLayout,
  TopLayoutDescription,
  TopLayoutTitle,
} from "@/components/layout/top-layout";
import Image from "next/image";
import React from "react";

const dashboardAnalytics = [
  { value: 2160, label: "Onboarded" },
  { value: 16, label: "Waitlisted" },
  { value: 21, label: "Influencers" },
  { value: 60, label: "Actions" },
  { value: 26, label: "Prompts" },
  { value: 21, label: "Instructions" },
  { value: 20, label: "Knowledge" },
  { value: 8, label: "Servers" },
  { value: 4, label: "Models" },
];

const DashboardScreen = () => {
  return (
    <div className="flex w-full flex-col gap-10">
      {/* Top Title and Description of page */}
      <TopLayout>
        <TopLayoutTitle>Dashboard</TopLayoutTitle>
        <TopLayoutDescription>Here are your analytics</TopLayoutDescription>
      </TopLayout>

      {/* Dashboard Analytics */}
      <div className="grid w-full gap-6 md:grid-cols-3 lg:grid-cols-4">
        {dashboardAnalytics.map((data) => (
          <div
            key={data.label}
            className="group flex w-full flex-col gap-2 rounded-2xl border border-neutral-50 bg-neutral-50 bg-[linear-gradient(124.46deg,_#FAFAFA_0%,_#E9E9E9_73.56%,_#CACACA_100%)] bg-[length:200%_100%] bg-left p-8 transition-[background-position] duration-300 hover:bg-right"
          >
            <h2 className="text-h3 text-neutral-gray font-bold transition-colors group-hover:text-neutral-900">
              {data.value}
            </h2>
            <div className="flex items-center justify-start gap-2">
              <p className="text-p1 text-neutral-gray group-hover:text-neutral-black font-semibold transition-colors">
                {data.label}
              </p>
              <Image
                className="animate-in fade-in-0 zoom-in-95 hidden duration-200 group-hover:block"
                src="assets/svg/arrow-up-right.svg"
                width={18}
                height={18}
                alt="Arrow up right"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardScreen;
