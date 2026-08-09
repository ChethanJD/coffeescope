"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Smartphone, MessageSquareText, MessagesSquare } from "lucide-react";
import { NOTIFICATION_CHANNELS, type NotificationChannel } from "@/lib/data/mockDashboard";
import { cn } from "@/lib/utils";

const CHANNEL_ICON: Record<NotificationChannel["id"], React.ElementType> = {
  email: Mail,
  push: Smartphone,
  sms: MessageSquareText,
  whatsapp: MessagesSquare,
};

function Toggle({ active, onToggle }: { active: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={active}
      className={cn(
        "relative h-6 w-11 shrink-0 rounded-full transition-colors",
        active ? "bg-coffee-leaf" : "bg-white/10"
      )}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
        className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow"
        style={{ left: active ? 22 : 2 }}
      />
    </button>
  );
}

export function NotificationChannelsPanel() {
  const [channels, setChannels] = useState(NOTIFICATION_CHANNELS);

  function toggle(id: NotificationChannel["id"]) {
    setChannels((prev) =>
      prev.map((c) => (c.id === id ? { ...c, enabled: !c.enabled } : c))
    );
  }

  return (
    <div className="glass rounded-xl3 p-6 shadow-card">
      <h3 className="font-heading text-lg font-semibold text-white">Delivery Channels</h3>
      <p className="mt-1 text-xs text-white/40">
        Choose how you want to receive alerts and updates by default
      </p>

      <div className="mt-5 flex flex-col gap-2.5">
        {channels.map((channel, i) => {
          const Icon = CHANNEL_ICON[channel.id];
          return (
            <motion.div
              key={channel.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
              className="flex items-center gap-4 rounded-xl bg-white/[0.03] px-4 py-3.5"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.05]">
                <Icon className="h-4 w-4 text-coffee-gold" />
              </span>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{channel.label}</p>
                <p className="mt-0.5 text-xs text-white/40">{channel.description}</p>
              </div>
              <Toggle active={channel.enabled} onToggle={() => toggle(channel.id)} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
