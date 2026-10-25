import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import type { ButtonHTMLAttributes, Ref } from 'react'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'label inline-flex items-center justify-center gap-3 whitespace-nowrap transition-[background-color,color,border-color,opacity] duration-500 ease-luxe disabled:pointer-events-none disabled:opacity-40',
  {
    variants: {
      variant: {
        solid: 'bg-charcoal text-ivory hover:bg-gold-deep hover:border-gold-deep',
        outline:
          'border border-charcoal/40 text-charcoal hover:bg-charcoal hover:text-ivory hover:border-charcoal',
        light:
          'border border-ivory/50 text-ivory hover:bg-ivory hover:text-charcoal hover:border-ivory',
        ghost: 'text-charcoal hover:opacity-60',
      },
      size: {
        md: 'h-12 px-8',
        lg: 'h-14 px-10',
        icon: 'size-11',
      },
    },
    defaultVariants: { variant: 'solid', size: 'md' },
  },
)

type Props = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean; ref?: Ref<HTMLButtonElement> }

export function Button({ className, variant, size, asChild, ref, ...props }: Props) {
  const Comp = asChild ? Slot : 'button'
  return <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
}
