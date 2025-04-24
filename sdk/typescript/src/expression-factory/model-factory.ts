import { Model } from '@mparticle/audience-typescript-schema/common/model';

/**
 * Factory class for creating different types of models
 */
export class ModelFactory {
    /**
     * Creates a model with an ID
     * @param id The model ID
     * @param type The model type
     * @returns A model with ID and type
     */
    static createWithId(id: number, type: string): Model {
        return { id, type };
    }

    /**
     * Creates a model with a name
     * @param name The model name
     * @param type The model type
     * @returns A model with name and type
     */
    static createWithName(name: string, type: string): Model {
        return { name, type, id: 0 }; // Using 0 as a default ID
    }

    /**
     * Creates a model with type, ID, and optional name
     * @param type The model type
     * @param id The model ID
     * @param name Optional model name
     * @returns A model with type, ID, and optional name
     */
    static createModel(type: string, id: number, name?: string): Model {
        return { type, id, name };
    }
} 