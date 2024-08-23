'use client';
import { useEffect } from 'react';

export default function RootError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (error) {
      // send to some logging service here
      console.error(
        '🚀 ~ ErrorPage:',
        `${error.message} ${error.cause} ${error.digest} ${error.name}`,
        error.stack
      );
    }
  }, [error]);

  return (
    <html>
      <body className="mx-auto flex min-h-screen flex-col items-center justify-start overscroll-none">
        <main className="flex flex-col items-center justify-center">
          <h2>Something went wrong!</h2>
          <button onClick={() => reset()}>Try again</button>
        </main>
      </body>
    </html>
  );
}
