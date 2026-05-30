import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { onCall, HttpsError, onRequest } from "firebase-functions/v2/https";
import { z } from "zod";

initializeApp();

const db = getFirestore();

const notificationSchema = z.object({
  userId: z.string().min(1),
  title: z.string().min(1),
  body: z.string().min(1),
  channel: z.enum(["app", "fcm", "line"]).default("app")
});

export const createNotification = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "Authentication required");
  }

  const parsed = notificationSchema.safeParse(request.data);
  if (!parsed.success) {
    throw new HttpsError("invalid-argument", "Invalid notification payload");
  }

  const ref = await db.collection("notifications").add({
    ...parsed.data,
    status: "queued",
    createdBy: request.auth.uid,
    createdAt: new Date().toISOString()
  });

  await db.collection("audit_logs").add({
    actorId: request.auth.uid,
    action: "notifications.create",
    targetId: ref.id,
    createdAt: new Date().toISOString()
  });

  return { id: ref.id };
});

export const lineWebhook = onRequest(async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).send("Method not allowed");
    return;
  }

  await db.collection("audit_logs").add({
    actorId: "line-webhook",
    action: "line.webhook.received",
    payloadPreview: JSON.stringify(req.body).slice(0, 500),
    createdAt: new Date().toISOString()
  });

  res.status(200).json({ ok: true });
});
