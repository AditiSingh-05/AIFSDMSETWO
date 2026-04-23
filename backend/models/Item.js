const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: [true, 'Please provide an item name'],
      trim: true,
      maxlength: [100, 'Item name cannot be more than 100 characters']
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
      maxlength: [500, 'Description cannot be more than 500 characters']
    },
    type: {
      type: String,
      enum: ['Lost', 'Found'],
      required: [true, 'Please specify if item is Lost or Found']
    },
    location: {
      type: String,
      required: [true, 'Please provide the location'],
      maxlength: [200, 'Location cannot be more than 200 characters']
    },
    date: {
      type: Date,
      required: [true, 'Please provide the date']
    },
    contactInfo: {
      type: String,
      required: [true, 'Please provide contact information'],
      maxlength: [100, 'Contact info cannot be more than 100 characters']
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Item must belong to a user']
    }
  },
  {
    timestamps: true
  }
);

itemSchema.index({ itemName: 'text', description: 'text' });

module.exports = mongoose.model('Item', itemSchema);
