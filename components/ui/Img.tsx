import Image, { type ImageProps } from "next/image";
import { images, type ImageKey } from "@/lib/images";

type Props = Omit<ImageProps, "src" | "alt" | "width" | "height" | "placeholder" | "blurDataURL"> & {
  k: ImageKey;
  alt?: string;
};

/** next/image bound to the central image registry, with a blur-up placeholder. */
export function Img({ k, alt, fill, sizes, quality = 72, ...rest }: Props) {
  const image = images[k];
  const common = {
    src: image.src,
    alt: alt ?? image.alt,
    sizes: sizes ?? "100vw",
    placeholder: "blur" as const,
    blurDataURL: image.blur,
    quality,
  };
  if (fill) return <Image {...common} alt={common.alt} fill {...rest} />;
  return <Image {...common} alt={common.alt} width={image.width} height={image.height} {...rest} />;
}
