import Image from "next/image";
import { FaArrowTrendUp } from "react-icons/fa6";
import Squares from './ui/squares';
import GradientText from './ui/gradientText'
import MagicBento from './ui/magicBento'
import Preview from "./preview";
import Menu from "./menu";
import Dihstra from "./preview2";
import NavBar from "./navBar";



export default function Home() {
  return (
    <div> 
      <NavBar />
      <Menu />
      {/*><Preview />
      <Dihstra />*/}


    </div>

  );
}