/**
 * C&I customer account mocks — 20 accounts.
 */

export type CustomerSegment = "manufacturing" | "it-ites" | "steel" | "chemical" | "utility" | "infrastructure" | "fmcg";
export type CustomerStatus = "active" | "inactive" | "onboarding";

export interface CustomerInvoice {
  id: string;
  period: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
  dueDate: string;
}

export interface Customer {
  id: string;
  name: string;
  tradingName: string;
  segment: CustomerSegment;
  status: CustomerStatus;
  sitesCount: number;
  siteIds: string[];
  contractedMwh: number;
  contractStart: string;
  contractEnd: string;
  primaryContact: string;
  contactEmail: string;
  contactPhone: string;
  gstin: string;
  billingAddress: string;
  revenueYtd: number;
  outstandingBalance: number;
  invoices: CustomerInvoice[];
}

export const ALL_CUSTOMERS: Customer[] = [
  {
    id: "cust_001", name: "Tata Consultancy Services Ltd", tradingName: "TCS", segment: "it-ites", status: "active",
    sitesCount: 1, siteIds: ["site_001"], contractedMwh: 20.0, contractStart: "2023-08-14", contractEnd: "2026-08-13",
    primaryContact: "Prashant Menon", contactEmail: "energy@tcs.com", contactPhone: "+91 22 6778 9000",
    gstin: "27AAACT2727Q1ZX", billingAddress: "TCS House, Raveline St, Fort, Mumbai 400 001",
    revenueYtd: 3820000, outstandingBalance: 0,
    invoices: [
      { id: "INV-TCS-004", period: "Apr 2025", amount: 382000, status: "pending", dueDate: "2025-05-15" },
      { id: "INV-TCS-003", period: "Mar 2025", amount: 364000, status: "paid", dueDate: "2025-04-15" },
      { id: "INV-TCS-002", period: "Feb 2025", amount: 348000, status: "paid", dueDate: "2025-03-15" },
    ],
  },
  {
    id: "cust_002", name: "Infosys Limited", tradingName: "Infosys", segment: "it-ites", status: "active",
    sitesCount: 1, siteIds: ["site_002"], contractedMwh: 16.0, contractStart: "2023-06-20", contractEnd: "2026-06-19",
    primaryContact: "Divya Krishnamurthy", contactEmail: "facilities@infosys.com", contactPhone: "+91 80 2852 0261",
    gstin: "29AAACI1437C2ZH", billingAddress: "Electronics City, Phase 1, Bengaluru 560 100",
    revenueYtd: 3120000, outstandingBalance: 0,
    invoices: [
      { id: "INV-INF-004", period: "Apr 2025", amount: 312000, status: "pending", dueDate: "2025-05-15" },
      { id: "INV-INF-003", period: "Mar 2025", amount: 298000, status: "paid", dueDate: "2025-04-15" },
    ],
  },
  {
    id: "cust_003", name: "Hyundai Motor India Private Limited", tradingName: "HMIL", segment: "manufacturing", status: "active",
    sitesCount: 1, siteIds: ["site_003"], contractedMwh: 12.0, contractStart: "2023-11-03", contractEnd: "2026-11-02",
    primaryContact: "Rajan Subramanian", contactEmail: "energy@hyundai.co.in", contactPhone: "+91 44 2450 2000",
    gstin: "33AABCH8128N1Z8", billingAddress: "Plot H-1, SIPCOT Industrial Park, Irrungattukottai, Kancheepuram 602 117",
    revenueYtd: 2420000, outstandingBalance: 0,
    invoices: [
      { id: "INV-HYN-004", period: "Apr 2025", amount: 242000, status: "pending", dueDate: "2025-05-15" },
    ],
  },
  {
    id: "cust_004", name: "Hetero Drugs Limited", tradingName: "Hetero Drugs", segment: "chemical", status: "active",
    sitesCount: 1, siteIds: ["site_004"], contractedMwh: 10.0, contractStart: "2024-01-17", contractEnd: "2027-01-16",
    primaryContact: "Ramesh Reddy", contactEmail: "facilities@heterodrugs.com", contactPhone: "+91 40 2374 3000",
    gstin: "36AABCH0867B1Z6", billingAddress: "7-2-1714/A, Hetero Bhavan, Sanath Nagar, Hyderabad 500 018",
    revenueYtd: 2180000, outstandingBalance: 0,
    invoices: [
      { id: "INV-HTR-004", period: "Apr 2025", amount: 218000, status: "pending", dueDate: "2025-05-15" },
    ],
  },
  {
    id: "cust_005", name: "Reliance Industries Limited", tradingName: "Reliance", segment: "chemical", status: "active",
    sitesCount: 1, siteIds: ["site_005"], contractedMwh: 8.0, contractStart: "2023-09-28", contractEnd: "2026-09-27",
    primaryContact: "Nikhil Mehta", contactEmail: "energy@ril.com", contactPhone: "+91 22 2278 5000",
    gstin: "27AAACR4849R1ZX", billingAddress: "Maker Chambers IV, 222 Nariman Point, Mumbai 400 021",
    revenueYtd: 1640000, outstandingBalance: 82000,
    invoices: [
      { id: "INV-RIL-004", period: "Apr 2025", amount: 164000, status: "overdue", dueDate: "2025-05-01" },
      { id: "INV-RIL-003", period: "Mar 2025", amount: 156000, status: "paid", dueDate: "2025-04-01" },
    ],
  },
  {
    id: "cust_006", name: "HCL Technologies Limited", tradingName: "HCL Tech", segment: "it-ites", status: "active",
    sitesCount: 1, siteIds: ["site_006"], contractedMwh: 8.0, contractStart: "2024-02-05", contractEnd: "2027-02-04",
    primaryContact: "Sunita Puri", contactEmail: "infrastructure@hcltech.com", contactPhone: "+91 120 476 4000",
    gstin: "09AAACH2594R1ZE", billingAddress: "806, Siddharth, 96 Nehru Place, New Delhi 110 019",
    revenueYtd: 1520000, outstandingBalance: 0,
    invoices: [
      { id: "INV-HCL-003", period: "Apr 2025", amount: 152000, status: "pending", dueDate: "2025-05-15" },
    ],
  },
  {
    id: "cust_007", name: "Gujarat Heavy Chemicals Limited", tradingName: "GHCL", segment: "chemical", status: "active",
    sitesCount: 1, siteIds: ["site_007"], contractedMwh: 6.0, contractStart: "2024-03-12", contractEnd: "2027-03-11",
    primaryContact: "Bhavesh Shah", contactEmail: "energy@ghcl.co.in", contactPhone: "+91 79 2646 5000",
    gstin: "24AAACG4349R1Z6", billingAddress: "GHCL House, Opp. Punjabi Hall, Navrangpura, Ahmedabad 380 009",
    revenueYtd: 1248000, outstandingBalance: 0,
    invoices: [
      { id: "INV-GHC-003", period: "Apr 2025", amount: 124800, status: "pending", dueDate: "2025-05-15" },
    ],
  },
  {
    id: "cust_008", name: "Pricol Limited", tradingName: "Pricol", segment: "manufacturing", status: "active",
    sitesCount: 1, siteIds: ["site_008"], contractedMwh: 6.0, contractStart: "2023-12-01", contractEnd: "2026-11-30",
    primaryContact: "Arjun Senthilkumar", contactEmail: "energy@pricol.com", contactPhone: "+91 422 222 4000",
    gstin: "33AAACP2641R1ZQ", billingAddress: "Pricol House, Perianaickenpalayam, Coimbatore 641 020",
    revenueYtd: 0, outstandingBalance: 0,
    invoices: [],
  },
  {
    id: "cust_009", name: "ITC Limited", tradingName: "ITC", segment: "fmcg", status: "active",
    sitesCount: 1, siteIds: ["site_009"], contractedMwh: 5.0, contractStart: "2024-04-08", contractEnd: "2027-04-07",
    primaryContact: "Anjali Bose", contactEmail: "facilities@itc.in", contactPhone: "+91 33 2288 9371",
    gstin: "19AAACI1419C1Z3", billingAddress: "ITC Limited, 37 J L Nehru Road, Kolkata 700 071",
    revenueYtd: 972000, outstandingBalance: 0,
    invoices: [
      { id: "INV-ITC-003", period: "Apr 2025", amount: 97200, status: "pending", dueDate: "2025-05-15" },
    ],
  },
  {
    id: "cust_010", name: "Rajasthan State Industrial Development Corporation", tradingName: "RIICO", segment: "infrastructure", status: "active",
    sitesCount: 1, siteIds: ["site_010"], contractedMwh: 4.0, contractStart: "2024-05-22", contractEnd: "2027-05-21",
    primaryContact: "Mahendra Singh", contactEmail: "energy@riico.co.in", contactPhone: "+91 141 222 7751",
    gstin: "08AABCR1234Q1ZA", billingAddress: "RIICO House, 14 Ashok Marg, C-Scheme, Jaipur 302 001",
    revenueYtd: 856000, outstandingBalance: 0,
    invoices: [
      { id: "INV-RIC-002", period: "Apr 2025", amount: 85600, status: "pending", dueDate: "2025-05-15" },
    ],
  },
  {
    id: "cust_011", name: "Maharashtra State Power Generation Company Limited", tradingName: "MAHA-Genco", segment: "utility", status: "active",
    sitesCount: 1, siteIds: ["site_011"], contractedMwh: 4.0, contractStart: "2024-06-14", contractEnd: "2027-06-13",
    primaryContact: "Vinod Patil", contactEmail: "cmd@mahagenco.in", contactPhone: "+91 22 2282 8800",
    gstin: "27AABCM3456S1Z2", billingAddress: "Prakashgad, G-9, Bandra East, Mumbai 400 051",
    revenueYtd: 768000, outstandingBalance: 0,
    invoices: [],
  },
  {
    id: "cust_012", name: "Reliance Retail Limited", tradingName: "Reliance Retail", segment: "infrastructure", status: "active",
    sitesCount: 1, siteIds: ["site_012"], contractedMwh: 4.0, contractStart: "2024-07-02", contractEnd: "2027-07-01",
    primaryContact: "Shreya Malhotra", contactEmail: "energy@relianceretail.com", contactPhone: "+91 261 267 5432",
    gstin: "24AABCR5678T2Z1", billingAddress: "Reliance Corporate Park, Thane Belapur Road, Navi Mumbai 400 701",
    revenueYtd: 692000, outstandingBalance: 0,
    invoices: [],
  },
  {
    id: "cust_013", name: "Uttar Pradesh Power Corporation Limited", tradingName: "UPCL", segment: "utility", status: "active",
    sitesCount: 1, siteIds: ["site_013"], contractedMwh: 3.0, contractStart: "2024-02-28", contractEnd: "2027-02-27",
    primaryContact: "Ramesh Yadav", contactEmail: "cmd@uppcl.org", contactPhone: "+91 522 228 7601",
    gstin: "09AABCU2456P1Z8", billingAddress: "Shakti Bhavan, 14 Ashok Marg, Lucknow 226 001",
    revenueYtd: 0, outstandingBalance: 0,
    invoices: [],
  },
  {
    id: "cust_014", name: "Bharat Heavy Electricals Limited", tradingName: "BHEL", segment: "manufacturing", status: "active",
    sitesCount: 1, siteIds: ["site_014"], contractedMwh: 3.0, contractStart: "2024-08-09", contractEnd: "2027-08-08",
    primaryContact: "Anup Kumar", contactEmail: "energy@bhel.in", contactPhone: "+91 755 247 0000",
    gstin: "23AAACB0006F1Z7", billingAddress: "BHEL House, Siri Fort, New Delhi 110 049",
    revenueYtd: 564000, outstandingBalance: 0,
    invoices: [],
  },
  {
    id: "cust_015", name: "Rashtriya Ispat Nigam Limited", tradingName: "RINL", segment: "steel", status: "active",
    sitesCount: 1, siteIds: ["site_015"], contractedMwh: 10.0, contractStart: "2023-10-15", contractEnd: "2026-10-14",
    primaryContact: "Venkat Rao Galla", contactEmail: "energy@rinl.co.in", contactPhone: "+91 891 255 5555",
    gstin: "37AAACR2345W1Z4", billingAddress: "Administrative Building, Visakhapatnam Steel Plant, Visakhapatnam 530 031",
    revenueYtd: 1928000, outstandingBalance: 0,
    invoices: [],
  },
  {
    id: "cust_016", name: "Smart City Kochi Corporation", tradingName: "Smart City Kochi", segment: "infrastructure", status: "active",
    sitesCount: 1, siteIds: ["site_016"], contractedMwh: 6.0, contractStart: "2024-01-30", contractEnd: "2027-01-29",
    primaryContact: "Asha Menon", contactEmail: "energy@smartcitykochi.in", contactPhone: "+91 484 277 5500",
    gstin: "32AABCS3456M1Z2", billingAddress: "Smart City Kochi SPV Office, Kakkanad, Kochi 682 042",
    revenueYtd: 1056000, outstandingBalance: 0,
    invoices: [],
  },
  {
    id: "cust_017", name: "Maruti Suzuki India Limited", tradingName: "Maruti Suzuki", segment: "manufacturing", status: "active",
    sitesCount: 1, siteIds: ["site_017"], contractedMwh: 8.0, contractStart: "2023-12-18", contractEnd: "2026-12-17",
    primaryContact: "Suresh Nair", contactEmail: "energy@maruti.co.in", contactPhone: "+91 124 478 1000",
    gstin: "06AAACM1234N1Z5", billingAddress: "Nelson Mandela Road, Vasant Kunj, New Delhi 110 070",
    revenueYtd: 1484000, outstandingBalance: 0,
    invoices: [],
  },
  {
    id: "cust_018", name: "Hindustan Unilever Limited", tradingName: "HUL", segment: "fmcg", status: "active",
    sitesCount: 1, siteIds: ["site_018"], contractedMwh: 4.0, contractStart: "2024-09-04", contractEnd: "2027-09-03",
    primaryContact: "Meena Iyer", contactEmail: "energy@hul.co.in", contactPhone: "+91 22 3983 0000",
    gstin: "23AABCH1234K1Z1", billingAddress: "Unilever House, B D Sawant Marg, Chakala, Andheri East, Mumbai 400 099",
    revenueYtd: 728000, outstandingBalance: 0,
    invoices: [],
  },
  {
    id: "cust_019", name: "Oil and Natural Gas Corporation Limited", tradingName: "ONGC Gujarat", segment: "chemical", status: "active",
    sitesCount: 1, siteIds: ["site_019"], contractedMwh: 5.0, contractStart: "2024-07-19", contractEnd: "2027-07-18",
    primaryContact: "Hiren Desai", contactEmail: "energy@ongc.co.in", contactPhone: "+91 265 233 0000",
    gstin: "24AAACO1234P1ZX", billingAddress: "ONGC Vadodara Asset, Makarpura Road, Vadodara 390 009",
    revenueYtd: 924000, outstandingBalance: 0,
    invoices: [],
  },
  {
    id: "cust_020", name: "JSW Steel Limited", tradingName: "JSW Steel", segment: "steel", status: "onboarding",
    sitesCount: 1, siteIds: ["site_020"], contractedMwh: 3.0, contractStart: "2024-10-01", contractEnd: "2027-09-30",
    primaryContact: "Rekha Shetty", contactEmail: "energy@jsw.in", contactPhone: "+91 821 241 0000",
    gstin: "29AABCJ5678K1Z2", billingAddress: "JSW Centre, Bandra Kurla Complex, Mumbai 400 051",
    revenueYtd: 492000, outstandingBalance: 0,
    invoices: [],
  },
];
