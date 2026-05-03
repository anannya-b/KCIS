export const mockAssessments = [
  {
    id: 'KC-8923',
    date: '2026-05-02',
    storeName: 'Sri Venkateshwara Stores',
    location: 'Bengaluru, KA',
    status: 'Approved',
    type: 'golden',
    recommendedAmount: '₹3,50,000',
    imageUrl: 'https://i.postimg.cc/DysZ423M/gol2.jpg',
    gps: '12.9716, 77.5946',
    verdictLabel: 'APPROVE',
    verdictColor: 'text-emerald-700',
    verdictBorder: '#10b981',
    confidence: '0.92',
    dailySales: '₹35,424',
    monthlyRevenue: '₹9,21,000',
    annualIncome: '₹11,05,200',
    revenueRange: '±12%',
    metrics: { digital: 85, sku: 80, footfall: 92, brands: 80, org: 90 },
    fraudChecks: { exif: true, shadow: true, duplicate: true },
    formulaText: "(₹1,80,000 × 0.12 × 0.95) + (92 × ₹180 × 0.90) = ₹35,424 / day",
    peerSales: 35424,
    neighborhoodAvg: 22000
  },
  {
    id: 'KC-8924',
    date: '2026-05-02',
    storeName: 'Laxmi Provision',
    location: 'Chennai, TN',
    status: 'Flagged',
    type: 'fraud',
    recommendedAmount: 'DECLINED',
    imageUrl: 'https://i.postimg.cc/kg4Qd6bt/flag.jpg',
    gps: '13.0827, 80.2707',
    verdictLabel: 'DECLINED',
    verdictColor: 'text-red-700',
    verdictBorder: '#ef4444',
    confidence: '0.41',
    dailySales: '₹0',
    monthlyRevenue: 'N/A',
    annualIncome: 'N/A',
    revenueRange: 'N/A',
    metrics: { digital: 10, sku: 20, footfall: 45, brands: 20, org: 30 },
    fraudChecks: { exif: false, shadow: false, duplicate: false },
    formulaText: "INVALID (Confidence < 0.5)",
    peerSales: 0,
    neighborhoodAvg: 4200
  },
  {
    id: 'KC-8925',
    date: '2026-05-02',
    storeName: 'New Delhi General',
    location: 'New Delhi, DL',
    status: 'Pending',
    type: 'sparse',
    recommendedAmount: 'Manual Review',
    imageUrl: 'https://i.postimg.cc/g00mspQD/pending.jpg',
    gps: '28.6139, 77.2090',
    verdictLabel: 'NEEDS VERIFICATION',
    verdictColor: 'text-amber-700',
    verdictBorder: '#f59e0b',
    confidence: '0.65',
    dailySales: '₹5,860',
    monthlyRevenue: '₹1,52,300',
    annualIncome: '₹2,19,300',
    revenueRange: '±25%',
    metrics: { digital: 40, sku: 30, footfall: 65, brands: 20, org: 50 },
    fraudChecks: { exif: true, shadow: true, duplicate: true },
    formulaText: "(₹25,000 × 0.08 × 0.85) + (65 × ₹80 × 0.80) = ₹5,860 / day",
    peerSales: 5860,
    neighborhoodAvg: 4200
  },
  {
    id: 'KC-8926',
    date: '2026-05-01',
    storeName: 'Royal Mart',
    location: 'Hyderabad, TS',
    status: 'Approved',
    type: 'moderate',
    recommendedAmount: '₹1,20,000',
    imageUrl: 'https://i.postimg.cc/Y2FkbbnV/gol3.jpg',
    gps: '17.3850, 78.4867',
    verdictLabel: 'APPROVE',
    verdictColor: 'text-emerald-700',
    verdictBorder: '#10b981',
    confidence: '0.88',
    dailySales: '₹14,200',
    monthlyRevenue: '₹3,69,200',
    annualIncome: '₹4,43,040',
    revenueRange: '±15%',
    metrics: { digital: 70, sku: 60, footfall: 75, brands: 60, org: 70 },
    fraudChecks: { exif: true, shadow: true, duplicate: true },
    formulaText: "(₹60,000 × 0.10 × 0.90) + (75 × ₹120 × 0.85) = ₹14,200 / day",
    peerSales: 14200,
    neighborhoodAvg: 11000
  }
];

// Re-export demo cases mapped from the new structure for NewAssessment page
export const demoCases = [
  {
    id: 'golden',
    label: 'High Revenue Store',
    data: {
      ...mockAssessments[0],
      imageUrl: 'https://i.postimg.cc/85PvXKt0/gol.jpg', // Keep original URLs for the NewAssessment demo buttons as requested previously
      gps: '12.9716, 77.5946'
    }
  },
  {
    id: 'sparse',
    label: 'Sparse Inventory',
    data: {
      ...mockAssessments[2],
      imageUrl: 'https://i.postimg.cc/7YCWQXRZ/sparse.jpg',
      gps: '13.0827, 80.2707'
    }
  },
  {
    id: 'fraud',
    label: 'Fraud Attempt',
    data: {
      ...mockAssessments[1],
      imageUrl: 'https://i.postimg.cc/KjTs48BD/last.jpg',
      gps: '40.7128, -74.0060'
    }
  }
];
