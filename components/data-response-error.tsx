import { ApolloError } from '@apollo/client';

export default function GraphQlError({
  error,
  errors
}: {
  error: ApolloError | null;
  errors: Array<unknown> | null;
}) {
  // NOTE::  probably check for common possible known errors and show user friendly response to try fix the issue, also log these errors
  //  for now generic response below is okay
  if (errors) {
    console.error('🚀 ~ errors:', errors);
  }
  if (error) {
    console.error('🚀 ~ error:', error);
  }
  return (
    <section className="bg-transparent">
      <div className="top-full mx-auto w-2/3 px-4 py-8 md:w-full lg:px-6 lg:py-16">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl font-extrabold tracking-tight text-white lg:text-5xl">
            Something went wrong 🫠
          </h1>
          <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">
            Sorry about this!
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            Please try refreshing the page, if the error keeps happening please contact us.
          </p>
          <a
            href="/"
            className="my-4 inline-flex rounded-lg bg-transparent px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
          >
            Refresh
          </a>
        </div>
      </div>
    </section>
  );
}
