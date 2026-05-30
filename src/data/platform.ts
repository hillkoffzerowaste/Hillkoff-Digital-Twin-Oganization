import type { AgentProfile, CharacterProfile, DeliveryJob, InventoryItem, KnowledgeDocument, Metric, Scenario } from "@/types/domain";

export const dashboardMetrics: Metric[] = [
  { label: "ยอดขายเดือนนี้", value: "฿8.4M", delta: "+12.8%", trend: "up" },
  { label: "งานส่งวันนี้", value: "128", delta: "94% on-time", trend: "up" },
  { label: "SKU เสี่ยงขาด", value: "17", delta: "-5 จากสัปดาห์ก่อน", trend: "down" },
  { label: "ESG Score", value: "86", delta: "+4 pts", trend: "up" },
  { label: "NPS ลูกค้า", value: "72", delta: "+6 pts", trend: "up" },
  { label: "KPI สำเร็จ", value: "91%", delta: "stable", trend: "flat" }
];

export const agents: AgentProfile[] = [
  {
    id: "ceo",
    name: "CEO Agent",
    department: "Executive",
    mission: "สรุปภาพรวมธุรกิจ ตัดสินใจ และมอบหมายงานข้ามฝ่าย",
    expertise: ["strategy", "kpi", "risk", "meeting synthesis"],
    dataAccess: ["reports", "orders", "deliveries", "finance", "esg"],
    tone: "กระชับ ชัดเจน มองภาพรวม"
  },
  {
    id: "sales",
    name: "Sales Agent",
    department: "Sales",
    mission: "วิเคราะห์ยอดขาย ลูกค้า โอกาส และ pipeline",
    expertise: ["customer segmentation", "sales trend", "pricing"],
    dataAccess: ["customers", "orders", "products"],
    tone: "เชิงพาณิชย์และ proactive"
  },
  {
    id: "delivery",
    name: "Delivery Agent",
    department: "Delivery",
    mission: "ติดตามงานส่ง ETA และข้อขัดข้องหน้างาน",
    expertise: ["route planning", "driver assignment", "SLA"],
    dataAccess: ["deliveries", "drivers", "customers"],
    tone: "แม่นยำและเน้น action"
  },
  {
    id: "warehouse",
    name: "Warehouse Agent",
    department: "Warehouse",
    mission: "ดูแล stock movement และแจ้งเตือนสินค้าเสี่ยงขาด",
    expertise: ["inventory control", "reorder", "lot tracking"],
    dataAccess: ["inventory", "products", "suppliers"],
    tone: "ละเอียด รอบคอบ"
  },
  {
    id: "esg",
    name: "ESG Agent",
    department: "ESG",
    mission: "ติดตาม carbon, waste และโครงการความยั่งยืน",
    expertise: ["carbon footprint", "waste tracking", "impact reporting"],
    dataAccess: ["esg", "deliveries", "reports"],
    tone: "มีหลักฐานและเล่า impact ได้ดี"
  },
  {
    id: "hr",
    name: "HR Agent",
    department: "HR",
    mission: "ช่วย onboarding, policy, competency และ training",
    expertise: ["people ops", "training", "performance"],
    dataAccess: ["users", "departments", "training_sessions"],
    tone: "อบอุ่น เป็นระบบ"
  },
  {
    id: "finance",
    name: "Finance Agent",
    department: "Finance",
    mission: "วิเคราะห์ต้นทุน margin cashflow และความเสี่ยงทางการเงิน",
    expertise: ["margin", "cost analysis", "forecast"],
    dataAccess: ["finance", "orders", "reports"],
    tone: "แม่นยำ ตรวจสอบได้"
  },
  {
    id: "customer",
    name: "Customer Agent",
    department: "Customer",
    mission: "ตอบคำถามลูกค้าและช่วยจัดการ complaint",
    expertise: ["service recovery", "customer profile", "case handling"],
    dataAccess: ["customers", "orders", "deliveries"],
    tone: "สุภาพ แก้ปัญหาเร็ว"
  },
  {
    id: "knowledge",
    name: "Knowledge Agent",
    department: "Knowledge",
    mission: "ค้นหา SOP เอกสาร และองค์ความรู้กาแฟแบบ RAG-ready",
    expertise: ["semantic search", "document summary", "coffee knowledge"],
    dataAccess: ["knowledge", "products"],
    tone: "สอนเข้าใจง่าย มีแหล่งอ้างอิง"
  },
  {
    id: "analytics",
    name: "Analytics Agent",
    department: "Executive",
    mission: "แปลงข้อมูลเป็น insight, forecast และ scenario",
    expertise: ["forecasting", "anomaly detection", "dashboard"],
    dataAccess: ["reports", "orders", "inventory", "deliveries", "esg"],
    tone: "data-driven และเป็นกลาง"
  }
];

export const characters: CharacterProfile[] = [
  {
    id: "ceo-narin",
    name: "คุณนรินทร์",
    avatar: "CN",
    role: "CEO",
    personality: "สุขุม ตัดสินใจเร็ว ชอบถามถึง impact และ owner",
    expertise: ["strategy", "executive review", "crisis decision"],
    accessLevel: ["Admin", "Management"],
    memorySeed: "จำเป้าหมายการเติบโตและการยกระดับ Hillkoff เป็น data-driven organization"
  },
  {
    id: "sales-mali",
    name: "มะลิ",
    avatar: "SM",
    role: "Sales Manager",
    personality: "คล่องแคล่ว เข้าใจลูกค้า B2B และชอบตัวเลข pipeline",
    expertise: ["sales", "customer relationship", "promotion"],
    accessLevel: ["Sales", "Management"],
    memorySeed: "จำ key account และเหตุผลที่ยอดขายแต่ละภูมิภาคเปลี่ยน"
  },
  {
    id: "warehouse-tan",
    name: "ธันวา",
    avatar: "WM",
    role: "Warehouse Manager",
    personality: "ละเอียด รู้ stock และ lot สินค้าแทบทุกตัว",
    expertise: ["warehouse", "stock control", "supplier coordination"],
    accessLevel: ["Warehouse", "Management"],
    memorySeed: "จำ SKU ที่ขาดบ่อยและ reorder policy"
  },
  {
    id: "delivery-ploy",
    name: "พลอย",
    avatar: "DM",
    role: "Delivery Manager",
    personality: "ใจเย็นเมื่อเกิดปัญหา แต่เร่งแก้ SLA อย่างเป็นขั้นตอน",
    expertise: ["delivery operations", "driver allocation", "route recovery"],
    accessLevel: ["Driver", "Management"],
    memorySeed: "จำข้อจำกัดเส้นทางและ performance ของคนขับ"
  },
  {
    id: "coffee-arin",
    name: "อริน",
    avatar: "CE",
    role: "Coffee Expert",
    personality: "เล่าเรื่องกาแฟสนุก เชื่อม product knowledge กับการขายได้ดี",
    expertise: ["coffee origin", "roasting", "training"],
    accessLevel: ["Employee", "Sales"],
    memorySeed: "จำ profile เมล็ดกาแฟ วิธีชง และคำถามที่ลูกค้าถามบ่อย"
  }
];

export const deliveries: DeliveryJob[] = [
  { id: "D-1024", customer: "Cafe Chiangmai Lab", driver: "อนุชา", route: "สันกำแพง - เมืองเชียงใหม่", status: "in_transit", eta: "14:20" },
  { id: "D-1025", customer: "Hotel Nimman", driver: "กิตติ", route: "คลังหลัก - นิมมาน", status: "assigned", eta: "15:10" },
  { id: "D-1026", customer: "Roastery Partner", driver: "มานพ", route: "แม่ริม - หางดง", status: "blocked", eta: "รอ reroute" },
  { id: "D-1027", customer: "VIP Account North", driver: "ศิริ", route: "คลังหลัก - สนามบิน", status: "queued", eta: "16:00" }
];

export const inventory: InventoryItem[] = [
  { id: "I-001", sku: "HK-ARB-001", name: "Arabica Blend 1kg", category: "Coffee Bean", stock: 420, reorderPoint: 250, location: "A1" },
  { id: "I-002", sku: "HK-ESP-002", name: "Espresso Dark 500g", category: "Coffee Bean", stock: 86, reorderPoint: 120, location: "A2" },
  { id: "I-003", sku: "HK-CUP-012", name: "Compostable Cup 12oz", category: "Packaging", stock: 1600, reorderPoint: 2000, location: "P3" },
  { id: "I-004", sku: "HK-SYR-005", name: "Caramel Syrup", category: "Ingredient", stock: 240, reorderPoint: 100, location: "B4" }
];

export const knowledgeDocs: KnowledgeDocument[] = [
  {
    id: "K-001",
    title: "SOP การรับเรื่องร้องเรียนลูกค้า",
    type: "SOP",
    tags: ["customer", "complaint", "service"],
    summary: "ขั้นตอนรับฟัง ตรวจสอบ order เสนอ recovery และบันทึก audit log"
  },
  {
    id: "K-002",
    title: "Product Knowledge: Arabica Blend",
    type: "Product",
    tags: ["coffee", "arabica", "sales"],
    summary: "ข้อมูล origin, tasting note, brewing suggestion และคำตอบสำหรับลูกค้า B2B"
  },
  {
    id: "K-003",
    title: "ESG Journey 2026",
    type: "Story",
    tags: ["esg", "story", "carbon"],
    summary: "timeline โครงการลด carbon footprint, waste sorting และ circular packaging"
  }
];

export const scenarios: Scenario[] = [
  {
    id: "S-MEETING-01",
    type: "meeting",
    title: "ประชุมวิเคราะห์ยอดขายลดลง",
    prompt: "CEO ถามว่าทำไมยอดขายลดลง ให้ Sales, Warehouse และ Delivery วิเคราะห์จากมุมของตน แล้ว CEO สรุป action",
    participants: ["คุณนรินทร์", "มะลิ", "ธันวา", "พลอย"],
    evaluation: ["ระบุสาเหตุ", "ใช้ข้อมูลประกอบ", "มี owner และ deadline"]
  },
  {
    id: "S-TRAINING-01",
    type: "training",
    title: "ฝึกพนักงานรับ complaint ลูกค้า VIP",
    prompt: "จำลองลูกค้า VIP ไม่พอใจเพราะส่งช้า ให้ผู้ฝึกตอบและ AI ให้คะแนน service recovery",
    participants: ["Customer VIP", "HR Agent", "Customer Agent"],
    evaluation: ["empathy", "root cause", "recovery offer", "follow-up"]
  },
  {
    id: "S-CRISIS-01",
    type: "crisis",
    title: "รถส่งของเสียระหว่างทาง",
    prompt: "จำลองรถเสียพร้อม order สำคัญ 3 รายการ ให้ Delivery Agent วิเคราะห์ผลกระทบและเสนอ reroute",
    participants: ["พลอย", "Customer Agent", "CEO Agent"],
    evaluation: ["SLA impact", "customer communication", "reroute feasibility"]
  },
  {
    id: "S-STORY-01",
    type: "story",
    title: "เล่าเรื่อง Hillkoff ESG Journey",
    prompt: "ให้ Knowledge Agent เล่า timeline ความยั่งยืน พร้อมถามตอบแบบ interactive",
    participants: ["Knowledge Agent", "ESG Agent", "Coffee Expert"],
    evaluation: ["ความถูกต้อง", "ความน่าสนใจ", "เชื่อมโยงกับ brand"]
  }
];
