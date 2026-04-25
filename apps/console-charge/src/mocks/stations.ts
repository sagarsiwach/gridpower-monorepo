/**
 * Station mock data — used by CON.3 (Stations) and CON.4 (Analytics).
 * 15 realistic stations across 7 Indian cities with GPWR-{City}-{NN} naming.
 */

export type StationStatus = "online" | "offline" | "maintenance" | "charging";
export type PortStatus = "available" | "charging" | "offline" | "error";

export interface Port {
  id: string;
  /** Port number (1-based) */
  number: number;
  type: "AC 22kW" | "DC 60kW" | "DC 120kW";
  status: PortStatus;
  /** User initial if charging */
  userInitial?: string;
  /** Session duration in minutes (if charging) */
  sessionMinutes?: number;
  /** Energy delivered this session in kWh */
  energyKwh?: number;
}

export interface ActiveSession {
  id: string;
  portNumber: number;
  portType: string;
  userInitial: string;
  userName: string;
  startTime: string;
  durationMinutes: number;
  energyKwh: number;
  revenue: string;
}

export interface Station {
  id: string;
  name: string;
  city: string;
  status: StationStatus;
  ports: number;
  /** DC port count */
  dc: number;
  /** AC port count */
  ac: number;
  /** Utilisation percentage 0–100 */
  util: number;
  /** Revenue today (formatted) */
  today: string;
  /** Last session time HH:MM */
  lastSession: string;
  /** Uptime string */
  uptime: string;
  lat: number;
  lng: number;
  address: string;
  portList: Port[];
  activeSessions: ActiveSession[];
}

// ─── Port factory helpers ────────────────────────────────────────────────────

function makePort(
  stationId: string,
  number: number,
  type: Port["type"],
  status: PortStatus,
  userInitial?: string,
): Port {
  const base: Port = { id: `${stationId}-P${number}`, number, type, status };
  if (status === "charging" && userInitial) {
    base.userInitial = userInitial;
    base.sessionMinutes = Math.floor(Math.random() * 40 + 10);
    base.energyKwh = parseFloat((Math.random() * 18 + 2).toFixed(1));
  }
  return base;
}

function makeSession(
  stationId: string,
  portNumber: number,
  portType: string,
  userName: string,
  durationMinutes: number,
  energyKwh: number,
): ActiveSession {
  const initial = userName.charAt(0).toUpperCase();
  const revenue = `₹${(energyKwh * 14).toFixed(0)}`;
  const now = new Date();
  const start = new Date(now.getTime() - durationMinutes * 60 * 1000);
  const hh = start.getHours().toString().padStart(2, "0");
  const mm = start.getMinutes().toString().padStart(2, "0");
  return {
    id: `${stationId}-S${portNumber}`,
    portNumber,
    portType,
    userInitial: initial,
    userName,
    startTime: `${hh}:${mm}`,
    durationMinutes,
    energyKwh,
    revenue,
  };
}

// ─── Station definitions ─────────────────────────────────────────────────────

export const ALL_STATIONS: Station[] = [
  {
    id: "GPWR-Goa-01",
    name: "Panjim Hub",
    city: "Goa",
    status: "online",
    ports: 8,
    ac: 6,
    dc: 2,
    util: 82,
    today: "₹7,420",
    lastSession: "14:28",
    uptime: "99.8%",
    lat: 15.4909,
    lng: 73.8278,
    address: "18 June Rd, Panaji, Goa 403001",
    portList: [
      makePort("GPWR-Goa-01", 1, "DC 60kW", "charging", "R"),
      makePort("GPWR-Goa-01", 2, "DC 60kW", "available"),
      makePort("GPWR-Goa-01", 3, "AC 22kW", "charging", "A"),
      makePort("GPWR-Goa-01", 4, "AC 22kW", "available"),
      makePort("GPWR-Goa-01", 5, "AC 22kW", "available"),
      makePort("GPWR-Goa-01", 6, "AC 22kW", "offline"),
    ],
    activeSessions: [
      makeSession("GPWR-Goa-01", 1, "DC 60kW", "Rahul Sharma", 28, 22.4),
      makeSession("GPWR-Goa-01", 3, "AC 22kW", "Anita Desai", 42, 8.1),
    ],
  },
  {
    id: "GPWR-Goa-02",
    name: "Calangute Station",
    city: "Goa",
    status: "charging",
    ports: 6,
    ac: 4,
    dc: 2,
    util: 100,
    today: "₹6,120",
    lastSession: "14:31",
    uptime: "100%",
    lat: 15.5438,
    lng: 73.7547,
    address: "Calangute-Baga Rd, North Goa 403516",
    portList: [
      makePort("GPWR-Goa-02", 1, "DC 60kW", "charging", "P"),
      makePort("GPWR-Goa-02", 2, "DC 60kW", "charging", "M"),
      makePort("GPWR-Goa-02", 3, "AC 22kW", "charging", "S"),
      makePort("GPWR-Goa-02", 4, "AC 22kW", "charging", "K"),
      makePort("GPWR-Goa-02", 5, "AC 22kW", "available"),
      makePort("GPWR-Goa-02", 6, "AC 22kW", "available"),
    ],
    activeSessions: [
      makeSession("GPWR-Goa-02", 1, "DC 60kW", "Priya Nair", 18, 14.8),
      makeSession("GPWR-Goa-02", 2, "DC 60kW", "Manish Kumar", 35, 28.2),
      makeSession("GPWR-Goa-02", 3, "AC 22kW", "Sunita Patil", 51, 9.9),
      makeSession("GPWR-Goa-02", 4, "AC 22kW", "Kiran Mehta", 12, 3.7),
    ],
  },
  {
    id: "GPWR-Goa-03",
    name: "Margao Depot",
    city: "Goa",
    status: "offline",
    ports: 4,
    ac: 4,
    dc: 0,
    util: 0,
    today: "₹0",
    lastSession: "02:14",
    uptime: "0%",
    lat: 15.2832,
    lng: 74.0133,
    address: "Station Rd, Margao, South Goa 403601",
    portList: [
      makePort("GPWR-Goa-03", 1, "AC 22kW", "offline"),
      makePort("GPWR-Goa-03", 2, "AC 22kW", "offline"),
      makePort("GPWR-Goa-03", 3, "AC 22kW", "offline"),
      makePort("GPWR-Goa-03", 4, "AC 22kW", "offline"),
    ],
    activeSessions: [],
  },
  {
    id: "GPWR-Blr-01",
    name: "Koramangala Hub",
    city: "Bangalore",
    status: "online",
    ports: 12,
    ac: 8,
    dc: 4,
    util: 91,
    today: "₹8,420",
    lastSession: "14:29",
    uptime: "98.2%",
    lat: 12.9352,
    lng: 77.6245,
    address: "1st Block, Koramangala, Bengaluru 560034",
    portList: [
      makePort("GPWR-Blr-01", 1, "DC 120kW", "charging", "V"),
      makePort("GPWR-Blr-01", 2, "DC 60kW", "charging", "D"),
      makePort("GPWR-Blr-01", 3, "DC 60kW", "available"),
      makePort("GPWR-Blr-01", 4, "DC 60kW", "available"),
      makePort("GPWR-Blr-01", 5, "AC 22kW", "charging", "N"),
      makePort("GPWR-Blr-01", 6, "AC 22kW", "offline"),
    ],
    activeSessions: [
      makeSession("GPWR-Blr-01", 1, "DC 120kW", "Vikram Rao", 22, 44.1),
      makeSession("GPWR-Blr-01", 2, "DC 60kW", "Deepa Iyer", 38, 30.5),
      makeSession("GPWR-Blr-01", 5, "AC 22kW", "Naresh Babu", 47, 9.2),
    ],
  },
  {
    id: "GPWR-Blr-02",
    name: "Whitefield Station",
    city: "Bangalore",
    status: "charging",
    ports: 10,
    ac: 6,
    dc: 4,
    util: 76,
    today: "₹7,180",
    lastSession: "14:32",
    uptime: "97.5%",
    lat: 12.9699,
    lng: 77.7499,
    address: "ITPL Main Rd, Whitefield, Bengaluru 560066",
    portList: [
      makePort("GPWR-Blr-02", 1, "DC 60kW", "charging", "A"),
      makePort("GPWR-Blr-02", 2, "DC 60kW", "available"),
      makePort("GPWR-Blr-02", 3, "DC 60kW", "charging", "B"),
      makePort("GPWR-Blr-02", 4, "DC 60kW", "available"),
      makePort("GPWR-Blr-02", 5, "AC 22kW", "charging", "C"),
      makePort("GPWR-Blr-02", 6, "AC 22kW", "error"),
    ],
    activeSessions: [
      makeSession("GPWR-Blr-02", 1, "DC 60kW", "Arun Krishnan", 15, 12.3),
      makeSession("GPWR-Blr-02", 3, "DC 60kW", "Bhavana Reddy", 29, 23.6),
      makeSession("GPWR-Blr-02", 5, "AC 22kW", "Chetan Mishra", 44, 8.7),
    ],
  },
  {
    id: "GPWR-Blr-03",
    name: "Electronic City",
    city: "Bangalore",
    status: "maintenance",
    ports: 6,
    ac: 4,
    dc: 2,
    util: 0,
    today: "₹0",
    lastSession: "09:42",
    uptime: "—",
    lat: 12.8459,
    lng: 77.6603,
    address: "Electronic City Phase 1, Bengaluru 560100",
    portList: [
      makePort("GPWR-Blr-03", 1, "DC 60kW", "offline"),
      makePort("GPWR-Blr-03", 2, "DC 60kW", "error"),
      makePort("GPWR-Blr-03", 3, "AC 22kW", "offline"),
      makePort("GPWR-Blr-03", 4, "AC 22kW", "offline"),
      makePort("GPWR-Blr-03", 5, "AC 22kW", "error"),
      makePort("GPWR-Blr-03", 6, "AC 22kW", "offline"),
    ],
    activeSessions: [],
  },
  {
    id: "GPWR-Mum-01",
    name: "BKC Charging Hub",
    city: "Mumbai",
    status: "online",
    ports: 14,
    ac: 10,
    dc: 4,
    util: 88,
    today: "₹9,640",
    lastSession: "14:27",
    uptime: "99.1%",
    lat: 19.0596,
    lng: 72.8656,
    address: "G Block, Bandra Kurla Complex, Mumbai 400051",
    portList: [
      makePort("GPWR-Mum-01", 1, "DC 120kW", "charging", "R"),
      makePort("GPWR-Mum-01", 2, "DC 60kW", "charging", "S"),
      makePort("GPWR-Mum-01", 3, "DC 60kW", "available"),
      makePort("GPWR-Mum-01", 4, "DC 60kW", "charging", "T"),
      makePort("GPWR-Mum-01", 5, "AC 22kW", "available"),
      makePort("GPWR-Mum-01", 6, "AC 22kW", "charging", "U"),
    ],
    activeSessions: [
      makeSession("GPWR-Mum-01", 1, "DC 120kW", "Rohit Shah", 19, 38.2),
      makeSession("GPWR-Mum-01", 2, "DC 60kW", "Sonal Mehta", 31, 25.1),
      makeSession("GPWR-Mum-01", 4, "DC 60kW", "Tarun Joshi", 26, 21.3),
      makeSession("GPWR-Mum-01", 6, "AC 22kW", "Uma Pillai", 52, 10.4),
    ],
  },
  {
    id: "GPWR-Mum-02",
    name: "Andheri West",
    city: "Mumbai",
    status: "online",
    ports: 8,
    ac: 6,
    dc: 2,
    util: 73,
    today: "₹5,280",
    lastSession: "14:19",
    uptime: "97.8%",
    lat: 19.1176,
    lng: 72.8468,
    address: "Veera Desai Rd, Andheri West, Mumbai 400053",
    portList: [
      makePort("GPWR-Mum-02", 1, "DC 60kW", "charging", "V"),
      makePort("GPWR-Mum-02", 2, "DC 60kW", "available"),
      makePort("GPWR-Mum-02", 3, "AC 22kW", "charging", "W"),
      makePort("GPWR-Mum-02", 4, "AC 22kW", "available"),
      makePort("GPWR-Mum-02", 5, "AC 22kW", "available"),
      makePort("GPWR-Mum-02", 6, "AC 22kW", "offline"),
    ],
    activeSessions: [
      makeSession("GPWR-Mum-02", 1, "DC 60kW", "Vijay Kulkarni", 34, 27.8),
      makeSession("GPWR-Mum-02", 3, "AC 22kW", "Warda Khan", 41, 8.1),
    ],
  },
  {
    id: "GPWR-Pune-01",
    name: "Hinjewadi IT Park",
    city: "Pune",
    status: "charging",
    ports: 10,
    ac: 8,
    dc: 2,
    util: 94,
    today: "₹6,840",
    lastSession: "14:33",
    uptime: "100%",
    lat: 18.5922,
    lng: 73.7380,
    address: "Phase 1, Rajiv Gandhi Infotech Park, Pune 411057",
    portList: [
      makePort("GPWR-Pune-01", 1, "DC 60kW", "charging", "G"),
      makePort("GPWR-Pune-01", 2, "DC 60kW", "charging", "H"),
      makePort("GPWR-Pune-01", 3, "AC 22kW", "charging", "I"),
      makePort("GPWR-Pune-01", 4, "AC 22kW", "charging", "J"),
      makePort("GPWR-Pune-01", 5, "AC 22kW", "available"),
      makePort("GPWR-Pune-01", 6, "AC 22kW", "charging", "K"),
    ],
    activeSessions: [
      makeSession("GPWR-Pune-01", 1, "DC 60kW", "Gaurav Joshi", 24, 19.7),
      makeSession("GPWR-Pune-01", 2, "DC 60kW", "Heena Pawar", 39, 31.8),
      makeSession("GPWR-Pune-01", 3, "AC 22kW", "Ishaan Deshmukh", 48, 9.5),
      makeSession("GPWR-Pune-01", 4, "AC 22kW", "Jaya Bose", 16, 3.3),
      makeSession("GPWR-Pune-01", 6, "AC 22kW", "Kartik Rane", 57, 11.4),
    ],
  },
  {
    id: "GPWR-Pune-02",
    name: "Kothrud Depot",
    city: "Pune",
    status: "online",
    ports: 6,
    ac: 6,
    dc: 0,
    util: 62,
    today: "₹3,960",
    lastSession: "13:58",
    uptime: "98.4%",
    lat: 18.5074,
    lng: 73.8077,
    address: "Paud Rd, Kothrud, Pune 411038",
    portList: [
      makePort("GPWR-Pune-02", 1, "AC 22kW", "charging", "L"),
      makePort("GPWR-Pune-02", 2, "AC 22kW", "available"),
      makePort("GPWR-Pune-02", 3, "AC 22kW", "charging", "M"),
      makePort("GPWR-Pune-02", 4, "AC 22kW", "available"),
      makePort("GPWR-Pune-02", 5, "AC 22kW", "available"),
      makePort("GPWR-Pune-02", 6, "AC 22kW", "offline"),
    ],
    activeSessions: [
      makeSession("GPWR-Pune-02", 1, "AC 22kW", "Lata Sharma", 43, 8.6),
      makeSession("GPWR-Pune-02", 3, "AC 22kW", "Mohan Chavan", 22, 4.4),
    ],
  },
  {
    id: "GPWR-Del-01",
    name: "Connaught Place",
    city: "Delhi",
    status: "online",
    ports: 16,
    ac: 12,
    dc: 4,
    util: 86,
    today: "₹11,200",
    lastSession: "14:30",
    uptime: "99.4%",
    lat: 28.6315,
    lng: 77.2167,
    address: "P-Block, Connaught Place, New Delhi 110001",
    portList: [
      makePort("GPWR-Del-01", 1, "DC 120kW", "charging", "N"),
      makePort("GPWR-Del-01", 2, "DC 60kW", "charging", "O"),
      makePort("GPWR-Del-01", 3, "DC 60kW", "available"),
      makePort("GPWR-Del-01", 4, "DC 60kW", "charging", "P"),
      makePort("GPWR-Del-01", 5, "AC 22kW", "charging", "Q"),
      makePort("GPWR-Del-01", 6, "AC 22kW", "available"),
    ],
    activeSessions: [
      makeSession("GPWR-Del-01", 1, "DC 120kW", "Naveen Gupta", 20, 40.5),
      makeSession("GPWR-Del-01", 2, "DC 60kW", "Omkar Singh", 36, 29.3),
      makeSession("GPWR-Del-01", 4, "DC 60kW", "Pooja Verma", 27, 22.1),
      makeSession("GPWR-Del-01", 5, "AC 22kW", "Qadir Ansari", 49, 9.8),
    ],
  },
  {
    id: "GPWR-Del-02",
    name: "Saket District",
    city: "Delhi",
    status: "charging",
    ports: 8,
    ac: 6,
    dc: 2,
    util: 88,
    today: "₹7,640",
    lastSession: "14:34",
    uptime: "100%",
    lat: 28.5253,
    lng: 77.2188,
    address: "Malviya Nagar, Saket, New Delhi 110017",
    portList: [
      makePort("GPWR-Del-02", 1, "DC 60kW", "charging", "R"),
      makePort("GPWR-Del-02", 2, "DC 60kW", "charging", "S"),
      makePort("GPWR-Del-02", 3, "AC 22kW", "charging", "T"),
      makePort("GPWR-Del-02", 4, "AC 22kW", "available"),
      makePort("GPWR-Del-02", 5, "AC 22kW", "charging", "U"),
      makePort("GPWR-Del-02", 6, "AC 22kW", "offline"),
    ],
    activeSessions: [
      makeSession("GPWR-Del-02", 1, "DC 60kW", "Riya Kapoor", 21, 17.2),
      makeSession("GPWR-Del-02", 2, "DC 60kW", "Suresh Tiwari", 44, 36.1),
      makeSession("GPWR-Del-02", 3, "AC 22kW", "Tanvi Bhatt", 33, 6.6),
      makeSession("GPWR-Del-02", 5, "AC 22kW", "Umesh Pandey", 58, 11.6),
    ],
  },
  {
    id: "GPWR-Del-03",
    name: "Sector 62 Noida",
    city: "Delhi NCR",
    status: "online",
    ports: 12,
    ac: 8,
    dc: 4,
    util: 79,
    today: "₹8,820",
    lastSession: "14:22",
    uptime: "98.7%",
    lat: 28.6139,
    lng: 77.3567,
    address: "Sector 62, Noida, Uttar Pradesh 201309",
    portList: [
      makePort("GPWR-Del-03", 1, "DC 120kW", "charging", "V"),
      makePort("GPWR-Del-03", 2, "DC 60kW", "available"),
      makePort("GPWR-Del-03", 3, "DC 60kW", "charging", "W"),
      makePort("GPWR-Del-03", 4, "DC 60kW", "available"),
      makePort("GPWR-Del-03", 5, "AC 22kW", "charging", "X"),
      makePort("GPWR-Del-03", 6, "AC 22kW", "available"),
    ],
    activeSessions: [
      makeSession("GPWR-Del-03", 1, "DC 120kW", "Vivek Srivastava", 16, 32.4),
      makeSession("GPWR-Del-03", 3, "DC 60kW", "Wini Rastogi", 42, 34.2),
      makeSession("GPWR-Del-03", 5, "AC 22kW", "Xavier D'Souza", 38, 7.6),
    ],
  },
  {
    id: "GPWR-Hyd-01",
    name: "HITEC City Hub",
    city: "Hyderabad",
    status: "online",
    ports: 10,
    ac: 8,
    dc: 2,
    util: 71,
    today: "₹5,640",
    lastSession: "14:15",
    uptime: "97.1%",
    lat: 17.4435,
    lng: 78.3772,
    address: "Mindspace, HITEC City, Hyderabad 500081",
    portList: [
      makePort("GPWR-Hyd-01", 1, "DC 60kW", "charging", "Y"),
      makePort("GPWR-Hyd-01", 2, "DC 60kW", "available"),
      makePort("GPWR-Hyd-01", 3, "AC 22kW", "charging", "Z"),
      makePort("GPWR-Hyd-01", 4, "AC 22kW", "available"),
      makePort("GPWR-Hyd-01", 5, "AC 22kW", "available"),
      makePort("GPWR-Hyd-01", 6, "AC 22kW", "offline"),
    ],
    activeSessions: [
      makeSession("GPWR-Hyd-01", 1, "DC 60kW", "Yusuf Shaikh", 29, 23.8),
      makeSession("GPWR-Hyd-01", 3, "AC 22kW", "Zara Khan", 51, 10.2),
    ],
  },
  {
    id: "GPWR-Che-01",
    name: "OMR IT Corridor",
    city: "Chennai",
    status: "charging",
    ports: 8,
    ac: 6,
    dc: 2,
    util: 68,
    today: "₹4,920",
    lastSession: "14:31",
    uptime: "99.0%",
    lat: 12.9010,
    lng: 80.2279,
    address: "Old Mahabalipuram Rd, Perungudi, Chennai 600096",
    portList: [
      makePort("GPWR-Che-01", 1, "DC 60kW", "charging", "A"),
      makePort("GPWR-Che-01", 2, "DC 60kW", "available"),
      makePort("GPWR-Che-01", 3, "AC 22kW", "charging", "B"),
      makePort("GPWR-Che-01", 4, "AC 22kW", "available"),
      makePort("GPWR-Che-01", 5, "AC 22kW", "available"),
      makePort("GPWR-Che-01", 6, "AC 22kW", "offline"),
    ],
    activeSessions: [
      makeSession("GPWR-Che-01", 1, "DC 60kW", "Arvind Krishnamurthy", 23, 18.9),
      makeSession("GPWR-Che-01", 3, "AC 22kW", "Bhavani Rajan", 46, 9.2),
    ],
  },
];

/** Lookup a station by ID — O(n) but fine for 15 records */
export function getStation(id: string): Station | undefined {
  return ALL_STATIONS.find((s) => s.id === id);
}
