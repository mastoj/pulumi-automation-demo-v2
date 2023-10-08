"use client";
import React from "react";
import { useConsoleWindow } from "./console-window-provider";
import { cn } from "@/lib/utils";
import { HiChevronDown, HiChevronUp, HiX } from "react-icons/hi";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";

type Props = {};

// const ConsoleHeaderBar = () => {
//   const consoleWindow = useConsoleWindow();
//   const handleOnClick = () => {
//     consoleWindow.toggleOpen(!consoleWindow.open);
//   };
//   return (
//     <div
//       className="flex flex-row items-center justify-end bg-background px-4 py-2 border-y border-white cursor-pointer"
//       onClick={handleOnClick}
//     >
//       {consoleWindow.open ? (
//         <HiChevronDown className="h-8 w-8">&nbsp;</HiChevronDown>
//       ) : (
//         <HiChevronUp className="h-8 w-8">&nbsp;</HiChevronUp>
//       )}
//     </div>
//   );
// };

const ConsoleBody = () => {
  const consoleWindow = useConsoleWindow();
  return (
    <div className="h-full w-full bg-background overflow-auto px-2">
      {consoleWindow.lines.map((line, index) => (
        <div key={index}>{line.trim() === "" ? "" : "$> " + line}</div>
      ))}
    </div>
  );
};

const ConsoleWindow = (props: Props) => {
  const consoleWindow = useConsoleWindow();
  const handleOnClick = () => {
    console.log("toggle", consoleWindow.open);
    consoleWindow.toggleOpen(!consoleWindow.open);
  };
  return (
    <>
      <Sheet open={consoleWindow.open} modal={false}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            onClick={handleOnClick}
            className="fixed bottom-0 right-0 z-[99999]"
          >
            <HiChevronUp
              className={cn(
                "h-8 w-8 transition-all",
                consoleWindow.open ? "rotate-180" : ""
              )}
            />
          </Button>
        </SheetTrigger>
        <SheetContent
          side={"bottom"}
          className="max-h-[300px] overflow-y-auto rotat"
          showClose={false}
        >
          <ConsoleBody />
        </SheetContent>
      </Sheet>
    </>

    // <div
    //   className={cn(
    //     "fixed bottom-0 inset-x-0 grid auto-rows-[auto_0rem] transition-all z-[9999]",
    //     consoleWindow.open && "auto-rows-[auto_15rem]"
    //   )}
    // >
    // </div>
  );
};

export default ConsoleWindow;
