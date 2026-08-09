"use client";

import { motion } from "framer-motion";
import { Coffee } from "lucide-react";
import { RichText } from "@/components/assistant/RichText";
import { cn } from "@/lib/utils";

export interface ChatMessageData {
  id: string;
  role: "user" | "assistant";
  text: string;
}

export function ChatMessage({ message }: { message: ChatMessageData }) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={cn("flex items-end gap-2", isUser && "flex-row-reverse")}
    >
      {!isUser && (
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-coffee-gradient">
          <Coffee className="h-3.5 w-3.5 text-white" />
        </span>
      )}
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
          isUser
            ? "rounded-br-md bg-coffee-gradient text-white"
            : "rounded-bl-md bg-white/[0.06] text-white/85"
        )}
      >
        <RichText text={message.text} />
      </div>
    </motion.div>
  );
}
