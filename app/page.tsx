import Image from "next/image";
import { FaArrowTrendUp } from "react-icons/fa6";
import Squares from './squares';
import GradientText from './gradientText'




export default function Home() {
  return (
    <div className="bg-white h-screen flex text-black w-full font-family-base">
      <div className="relative container border border-black rounded-lg p-10 shadow-lg h-80 m-2 w-full">

        <div className="absolute inset-0 z-0 overflow-hidden rounded-lg">
          <Squares />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-center pointer-events-none">
          <h1 className="text-4xl font-bold p-2 pb-0">
            Algorithm Visualizer
            <FaArrowTrendUp className="inline-block ml-2 relative bottom-1" />
          </h1>
          <GradientText
            animationSpeed={1}
            showBorder={false}
            className="bg-transparent"

          > <p className="text-xl font-medium p-2 mt-2">
              Visualize, understand, and master graph algorithms through interactive animations and intuitive design.
            </p></GradientText>
        </div>
      </div>
    </div>
  );
}