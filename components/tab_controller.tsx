"use client";

import { useState } from "react";

interface TabControllerProps {
  tabs: string[];
  onTab: (tab: number) => void;
}

export default function TabController({ tabs, onTab }: TabControllerProps) {
  const [activeTab, setActiveTab] = useState(0);

  // STYLES
  const tabStyle = "px-8 py-2 text-sm cursor-pointer hover:bg-slate-100 ";
  const activeTabStyle = "border-b-2 border-black font-bold";

  return (
    <section className="border-purple flex w-full space-x-2 border-b">
      {tabs.map((tab, index) => (
        <div
          key={index}
          onClick={() => {
            setActiveTab(index);
            onTab(index);
          }}
          className={tabStyle + (index === activeTab ? activeTabStyle : "")}
        >
          {tab}
        </div>
      ))}
    </section>
  );
}
