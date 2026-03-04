import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Merchant {
    installedSectionIds: Array<string>;
    billingStatus: string;
    shopDomain: string;
    installDate: bigint;
    planType: string;
}
export interface Section {
    id: string;
    name: string;
    tags: Array<string>;
    description: string;
    category: string;
    isPro: boolean;
}
export interface backendInterface {
    getAllSections(): Promise<Array<Section>>;
    getInstalledSections(shopDomain: string): Promise<Array<Section>>;
    getMerchant(shopDomain: string): Promise<Merchant>;
    getMerchantStats(shopDomain: string): Promise<{
        totalInstalled: bigint;
        billingStatus: string;
        planType: string;
    }>;
    getSection(id: string): Promise<Section>;
    installSection(shopDomain: string, sectionId: string): Promise<Merchant>;
    removeSection(shopDomain: string, sectionId: string): Promise<Merchant>;
    updateMerchantPlan(shopDomain: string, newPlan: string, billingStatus: string): Promise<Merchant>;
}
