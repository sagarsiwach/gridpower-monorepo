// Mock fleet data — 28 vehicles across 4 depots
// Used by Fleet view (CON.5)

export type VehicleStatus =
  | "charging"
  | "idle"
  | "in-route"
  | "low-battery"
  | "maintenance"
  | "full";

export interface Vehicle {
  id: string;
  registration: string;
  model: string;
  type: "2W scooter" | "3W auto" | "4W sedan" | "4W SUV";
  depot: string;
  soc: number; // 0-100
  status: VehicleStatus;
  lastSeen: string;
  chargeStation: string | null;
  costPerKm: string;
}

export interface Depot {
  id: string;
  name: string;
  city: string;
  total: number;
  chargingNow: number;
  idle: number;
  lowBattery: number;
  avgSoc: number;
}

export const VEHICLES: Vehicle[] = [
  // Delhi Depot — 8 vehicles
  {
    id: "EV-001",
    registration: "DL-01-AB-1234",
    model: "Kabira KM3000",
    type: "4W sedan",
    depot: "Delhi Depot",
    soc: 87,
    status: "charging",
    lastSeen: "Now",
    chargeStation: "GridPower-Del-03",
    costPerKm: "₹1.82",
  },
  {
    id: "EV-002",
    registration: "HR-26-CD-5678",
    model: "Hero Optima CX",
    type: "2W scooter",
    depot: "Delhi Depot",
    soc: 45,
    status: "idle",
    lastSeen: "12 min ago",
    chargeStation: null,
    costPerKm: "₹0.64",
  },
  {
    id: "EV-003",
    registration: "DL-03-EF-9012",
    model: "Mahindra Treo",
    type: "3W auto",
    depot: "Delhi Depot",
    soc: 12,
    status: "low-battery",
    lastSeen: "3 min ago",
    chargeStation: null,
    costPerKm: "₹0.91",
  },
  {
    id: "EV-004",
    registration: "UP-16-GH-3456",
    model: "Tata Nexon EV",
    type: "4W SUV",
    depot: "Delhi Depot",
    soc: 100,
    status: "full",
    lastSeen: "Now",
    chargeStation: "GridPower-Del-01",
    costPerKm: "₹2.14",
  },
  {
    id: "EV-005",
    registration: "DL-07-IJ-7890",
    model: "Ola S1 Pro",
    type: "2W scooter",
    depot: "Delhi Depot",
    soc: 63,
    status: "charging",
    lastSeen: "Now",
    chargeStation: "GridPower-Del-02",
    costPerKm: "₹0.68",
  },
  {
    id: "EV-006",
    registration: "DL-08-KL-2345",
    model: "Mahindra Treo",
    type: "3W auto",
    depot: "Delhi Depot",
    soc: 54,
    status: "in-route",
    lastSeen: "En route",
    chargeStation: null,
    costPerKm: "₹0.89",
  },
  {
    id: "EV-007",
    registration: "HR-29-MN-6789",
    model: "Tata Tigor EV",
    type: "4W sedan",
    depot: "Delhi Depot",
    soc: 77,
    status: "idle",
    lastSeen: "45 min ago",
    chargeStation: null,
    costPerKm: "₹1.76",
  },
  {
    id: "EV-008",
    registration: "DL-04-OP-0123",
    model: "MG Comet EV",
    type: "4W sedan",
    depot: "Delhi Depot",
    soc: 8,
    status: "maintenance",
    lastSeen: "2 hrs ago",
    chargeStation: null,
    costPerKm: "₹1.61",
  },

  // Bangalore Depot — 7 vehicles
  {
    id: "EV-009",
    registration: "KA-01-QR-2345",
    model: "Tata Nexon EV",
    type: "4W SUV",
    depot: "Bangalore Depot",
    soc: 74,
    status: "idle",
    lastSeen: "1 hr ago",
    chargeStation: null,
    costPerKm: "₹2.18",
  },
  {
    id: "EV-010",
    registration: "KA-03-ST-6789",
    model: "Hero Optima CX",
    type: "2W scooter",
    depot: "Bangalore Depot",
    soc: 31,
    status: "charging",
    lastSeen: "Now",
    chargeStation: "GridPower-Blr-01",
    costPerKm: "₹0.61",
  },
  {
    id: "EV-011",
    registration: "KA-05-UV-0123",
    model: "Mahindra Treo",
    type: "3W auto",
    depot: "Bangalore Depot",
    soc: 55,
    status: "in-route",
    lastSeen: "En route",
    chargeStation: null,
    costPerKm: "₹0.88",
  },
  {
    id: "EV-012",
    registration: "KA-09-WX-4567",
    model: "Ola S1 Pro",
    type: "2W scooter",
    depot: "Bangalore Depot",
    soc: 92,
    status: "full",
    lastSeen: "Now",
    chargeStation: "GridPower-Blr-02",
    costPerKm: "₹0.66",
  },
  {
    id: "EV-013",
    registration: "TN-09-YZ-8901",
    model: "Tata Tigor EV",
    type: "4W sedan",
    depot: "Bangalore Depot",
    soc: 48,
    status: "idle",
    lastSeen: "30 min ago",
    chargeStation: null,
    costPerKm: "₹1.71",
  },
  {
    id: "EV-014",
    registration: "KA-02-AB-2345",
    model: "Kabira KM3000",
    type: "4W sedan",
    depot: "Bangalore Depot",
    soc: 16,
    status: "low-battery",
    lastSeen: "8 min ago",
    chargeStation: null,
    costPerKm: "₹1.79",
  },
  {
    id: "EV-015",
    registration: "KA-07-CD-6789",
    model: "MG Comet EV",
    type: "4W sedan",
    depot: "Bangalore Depot",
    soc: 68,
    status: "charging",
    lastSeen: "Now",
    chargeStation: "GridPower-Blr-03",
    costPerKm: "₹1.58",
  },

  // Mumbai Depot — 7 vehicles
  {
    id: "EV-016",
    registration: "MH-01-EF-0123",
    model: "Tata Nexon EV",
    type: "4W SUV",
    depot: "Mumbai Depot",
    soc: 92,
    status: "full",
    lastSeen: "Now",
    chargeStation: "GridPower-Mum-01",
    costPerKm: "₹2.22",
  },
  {
    id: "EV-017",
    registration: "MH-02-GH-4567",
    model: "Hero Optima CX",
    type: "2W scooter",
    depot: "Mumbai Depot",
    soc: 18,
    status: "low-battery",
    lastSeen: "5 min ago",
    chargeStation: null,
    costPerKm: "₹0.70",
  },
  {
    id: "EV-018",
    registration: "MH-04-IJ-8901",
    model: "Tata Tigor EV",
    type: "4W sedan",
    depot: "Mumbai Depot",
    soc: 68,
    status: "idle",
    lastSeen: "20 min ago",
    chargeStation: null,
    costPerKm: "₹1.88",
  },
  {
    id: "EV-019",
    registration: "MH-12-KL-2345",
    model: "Ola S1 Pro",
    type: "2W scooter",
    depot: "Mumbai Depot",
    soc: 43,
    status: "charging",
    lastSeen: "Now",
    chargeStation: "GridPower-Mum-02",
    costPerKm: "₹0.72",
  },
  {
    id: "EV-020",
    registration: "MH-09-MN-6789",
    model: "Mahindra Treo",
    type: "3W auto",
    depot: "Mumbai Depot",
    soc: 71,
    status: "in-route",
    lastSeen: "En route",
    chargeStation: null,
    costPerKm: "₹0.85",
  },
  {
    id: "EV-021",
    registration: "MH-03-OP-0123",
    model: "Kabira KM3000",
    type: "4W sedan",
    depot: "Mumbai Depot",
    soc: 56,
    status: "idle",
    lastSeen: "1.5 hrs ago",
    chargeStation: null,
    costPerKm: "₹1.94",
  },
  {
    id: "EV-022",
    registration: "MH-06-QR-4567",
    model: "MG Comet EV",
    type: "4W sedan",
    depot: "Mumbai Depot",
    soc: 29,
    status: "maintenance",
    lastSeen: "Yesterday",
    chargeStation: null,
    costPerKm: "₹1.56",
  },

  // Goa Depot — 6 vehicles
  {
    id: "EV-023",
    registration: "GA-01-ST-6789",
    model: "Mahindra Treo",
    type: "3W auto",
    depot: "Goa Depot",
    soc: 79,
    status: "charging",
    lastSeen: "Now",
    chargeStation: "GridPower-Goa-01",
    costPerKm: "₹0.84",
  },
  {
    id: "EV-024",
    registration: "GA-03-UV-0123",
    model: "Ola S1 Pro",
    type: "2W scooter",
    depot: "Goa Depot",
    soc: 61,
    status: "idle",
    lastSeen: "25 min ago",
    chargeStation: null,
    costPerKm: "₹0.63",
  },
  {
    id: "EV-025",
    registration: "GA-01-WX-4567",
    model: "Tata Nexon EV",
    type: "4W SUV",
    depot: "Goa Depot",
    soc: 85,
    status: "full",
    lastSeen: "Now",
    chargeStation: "GridPower-Goa-02",
    costPerKm: "₹2.09",
  },
  {
    id: "EV-026",
    registration: "GA-04-YZ-8901",
    model: "Hero Optima CX",
    type: "2W scooter",
    depot: "Goa Depot",
    soc: 24,
    status: "low-battery",
    lastSeen: "15 min ago",
    chargeStation: null,
    costPerKm: "₹0.62",
  },
  {
    id: "EV-027",
    registration: "GA-02-AB-2345",
    model: "Tata Tigor EV",
    type: "4W sedan",
    depot: "Goa Depot",
    soc: 52,
    status: "in-route",
    lastSeen: "En route",
    chargeStation: null,
    costPerKm: "₹1.74",
  },
  {
    id: "EV-028",
    registration: "GA-01-CD-6789",
    model: "Kabira KM3000",
    type: "4W sedan",
    depot: "Goa Depot",
    soc: 38,
    status: "idle",
    lastSeen: "2 hrs ago",
    chargeStation: null,
    costPerKm: "₹1.81",
  },
];

export const DEPOTS: Depot[] = [
  {
    id: "delhi",
    name: "Delhi Depot",
    city: "New Delhi",
    total: 8,
    chargingNow: 2,
    idle: 2,
    lowBattery: 1,
    avgSoc: Math.round(
      VEHICLES.filter((v) => v.depot === "Delhi Depot").reduce(
        (a, v) => a + v.soc,
        0
      ) / VEHICLES.filter((v) => v.depot === "Delhi Depot").length
    ),
  },
  {
    id: "bangalore",
    name: "Bangalore Depot",
    city: "Bengaluru",
    total: 7,
    chargingNow: 3,
    idle: 2,
    lowBattery: 1,
    avgSoc: Math.round(
      VEHICLES.filter((v) => v.depot === "Bangalore Depot").reduce(
        (a, v) => a + v.soc,
        0
      ) / VEHICLES.filter((v) => v.depot === "Bangalore Depot").length
    ),
  },
  {
    id: "mumbai",
    name: "Mumbai Depot",
    city: "Mumbai",
    total: 7,
    chargingNow: 1,
    idle: 2,
    lowBattery: 1,
    avgSoc: Math.round(
      VEHICLES.filter((v) => v.depot === "Mumbai Depot").reduce(
        (a, v) => a + v.soc,
        0
      ) / VEHICLES.filter((v) => v.depot === "Mumbai Depot").length
    ),
  },
  {
    id: "goa",
    name: "Goa Depot",
    city: "Panaji",
    total: 6,
    chargingNow: 1,
    idle: 2,
    lowBattery: 1,
    avgSoc: Math.round(
      VEHICLES.filter((v) => v.depot === "Goa Depot").reduce(
        (a, v) => a + v.soc,
        0
      ) / VEHICLES.filter((v) => v.depot === "Goa Depot").length
    ),
  },
];

// Charge queue — vehicles waiting for open port, ordered by priority (lowest SoC first)
export const CHARGE_QUEUE: Vehicle[] = VEHICLES.filter(
  (v) =>
    (v.status === "low-battery" || (v.soc < 30 && v.status === "idle")) &&
    v.chargeStation === null
).sort((a, b) => a.soc - b.soc);
