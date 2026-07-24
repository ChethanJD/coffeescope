"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Send, X, Sparkles } from "lucide-react";
import { ChatMessage, type ChatMessageData } from "@/components/assistant/ChatMessage";
import { TypingIndicator } from "@/components/assistant/TypingIndicator";
import { mockAssistantReply } from "@/lib/assistant/mockAssistant";

const SUGGESTED_QUESTIONS = [
  "Should I sell today?",
  "Weather tomorrow?",
  "Coffee price prediction?",
  "Disease diagnosis?",
];

let idCounter = 0;
function nextId() {
  idCounter += 1;
  return `msg-${idCounter}`;
}

export function ChatWindow({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<ChatMessageData[]>([
    {
      id: nextId(),
      role: "assistant",
      text: "Hi, I'm the CoffeeScope AI Assistant. Ask me about market moves, weather, price predictions, or crop disease.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  async function sendMessage(text: string) {
    if (!text.trim() || isTyping) return;
    setMessages((prev) => [...prev, { id: nextId(), role: "user", text }]);
    setInput("");
    setIsTyping(true);
    const reply = await mockAssistantReply(text);
    setMessages((prev) => [...prev, { id: nextId(), role: "assistant", text: reply }]);
    setIsTyping(false);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.96 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="glass fixed bottom-24 right-6 z-50 flex h-[520px] w-[92vw] max-w-sm flex-col overflow-hidden rounded-xl3 shadow-card"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <span className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-coffee-gold" />
          <span className="font-heading text-sm font-semibold text-white">CoffeeScope AI</span>
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close chat"
          className="flex h-8 w-8 items-center justify-center rounded-full text-white/50 hover:bg-white/[0.06] hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
        {messages.map((m) => (
          <ChatMessage key={m.id} message={m} />
        ))}
        {isTyping && <TypingIndicator />}
      </div>

      {/* Suggested questions (only shown before the user's first message) */}
      {messages.length === 1 && (
        <div className="flex flex-wrap gap-2 px-5 pb-3">
          {SUGGESTED_QUESTIONS.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => sendMessage(q)}
              className="rounded-full bg-white/[0.05] px-3 py-1.5 text-xs text-white/60 transition-colors hover:bg-white/[0.09] hover:text-white"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(input);
        }}
        className="flex items-center gap-2 border-t border-white/10 p-3"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about market, weather, or disease..."
          className="flex-1 rounded-full bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!input.trim() || isTyping}
          aria-label="Send message"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-coffee-gradient text-white shadow-glow-gold disabled:opacity-40"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </motion.div>
  );
}
