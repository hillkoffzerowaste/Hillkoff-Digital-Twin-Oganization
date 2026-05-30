export type Role = "Admin" | "Management" | "Sales" | "Warehouse" | "Driver" | "Employee" | "Guest";

export type Department =
  | "Executive"
  | "Sales"
  | "Delivery"
  | "Warehouse"
  | "ESG"
  | "HR"
  | "Finance"
  | "Customer"
  | "Knowledge";

export type AgentId =
  | "ceo"
  | "sales"
  | "delivery"
  | "warehouse"
  | "esg"
  | "hr"
  | "finance"
  | "customer"
  | "knowledge"
  | "analytics";

export type SimulationType = "meeting" | "training" | "customer" | "crisis" | "executive" | "story";

export interface AgentProfile {
  id: AgentId;
  name: string;
  department: Department;
  mission: string;
  expertise: string[];
  dataAccess: string[];
  tone: string;
}

export interface CharacterProfile {
  id: string;
  name: string;
  avatar: string;
  role: string;
  personality: string;
  expertise: string[];
  accessLevel: Role[];
  memorySeed: string;
}

export interface Metric {
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down" | "flat";
}

export interface DeliveryJob {
  id: string;
  customer: string;
  driver: string;
  route: string;
  status: "queued" | "assigned" | "in_transit" | "delivered" | "blocked";
  eta: string;
}

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  stock: number;
  reorderPoint: number;
  location: string;
}

export interface KnowledgeDocument {
  id: string;
  title: string;
  type: "SOP" | "Manual" | "Product" | "Policy" | "Story";
  tags: string[];
  summary: string;
}

export interface Scenario {
  id: string;
  type: SimulationType;
  title: string;
  prompt: string;
  participants: string[];
  evaluation: string[];
}
