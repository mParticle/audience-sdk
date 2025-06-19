/**
 * Represents a model path reference within a data model.
 * Examples:
 * 1. Simple model path:
 *    { "model": "user", "path": "email" }
 *
 * 2. Nested model path:
 *    { "model": "order", "path": "items.productId" }
 *
 * 3. Deeply nested model path:
 *    { "model": "event", "path": "attributes.purchase.amount" }
 */
export type ModelPath = {
    model: string,
    path: string
}
