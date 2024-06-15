import { useState, useEffect } from "react";
import { imageData } from "@/constants/index";

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
    <div className="w-[443.85px] h-[251.72px] flex justify-center items-center">
      {/* <div className="eclipse-wrapper"> */}
      {images.map((image, index) => (
        <img
          key={image.id}
          src={image.src}
          alt={image.alt}
          className={`absolute transition-transform duration-1000 ${
            index === 0 ? "z-10" : "z-0"
          } ${
            index === 0
              ? "translate-x-[-100px] translate-y-0"
              : index === 1
              ? "translate-x-[80px] translate-y-[24px]"
              : "translate-x-[-14px] translate-y-[-24px]"
          }`}
          style={{
            transition: "transform 1s",
          }}
        />
      ))}
    </div>
    // </div>
  );
};

export default HeroImage;
