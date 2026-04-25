import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-1 p-6">
      <div className="text-center space-y-4">
        <p className="font-mono text-[10px] tracking-[0.1em] uppercase text-primary">
          GRIDCHARGE CONSOLE
        </p>
        <h1 className="font-heading text-h2 text-dark-12">404</h1>
        <p className="font-body text-body text-dark-11">This route does not exist.</p>
        <Link
          to="/dashboard"
          className="inline-block px-4 py-2 rounded-btn bg-primary text-white font-body text-[14px] font-medium hover:opacity-90 transition-opacity"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
