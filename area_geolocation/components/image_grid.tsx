import Image from "next/image";

interface ImageGridProps {
  images: string[];
}

export default function ImageGrid({ images }: ImageGridProps) {
  return (
    <div className="grid w-full gap-4 space-y-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
      {images.map((image, index) => (
        <Image
          key={index}
          src={image}
          alt={`screenshot_${index}`}
          className="h-40 w-full bg-slate-200 p-2"
        />
      ))}
    </div>
  );
}
