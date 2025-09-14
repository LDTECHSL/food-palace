import { useEffect, useState } from "react";
import "../styles/home.css";
import food1 from "../assets/food1.jpg";
import food2 from "../assets/food2.jpg";
import food3 from "../assets/food3.jpg";

const images = [food1, food2, food3];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-outer">
      <img
        className="home-food-img"
        src={images[currentIndex]}
        alt={`Delicious Food ${currentIndex + 1}`}
      />
    </div>
  );
}
