import Image from "next/image";
import { SunIcon } from "@heroicons/react/24/outline";

export default function ChatHome() {
  return (
    <div className="flex flex-col items-center justify-center text-white px-2 h-screen">
      <div className="text-center flex  flex-col items-center p-5">
        <h1 className="text-white font-bold text-5xl">Obo Tutor</h1>
        <p className="text-white">The best way to learn</p>
      </div>

      <div className="flex space-x-2 text-center">
        <div>
          <div className="flex flex-col items-center justify-center mb-5">
            {/* sun icon  */}
            <SunIcon className="size-8 text-white" />
            <h2 className="text-white">Examples</h2>
          </div>
          <div className="space-y-2">
            <p className="infoText">Explain Something to me</p>
            <p className="infoText">Explain Something to me</p>
            <p className="infoText">Explain Something to me</p>
          </div>
        </div>
        <div>
          <div className="flex flex-col items-center justify-center mb-5">
            {/* sun icon  */}
            <SunIcon className="size-8 text-white" />
            <h2 className="text-white">Examples</h2>
          </div>
          <div className="space-y-2">
            <p className="infoText">Explain Something to me</p>
            <p className="infoText">Explain Something to me</p>
            <p className="infoText">Explain Something to me</p>
          </div>
        </div>
        <div className="sm:hidden md:block">
          <div className="flex flex-col items-center justify-center mb-5">
            {/* sun icon  */}
            <SunIcon className="size-8 text-white" />
            <h2 className="text-white">Examples</h2>
          </div>
          <div className="space-y-2">
            <p className="infoText">Explain Something to me</p>
            <p className="infoText">Explain Something to me</p>
            <p className="infoText">Explain Something to me</p>
          </div>
        </div>
      </div>
    </div>
  );
}
