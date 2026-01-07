import React from 'react';
import { FiCheck, FiTrash2, FiEdit2 } from 'react-icons/fi';
import './TodoItem.css';

interface TodoItemProps {
  id: number;
  title: string;
  completed: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit?: (id: number, newTitle: string) => void;
  disabled?: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({
  id,
  title,
  completed,
  onToggle,
  onDelete,
  onEdit,
  disabled = false,
}) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editTitle, setEditTitle] = React.useState(title);

  const handleEdit = () => {
    if (editTitle.trim() && onEdit) {
      onEdit(id, editTitle);
      setIsEditing(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleEdit();
    if (e.key === 'Escape') {
      setIsEditing(false);
      setEditTitle(title);
    }
  };

  return (
    <div className={`todo-item ${completed ? 'completed' : ''}`}>
      <div className="todo-item-content">
        <button
          className={`todo-checkbox ${completed ? 'checked' : ''}`}
          onClick={() => !disabled && onToggle(id)}
          disabled={disabled}
          aria-label={completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {completed && <FiCheck className="check-icon" />}
        </button>

        <div className="todo-text">
          {isEditing ? (
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={handleKeyPress}
              onBlur={handleEdit}
              className="edit-input"
              autoFocus
            />
          ) : (
            <>
              <span className="todo-title">{title}</span>
              <span className="todo-status">
                {completed ? '✅ Completed' : '⏳ Pending'}
              </span>
            </>
          )}
        </div>
      </div>

      <div className="todo-actions">
        {onEdit && !isEditing && (
          <button
            className="action-button edit-button"
            onClick={() => setIsEditing(true)}
            disabled={disabled}
            aria-label="Edit todo"
          >
            <FiEdit2 />
          </button>
        )}
        
        <button
          className="action-button delete-button"
          onClick={() => !disabled && onDelete(id)}
          disabled={disabled}
          aria-label="Delete todo"
        >
          <FiTrash2 />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;