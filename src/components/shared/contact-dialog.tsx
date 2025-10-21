"use client";

import { useState } from "react";
import { button, buttonCx } from "@/lib/button";
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
            className: "w-[16rem] text-[1.33rem] px-[3rem] py-[0.33rem] ml-[1rem] mr-[1rem] no-underline hover:underline cursor-target"
          })}
        >
          contact
        </button>
      </DialogTrigger>

      <DialogContent className="w-[48rem] h-[48rem] justify-center border-0">
        <DialogTitle className='flex justify-center border-b-1 navbar-short-borders-bottom w-[66%] h-[4rem] mx-auto px-[0.5rem] text-[3rem]'>
          get in touch
        </DialogTitle>
        <form onSubmit={handleSubmit} className="flex flex-col w-[32rem] items-center">
          <div className="w-full">
            <label className="text-[1.5rem]">name</label>
            <Input
              title="name"
              className="w-full h-[3rem] text-[1.5rem] mb-[1rem] cursor-target"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />

            <label className="text-[1.5rem]">email</label>
            <Input
              title="email"
              className="w-full h-[3rem] text-[1.5rem] mb-[1rem] cursor-target"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />

            <Textarea
              title="message"
              className="h-[20rem] resize-none mb-[1rem] text-[1.5rem] cursor-target"
              placeholder="leave your message here"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              required
            />
          </div>
          
          <div className="flex justify-center">
            <button
              type="submit"
              className={buttonCx({
                surface: "primary",
                className: "text-[2rem] w-[16rem] h-[3rem] cursor-target"
              })}
            >
              send message
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}