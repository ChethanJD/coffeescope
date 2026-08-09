"use client";

import { motion } from "framer-motion";
import { Mail, Calendar, Briefcase, Crown } from "lucide-react";
import { DASHBOARD_USER } from "@/lib/data/mockDashboard";

function InfoRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-white/[0.03] px-4 py-3.5">
      <span className="flex items-center gap-2.5 text-sm text-white/50">
        <Icon className="h-4 w-4 text-coffee-gold" />
        {label}
      </span>
      <span className="text-sm font-medium text-white">{value}</span>
    </div>
  );
}

export function ProfileSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass rounded-xl3 p-7 shadow-card"
    >
      <div className="flex items-center gap-4">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-coffee-gradient font-heading text-xl font-semibold text-white shadow-glow-gold">
          {DASHBOARD_USER.initials}
        </span>
        <div>
          <h3 className="font-heading text-xl font-semibold text-white">
            {DASHBOARD_USER.name}
          </h3>
          <p className="text-sm text-white/40">{DASHBOARD_USER.email}</p>
        </div>
        <span className="ml-auto flex items-center gap-1.5 rounded-full bg-coffee-gold/15 px-3 py-1.5 text-xs font-semibold text-coffee-gold">
          <Crown className="h-3.5 w-3.5" />
          {DASHBOARD_USER.plan}
        </span>
      </div>

      <div className="mt-6 flex flex-col gap-2.5">
        <InfoRow icon={Briefcase} label="Role" value={DASHBOARD_USER.role} />
        <InfoRow icon={Mail} label="Email" value={DASHBOARD_USER.email} />
        <InfoRow icon={Calendar} label="Member since" value={DASHBOARD_USER.memberSince} />
      </div>

      <button
        type="button"
        className="mt-6 w-full rounded-full bg-white/[0.05] px-5 py-3 text-sm font-semibold text-white/80 transition-colors hover:bg-white/[0.08] hover:text-white"
      >
        Edit Profile
      </button>
    </motion.div>
  );
}
