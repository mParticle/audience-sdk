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
        return { name, type };
    }
} 