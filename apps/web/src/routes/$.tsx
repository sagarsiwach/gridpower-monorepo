import { data, Link } from "react-router";
import type { MetaFunction } from "react-router";
import { Button } from "@gridpower/ui";

export async function loader() {
  throw data(null, { status: 404 });
}

export const meta: MetaFunction = () => [
  { title: "404. Page not found | GridPower" },
  { name: "description", content: "This page does not exist. Return to GridPower." },
];

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6 text-center">
      <p className="font-mono text-label text-grid-red uppercase tracking-widest mb-4">
        404
      </p>
      <h1 className="font-heading text-h2 text-foreground mb-4 leading-tight">
        Page not found
      </h1>
      <p className="font-body text-body-lg text-sand-11 max-w-md mb-10">
        The page you are looking for does not exist or has been moved.
      </p>
      <Button asChild size="lg">
        <Link to="/">Back to GridPower</Link>
      </Button>
    </div>
  );
}
