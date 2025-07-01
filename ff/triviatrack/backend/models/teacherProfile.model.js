import mongoose from 'mongoose';

const socialLinkSchema = new mongoose.Schema({
  platform: {
    type: String,
    enum: ['linkedin', 'github', 'twitter', 'website', 'youtube', 'facebook'],
    required: true
  },
  url: {
    type: String,
    required: true
  },
  label: String
});

const customLinkSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 50 },
  url: {
    type: String,
    required: true
  },
  description: { type: String, maxlength: 200 }
});

const teacherProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  teacherId: {
    type: String,
    required: true,
    unique: true
  },
  bio: {
    type: String,
    maxlength: 1000,
    default: ''
  },
  experience: {
    type: String,
    maxlength: 2000,
    default: ''
  },
  qualifications: {
    type: String,
    maxlength: 1000,
    default: ''
  },
  teachingSubjects: {
    type: [String],
    default: []
  },
  specializations: {
    type: [String],
    default: []
  },
  yearsOfExperience: {
    type: Number,
    min: 0,
    max: 50,
    default: 0
  },
  education: {
    degree: String,
    institution: String,
    year: Number,
    field: String
  },
  certifications: [{
    name: String,
    issuingOrganization: String,
    dateIssued: Date,
    expirationDate: Date,
    credentialId: String
  }],
  achievements: [{
    title: String,
    description: String,
    date: Date,
    category: {
      type: String,
      enum: ['award', 'publication', 'conference', 'project', 'other']
    }
  }],
  socialLinks: [socialLinkSchema],
  customLinks: [customLinkSchema],
  contactInfo: {
    phone: String,
    office: String,
    officeHours: String,
    preferredContactMethod: {
      type: String,
      enum: ['email', 'phone', 'office'],
      default: 'email'
    }
  },
  profileVisibility: {
    type: String,
    enum: ['public', 'students-only', 'private'],
    default: 'students-only'
  },
  isProfileComplete: {
    type: Boolean,
    default: false
  },
  profileCompletionScore: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  }
}, {
  timestamps: true
});

// Calculate profile completion score
teacherProfileSchema.methods.calculateCompletionScore = function() {
  let score = 0;
  const fields = [
    { field: 'bio', weight: 15 },
    { field: 'experience', weight: 20 },
    { field: 'qualifications', weight: 15 },
    { field: 'teachingSubjects', weight: 10 },
    { field: 'yearsOfExperience', weight: 5 },
    { field: 'education.degree', weight: 10 },
    { field: 'socialLinks', weight: 10 },
    { field: 'contactInfo.phone', weight: 5 },
    { field: 'certifications', weight: 10 }
  ];

  fields.forEach(({ field, weight }) => {
    const value = field.includes('.') 
      ? field.split('.').reduce((obj, key) => obj?.[key], this)
      : this[field];
    
    if (value && (Array.isArray(value) ? value.length > 0 : value.toString().trim())) {
      score += weight;
    }
  });

  this.profileCompletionScore = score;
  this.isProfileComplete = score >= 80;
  return score;
};

// Pre-save middleware to calculate completion score
teacherProfileSchema.pre('save', function(next) {
  this.calculateCompletionScore();
  next();
});

export default mongoose.model('TeacherProfile', teacherProfileSchema);
