export default async function NotFound() {
  return (
    <section className="bg-transparent">
      <div className="top-full mx-auto w-2/3 px-4 py-8 md:w-full lg:px-6 lg:py-16">
        <div className="mx-auto max-w-screen-sm text-center">
          <div className="absolute flex h-screen w-full flex-wrap items-center justify-start overflow-hidden">
            <div className="relative flex h-screen w-full flex-col items-end px-6 py-8 text-white lg:px-32">
              <div className="h-full w-full items-center justify-between md:flex">
                <div className="w-ful mb-4 mt-24 flex w-full flex-col items-center gap-0 md:mt-0 md:items-start">
                  <h1>404 Not Found</h1>
                  <p>Could not find page 👀</p>
                  <a
                    href="/"
                    className="static inline-flex flex-row items-center justify-center gap-2 rounded-lg bg-transparent font-medium not-italic tracking-tight underline underline-offset-1 transition-all duration-300 ease-linear hover:bg-transparent active:bg-transparent"
                  >
                    Return Home
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
