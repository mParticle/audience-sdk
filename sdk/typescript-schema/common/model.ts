type AllModels = "all";
type ModelId = number;
type ModelName = string;
type ModelWithType = 
    { type: string }
    & ({ id: ModelId } | { name: ModelName });


export type Model = ModelId | ModelName | ModelWithType;
export type Models = AllModels | Model[];