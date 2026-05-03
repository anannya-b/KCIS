import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAssessment } from '../context/AssessmentContext';
import { CheckCircle, AlertTriangle, ShieldAlert, Check, X, ShieldCheck, Download } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function Result() {
  const navigate = useNavigate();
  const { assessmentData } = useAssessment();

  useEffect(() => {
    if (!assessmentData) {
      navigate('/new-assessment');
    }
  }, [assessmentData, navigate]);

  if (!assessmentData) return null;

  // Use dynamic data if available, fallback to boolean logic for legacy support if needed
  const d = assessmentData;
  const isFraud = d.type === 'fraud' || d.status === 'Flagged';

  const getIcon = () => {
    if (d.verdictLabel === 'APPROVE') return <CheckCircle className={d.verdictColor} size={24} />;
    if (d.verdictLabel === 'DECLINED' || d.verdictLabel === 'NEEDS VERIFICATION' && d.status === 'Flagged') return <ShieldAlert className={d.verdictColor} size={24} />;
    return <AlertTriangle className={d.verdictColor} size={24} />;
  };

  const handlePrint = () => {
    window.print();
  };

  const radarData = [
    { subject: 'Digital', A: d.metrics?.digital || 0, fullMark: 100 },
    { subject: 'SKU Diversity', A: d.metrics?.sku || 0, fullMark: 100 },
    { subject: 'Footfall', A: d.metrics?.footfall || 0, fullMark: 100 },
    { subject: 'Brands', A: d.metrics?.brands || 0, fullMark: 100 },
    { subject: 'Org. Soph.', A: d.metrics?.org || 0, fullMark: 100 },
  ];

  const barData = [
    { name: 'This Store', sales: d.peerSales || 0, fill: '#10b981' },
    { name: 'Neighborhood Avg', sales: d.neighborhoodAvg || 0, fill: '#94a3b8' },
  ];

  return (
    <div className="h-full flex flex-col p-3 sm:p-4 bg-slate-50 overflow-hidden print:p-0 print:bg-white print:h-auto print:overflow-visible">
      {/* Header - Compact */}
      <div className="flex justify-between items-center mb-2 shrink-0 print:hidden">
        <div>
          <h1 className="text-lg font-bold text-slate-900 leading-tight">Credit Intelligence Dossier</h1>
          <p className="text-slate-500 text-xs">Automated Underwriting Complete</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handlePrint} className="flex items-center gap-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 px-3 py-1.5 border border-slate-300 bg-white rounded-lg transition-colors">
            <Download size={14} /> Export to PDF
          </button>
          <Link to="/dashboard" className="text-xs font-medium text-emerald-600 hover:text-emerald-700 px-3 py-1.5 bg-emerald-50 rounded-lg">
            Back to Dashboard
          </Link>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-3 min-h-0 print:block print:w-full">
        {/* Left Column: Image & Verdict (approx 35%) */}
        <div className="w-full lg:w-[35%] flex flex-col gap-3 min-h-0 print:w-full print:mb-4">
          <div className="glass-card p-3 shrink-0 border-l-4" style={{ borderLeftColor: d.verdictBorder || '#10b981' }}>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">Final Verdict</p>
            <div className="flex items-center gap-2 mb-2">
              {getIcon()}
              <h2 className={`text-xl font-bold ${d.verdictColor || 'text-slate-900'}`}>{d.verdictLabel || d.status}</h2>
            </div>
            <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 print:border-none print:bg-white">
              <p className="text-xs text-slate-600 mb-0.5">Recommended Loan Amount</p>
              <p className="text-lg font-bold text-slate-900 leading-none">
                {d.recommendedAmount}
              </p>
            </div>
          </div>

          <div className="glass-card p-3 flex-1 flex flex-col min-h-0 print:h-64">
            <h3 className="text-xs font-semibold text-slate-900 mb-1.5 shrink-0">Analyzed Image</h3>
            <div className="w-full h-40 sm:h-48 relative rounded-lg overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
              <img src={d.imageUrl} alt="Store" className="absolute inset-0 w-full h-full object-cover" />
              {isFraud && (
                <div className="absolute inset-0 border-4 border-red-500 pointer-events-none"></div>
              )}
            </div>
            <div className="mt-2 shrink-0 flex justify-between text-[10px] text-slate-500 bg-slate-50 p-1.5 rounded">
              <span>GPS: {d.gps}</span>
              <span>Conf: {d.confidence}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Data & Gauges (approx 65%) */}
        <div className="flex-1 flex flex-col gap-3 min-h-0 print:w-full print:block">
          {/* Top Row: Fraud & Scores */}
          <div className="flex flex-col sm:flex-row gap-3 shrink-0 print:block">
            <div className="glass-card p-3 flex-1 print:mb-4">
              <div className="flex items-center gap-1.5 mb-2">
                <ShieldCheck className={isFraud ? "text-red-500" : "text-emerald-500"} size={16} />
                <h3 className="font-semibold text-slate-900 text-xs">Anti-Fraud Shield</h3>
              </div>
              <ul className="space-y-1.5 text-xs">
                <li className="flex items-center gap-1.5">
                  {!d.fraudChecks?.exif ? <X size={14} className="text-red-500" /> : <Check size={14} className="text-emerald-500" />}
                  <span className={!d.fraudChecks?.exif ? "text-slate-900 font-medium" : "text-slate-600"}>EXIF & Metadata Integrity</span>
                </li>
                <li className="flex items-center gap-1.5">
                  {!d.fraudChecks?.shadow ? <X size={14} className="text-red-500" /> : <Check size={14} className="text-emerald-500" />}
                  <span className={!d.fraudChecks?.shadow ? "text-slate-900 font-medium" : "text-slate-600"}>Shadow/Time Consistency</span>
                </li>
                <li className="flex items-center gap-1.5">
                  {!d.fraudChecks?.duplicate ? <X size={14} className="text-red-500" /> : <Check size={14} className="text-emerald-500" />}
                  <span className={!d.fraudChecks?.duplicate ? "text-slate-900 font-medium" : "text-slate-600"}>Object Duplication Check</span>
                </li>
              </ul>
            </div>

            <div className="glass-card p-3 flex-[1.5] print:mb-4">
              <h3 className="font-semibold text-slate-900 text-xs mb-2">Intelligence Gauges</h3>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-[10px] mb-0.5">
                    <span className="font-medium text-slate-700">Digital Adoption Index</span>
                    <span className="text-slate-900">{(d.metrics?.digital / 100).toFixed(2)}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1"><div className={`h-1 rounded-full ${isFraud ? 'bg-red-500' : d.metrics?.digital > 60 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${d.metrics?.digital}%` }}></div></div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] mb-0.5">
                    <span className="font-medium text-slate-700">Footfall Proxy Score</span>
                    <span className="text-slate-900">{d.metrics?.footfall}/100</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1"><div className={`h-1 rounded-full ${isFraud ? 'bg-red-500' : d.metrics?.footfall > 60 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${d.metrics?.footfall}%` }}></div></div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] mb-0.5">
                    <span className="font-medium text-slate-700">Brand Partnerships</span>
                    <span className="text-slate-900">{Math.round((d.metrics?.brands / 100) * 5)} / 5</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1"><div className={`h-1 rounded-full ${isFraud ? 'bg-red-500' : d.metrics?.brands > 50 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${d.metrics?.brands}%` }}></div></div>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Row: Financials */}
          <div className="glass-card p-3 shrink-0 flex flex-col print:mb-4">
            <h3 className="font-semibold text-slate-900 text-xs mb-2">Economic Fusion Engine</h3>
            
            <div className="bg-white border border-slate-200 p-2.5 rounded-lg mb-2 text-xs">
              <div className="mb-1">
                <span className="font-medium text-slate-700">Formula:</span> Daily Sales = (Inventory Value × Turnover Rate × Image Confidence) + (Geo Footfall × Basket Value × Location Confidence)
              </div>
              <div className="text-emerald-700 font-medium">
                <span className="font-medium text-slate-700">Calculation:</span> 
                {isFraud ? " INVALID (Confidence < 0.5)" : ` Daily Sales = ${d.formulaText}`}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 rounded-lg p-2 border border-slate-100 flex flex-col justify-center print:bg-white print:border-none">
                <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wide mb-0.5">Est. Monthly Revenue</p>
                <p className="text-base font-bold text-slate-900 leading-none">
                  {d.monthlyRevenue}
                </p>
                <p className="text-[10px] text-slate-400 mt-1">Range: {d.revenueRange}</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-2 border border-slate-100 flex flex-col justify-center print:bg-white print:border-none">
                <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wide mb-0.5">Normalized Annual Income</p>
                <p className="text-base font-bold text-slate-900 text-emerald-700 leading-none">
                  {d.annualIncome}
                </p>
                <p className="text-[10px] text-slate-400 mt-1">After margin, rent, staffing</p>
              </div>
            </div>
          </div>

          {/* Bottom Row: Store Vitality Profile & Benchmarking */}
          <div className="glass-card p-3 flex-1 flex flex-col min-h-0 print:h-64">
            <h3 className="font-semibold text-slate-900 text-xs mb-1 shrink-0">Store Vitality Profile</h3>
            <div className="flex-1 flex flex-col sm:flex-row min-h-0">
              <div className="flex-1 h-36 sm:h-40 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 9 }} />
                    <Radar name="Store" dataKey="A" stroke={isFraud ? '#ef4444' : '#10b981'} fill={isFraud ? '#ef4444' : '#10b981'} fillOpacity={0.4} />
                    <Tooltip contentStyle={{ fontSize: '10px' }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 h-36 sm:h-40 min-h-0 border-t sm:border-t-0 sm:border-l border-slate-100 pt-2 sm:pt-0 sm:pl-3">
                <h4 className="text-[10px] font-medium text-slate-500 text-center mb-1">Peer Benchmarking (Daily Sales)</h4>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                    <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 9 }} axisLine={false} tickLine={false} />
                    <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ fontSize: '10px', borderRadius: '6px', padding: '4px' }} />
                    <Bar dataKey="sales" radius={[4, 4, 0, 0]}>
                      {barData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
