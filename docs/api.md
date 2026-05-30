# API Documentation

## Server Actions

### `runAgentCommand`

Location: `src/app/actions/ai.ts`

Input:

```ts
{
  agentId: string;
  message: string;
}
```

Behavior:

- Validates input with Zod.
- Selects the requested AI Agent profile.
- Adds operational context from delivery, inventory, knowledge, and characters.
- Uses OpenAI when `OPENAI_API_KEY` is configured.
- Falls back to a deterministic demo response when the key is absent.

## Firebase Functions

### `createNotification`

Callable function for creating app, FCM, or LINE notification records.

Input:

```ts
{
  userId: string;
  title: string;
  body: string;
  channel?: "app" | "fcm" | "line";
}
```

Output:

```ts
{ id: string }
```

Security:

- Requires Firebase Authentication.
- Writes an `audit_logs` event.

### `lineWebhook`

HTTP endpoint for LINE OA webhook ingestion.

Current behavior:

- Accepts `POST`.
- Stores a preview in `audit_logs`.
- Returns `{ ok: true }`.

Production extension:

- Verify LINE signature.
- Resolve LINE user ID to customer or employee.
- Route messages to `Customer Agent` or `Knowledge Agent`.
