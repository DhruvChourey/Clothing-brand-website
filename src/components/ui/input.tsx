import type { InputHTMLAttributes, Ref } from 'react'
import { cn } from '@/lib/utils'

export function Input({
  className,
  ref,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { ref?: Ref<HTMLInputElement> }) {
  return (
    <input
      ref={ref}
      className={cn(
        'h-12 w-full border-0 border-b border-current/30 bg-transparent px-0 text-base placeholder:text-current/45 transition-colors duration-500 focus:border-current focus:outline-none aria-[invalid=true]:border-red-800',
        className,
      )}
      {...props}
    />
  )
}

export function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cn('label mb-1 block', className)} {...props} />
}
