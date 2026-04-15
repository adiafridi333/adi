"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#0A0A0A", color: "#F5F5F5" }}>
        <main
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "32px",
            fontFamily:
              "Arial, Helvetica, sans-serif",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "640px" }}>
            <div
              style={{
                width: "48px",
                height: "2px",
                background: "#EC3337",
                margin: "0 auto 24px",
              }}
            />
            <h1 style={{ fontSize: "40px", lineHeight: 1.1, margin: "0 0 16px" }}>
              Something went wrong
            </h1>
            <p style={{ color: "#A0A0A0", lineHeight: 1.7, margin: "0 0 24px" }}>
              The site could not load correctly. Please try again.
            </p>
            {error.digest && (
              <p style={{ color: "#A0A0A0", fontSize: "12px", margin: "0 0 24px" }}>
                Error reference: {error.digest}
              </p>
            )}
            <button
              type="button"
              onClick={reset}
              style={{
                minHeight: "44px",
                border: 0,
                background: "#EC3337",
                color: "#FFFFFF",
                padding: "12px 24px",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Try Again
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
