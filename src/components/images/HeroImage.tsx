import { useState, useEffect } from "react";
import { imageData } from "@/constants/index";
// import ellipsePath from "@/assets/image/Ellipse.svg";

const HeroImage = () => {
  const [images, setImages] = useState(imageData);

  useEffect(() => {
    const interval = setInterval(() => {
      setImages((prevImages) => {
        return [prevImages[1], prevImages[2], prevImages[0]];
      });
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-[443.85px] h-[251.72px] flex justify-center items-center overflow-hidden">
      {/* <img
        src={ellipsePath}
        alt="Ellipse Path"
        className="relative z-0 w-full h-full"
      /> */}
      {images.map((image, index) => (
        <img
          key={image.id}
          src={image.src}
          alt={image.alt}
          className={`absolute animation-duration-3000ms ${
            index === 0
              ? "image-position-0"
              : index === 1
              ? "image-position-1"
              : "image-position-2"
          }`}
        />
      ))}
    </div>
  );
};

export default HeroImage;
