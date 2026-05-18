import { useState, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import AddLeadForm from '../components/AddLeadForm';
import LeadTable from '../components/LeadTable';
import AnalyticsCards from '../components/AnalyticsCards';
import toast from 'react-hot-toast';
import EditLeadForm from '../components/EditLeadForm';
export default function Dashboard() {
  const { user, logout } = useAuth();
  const [leads, setLeads] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [showForm, setShowForm] = useState(false);
const [loading, setLoading] = useState(false);
const [editingLead, setEditingLead] = useState(null);

const fetchLeads = async () => {
  setLoading(true);
  try {
    const params = { page, limit: 10 };
    if (search) params.search = search;
    if (status) params.status = status;
    const { data } = await api.get('/leads', { params });
    setLeads(data.leads);
    setTotal(data.total);
  } catch {
    toast.error('Failed to fetch leads');
  } finally {
    setLoading(false);
  }
};

  useEffect(() => { fetchLeads(); }, [page, search, status]);

 const handleStatusChange = async (id, newStatus) => {
  try {
    await api.patch(`/leads/${id}/status`, { status: newStatus });
    toast.success('Status updated!');
    fetchLeads();
  } catch {
    toast.error('Failed to update status');
  }
};

 const handleDelete = async (id) => {
  try {
    await api.delete(`/leads/${id}`);
    toast.success('Lead deleted!');
    fetchLeads();
  } catch {
    toast.error('Failed to delete lead');
  }
};

  return (
    <div style={{ minHeight: '100vh', background: '#f1f5f9' }}>
      {/* Navbar */}
      <div style={{
        background: 'white', borderBottom: '1px solid #e2e8f0',
        padding: '0 32px', display: 'flex',
        alignItems: 'center', justifyContent: 'space-between',
        height: 64
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: '#6366f1', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 700, fontSize: 16
          }}>C</div>
          <span style={{ fontWeight: 700, fontSize: 18, color: '#1e293b' }}>MiniCRM</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 14, color: '#64748b' }}>👋 {user.name}</span>
          <button onClick={logout} style={{
            padding: '8px 16px', background: '#f1f5f9',
            color: '#64748b', border: '1px solid #e2e8f0'
          }}>
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div style={{ padding: '32px' }}>
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1e293b' }}>Lead Manager</h2>
          <p style={{ color: '#64748b', fontSize: 14, marginTop: 4 }}>
            Track and manage your sales leads
          </p>
        </div>

        <AnalyticsCards />

        {/* Controls */}
        <div style={{
          background: 'white', borderRadius: 12, padding: 16,
          display: 'flex', gap: 12, marginBottom: 16,
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
        }}>
          <input
            placeholder="🔍 Search by name or email..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            style={{ flex: 1 }}
          />
          <select
            value={status}
            onChange={e => { setStatus(e.target.value); setPage(1); }}>
            <option value="">All statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="converted">Converted</option>
          </select>
          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              padding: '8px 20px',
              background: showForm ? '#f1f5f9' : '#6366f1',
              color: showForm ? '#64748b' : 'white',
              border: showForm ? '1px solid #e2e8f0' : 'none'
            }}>
            {showForm ? '✕ Cancel' : '+ Add Lead'}
          </button>
        </div>

        {showForm && (
          <AddLeadForm onSuccess={() => { setShowForm(false); fetchLeads(); }} />
        )}

       <LeadTable
  leads={leads}
  onStatusChange={handleStatusChange}
  onDelete={handleDelete}
  onEdit={setEditingLead}
  loading={loading}
/>

{editingLead && (
  <EditLeadForm
    lead={editingLead}
    onSuccess={() => { setEditingLead(null); fetchLeads(); }}
    onCancel={() => setEditingLead(null)}
  />
)}

        {/* Pagination */}
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', marginTop: 16
        }}>
          <span style={{ fontSize: 14, color: '#64748b' }}>
            Showing {leads.length} of {total} leads
          </span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
              style={{
                padding: '8px 16px', background: 'white',
                border: '1px solid #e2e8f0', color: '#374151'
              }}>
              ← Prev
            </button>
            <span style={{
              padding: '8px 16px', background: '#6366f1',
              color: 'white', borderRadius: 8, fontSize: 14
            }}>
              {page}
            </span>
            <button
              disabled={leads.length < 10}
              onClick={() => setPage(p => p + 1)}
              style={{
                padding: '8px 16px', background: 'white',
                border: '1px solid #e2e8f0', color: '#374151'
              }}>
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}