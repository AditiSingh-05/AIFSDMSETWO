import React from 'react';

const ItemCard = ({ item, isOwner, onEdit, onDelete }) => {
  const date = new Date(item.date).toLocaleDateString();
  const itemTypeClass = item.type === 'Lost' ? 'lost' : 'found';

  return (
    <div className={`item-card ${itemTypeClass}`}>
      <span className={`item-type ${itemTypeClass}`}>{item.type}</span>

      <div className="item-name">{item.itemName}</div>

      <div className="item-description">{item.description}</div>

      <div className="item-meta">
        <div>
          <span className="item-location">📍 {item.location}</span>
        </div>
        <div>📅 {date}</div>
      </div>

      <div className="item-contact">
        <strong>Contact:</strong>
        {item.contactInfo}
      </div>

      {item.userId && (
        <div style={{ fontSize: '0.9rem', color: '#888', marginBottom: '0.75rem' }}>
          Posted by: <strong>{item.userId.name}</strong>
        </div>
      )}

      {isOwner && (
        <div className="item-actions">
          <button className="btn-edit" onClick={() => onEdit(item)}>
            Edit
          </button>
          <button className="btn-delete" onClick={() => onDelete(item._id)}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ItemCard;
