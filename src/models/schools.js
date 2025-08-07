import mongoose from 'mongoose';

const schoolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Integrated Schools',
      'CBC Schools',
      'Special Schools',
      'International Schools',
      'Kindergartens',
      'Junior High Schools',
    ],
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
  },
  website: {
    type: String,
    trim: true,
  },
  shortDescription: {
    type: String,
    trim: true,
    maxlength: 200,
  },
  longDescription: {
    type: String,
    trim: true,
  },
  grades: {
    type: [String], // e.g. ['1st Grade', '2nd Grade', ...]
    default: [],
  },
  tuitionFees: {
    type: String, // Could be stored as comma-separated or better as an array of numbers
  },
  busAvailable: {
    type: Boolean,
    default: false,
  },
  busFees: {
    type: Number,
    default: 0,
  },
  googleMapsLink: {
    type: String,
    trim: true,
  },
  logoUrl: {
    type: String,
    trim: true,
  },
  frontPhotoUrl: {
    type: String,
    trim: true,
  },
  additionalPhotosUrls: {
    type: [String],
    default: [],
  },
  letterOfIncorporationUrl: {
    type: String,
    trim: true,
  },
  goodConductDocUrl: {
    type: String,
    trim: true,
  },
  ratings: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      rating: { type: Number, min: 1, max: 5 },
    },
  ],
  comments: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      text: String,
      rating: { type: Number, min: 1, max: 5 },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  approved: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: { createdAt: true, updatedAt: true }
});

const School = mongoose.model('School', schoolSchema);

export default School;