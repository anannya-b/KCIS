import { Users, FileWarning, CheckCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const recentAssessments = [
  { id: 'KC-8923', date: '2026-05-02', status: 'Approved', store: 'Sri Venkateshwara Stores', location: 'Bengaluru, KA', amount: '₹3,50,000' },
  { id: 'KC-8924', date: '2026-05-02', status: 'Flagged', store: 'Laxmi Provision', location: 'Chennai, TN', amount: '-' },
  { id: 'KC-8925', date: '2026-05-02', status: 'Pending', store: 'New Delhi General', location: 'New Delhi, DL', amount: '₹1,20,000' },
  { id: 'KC-8926', date: '2026-05-01', status: 'Approved', store: 'Royal Mart', location: 'Hyderabad, TS', amount: '₹4,00,000' },
];

export default function Dashboard() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Command Center</h1>
          <p className="text-slate-500 mt-1">Overview of KCIS underwriting activity</p>
        </div>
        <Link 
          to="/new-assessment" 
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium shadow-sm hover:bg-emerald-700 transition-colors"
        >
          + New Assessment
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="glass-card p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
              <Users size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Total Assessed</p>
              <h3 className="text-2xl font-bold text-slate-900">12,483</h3>
            </div>
          </div>
        </div>
        
        <div className="glass-card p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
              <CheckCircle size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Approval Rate</p>
              <h3 className="text-2xl font-bold text-slate-900">68.4%</h3>
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Pending Review</p>
              <h3 className="text-2xl font-bold text-slate-900">142</h3>
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-50 text-red-600 rounded-lg">
              <FileWarning size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Flagged (Fraud)</p>
              <h3 className="text-2xl font-bold text-slate-900">8.1%</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
          <h2 className="font-semibold text-lg text-slate-900">Recent Assessments</h2>
          <Link to="/history" className="text-sm text-emerald-600 font-medium hover:text-emerald-700">View All</Link>
        </div>
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
              {recentAssessments.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">{item.id}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{item.date}</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-700">{item.store}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{item.location}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${item.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : 
                        item.status === 'Flagged' ? 'bg-red-100 text-red-800' : 
                        'bg-amber-100 text-amber-800'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-right font-medium text-slate-900">{item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
