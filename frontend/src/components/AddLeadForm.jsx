import { useState } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';

export default function AddLeadForm({ onSuccess }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', assignedTo: '' });
  const [error, setError] = useState('');

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await api.post('/leads', form);
    toast.success('Lead added successfully!');
    setForm({ name: '', email: '', phone: '', assignedTo: '' });
    onSuccess();
  } catch (err) {
    toast.error(err.response?.data?.message || 'Failed to add lead');
  }
};

  return (
    <form onSubmit={handleSubmit}
      style={{ background: '#f9fafb', padding: 16, borderRadius: 8, marginBottom: 16 }}>
      <h4>Add New Lead</h4>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <input
          placeholder="Full name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          style={{ padding: 8 }}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          style={{ padding: 8 }}
          required
        />
        <input
          placeholder="Phone (optional)"
          value={form.phone}
          onChange={e => setForm({ ...form, phone: e.target.value })}
          style={{ padding: 8 }}
        />
        <input
          placeholder="Assign to (optional)"
          value={form.assignedTo}
          onChange={e => setForm({ ...form, assignedTo: e.target.value })}
          style={{ padding: 8 }}
        />
      </div>
      <button type="submit"
        style={{ marginTop: 12, padding: '8px 20px', cursor: 'pointer' }}>
        Save Lead
      </button>
    </form>
  );
}