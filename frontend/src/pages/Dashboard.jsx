import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import ItemCard from '../components/ItemCard';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('');

  const [formData, setFormData] = useState({
    itemName: '',
    description: '',
    type: 'Lost',
    location: '',
    date: new Date().toISOString().split('T')[0],
    contactInfo: '',
  });

  const [editingId, setEditingId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    filterItems();
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

  const filterItems = () => {
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
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (
      !formData.itemName ||
      !formData.description ||
      !formData.location ||
      !formData.contactInfo
    ) {
      setError('All fields are required');
      return;
    }

    try {
      if (editingId) {
        await api.put(`/items/${editingId}`, formData);
        setSuccess('Item updated successfully');
        setEditingId(null);
      } else {
        await api.post('/items', formData);
        setSuccess('Item added successfully');
      }

      setFormData({
        itemName: '',
        description: '',
        type: 'Lost',
        location: '',
        date: new Date().toISOString().split('T')[0],
        contactInfo: '',
      });

      fetchItems();
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to save item'
      );
    }
  };

  const handleEditItem = (item) => {
    setFormData({
      itemName: item.itemName,
      description: item.description,
      type: item.type,
      location: item.location,
      date: item.date.split('T')[0],
      contactInfo: item.contactInfo,
    });
    setEditingId(item._id);
    window.scrollTo(0, 0);
  };

  const handleCancelEdit = () => {
    setFormData({
      itemName: '',
      description: '',
      type: 'Lost',
      location: '',
      date: new Date().toISOString().split('T')[0],
      contactInfo: '',
    });
    setEditingId(null);
  };

  const handleDeleteItem = async (id) => {
    setError('');

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
    <div className="container">
      <nav style={{ marginLeft: '-20px', marginRight: '-20px', marginBottom: '2rem' }}>
        <div className="container">
          <h1>🔍 Lost & Found</h1>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <span>Welcome, {user?.name}!</span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </nav>

      <div className="dashboard">
        {error && <div className="alert error">{error}</div>}
        {success && <div className="alert success">{success}</div>}

        <div className="dashboard-section">
          <h2>{editingId ? '✏️ Edit Item' : '➕ Add New Item'}</h2>
          <form onSubmit={handleAddItem}>
            <div className="add-item-form">
              <div className="form-group">
                <label htmlFor="itemName">Item Name *</label>
                <input
                  type="text"
                  id="itemName"
                  name="itemName"
                  value={formData.itemName}
                  onChange={handleFormChange}
                  placeholder="e.g., Silver Watch, Blue Backpack"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="type">Type *</label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleFormChange}
                  required
                >
                  <option value="Lost">Lost</option>
                  <option value="Found">Found</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="location">Location *</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleFormChange}
                  placeholder="e.g., Library Main Hall"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="date">Date *</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleFormChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description *</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  placeholder="Describe the item in detail..."
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="contactInfo">Contact Information *</label>
                <input
                  type="text"
                  id="contactInfo"
                  name="contactInfo"
                  value={formData.contactInfo}
                  onChange={handleFormChange}
                  placeholder="e.g., email@example.com or phone number"
                  required
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-submit">
                  {editingId ? 'Update Item' : 'Add Item'}
                </button>
                {editingId && (
                  <button
                    type="button"
                    className="btn btn-cancel"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>

        <div className="dashboard-section">
          <h2>🔍 Search Items</h2>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search by item name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="">All Types</option>
              <option value="Lost">Lost</option>
              <option value="Found">Found</option>
            </select>
          </div>
        </div>

        <div className="dashboard-section">
          <h2>
            📋 Items ({filteredItems.length})
            {searchQuery || filterType ? ' - Filtered' : ''}
          </h2>

          {loading ? (
            <div className="loading">Loading items...</div>
          ) : filteredItems.length === 0 ? (
            <div className="empty-state">
              <h3>
                {items.length === 0
                  ? 'No items yet'
                  : 'No items match your search'}
              </h3>
              <p>
                {items.length === 0
                  ? 'Add the first item to get started!'
                  : 'Try adjusting your search filters.'}
              </p>
            </div>
          ) : (
            <div className="items-grid">
              {filteredItems.map((item) => (
                <ItemCard
                  key={item._id}
                  item={item}
                  isOwner={item.userId._id === user?.id}
                  onEdit={handleEditItem}
                  onDelete={(id) => setShowDeleteConfirm(id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="modal-overlay" onClick={() => setShowDeleteConfirm(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Are you sure you want to delete this item?</h3>
            <p>This action cannot be undone.</p>
            <div className="modal-actions">
              <button
                className="btn-confirm"
                onClick={() => handleDeleteItem(showDeleteConfirm)}
              >
                Delete
              </button>
              <button
                className="btn-cancel"
                onClick={() => setShowDeleteConfirm(null)}
              >
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
