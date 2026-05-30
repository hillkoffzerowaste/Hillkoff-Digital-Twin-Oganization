# Firestore Schema

Hillkoff Digital Twin Organization uses feature-based collections so operational data, AI memory, simulations, and audit records can evolve independently.

## Core Collections

| Collection | Purpose | Key Fields |
| --- | --- | --- |
| `users` | User profiles and RBAC | `displayName`, `email`, `role`, `departmentId`, `status` |
| `departments` | Organization units | `name`, `ownerId`, `kpiIds` |
| `products` | Sellable products | `sku`, `name`, `category`, `price`, `active` |
| `inventory` | Stock state | `sku`, `stock`, `reorderPoint`, `location`, `updatedAt` |
| `orders` | Sales orders | `customerId`, `items`, `status`, `total`, `createdAt` |
| `deliveries` | Delivery jobs | `orderId`, `driver`, `route`, `status`, `eta` |
| `drivers` | Driver profiles | `name`, `phone`, `vehicle`, `availability` |
| `customers` | Customer records | `name`, `segment`, `contact`, `riskLevel` |
| `suppliers` | Vendor profiles | `name`, `products`, `sla`, `contact` |
| `esg` | Sustainability metrics | `type`, `value`, `unit`, `period`, `evidenceUrl` |
| `knowledge` | RAG-ready documents | `title`, `type`, `tags`, `summary`, `storagePath`, `embeddingRef` |
| `notifications` | App, FCM, and LINE events | `userId`, `title`, `body`, `channel`, `status` |
| `audit_logs` | Immutable event log | `actorId`, `action`, `targetId`, `metadata`, `createdAt` |

## AI Collections

| Collection | Purpose | Key Fields |
| --- | --- | --- |
| `ai_conversations` | User-agent chat history | `userId`, `agentId`, `messages`, `updatedAt` |
| `agent_memories` | Long-term agent memory | `agentId`, `summary`, `facts`, `dataAccess`, `updatedAt` |
| `character_profiles` | Simulator characters | `name`, `avatar`, `personality`, `expertise`, `accessLevel`, `memorySeed` |
| `simulations` | Scenario templates and runs | `type`, `title`, `prompt`, `participants`, `evaluation` |
| `meetings` | Multi-agent meeting records | `topic`, `participants`, `transcript`, `decisions`, `ownerActions` |
| `training_sessions` | Training attempts and scores | `userId`, `scenarioId`, `score`, `feedback`, `rubric` |
| `reports` | Generated reports | `type`, `period`, `summary`, `generatedBy`, `createdAt` |
| `settings` | Platform configuration | `locale`, `timezone`, `featureFlags`, `integrations` |

## Access Model

Use custom claims or mirrored user profile roles:

`Admin`, `Management`, `Sales`, `Warehouse`, `Driver`, `Employee`, `Guest`.

All sensitive writes should also create an `audit_logs` record from the server layer.
