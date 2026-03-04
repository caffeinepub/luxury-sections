import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Merchant, Section } from "../backend.d";
import { useActor } from "./useActor";

export const SHOP_DOMAIN = "demo-store.myshopify.com";

// ── Queries ───────────────────────────────────────────────────────────────────

export function useAllSections() {
  const { actor, isFetching } = useActor();
  return useQuery<Section[]>({
    queryKey: ["sections"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllSections();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useInstalledSections() {
  const { actor, isFetching } = useActor();
  return useQuery<Section[]>({
    queryKey: ["installedSections", SHOP_DOMAIN],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getInstalledSections(SHOP_DOMAIN);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMerchant() {
  const { actor, isFetching } = useActor();
  return useQuery<Merchant>({
    queryKey: ["merchant", SHOP_DOMAIN],
    queryFn: async () => {
      if (!actor) {
        return {
          shopDomain: SHOP_DOMAIN,
          installDate: BigInt(Date.now()),
          planType: "free",
          billingStatus: "inactive",
          installedSectionIds: [],
        };
      }
      return actor.getMerchant(SHOP_DOMAIN);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMerchantStats() {
  const { actor, isFetching } = useActor();
  return useQuery<{
    totalInstalled: bigint;
    billingStatus: string;
    planType: string;
  }>({
    queryKey: ["merchantStats", SHOP_DOMAIN],
    queryFn: async () => {
      if (!actor) {
        return {
          totalInstalled: BigInt(0),
          billingStatus: "inactive",
          planType: "free",
        };
      }
      return actor.getMerchantStats(SHOP_DOMAIN);
    },
    enabled: !!actor && !isFetching,
  });
}

// ── Mutations ─────────────────────────────────────────────────────────────────

export function useInstallSection() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (sectionId: string) => {
      if (!actor) throw new Error("No actor available");
      return actor.installSection(SHOP_DOMAIN, sectionId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["installedSections"] });
      queryClient.invalidateQueries({ queryKey: ["merchant"] });
      queryClient.invalidateQueries({ queryKey: ["merchantStats"] });
    },
  });
}

export function useRemoveSection() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (sectionId: string) => {
      if (!actor) throw new Error("No actor available");
      return actor.removeSection(SHOP_DOMAIN, sectionId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["installedSections"] });
      queryClient.invalidateQueries({ queryKey: ["merchant"] });
      queryClient.invalidateQueries({ queryKey: ["merchantStats"] });
    },
  });
}

export function useUpdatePlan() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      newPlan,
      billingStatus,
    }: { newPlan: string; billingStatus: string }) => {
      if (!actor) throw new Error("No actor available");
      return actor.updateMerchantPlan(SHOP_DOMAIN, newPlan, billingStatus);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["merchant"] });
      queryClient.invalidateQueries({ queryKey: ["merchantStats"] });
    },
  });
}
