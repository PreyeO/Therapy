// import { useState, useEffect } from "react";
import { imageData } from "@/constants/DataManager";
// import ellipsePath from "@/assets/image/Ellipse.svg";

const HeroImage = () => {
  // const [images, setImages] = useState(imageData);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setImages((prevImages) => {
  //       return [prevImages[1], prevImages[2], prevImages[0]];
  //     });
  //   }, 3000); // Change image every 3 seconds

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="w-[443.85px] h-[251.72px] flex justify-center items-center">
      {/* <img
        src={ellipsePath}
        alt="Ellipse Path"
        className="relative z-0 w-full h-full"
      /> */}
      {imageData.map((image) => (
        <img
          key={image.id}
          src={image.src}
          alt={image.alt}
          className="  ml-[-30px] mr-[-30px]"
          // className={`absolute ${
          //   index === 0
          //     ? "image-position-0"
          //     : index === 1
          //     ? "image-position-1"
          //     : "image-position-2"
          // }`}
        />
      ))}
    </div>
  );
};

export default HeroImage;
