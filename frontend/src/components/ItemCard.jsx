import React from 'react';

const ItemCard = ({ item, isOwner, onEdit, onDelete }) => {
  const date = new Date(item.date).toLocaleDateString();
  const itemTypeClass = item.type === 'Lost' ? 'lost' : 'found';
  const initials =
    item.itemName
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join('') || 'IT';

  return (
    <div className={`item-card ${itemTypeClass}`}>
      <div className="item-visual">{initials}</div>
      <div className="item-content">
        <span className={`item-type ${itemTypeClass}`}>{item.type}</span>
        <div className="item-name">{item.itemName}</div>
        <div className="item-description">{item.description}</div>

        <div className="item-meta">
          <div className="item-location">{item.location}</div>
          <div>{date}</div>
        </div>

        <div className="item-contact">
          <strong>Contact</strong>
          {item.contactInfo}
        </div>

        {item.userId && (
          <div className="item-owner">
            Posted by <strong>{item.userId.name}</strong>
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
    </div>
  );
};

export default ItemCard;
