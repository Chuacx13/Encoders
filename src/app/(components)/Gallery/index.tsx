"use client";

import Image from "next/image";
import { Tab } from "@headlessui/react";
import GalleryCard from "./GalleryCard";

interface GalleryProps {
  images: string[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  return (
    <Tab.Group as="div" className="flex flex-col-reverse">
      <div className="hidden w-full max-w-2xl mx-auto mt-6 sm:block lg:max-w-none">
        <Tab.List className="grid grid-cols-4 gap-6">
          {images.map((image, id) => (
            <GalleryCard key={id} image={image} />
          ))}
        </Tab.List>
      </div>
      <Tab.Panels className="w-full aspect-square">
        {images.map((image, id) => (
          <Tab.Panel key={id}>
            <div className="relative w-full h-full overflow-hidden aspect-square sm:rounded-lg">
              <Image
                fill
                src={image}
                alt={"Image"}
                className="object-cover object-center"
              />
            </div>
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};

export default Gallery;
