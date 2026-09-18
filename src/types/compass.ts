export type StageState = "locked" | "current" | "completed";
export type SceneKind = "exercise" | "visualization" | "reflection";
export interface Stage { id: number; slug: string; title: string; subtitle: string; state: StageState; }
export interface Scene { id: string; stageId: number; kind: SceneKind; title: string; prompt: string; }
export interface ProgressRecord { id: string; stageId: number; sceneId?: string; completed: boolean; updatedAt: string; }
