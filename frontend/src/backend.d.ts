import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Bale {
    id: bigint;
    description: string;
    isAngry: boolean;
}
export interface backendInterface {
    addBale(description: string): Promise<bigint>;
    angryBaleCount(): Promise<bigint>;
    getAllBales(): Promise<Array<Bale>>;
    getBale(id: bigint): Promise<Bale | null>;
    toggleAngry(id: bigint): Promise<void>;
}
