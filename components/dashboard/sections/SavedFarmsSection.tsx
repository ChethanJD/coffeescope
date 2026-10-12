"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Plus, Pencil, Trash2 } from "lucide-react";
import { SAVED_FARMS } from "@/lib/data/mockDashboard";
import { getDashboardFarms, deleteDashboardFarm } from "@/app/dashboard/actions";
import { AddFarmModal } from "@/components/dashboard/AddFarmModal";
import type { Farm } from "@/types/models";

export function SavedFarmsSection() {
  const [farms, setFarms] = useState<Farm[] | null>(null);
  const [source, setSource] = useState<"database" | "unavailable">("unavailable");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingFarm, setEditingFarm] = useState<Farm | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const refresh = useCallback(() => {
    getDashboardFarms().then((result) => {
      setFarms(result.farms);
      setSource(result.source);
    });
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const isReal = source === "database";
  const loading = farms === null;

  async function handleDelete(id: string) {
    if (!window.confirm("Remove this farm? This can't be undone.")) return;
    setDeletingId(id);
    await deleteDashboardFarm(id);
    setDeletingId(null);
    refresh();
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-lg font-semibold text-white">Saved Farms</h3>
        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 rounded-full bg-coffee-gradient px-4 py-2 text-xs font-semibold text-white shadow-glow-gold"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Farm
        </button>
      </div>

      {loading && <p className="text-sm text-white/40">Loading your farms...</p>}

      {!loading && isReal && farms!.length === 0 && (
        <div className="glass rounded-xl3 p-8 text-center">
          <p className="text-sm text-white/50">
            You haven&apos;t added a farm yet. Add one to get tailored prices, weather, and alerts.
          </p>
        </div>
      )}

      {!loading && isReal && farms!.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {farms!.map((farm, i) => (
            <motion.div
              key={farm.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="glass rounded-xl3 p-5 shadow-card"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-heading text-base font-semibold text-white">{farm.name}</h4>
                  <span className="mt-1 flex items-center gap-1 text-xs text-white/40">
                    <MapPin className="h-3 w-3" />
                    {[farm.region, farm.country].filter(Boolean).join(", ")}
                  </span>
                </div>
                <div className="flex shrink-0 gap-1">
                  <button
                    type="button"
                    onClick={() => setEditingFarm(farm)}
                    aria-label="Edit farm"
                    className="rounded-full p-1.5 text-white/30 hover:bg-white/[0.06] hover:text-white/70"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(farm.id)}
                    disabled={deletingId === farm.id}
                    aria-label="Delete farm"
                    className="rounded-full p-1.5 text-white/30 hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2 border-t border-white/10 pt-4 text-center">
                <div>
                  <p className="text-sm font-semibold text-white">
                    {farm.areaHectares ?? "—"}
                  </p>
                  <p className="text-[10px] text-white/40">Hectares</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    {farm.primaryVarietyId ? "Set" : "—"}
                  </p>
                  <p className="text-[10px] text-white/40">Variety</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {!loading && !isReal && (
        <>
          <p className="-mt-1 w-fit rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/40">
            Showing demo data — connect Supabase and sign in to manage real farms
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SAVED_FARMS.map((farm, i) => (
              <motion.div
                key={farm.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="glass rounded-xl3 p-5 shadow-card"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-heading text-base font-semibold text-white">
                      {farm.name}
                    </h4>
                    <span className="mt-1 flex items-center gap-1 text-xs text-white/40">
                      <MapPin className="h-3 w-3" />
                      {farm.location}
                    </span>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 border-t border-white/10 pt-4 text-center">
                  <div>
                    <p className="text-sm font-semibold text-white">{farm.areaHectares}</p>
                    <p className="text-[10px] text-white/40">Hectares</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{farm.variety}</p>
                    <p className="text-[10px] text-white/40">Variety</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{farm.lastHarvestYield}</p>
                    <p className="text-[10px] text-white/40">Last Yield</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}

      {showAddModal && (
        <AddFarmModal
          onClose={() => setShowAddModal(false)}
          onCreated={() => {
            setShowAddModal(false);
            refresh();
          }}
        />
      )}

      {editingFarm && (
        <AddFarmModal
          farm={editingFarm}
          onClose={() => setEditingFarm(null)}
          onCreated={() => {
            setEditingFarm(null);
            refresh();
          }}
        />
      )}
    </div>
  );
}
