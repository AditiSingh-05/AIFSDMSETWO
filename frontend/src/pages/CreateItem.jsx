import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';

const getInitialFormData = () => ({
  itemName: '',
  description: '',
  type: 'Lost',
  location: '',
  date: new Date().toISOString().split('T')[0],
  contactInfo: '',
});

const CreateItem = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState(getInitialFormData());
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(isEditing);

  useEffect(() => {
    if (!isEditing) {
      return;
    }

    const fetchItem = async () => {
      try {
        const response = await api.get(`/items/${id}`);
        const item = response.data.data;
        setFormData({
          itemName: item.itemName || '',
          description: item.description || '',
          type: item.type || 'Lost',
          location: item.location || '',
          date: item.date ? item.date.split('T')[0] : new Date().toISOString().split('T')[0],
          contactInfo: item.contactInfo || '',
        });
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load item details');
      } finally {
        setPageLoading(false);
      }
    };

    fetchItem();
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (
      !formData.itemName ||
      !formData.description ||
      !formData.type ||
      !formData.location ||
      !formData.date ||
      !formData.contactInfo
    ) {
      setError('All fields are required');
      return;
    }

    setLoading(true);

    try {
      if (isEditing) {
        await api.put(`/items/${id}`, formData);
      } else {
        await api.post('/items', formData);
      }

      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-shell">
      <main className="page-container narrow-page">
        <div className="page-topbar">
          <button className="back-button" type="button" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </button>
          <div className="mini-brand">
            <span className="brand-mark">LF</span>
            <span>Lost & Found</span>
          </div>
        </div>

        <section className="form-card">
          <div className="form-card-header">
            <p className="eyebrow">{isEditing ? 'Update report' : 'New report'}</p>
            <h1>{isEditing ? 'Edit Item' : 'Create Item'}</h1>
            <p className="hero-copy">
              {isEditing
                ? 'Adjust the details below and save the updated report.'
                : 'Fill in the production item details using the new dummy-inspired layout.'}
            </p>
          </div>

          {error && <div className="alert error">{error}</div>}

          {pageLoading ? (
            <div className="loading">Loading item details...</div>
          ) : (
            <form onSubmit={handleSubmit} className="item-form-grid">
              <div className="form-group">
                <label htmlFor="type">Item Type</label>
                <select id="type" name="type" value={formData.type} onChange={handleChange}>
                  <option value="Lost">Lost</option>
                  <option value="Found">Found</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="date">Date</label>
                <input id="date" type="date" name="date" value={formData.date} onChange={handleChange} />
              </div>

              <div className="form-group full">
                <label htmlFor="itemName">Item Name</label>
                <input
                  id="itemName"
                  type="text"
                  name="itemName"
                  value={formData.itemName}
                  onChange={handleChange}
                  placeholder="Example: Blue backpack"
                />
              </div>

              <div className="form-group full">
                <label htmlFor="location">Location</label>
                <input
                  id="location"
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Where it was lost or found"
                />
              </div>

              <div className="form-group full">
                <label htmlFor="contactInfo">Contact Information</label>
                <input
                  id="contactInfo"
                  type="text"
                  name="contactInfo"
                  value={formData.contactInfo}
                  onChange={handleChange}
                  placeholder="Phone number or email"
                />
              </div>

              <div className="form-group full">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the item and any identifying details"
                />
              </div>

              <div className="form-actions">
                <button className="btn btn-primary" type="submit" disabled={loading}>
                  {loading ? 'Saving...' : isEditing ? 'Save Changes' : 'Create Item'}
                </button>
                <button className="btn btn-secondary" type="button" onClick={() => navigate('/dashboard')}>
                  Cancel
                </button>
              </div>
            </form>
          )}
        </section>
      </main>
    </div>
  );
};

export default CreateItem;
