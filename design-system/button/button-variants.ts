import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'inline-flex flex-row items-center gap-2 rounded-lg justify-start font-medium ease-linear transition-all duration-300 static not-italic tracking-tight text-white select-none',
  {
    variants: {
      variant: {
        default: 'bg-blue-700 hover:bg-blue-50 active:bg-gray-200 hover:text-blue-700',
        danger: 'bg-red-500 text-black hover:bg-red-600 dark:hover:bg-red-600',
        secondary: 'bg-transparent border border-slate-200 dark:border-slate-700',
        subtle: 'bg-transparent active:bg-transparent hover:bg-transparent',
        disabled: 'bg-opacity-70 pointer-events-none',
        link: 'bg-transparent active:bg-transparent dark:bg-transparent underline-offset-1 underline text-slate-900 hover:bg-transparent dark:hover:bg-transparent',
        grow: 'bg-transparent transform transition hover:scale-105 duration-300 ease-in-out'
      },
      size: {
        default: 'h-10 lg:p-2 p-4',
        sm: 'h-9 lg:p-2 p-4',
        lg: 'h-16 w-40 lg:p-3 p-2',
        auto: 'h-full w-full'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);
