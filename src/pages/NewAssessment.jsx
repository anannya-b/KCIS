import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssessment } from '../context/AssessmentContext';
import { UploadCloud, Zap, AlertTriangle, ShieldAlert } from 'lucide-react';
import { demoCases } from '../data/mockAssessments';

export default function NewAssessment() {
  const navigate = useNavigate();
  const { setAssessmentData } = useAssessment();
  const [source, setSource] = useState('field');
  const [loadedData, setLoadedData] = useState(null);

  const handleLoadDemo = (caseData) => {
    setLoadedData(caseData);
  };

  const handleRunPipeline = () => {
    if (!loadedData) return;
    setAssessmentData(loadedData);
    navigate('/processing');
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">New Assessment</h1>
        <p className="text-slate-500 mt-1">Data Ingestion Hub for the KCIS Engine</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <UploadCloud className="text-emerald-600" /> Image Pipeline
            </h2>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">Image Source</label>
              <select 
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              >
                <option value="field">Field Officer Visit (Internal App)</option>
                <option value="borrower">Borrower Self-Service (WhatsApp)</option>
              </select>
            </div>

            <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center bg-slate-50">
              {loadedData ? (
                <div className="space-y-4">
                  <div className="h-64 rounded-lg overflow-hidden border border-slate-200">
                    <img src={loadedData.imageUrl} alt="Store front" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex justify-between items-center text-sm bg-white p-3 rounded border border-slate-200 shadow-sm">
                    <span className="font-medium text-slate-600">GPS Coords:</span>
                    <span className="font-mono text-slate-900">{loadedData.gps}</span>
                  </div>
                </div>
              ) : (
                <div className="py-12">
                  <UploadCloud className="mx-auto h-12 w-12 text-slate-400" />
                  <p className="mt-2 text-sm text-slate-600">
                    Drag and drop store images here, or click to browse
                  </p>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleRunPipeline}
            disabled={!loadedData}
            className={`w-full py-4 px-6 rounded-xl text-lg font-bold shadow-md transition-all ${
              loadedData 
                ? 'bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-lg transform hover:-translate-y-0.5' 
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            Run AI
          </button>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-6 border-emerald-100 bg-emerald-50/30">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Load Demo Data</h2>
            <p className="text-sm text-slate-600 mb-4">
              Select a pre-configured test case to run through the KCIS engine.
            </p>
            
            <div className="space-y-3">
              {demoCases.map((caseItem) => {
                const getIcon = () => {
                  if (caseItem.id === 'golden') return <Zap size={18} className="text-emerald-500" />;
                  if (caseItem.id === 'sparse') return <AlertTriangle size={18} className="text-amber-500" />;
                  return <ShieldAlert size={18} className="text-red-500" />;
                };

                return (
                  <button
                    key={caseItem.id}
                    onClick={() => handleLoadDemo(caseItem.data)}
                    className={`w-full flex items-center justify-between p-4 rounded-lg border transition-all ${
                      loadedData?.type === caseItem.data.type
                        ? 'border-emerald-500 bg-emerald-50 shadow-sm'
                        : 'border-slate-200 bg-white hover:border-emerald-300 hover:shadow-sm'
                    }`}
                  >
                    <span className="font-medium text-slate-800">{caseItem.label}</span>
                    {getIcon()}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 p-4 bg-slate-100 rounded-lg border border-slate-200">
              <p className="text-xs text-slate-600 leading-relaxed italic">
                "For this demo, we are uploading test images, but the production architecture mandates live in-app capture with strict EXIF metadata extraction to prevent spoofing."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
