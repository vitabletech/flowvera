"use client";

export default function ErrorPage({
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="error-screen">
      <p className="eyebrow">FLOWVERA</p>
      <h1>Something went wrong.</h1>
      <p>Please try again. If the issue continues, contact our team.</p>
      <button className="button button-primary" onClick={() => reset()}>
        Try again
      </button>
    </main>
  );
}
