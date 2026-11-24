import Image from "next/image";

export default function MediaImage({ file, alt, sizes }) {
  const isUpload = typeof file === "string";

  return (
    <Image
      src={file}
      alt={alt}
      fill
      sizes={sizes}
      unoptimized={isUpload}
      placeholder={isUpload ? "empty" : "blur"}
      className="object-cover"
    />
  );
}
