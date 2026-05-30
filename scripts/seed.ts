import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { agents, characters, deliveries, inventory, knowledgeDocs, scenarios } from "../src/data/platform";

const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey
  })
});

const db = getFirestore();

async function setCollection<T extends { id: string }>(collection: string, rows: T[]) {
  const batch = db.batch();
  rows.forEach((row) => {
    const ref = db.collection(collection).doc(row.id);
    batch.set(ref, { ...row, updatedAt: new Date().toISOString() }, { merge: true });
  });
  await batch.commit();
  console.log(`Seeded ${rows.length} ${collection}`);
}

async function main() {
  await setCollection("settings", [
    {
      id: "platform",
      name: "Hillkoff Digital Twin Organization",
      locale: "th-TH",
      timezone: "Asia/Bangkok"
    }
  ]);
  await setCollection("character_profiles", characters);
  await setCollection("deliveries", deliveries);
  await setCollection("inventory", inventory);
  await setCollection("knowledge", knowledgeDocs);
  await setCollection("simulations", scenarios);
  await setCollection(
    "agent_memories",
    agents.map((agent) => ({
      id: agent.id,
      agentId: agent.id,
      summary: agent.mission,
      dataAccess: agent.dataAccess,
      updatedBy: "seed"
    }))
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
