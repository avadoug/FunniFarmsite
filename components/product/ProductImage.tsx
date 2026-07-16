"use client";

import Image from "next/image";
import { useState } from "react";

const fallbackImage = "/brand/funni-farm-official-logo.png";

export function ProductImage({
  alt,
  className,
  priority = false,
  sizes,
  src,
}: {
  alt: string;
  className?: string;
  priority?: boolean;
  sizes: string;
  src: string;
}) {
  const [activeSrc, setActiveSrc] = useState(src || fallbackImage);

  return (
    <Image
      alt={alt}
      className={className}
      fill
      onError={() => setActiveSrc(fallbackImage)}
      priority={priority}
      sizes={sizes}
      src={activeSrc}
    />
  );
}
