import { useState, useEffect } from 'react';
import api from '../api/axios';

export default function AnalyticsCards() {
  const [stats, setStats] = useState({ total: 0, new: 0, contacted: 0, converted: 0 });

  useEffect(() => {
    api.get('/leads/analytics').then(({ data }) => setStats(data));
  }, []);

  const cards = [
    { label: 'Total Leads',  value: stats.total,     color: '#6366f1', bg: '#eef2ff' },
    { label: 'New',          value: stats.new,        color: '#3b82f6', bg: '#eff6ff' },
    { label: 'Contacted',    value: stats.contacted,  color: '#f59e0b', bg: '#fffbeb' },
    { label: 'Converted',    value: stats.converted,  color: '#10b981', bg: '#ecfdf5' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
      {cards.map(card => (
        <div key={card.label} style={{
          background: card.bg,
          border: `1px solid ${card.color}22`,
          borderRadius: 12,
          padding: '20px 24px',
        }}>
          <p style={{ margin: 0, fontSize: 13, color: '#6b7280' }}>{card.label}</p>
          <p style={{ margin: '4px 0 0', fontSize: 32, fontWeight: 700, color: card.color }}>
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}