"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { useUser } from "@/contexts/user_context";

interface AppCardProps {
  app: App;
}

export default function AppCard({ app }: AppCardProps) {
  const user = useUser();

  const color = ` ${
    app.id == 1
      ? `bg-area`
      : app.id == 2
        ? `bg-replan`
        : app.id == 3
          ? `bg-poa`
          : app.id == 4
            ? `bg-map`
            : app.id == 5
              ? `bg-cronos`
              : app.id == 6
                ? `bg-prepsf`
                : app.id == 7
                  ? `bg-autorizzazioni`
                  : `bg-autorizzazioni`
  }`;

  return (
    <div className="overflow-hidden rounded-md bg-white shadow-md hover:shadow-xl">
      <div className={`p-4 text-white ${color}`}>
        <h6>{app.title}</h6>
        <p className="opacity-50">{app.subtitle}</p>
      </div>
      <p className="max-h-32 text-ellipsis p-4">{app.description}</p>
      <div className="flex items-center justify-between space-x-2 p-4">
        <Button
          size={"sm"}
          disabled={user.state.email == null}
          className={`flex-1 text-sm ${color} hover:${color}`}
        >
          <Link href={app.href}>Apri</Link>
        </Button>
        <Button
          asChild
          size={"sm"}
          variant={"outline"}
          className={`flex-1 text-sm`}
        >
          <Link href={app.hrefDetail}>Info</Link>
        </Button>
      </div>
    </div>
  );
}
