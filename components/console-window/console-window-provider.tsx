"use client";
import { PropsWithChildren, createContext, useContext, useState } from "react";

export type ConsoleWindowState = {
  open: boolean;
  lines: string[];
  setLines: (lines: string[]) => void;
  toggleOpen: (open: boolean) => void;
};

const ConsoleWindowContext = createContext<ConsoleWindowState>({
  open: false,
  toggleOpen: (open) => {},
  setLines: (lines) => {},
  lines: [],
});

const ConsoleWindowProvider = ({ children }: PropsWithChildren) => {
  const [lines, setLines] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  return (
    <ConsoleWindowContext.Provider
      value={{
        open: open,
        lines: lines,
        setLines: setLines,
        toggleOpen: setOpen,
      }}
    >
      {children}
    </ConsoleWindowContext.Provider>
  );
};

const useConsoleWindow = () => {
  return useContext(ConsoleWindowContext);
};

export { ConsoleWindowProvider, useConsoleWindow };
