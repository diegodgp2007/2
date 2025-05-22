import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', description: '' });
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // URL del backend
  const API_URL = 'http://localhost:5050/api';

  // Cargar items al iniciar
  useEffect(() => {
    fetchItems();
  }, []);

  // Función para obtener items del backend
  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/items`);
      setItems(response.data);
      setError(null);
    } catch (err) {
      setError('Error al cargar los datos. Por favor, intente nuevamente.');
      console.error('Error fetching items:', err);
    } finally {
      setLoading(false);
    }
  };

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prev => ({ ...prev, [name]: value }));
  };

  // Enviar nuevo item o actualizar existente
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newItem.name.trim()) return;

    try {
      setLoading(true);
      if (editingItem) {
        await axios.put(`${API_URL}/items/${editingItem._id}`, newItem);
        setEditingItem(null);
      } else {
        await axios.post(`${API_URL}/items`, newItem);
      }
      setNewItem({ name: '', description: '' });
      fetchItems();
    } catch (err) {
      setError('Error al guardar el item. Por favor, intente nuevamente.');
      console.error('Error saving item:', err);
    } finally {
      setLoading(false);
    }
  };

  // Iniciar edición de un item
  const handleEdit = (item) => {
    setEditingItem(item);
    setNewItem({ name: item.name, description: item.description });
  };

  // Eliminar un item
  const handleDelete = async (id) => {
    if (!window.confirm('¿Está seguro de que desea eliminar este item?')) return;

    try {
      setLoading(true);
      await axios.delete(`${API_URL}/items/${id}`);
      fetchItems();
    } catch (err) {
      setError('Error al eliminar el item. Por favor, intente nuevamente.');
      console.error('Error deleting item:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Aplicación con Docker, MongoDB y React</h1>
      </header>
      
      <main>
        <section className="form-section">
          <h2>{editingItem ? 'Editar Item' : 'Agregar Nuevo Item'}</h2>
          {error && <p className="error">{error}</p>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nombre:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={newItem.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Descripción:</label>
              <textarea
                id="description"
                name="description"
                value={newItem.description}
                onChange={handleChange}
              />
            </div>
            
            <button type="submit" disabled={loading}>
              {loading ? 'Guardando...' : (editingItem ? 'Actualizar Item' : 'Guardar Item')}
            </button>
            {editingItem && (
              <button
                type="button"
                onClick={() => {
                  setEditingItem(null);
                  setNewItem({ name: '', description: '' });
                }}
                className="cancel-button"
              >
                Cancelar Edición
              </button>
            )}
          </form>
        </section>
        
        <section className="items-section">
          <h2>Items Guardados</h2>
          {loading && <p>Cargando...</p>}
          
          {items.length > 0 ? (
            <ul className="items-list">
              {items.map(item => (
                <li key={item._id} className="item-card">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <small>Creado: {new Date(item.createdAt).toLocaleString()}</small>
                  <div className="item-actions">
                    <button onClick={() => handleEdit(item)} className="edit-button">
                      Editar
                    </button>
                    <button onClick={() => handleDelete(item._id)} className="delete-button">
                      Eliminar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay items guardados.</p>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;