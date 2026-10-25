import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { photoAlt, photoSrcSet, photoUrl, type ImageKey } from '@/data/images'
import { cn } from '@/lib/utils'

type ImgProps = {
  photo: ImageKey
  /** Tailwind aspect utility, e.g. `aspect-[4/5]`. Reserving the ratio prevents layout shift. */
  ratio?: string
  sizes: string
  eager?: boolean
  maxWidth?: number
  position?: string
  alt?: string
  className?: string
  imgClassName?: string
  style?: CSSProperties
}

/** Responsive, lazy, ratio-locked image with a quiet fade-in over a stone placeholder. */
export function Img({
  photo,
  ratio,
  sizes,
  eager,
  maxWidth,
  position = 'center',
  alt,
  className,
  imgClassName,
  style,
}: ImgProps) {
  const ref = useRef<HTMLImageElement>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (ref.current?.complete && ref.current.naturalWidth > 0) setLoaded(true)
  }, [])

  return (
    <div className={cn('relative overflow-hidden bg-stone', ratio, className)} style={style}>
      <img
        ref={ref}
        src={photoUrl(photo, 1200)}
        srcSet={photoSrcSet(photo, maxWidth)}
        sizes={sizes}
        alt={alt ?? photoAlt(photo)}
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : 'auto'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        style={{ objectPosition: position }}
        className={cn(
          'absolute inset-0 size-full object-cover transition-opacity duration-1000 ease-luxe',
          loaded ? 'opacity-100' : 'opacity-0',
          imgClassName,
        )}
      />
    </div>
  )
}
