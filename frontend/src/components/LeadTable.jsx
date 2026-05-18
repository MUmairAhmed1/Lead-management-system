import { useState } from 'react';
import EditLeadForm from './EditLeadForm';

const STATUS_COLORS = {
  new: '#3b82f6',
  contacted: '#f59e0b',
  converted: '#10b981'
};

export default function LeadTable({ leads, onStatusChange, onDelete, loading, onEdit }) {
  if (loading) return (
    <div style={{ background: 'white', borderRadius: 12, padding: 60,
      display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div style={{ width: 40, height: 40, border: '4px solid #e2e8f0',
        borderTop: '4px solid #6366f1', borderRadius: '50%',
        animation: 'spin 0.8s linear infinite' }} />
    </div>
  );

  if (!leads.length) return (
    <div style={{ background: 'white', borderRadius: 12, padding: 60,
      textAlign: 'center', color: '#64748b', fontSize: 15 }}>
      No leads found. Add your first lead!
    </div>
  );
  return (
    <table>
      <thead>
        <tr>
          {['Name', 'Email', 'Phone', 'Status', 'Assigned To', 'Actions'].map(h => (
            <th key={h}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {leads.map(lead => (
          <tr key={lead._id}>
            <td style={{ fontWeight: 500 }}>{lead.name}</td>
            <td style={{ color: '#64748b' }}>{lead.email}</td>
            <td style={{ color: '#64748b' }}>{lead.phone || '—'}</td>
            <td>
              <select
                value={lead.status}
                onChange={e => onStatusChange(lead._id, e.target.value)}
                style={{
                  color: STATUS_COLORS[lead.status],
                  fontWeight: 600,
                  padding: '4px 8px',
                  borderRadius: 6
                }}>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="converted">Converted</option>
              </select>
            </td>
            <td style={{ color: '#64748b' }}>{lead.assignedTo || '—'}</td>
            <td>
  <button
    onClick={() => onEdit(lead)}
    style={{
      color: '#6366f1',
      background: '#eef2ff',
      border: '1px solid #c7d2fe',
      padding: '6px 12px',
      borderRadius: 6,
      fontSize: 13,
      marginRight: 8
    }}>
    Edit
  </button>
  <button
    onClick={() => onDelete(lead._id)}
    style={{
      color: '#ef4444',
      background: '#fef2f2',
      border: '1px solid #fecaca',
      padding: '6px 12px',
      borderRadius: 6,
      fontSize: 13
    }}>
    Delete
  </button>
</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}