import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import RecipeList from './components/RecipeList';
import RecipeForm from './components/RecipeForm';
import RecipeDetail from './components/RecipeDetail';
import ConfirmModal from './components/ConfirmModal';
import { getAllRecipes, createRecipe, updateRecipe, deleteRecipe } from './services/api';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchRecipes = useCallback(async () => {
    try {
      const data = await getAllRecipes();
      setRecipes(data);
    } catch (error) {
      console.error('Failed to fetch recipes:', error);
      showToast('Failed to load recipes.', 'error');
    }
  }, []);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  const handleAddRecipe = () => {
    setEditingRecipe(null);
    setIsFormOpen(true);
  };

  const handleEditRecipe = (recipe) => {
    setEditingRecipe(recipe);
    setIsFormOpen(true);
  };

  const handleViewRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    setIsDetailOpen(true);
  };

  const handleDeletePrompt = (recipe) => {
    setDeleteTarget(recipe);
  };

  const handleFormSubmit = async (data, id) => {
    try {
      if (id) {
        await updateRecipe(id, data);
        showToast('Recipe updated successfully! 🎉');
      } else {
        await createRecipe(data);
        showToast('Recipe added successfully! 🎉');
      }
      setIsFormOpen(false);
      setEditingRecipe(null);
      await fetchRecipes();
    } catch (error) {
      console.error('Failed to save recipe:', error);
      showToast('Failed to save recipe. Please try again.', 'error');
    }
  };

  const handleDeleteConfirm = async (id) => {
    try {
      await deleteRecipe(id);
      showToast('Recipe deleted successfully.');
      setDeleteTarget(null);
      await fetchRecipes();
    } catch (error) {
      console.error('Failed to delete recipe:', error);
      showToast('Failed to delete recipe. Please try again.', 'error');
    }
  };

  return (
    <div className="app">
      <Navbar onAddRecipe={handleAddRecipe} />

      <main className="main-content">
        <RecipeList
          recipes={recipes}
          onView={handleViewRecipe}
          onEdit={handleEditRecipe}
          onDelete={handleDeletePrompt}
        />
      </main>

      {isFormOpen && (
        <RecipeForm
          recipe={editingRecipe}
          onSubmit={handleFormSubmit}
          onClose={() => {
            setIsFormOpen(false);
            setEditingRecipe(null);
          }}
        />
      )}

      {isDetailOpen && selectedRecipe && (
        <RecipeDetail
          recipe={selectedRecipe}
          onClose={() => {
            setIsDetailOpen(false);
            setSelectedRecipe(null);
          }}
          onEdit={handleEditRecipe}
          onDelete={handleDeletePrompt}
        />
      )}

      {deleteTarget && (
        <ConfirmModal
          recipe={deleteTarget}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      {toast && (
        <div className={`toast toast-${toast.type}`}>
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}

export default App;
