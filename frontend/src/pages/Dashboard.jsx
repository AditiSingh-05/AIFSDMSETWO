import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import ItemCard from '../components/ItemCard';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    let filtered = items;

    if (searchQuery) {
      filtered = filtered.filter(
        (item) =>
          item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterType) {
      filtered = filtered.filter((item) => item.type === filterType);
    }

    setFilteredItems(filtered);
  }, [searchQuery, filterType, items]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await api.get('/items');
      setItems(response.data.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch items');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async (id) => {
    setError('');
    setSuccess('');

    try {
      await api.delete(`/items/${id}`);
      setSuccess('Item deleted successfully');
      setShowDeleteConfirm(null);
      fetchItems();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete item');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="app-shell">
      <nav className="top-nav">
        <button className="brand-button" type="button" onClick={() => navigate('/dashboard')}>
          <span className="brand-mark">LF</span>
          <span>Lost & Found</span>
        </button>
        <div className="nav-actions">
          <span className="welcome-text">Welcome, {user?.name || 'User'}</span>
          <button className="nav-link" type="button" onClick={() => navigate('/items/new')}>
            Add Item
          </button>
          <button className="logout-button" type="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <main className="page-container">
        <section className="hero-panel">
          <div>
            <p className="eyebrow">Campus recovery hub</p>
            <h1>Track lost and found items faster.</h1>
            <p className="hero-copy">
              Search real production records, filter by status, and report a new item from its own page.
            </p>
          </div>
          <button className="btn btn-primary hero-action" type="button" onClick={() => navigate('/items/new')}>
            Report Item
          </button>
        </section>

        {(error || success) && (
          <div className="message-stack">
            {error && <div className="alert error">{error}</div>}
            {success && <div className="alert success">{success}</div>}
          </div>
        )}

        <section className="dashboard-card">
          <div className="section-header">
            <div>
              <p className="eyebrow">Find records</p>
              <h2>Item Directory</h2>
            </div>
            <span className="count-pill">{filteredItems.length} shown</span>
          </div>

          <div className="controls">
            <input
              type="text"
              placeholder="Search by item name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="">All Items</option>
              <option value="Lost">Lost Items</option>
              <option value="Found">Found Items</option>
            </select>
          </div>
        </section>

        {loading ? (
          <div className="loading">Loading items...</div>
        ) : filteredItems.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">LF</div>
            <h3>{items.length === 0 ? 'No items yet' : 'No items found'}</h3>
            <p>
              {items.length === 0
                ? 'Create the first lost or found report to get started.'
                : 'Try changing your search text or status filter.'}
            </p>
          </div>
        ) : (
          <div className="items-grid">
            {filteredItems.map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                isOwner={item.userId?._id === user?.id || item.userId?._id === user?._id}
                onEdit={() => navigate(`/items/${item._id}/edit`)}
                onDelete={(id) => setShowDeleteConfirm(id)}
              />
            ))}
          </div>
        )}
      </main>

      {showDeleteConfirm && (
        <div className="modal-overlay" onClick={() => setShowDeleteConfirm(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Delete this item?</h3>
            <p>This action cannot be undone.</p>
            <div className="modal-actions">
              <button className="btn-confirm" onClick={() => handleDeleteItem(showDeleteConfirm)}>
                Delete
              </button>
              <button className="btn-cancel" onClick={() => setShowDeleteConfirm(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
