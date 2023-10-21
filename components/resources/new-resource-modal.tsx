"use client";
import { PropsWithChildren, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

type NewResourceModalProps = {
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
};

const NewResourceModal = ({
  onOpenChange,
  children,
  title,
  description,
}: PropsWithChildren<NewResourceModalProps>) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(true);
  }, []);
  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={true}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default NewResourceModal;
