import Image, { type ImageProps } from "next/image";
import { images, type ImageKey } from "@/lib/images";

type Props = Omit<ImageProps, "src" | "alt" | "width" | "height"> & {
  k: ImageKey;
  alt?: string;
};

/** next/image bound to the central image registry. */
export function Img({ k, alt, fill, sizes, ...rest }: Props) {
  const image = images[k];
  if (fill) {
    return <Image src={image.src} alt={alt ?? image.alt} fill sizes={sizes ?? "100vw"} {...rest} />;
  }
  return (
    <Image
      src={image.src}
      alt={alt ?? image.alt}
      width={image.width}
      height={image.height}
      sizes={sizes ?? "100vw"}
      {...rest}
    />
  );
}
