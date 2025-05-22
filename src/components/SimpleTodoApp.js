import React, { useEffect, useState } from 'react';

const API = 'http://localhost:4000';

function SimpleTodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [editId, setEditId] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await fetch(`${API}/todos`);
    const data = await res.json();
    setTodos(data);
  };

  const handleSubmit = async () => {
    if (!input.trim()) return;

    try {
      if (editId) {
        const res = await fetch(`${API}/todos/${editId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: input }),
        });

        if (!res.ok) {
          const errorData = await res.json();
          console.error('Edit error:', errorData.error);
          return;
        }

        const updatedTodo = await res.json();
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === editId ? updatedTodo : todo
          )
        );
        setEditId(null);
      } else {
        const res = await fetch(`${API}/todos`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: input }),
        });

        if (!res.ok) {
          const errorData = await res.json();
          console.error('Create error:', errorData.error);
          return;
        }

        const newTodo = await res.json();
        setTodos((prevTodos) => [...prevTodos, newTodo]);
      }

      setInput('');
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API}/todos/${id}`, { method: 'DELETE' });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Unknown error' }));
        console.error('Failed to delete:', errorData.error);
        return;
      }

      setTodos(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleEdit = (todo) => {
    setInput(todo.text);
    setEditId(todo.id);
  };

  const sendToSlack = async () => {
    try {
      const res = await fetch(`${API}/summarize`, {
        method: 'POST',
      });

      const result = await res.json();
      setStatus(result.success ? '✅ Sent to Slack!' : `❌ ${result.error}`);
    } catch {
      setStatus('❌ Failed to send.');
    }

    setTimeout(() => setStatus(null), 3000);
  };

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto', padding: 20, background: '#000', color: '#fff', borderRadius: 10 }}>
      <h2 style={{ textAlign: 'center' }}>📝 To-Do</h2>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Write a todo..."
        style={{
          width: '100%',
          padding: 10,
          marginBottom: 10,
          backgroundColor: '#fff',
          color: '#000',
          border: 'none',
          borderRadius: 5,
        }}
      />
      <button
        onClick={handleSubmit}
        style={{
          width: '100%',
          padding: 10,
          background: '#000',
          color: 'white',
          border: 'none',
          borderRadius: 9999,
          cursor: 'pointer',
          marginBottom: 20,
          transition: 'background 0.3s',
        }}
        onMouseOver={(e) => e.target.style.background = '#4B0000'}
        onMouseOut={(e) => e.target.style.background = '#000'}
      >
        {editId ? 'Update' : 'Add'}
      </button>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map((todo) => (
          <li key={todo.id} style={{ marginBottom: 10, background: '#1c1c1c', padding: 10, borderRadius: 5 }}>
            {todo.text}
            <div style={{ marginTop: 5 }}>
              <button
                onClick={() => handleEdit(todo)}
                style={{
                  marginRight: 10,
                  background: '#000',
                  color: '#fff',
                  border: 'none',
                  padding: '5px 10px',
                  borderRadius: 9999,
                  cursor: 'pointer',
                  transition: 'background 0.3s',
                }}
                onMouseOver={(e) => e.target.style.background = '#4B0000'}
                onMouseOut={(e) => e.target.style.background = '#000'}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(todo.id)}
                style={{
                  background: '#000',
                  color: '#fff',
                  border: 'none',
                  padding: '5px 10px',
                  borderRadius: 9999,
                  cursor: 'pointer',
                  transition: 'background 0.3s',
                }}
                onMouseOver={(e) => e.target.style.background = '#4B0000'}
                onMouseOut={(e) => e.target.style.background = '#000'}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <button
        onClick={sendToSlack}
        style={{
          width: '100%',
          padding: 10,
          background: '#000',
          color: 'white',
          border: 'none',
          borderRadius: 9999,
          cursor: 'pointer',
          marginTop: 20,
          transition: 'background 0.3s',
        }}
        onMouseOver={(e) => e.target.style.background = '#4B0000'}
        onMouseOut={(e) => e.target.style.background = '#000'}
        disabled={todos.length === 0}
      >
        Send Summary to Slack
      </button>

      {status && <p style={{ marginTop: 10 }}>{status}</p>}
    </div>
  );
}

export default SimpleTodoApp;
