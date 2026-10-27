import React from 'react';

const ConfirmModal = ({ recipe, onConfirm, onCancel }) => {
  if (!recipe) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content confirm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="confirm-icon">⚠️</div>
        <h2>Delete Recipe</h2>
        <p>
          Are you sure you want to delete <strong>"{recipe.name}"</strong>?
        </p>
        <p className="confirm-subtitle">This action cannot be undone.</p>
        <div className="confirm-actions">
          <button className="btn btn-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={() => onConfirm(recipe._id || recipe.id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
