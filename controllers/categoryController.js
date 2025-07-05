const Category = require('../models/Category');

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new category
exports.createCategory =  async (req, res) => {
  try {
    const category = await Category.create(req.body);
    console.log(category, 'categoryaaaaaa');
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an existing category
exports.updateCategory =  async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Category.update(req.body, {
      where: { id },
    });
    if (updated) {
      const updatedCategory = await Category.findByPk(id);
      return res.status(200).json(updatedCategory);
    }
    throw new Error('Category not found.');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    // Consider how this affects associated tasks: 
    // Option 1: Set categoryId to null for associated tasks
    // Option 2: Prevent deletion if tasks are associated (return 400/409)
    // For now, we'll allow deletion and tasks will have a null categoryId
    const deleted = await Category.destroy({
      where: { id },
    });
    if (deleted) {
      return res.status(204).send();
    }
    throw new Error('Category not found.');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};