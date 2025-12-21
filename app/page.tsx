import Image from "next/image";
import { FaArrowTrendUp } from "react-icons/fa6";
import Squares from './ui/squares';
import GradientText from './ui/gradientText'
import MagicBento from './ui/magicBento'




export default function Home() {
  return (
    <div className="bg-white h-screen flex text-black w-full font-family-base">
      <div className="relative container  p-10  h-135 w-full mx-auto rounded-lg flex flex-col justify-center">

        <div className="absolute inset-0 z-0 overflow-hidden rounded-lg">
          <div className="relative left-100 cursor-pointer">
            <MagicBento
              textAutoHide={true}
              enableStars={true}
              enableSpotlight={true}
              enableBorderGlow={true}
              enableTilt={true}
              enableMagnetism={true}
              clickEffect={true}
              spotlightRadius={300}
              particleCount={12}
              glowColor="0, 120, 1"

            /></div>
        </div>

        <div className="relative z-10 h-full flex flex-col justify-center pointer-events-none">
          <h1 className="text-4xl font-bold p-2 pb-0 ">
            Algorithm Visualizer
            <FaArrowTrendUp className="inline-block ml-2 relative bottom-1 text-green-800" />
          </h1>

        </div>
      </div>
    </div>
  );
}