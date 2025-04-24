type AllModels = "all";
export type Model = { type: string, id: number, name?: string };
export type Models = AllModels | Model[];