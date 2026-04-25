import { useNavigate } from "react-router";
import { useAuth } from "~/lib/auth";

// Public route — placeholder login. CON.2 fills in the real auth flow.
// Mock auth always reports authenticated by default, so this page is
// rarely seen in CON.1.
export default function Login() {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  function handleContinue() {
    signIn();
    navigate("/dashboard", { replace: true });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-1 p-6">
      <div className="w-full max-w-sm rounded-card border border-dark-6 bg-dark-2 p-8 space-y-6">
        <div className="space-y-1">
          <p className="font-mono text-[10px] tracking-[0.1em] uppercase text-primary">
            GRIDCHARGE CONSOLE
          </p>
          <h1 className="font-heading text-h3 text-dark-12">Sign in</h1>
          <p className="font-body text-body-sm text-dark-11">
            Real auth wiring is coming in CON.2. For now, continue as the mock user.
          </p>
        </div>

        <button
          type="button"
          onClick={handleContinue}
          className="w-full px-4 py-2 rounded-btn bg-primary text-white font-body text-[14px] font-medium hover:opacity-90 transition-opacity cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-dark-2"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
