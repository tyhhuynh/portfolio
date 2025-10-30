"use client";

import { useState } from "react";
import { buttonCx } from "@/lib/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/contact/dialog";
import { Input } from "@/components/contact/input";
import { Textarea } from "@/components/contact/textarea";
import { toast } from "sonner";

export function ContactDialog() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        toast.success('message sent successfully!');
        setOpen(false);
        setFormData({
          name: "",
          email: "",
          message: ""
        });
      } else {
        toast.error(result.error || 'failed to send message!');
      }
    } catch (error) {
      console.error('ERROR:', error);
      toast.error('failed to send message. please try again.');
    } finally {
      setIsLoading(false);
    }
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
            className: "flex flex-1 no-underline hover:underline"
          })}
        >
          contact
        </button>
      </DialogTrigger>

      <DialogContent className="w-full max-h-[90vh] justify-center border-1 pb-[var(--spacing-md)] md:max-w-[48rem]">
        <DialogTitle className="flex justify-center items-center border-b-1 navbar-short-borders-bottom h-[clamp(3rem,4vw,5rem)] mx-auto px-[var(--spacing-md)] mb-[var(--spacing-md)] text-name">
          get in touch
        </DialogTitle>
        <form onSubmit={handleSubmit} className="flex flex-col w-full items-center px-[var(--spacing-xl)] pb-[var(--spacing-md)]">
          <div className="w-full">
            <label className="text-action">name</label>
            <Input
              title="name"
              className="w-full h-[3rem] text-action cursor-target"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />

            <label className="text-action">email</label>
            <Input
              title="email"
              className="w-full h-[3rem] text-action mb-[var(--spacing-md)] cursor-target"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />

            <Textarea
              title="message"
              className="h-[20rem] resize-none mb-[var(--spacing-md)] text-body cursor-target"
              placeholder="leave your message here"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              required
            />
            
          </div>
            <button
              type="submit"
              disabled={isLoading}
              className={buttonCx({
                surface: "primary",
                width: "full",
                fontSize: "lg",
                className: "cursor-target"
              })}>
              {isLoading ? 'sending...' : 'send message'}
            </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}