"use client";

import { useState } from "react";
import { buttonCx } from "@/lib/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/shared/ui/dialog";
import { Input } from "@/components/shared/ui/input";
import { Textarea } from "@/components/shared/ui/textarea";
import { toast } from "sonner";

export function ContactDialog() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    toast.error("feature has not been implemented yet!");
    
    setFormData({
      name: "",
      email: "",
      message: ""
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>

      <DialogTrigger asChild>
        <button
          className={buttonCx({
            surface: "unselected",
            minHeight: "lg",
            fontSize: "md",
            padding: "xs",
            className: "flex flex-1 no-underline hover:underline cursor-target"
          })}
        >
          contact
        </button>
      </DialogTrigger>

      <DialogContent className="w-[48rem] h-[48rem] justify-center border-1">
        <DialogTitle className="flex justify-center border-b-1 navbar-short-borders-bottom w-[full] h-[clamp(3rem,4vw,5rem)] mx-auto px-[var(--spacing-md)] py-[var(--spacing-lg)] text-name">
          get in touch
        </DialogTitle>
        <form onSubmit={handleSubmit} className="flex flex-col w-[32rem] items-center">
          <div className="w-full">
            <label className="text-action">name</label>
            <Input
              title="name"
              className="w-full h-[3rem] text-action mb-[1rem] cursor-target"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />

            <label className="text-action">email</label>
            <Input
              title="email"
              className="w-full h-[3rem] text-action mb-[1rem] cursor-target"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />

            <Textarea
              title="message"
              className="h-[20rem] resize-none mb-[1rem] text-body cursor-target"
              placeholder="leave your message here"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              required
            />
            
          </div>
            <button
              type="submit"
              className={buttonCx({
                surface: "primary",
                width: "full",
                fontSize: "lg",
                className: "cursor-target"
              })}>
            send message
            </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}