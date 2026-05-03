import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAssessment } from '../context/AssessmentContext';
import { CheckCircle, AlertTriangle, ShieldAlert, Check, X, ShieldCheck } from 'lucide-react';

export default function Result() {
  const navigate = useNavigate();
  const { assessmentData } = useAssessment();

  useEffect(() => {
    if (!assessmentData) {
      navigate('/new-assessment');
    }
  }, [assessmentData, navigate]);

  if (!assessmentData) return null;

  const isGolden = assessmentData.type === 'golden';
  const isSparse = assessmentData.type === 'sparse';
  const isFraud = assessmentData.type === 'fraud';

  const getVerdictDetails = () => {
    if (isGolden) return { label: 'APPROVE', color: 'text-emerald-700', bg: 'bg-emerald-100', icon: <CheckCircle className="text-emerald-600" size={28} /> };
    if (isSparse) return { label: 'CONDITIONAL APPROVE', color: 'text-amber-700', bg: 'bg-amber-100', icon: <AlertTriangle className="text-amber-600" size={28} /> };
    return { label: 'NEEDS VERIFICATION', color: 'text-red-700', bg: 'bg-red-100', icon: <ShieldAlert className="text-red-600" size={28} /> };
  };

  const verdict = getVerdictDetails();

  return (
    <div className="h-full flex flex-col p-4 sm:p-6 lg:p-8 bg-slate-50 overflow-hidden">
      {/* Header - Compact */}
      <div className="flex justify-between items-center mb-4 shrink-0">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Credit Intelligence Dossier</h1>
          <p className="text-slate-500 text-sm">Automated Underwriting Complete</p>
        </div>
        <Link to="/dashboard" className="text-sm font-medium text-emerald-600 hover:text-emerald-700 px-4 py-2 bg-emerald-50 rounded-lg">
          Back to Dashboard
        </Link>
      </div>

      <div className="flex-1 flex gap-6 min-h-0">
        {/* Left Column: Image & Verdict (approx 35%) */}
        <div className="w-[35%] flex flex-col gap-4 min-h-0">
          <div className="glass-card p-4 shrink-0 border-l-4" style={{ borderLeftColor: isGolden ? '#10b981' : isSparse ? '#f59e0b' : '#ef4444' }}>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-1">Final Verdict</p>
            <div className="flex items-center gap-3 mb-2">
              {verdict.icon}
              <h2 className={`text-2xl font-bold ${verdict.color}`}>{verdict.label}</h2>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
              <p className="text-sm text-slate-600 mb-1">Recommended Loan Amount</p>
              <p className="text-2xl font-bold text-slate-900">
                {isGolden ? '₹3,50,000' : isSparse ? '₹80,000' : 'Manual Review'}
              </p>
            </div>
          </div>

          <div className="glass-card p-3 flex-1 flex flex-col min-h-0">
            <h3 className="text-sm font-semibold text-slate-900 mb-2 shrink-0">Analyzed Image</h3>
            <div className="flex-1 relative rounded-lg overflow-hidden border border-slate-200 bg-slate-100">
              <img src={assessmentData.imageUrl} alt="Store" className="absolute inset-0 w-full h-full object-cover" />
              {isFraud && (
                <div className="absolute inset-0 border-4 border-red-500 pointer-events-none"></div>
              )}
            </div>
            <div className="mt-2 shrink-0 flex justify-between text-xs text-slate-500 bg-slate-50 p-2 rounded">
              <span>GPS: {assessmentData.gps}</span>
              <span>Conf: {isGolden ? '0.92' : isSparse ? '0.85' : '0.41'}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Data & Gauges (approx 65%) */}
        <div className="flex-1 flex flex-col gap-4 min-h-0">
          {/* Top Row: Fraud & Scores */}
          <div className="flex gap-4 shrink-0">
            <div className="glass-card p-4 flex-1">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className={isFraud ? "text-red-500" : "text-emerald-500"} size={20} />
                <h3 className="font-semibold text-slate-900 text-sm">Anti-Fraud Shield</h3>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  {isFraud ? <X size={16} className="text-red-500" /> : <Check size={16} className="text-emerald-500" />}
                  <span className={isFraud ? "text-slate-900 font-medium" : "text-slate-600"}>EXIF & Metadata Integrity</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-emerald-500" />
                  <span className="text-slate-600">Shadow/Time Consistency</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-emerald-500" />
                  <span className="text-slate-600">Object Duplication Check</span>
                </li>
              </ul>
            </div>

            <div className="glass-card p-4 flex-[1.5]">
              <h3 className="font-semibold text-slate-900 text-sm mb-3">Intelligence Gauges</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-slate-700">Digital Adoption Index</span>
                    <span className="text-slate-900">{isGolden ? '0.85' : isSparse ? '0.40' : '0.10'}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5"><div className={`h-1.5 rounded-full ${isGolden ? 'bg-emerald-500 w-[85%]' : isSparse ? 'bg-amber-500 w-[40%]' : 'bg-red-500 w-[10%]'}`}></div></div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-slate-700">Footfall Proxy Score</span>
                    <span className="text-slate-900">{isGolden ? '92/100' : isSparse ? '65/100' : '45/100'}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5"><div className={`h-1.5 rounded-full ${isGolden ? 'bg-emerald-500 w-[92%]' : isSparse ? 'bg-amber-500 w-[65%]' : 'bg-red-500 w-[45%]'}`}></div></div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-slate-700">Brand Partnerships</span>
                    <span className="text-slate-900">{isGolden ? '4' : '1'} / 5</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5"><div className={`h-1.5 rounded-full ${isGolden ? 'bg-emerald-500 w-[80%]' : isSparse ? 'bg-amber-500 w-[20%]' : 'bg-red-500 w-[20%]'}`}></div></div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row: Financials */}
          <div className="glass-card p-5 flex-1 flex flex-col min-h-0">
            <h3 className="font-semibold text-slate-900 text-sm mb-3 shrink-0">Economic Fusion Engine</h3>
            
            <div className="bg-slate-900 text-emerald-400 p-3 rounded-lg font-mono text-xs mb-4 shrink-0 overflow-x-auto">
              <div>// S_d = (V_inv * R_turn * alpha) + (F_geo * B_val * beta)</div>
              <div className="text-emerald-200 mt-1">
                {isGolden && "S_d = (₹1.8L * 0.12 * 0.95) + (92 * ₹180 * 0.90) = ₹35,424 / day"}
                {isSparse && "S_d = (₹25k * 0.08 * 0.85) + (65 * ₹80 * 0.80) = ₹5,860 / day"}
                {isFraud && "S_d = INVALID (alpha confidence < 0.5)"}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 flex-1 min-h-0">
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-100 flex flex-col justify-center">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">Est. Monthly Revenue</p>
                <p className="text-xl font-bold text-slate-900">
                  {isGolden ? '₹9,21,000' : isSparse ? '₹1,52,300' : 'N/A'}
                </p>
                <p className="text-xs text-slate-400 mt-1">Range: {isGolden ? '±12%' : '±25%'}</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-100 flex flex-col justify-center">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">Normalized Annual Income</p>
                <p className="text-xl font-bold text-slate-900 text-emerald-700">
                  {isGolden ? '₹11,05,200' : isSparse ? '₹2,19,300' : 'N/A'}
                </p>
                <p className="text-xs text-slate-400 mt-1">After 15% margin, rent, staffing</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
