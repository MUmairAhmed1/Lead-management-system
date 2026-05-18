import { useState } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';

export default function EditLeadForm({ lead, onSuccess, onCancel }) {
  const [form, setForm] = useState({
    name:       lead.name,
    email:      lead.email,
    phone:      lead.phone      || '',
    assignedTo: lead.assignedTo || '',
    status:     lead.status,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/leads/${lead._id}`, form);
      toast.success('Lead updated!');
      onSuccess();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update lead');
    }
  };

  const inputStyle = { width: '100%', padding: '8px 12px' };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0,
      width: '100%', height: '100%',
      background: 'rgba(0,0,0,0.4)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'white', borderRadius: 16,
        padding: 32, width: '100%', maxWidth: 480,
        boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>Edit Lead</h3>
          <button onClick={onCancel} style={{
            background: 'none', border: 'none',
            fontSize: 20, color: '#64748b', cursor: 'pointer'
          }}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>
                Full name
              </label>
              <input
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                style={inputStyle}
                required
              />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                style={inputStyle}
                required
              />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>
                Phone
              </label>
              <input
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>
                Assigned to
              </label>
              <input
                value={form.assignedTo}
                onChange={e => setForm({ ...form, assignedTo: e.target.value })}
                style={inputStyle}
              />
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>
              Status
            </label>
            <select
              value={form.status}
              onChange={e => setForm({ ...form, status: e.target.value })}
              style={{ ...inputStyle }}>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="converted">Converted</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <button type="button" onClick={onCancel} style={{
              flex: 1, padding: 12,
              background: '#f1f5f9', color: '#64748b',
              border: '1px solid #e2e8f0', borderRadius: 8
            }}>
              Cancel
            </button>
            <button type="submit" style={{
              flex: 1, padding: 12,
              background: '#6366f1', color: 'white',
              border: 'none', borderRadius: 8,
              fontWeight: 600
            }}>
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}