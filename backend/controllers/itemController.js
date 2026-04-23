const Item = require('../models/Item');

exports.getItems = async (req, res, next) => {
  try {
    const items = await Item.find().populate('userId', 'name email');

    res.status(200).json({
      success: true,
      count: items.length,
      data: items
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getItem = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id).populate('userId', 'name email');

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    res.status(200).json({
      success: true,
      data: item
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.createItem = async (req, res, next) => {
  try {
    const { itemName, description, type, location, date, contactInfo } = req.body;

    if (!itemName || !description || !type || !location || !date || !contactInfo) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    if (!['Lost', 'Found'].includes(type)) {
      return res.status(400).json({
        success: false,
        message: 'Type must be either Lost or Found'
      });
    }

    const item = await Item.create({
      itemName,
      description,
      type,
      location,
      date,
      contactInfo,
      userId: req.user.id
    });

    const populatedItem = await item.populate('userId', 'name email');

    res.status(201).json({
      success: true,
      message: 'Item created successfully',
      data: populatedItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create item'
    });
  }
};

exports.updateItem = async (req, res, next) => {
  try {
    let item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    if (item.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this item'
      });
    }

    const updateFields = ['itemName', 'description', 'type', 'location', 'date', 'contactInfo'];
    updateFields.forEach(field => {
      if (req.body[field]) {
        item[field] = req.body[field];
      }
    });

    item = await item.save();
    const populatedItem = await item.populate('userId', 'name email');

    res.status(200).json({
      success: true,
      message: 'Item updated successfully',
      data: populatedItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update item'
    });
  }
};

exports.deleteItem = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    if (item.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this item'
      });
    }

    await Item.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Item deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete item'
    });
  }
};

exports.searchItems = async (req, res, next) => {
  try {
    const { query, type } = req.query;

    let searchFilter = {};

    if (query) {
      searchFilter.$or = [
        { itemName: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ];
    }

    if (type && ['Lost', 'Found'].includes(type)) {
      searchFilter.type = type;
    }

    const items = await Item.find(searchFilter).populate('userId', 'name email');

    res.status(200).json({
      success: true,
      count: items.length,
      data: items
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
