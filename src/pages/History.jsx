import { useNavigate } from 'react-router-dom';
import { mockAssessments } from '../data/mockAssessments';
import { useAssessment } from '../context/AssessmentContext';

export default function History() {
  const navigate = useNavigate();
  const { setAssessmentData } = useAssessment();

  const handleRowClick = (assessment) => {
    setAssessmentData(assessment);
    navigate('/result');
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-slate-900 mb-2">History & Queue</h1>
      <p className="text-slate-500 mb-8">View past assessments and manual verification queue</p>
      
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-3 font-medium">ID</th>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Store Name</th>
                <th className="px-6 py-3 font-medium">Location</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium text-right">Rec. Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockAssessments.map((item) => (
                <tr 
                  key={item.id} 
                  onClick={() => handleRowClick(item)}
                  className="hover:bg-slate-50 transition-colors cursor-pointer group"
                >
                  <td className="px-6 py-4 text-sm font-medium text-emerald-600 group-hover:text-emerald-700">{item.id}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{item.date}</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-700">{item.storeName}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{item.location}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${item.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : 
                        item.status === 'Flagged' ? 'bg-red-100 text-red-800' : 
                        'bg-amber-100 text-amber-800'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-right font-medium text-slate-900">{item.recommendedAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
