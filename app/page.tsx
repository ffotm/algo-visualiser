import Image from "next/image";
import { FaArrowTrendUp } from "react-icons/fa6";
import Squares from './ui/squares';
import GradientText from './ui/gradientText'
import MagicBento from './ui/magicBento'
import Preview from "./preview";
import Menu from "./menu";





export default function Home() {
  return (
    <div>
      <Menu /><Preview />
    </div>

  );
}