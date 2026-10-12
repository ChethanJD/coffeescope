"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Calendar, Briefcase, Crown, Loader2 } from "lucide-react";
import { DASHBOARD_USER } from "@/lib/data/mockDashboard";
import { getDashboardProfile, updateDashboardProfile } from "@/app/dashboard/actions";
import type { Profile } from "@/types/models";

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

function initialsOf(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return (parts[0]?.[0] ?? "").concat(parts[1]?.[0] ?? "").toUpperCase() || "?";
}

export function ProfileSection() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [nameDraft, setNameDraft] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const refresh = useCallback(() => {
    getDashboardProfile().then((p) => {
      setProfile(p);
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const isReal = profile !== null;

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSaving(true);
    const result = await updateDashboardProfile({ fullName: nameDraft });
    setIsSaving(false);
    if (result.ok) {
      setIsEditing(false);
      refresh();
    } else {
      setError(result.error);
    }
  }

  if (!loaded) {
    return (
      <div className="glass rounded-xl3 p-7 shadow-card">
        <p className="text-sm text-white/40">Loading your profile...</p>
      </div>
    );
  }

  const displayName = isReal ? profile.fullName ?? "Add your name" : DASHBOARD_USER.name;
  const displayEmail = isReal ? profile.email : DASHBOARD_USER.email;
  const displayRole = isReal ? profile.role : DASHBOARD_USER.role;
  const memberSince = isReal
    ? new Date(profile.createdAt).toLocaleDateString(undefined, {
        month: "long",
        year: "numeric",
      })
    : DASHBOARD_USER.memberSince;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass rounded-xl3 p-7 shadow-card"
    >
      {!isReal && (
        <p className="-mt-1 mb-5 w-fit rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/40">
          Showing demo data — sign in to edit your real profile
        </p>
      )}

      <div className="flex items-center gap-4">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-coffee-gradient font-heading text-xl font-semibold text-white shadow-glow-gold">
          {isReal ? initialsOf(displayName) : DASHBOARD_USER.initials}
        </span>
        <div>
          <h3 className="font-heading text-xl font-semibold text-white">{displayName}</h3>
          <p className="text-sm text-white/40">{displayEmail}</p>
        </div>
        {!isReal && (
          <span className="ml-auto flex items-center gap-1.5 rounded-full bg-coffee-gold/15 px-3 py-1.5 text-xs font-semibold text-coffee-gold">
            <Crown className="h-3.5 w-3.5" />
            {DASHBOARD_USER.plan}
          </span>
        )}
      </div>

      <div className="mt-6 flex flex-col gap-2.5">
        <InfoRow icon={Briefcase} label="Role" value={displayRole} />
        <InfoRow icon={Mail} label="Email" value={displayEmail} />
        <InfoRow icon={Calendar} label="Member since" value={memberSince} />
      </div>

      {isEditing ? (
        <form onSubmit={handleSave} className="mt-6 flex flex-col gap-2.5">
          <input
            autoFocus
            value={nameDraft}
            onChange={(e) => setNameDraft(e.target.value)}
            placeholder="Your full name"
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:border-coffee-gold focus:outline-none"
          />
          {error && <p className="text-sm text-red-400">{error}</p>}
          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="flex-1 rounded-full bg-white/[0.05] px-5 py-3 text-sm font-semibold text-white/70 hover:bg-white/[0.08]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-coffee-gradient px-5 py-3 text-sm font-semibold text-white shadow-glow-gold disabled:opacity-70"
            >
              {isSaving && <Loader2 className="h-4 w-4 animate-spin" />}
              {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      ) : (
        <button
          type="button"
          onClick={() => {
            if (!isReal) return;
            setNameDraft(profile.fullName ?? "");
            setIsEditing(true);
          }}
          disabled={!isReal}
          className="mt-6 w-full rounded-full bg-white/[0.05] px-5 py-3 text-sm font-semibold text-white/80 transition-colors hover:bg-white/[0.08] hover:text-white disabled:opacity-50"
        >
          Edit Profile
        </button>
      )}
    </motion.div>
  );
}
