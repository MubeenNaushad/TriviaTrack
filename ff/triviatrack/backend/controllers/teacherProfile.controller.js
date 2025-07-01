import TeacherProfile from '../models/teacherProfile.model.js';
import User from '../models/user.model.js';

// Get teacher profile
const getTeacherProfile = async (req, res) => {
  try {
    console.log('getTeacherProfile called with user:', {
      userId: req.user._id,
      userType: req.user.userType,
      teacherId: req.user.teacherId,
      email: req.user.email
    });

    const userId = req.user._id;
    let teacherId = req.user.teacherId;

    // Check if user is a teacher
    if (req.user.userType !== 'Teacher') {
      console.log('Non-teacher tried to access teacher profile');
      return res.status(403).json({
        success: false,
        message: 'Access denied. Only teachers can access teacher profiles.'
      });
    }

    // If teacher doesn't have a teacherId, generate one
    if (!teacherId) {
      console.log('Generating teacherId for user without one');
      const timestamp = Date.now().toString().slice(-6);
      const random = Math.random().toString(36).substring(2, 5).toUpperCase();
      teacherId = `T${timestamp}${random}`;
      
      // Update user with the new teacherId
      await User.findByIdAndUpdate(userId, { teacherId });
      req.user.teacherId = teacherId;
      console.log('Generated and saved teacherId:', teacherId);
    }

    let profile = await TeacherProfile.findOne({ 
      $or: [{ userId }, { teacherId }] 
    }).populate('userId', 'name email photoUrl');

    if (!profile) {
      // Create a new profile if it doesn't exist
      profile = new TeacherProfile({
        userId,
        teacherId,
        bio: '',
        experience: '',
        qualifications: '',
        teachingSubjects: [],
        socialLinks: [],
        customLinks: []
      });
      await profile.save();
    }

    res.status(200).json({
      success: true,
      profile,
      message: 'Profile retrieved successfully'
    });

  } catch (error) {
    console.error('Error fetching teacher profile:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    res.status(500).json({
      success: false,
      message: 'Failed to fetch profile',
      error: error.message
    });
  }
};

// Get public teacher profile by teacherId
const getPublicTeacherProfile = async (req, res) => {
  try {
    const { teacherId } = req.params;

    const profile = await TeacherProfile.findOne({ teacherId })
      .populate('userId', 'name email photoUrl');

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Teacher profile not found'
      });
    }

    // Check visibility settings
    if (profile.profileVisibility === 'private') {
      return res.status(403).json({
        success: false,
        message: 'This profile is private'
      });
    }

    res.status(200).json({
      success: true,
      profile,
      message: 'Profile retrieved successfully'
    });

  } catch (error) {
    console.error('Error fetching public teacher profile:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch profile',
      error: error.message
    });
  }
};

// Update teacher profile
const updateTeacherProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    let teacherId = req.user.teacherId;

    console.log('Update profile request:', {
      userId,
      teacherId,
      userType: req.user.userType,
      bodyKeys: Object.keys(req.body)
    });

    // Check if user is a teacher
    if (req.user.userType !== 'Teacher') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Only teachers can update teacher profiles.'
      });
    }

    // If teacher doesn't have a teacherId, generate one
    if (!teacherId) {
      const timestamp = Date.now().toString().slice(-6);
      const random = Math.random().toString(36).substring(2, 5).toUpperCase();
      teacherId = `T${timestamp}${random}`;
      
      // Update user with the new teacherId
      await User.findByIdAndUpdate(userId, { teacherId });
      req.user.teacherId = teacherId;
      console.log('Generated new teacherId for user:', teacherId);
    }

    const {
      bio,
      experience,
      qualifications,
      teachingSubjects,
      specializations,
      yearsOfExperience,
      education,
      certifications,
      achievements,
      socialLinks,
      customLinks,
      contactInfo,
      profileVisibility
    } = req.body;

    // Filter out empty social links and custom links
    const filteredSocialLinks = socialLinks ? socialLinks.filter(link => 
      link.url && link.url.trim() !== ''
    ) : [];
    
    const filteredCustomLinks = customLinks ? customLinks.filter(link => 
      link.url && link.url.trim() !== ''
    ) : [];

    // Validate filtered social links
    if (filteredSocialLinks.length > 0) {
      for (const link of filteredSocialLinks) {
        if (!link.url.match(/^https?:\/\/.+/)) {
          return res.status(400).json({
            success: false,
            message: `Invalid URL format for ${link.platform || 'social link'}. URLs must start with http:// or https://`
          });
        }
      }
    }

    // Validate filtered custom links
    if (filteredCustomLinks.length > 0) {
      for (const link of filteredCustomLinks) {
        if (!link.url.match(/^https?:\/\/.+/)) {
          return res.status(400).json({
            success: false,
            message: `Invalid URL format for custom link: ${link.title}. URLs must start with http:// or https://`
          });
        }
      }
    }

    let profile = await TeacherProfile.findOne({ 
      $or: [{ userId }, { teacherId }] 
    });

    if (!profile) {
      // Create new profile
      profile = new TeacherProfile({
        userId,
        teacherId,
        bio: bio || '',
        experience: experience || '',
        qualifications: qualifications || '',
        teachingSubjects: teachingSubjects || [],
        specializations: specializations || [],
        yearsOfExperience: yearsOfExperience || 0,
        education: education || {},
        certifications: certifications || [],
        achievements: achievements || [],
        socialLinks: filteredSocialLinks,
        customLinks: filteredCustomLinks,
        contactInfo: contactInfo || {},
        profileVisibility: profileVisibility || 'students-only'
      });
    } else {
      // Update existing profile
      if (bio !== undefined) profile.bio = bio;
      if (experience !== undefined) profile.experience = experience;
      if (qualifications !== undefined) profile.qualifications = qualifications;
      if (teachingSubjects !== undefined) profile.teachingSubjects = teachingSubjects;
      if (specializations !== undefined) profile.specializations = specializations;
      if (yearsOfExperience !== undefined) profile.yearsOfExperience = yearsOfExperience;
      if (education !== undefined) profile.education = { ...profile.education, ...education };
      if (certifications !== undefined) profile.certifications = certifications;
      if (achievements !== undefined) profile.achievements = achievements;
      if (socialLinks !== undefined) profile.socialLinks = filteredSocialLinks;
      if (customLinks !== undefined) profile.customLinks = filteredCustomLinks;
      if (contactInfo !== undefined) profile.contactInfo = { ...profile.contactInfo, ...contactInfo };
      if (profileVisibility !== undefined) profile.profileVisibility = profileVisibility;
    }

    console.log('About to save profile:', {
      profileId: profile._id,
      isNew: profile.isNew,
      profileData: {
        bio: profile.bio?.length,
        teachingSubjects: profile.teachingSubjects?.length,
        socialLinks: profile.socialLinks?.length
      }
    });

    await profile.save();

    console.log('Profile saved successfully');

    // Update user's basic info if provided
    if (req.body.name || req.body.email) {
      console.log('Updating user basic info:', { name: req.body.name, email: req.body.email });
      await User.findByIdAndUpdate(userId, {
        ...(req.body.name && { name: req.body.name }),
        ...(req.body.email && { email: req.body.email })
      });
    }

    const updatedProfile = await TeacherProfile.findById(profile._id)
      .populate('userId', 'name email photoUrl');

    res.status(200).json({
      success: true,
      profile: updatedProfile,
      message: 'Profile updated successfully',
      completionScore: updatedProfile.profileCompletionScore
    });

  } catch (error) {
    console.error('Error updating teacher profile:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
      errors: error.errors, // Mongoose validation errors
      code: error.code
    });
    
    // Handle specific error types
    if (error.name === 'ValidationError') {
      const validationErrors = Object.keys(error.errors).map(key => ({
        field: key,
        message: error.errors[key].message
      }));
      
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      });
    }
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Duplicate entry error',
        error: error.message
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to update profile',
      error: error.message,
      details: error.errors ? Object.keys(error.errors).map(key => ({
        field: key,
        message: error.errors[key].message
      })) : null
    });
  }
};

// Upload profile photo
const uploadProfilePhoto = async (req, res) => {
  try {
    const userId = req.user._id;
    
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    // Update user's photo URL
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { photoUrl: req.file.path }, // Assuming Cloudinary middleware sets file.path
      { new: true }
    );

    res.status(200).json({
      success: true,
      photoUrl: updatedUser.photoUrl,
      message: 'Profile photo updated successfully'
    });

  } catch (error) {
    console.error('Error uploading profile photo:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload photo',
      error: error.message
    });
  }
};

// Get teacher statistics
const getTeacherStats = async (req, res) => {
  try {
    const userId = req.user._id;
    let teacherId = req.user.teacherId;

    // Check if user is a teacher
    if (req.user.userType !== 'Teacher') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Only teachers can access teacher statistics.'
      });
    }

    // If teacher doesn't have a teacherId, generate one
    if (!teacherId) {
      const timestamp = Date.now().toString().slice(-6);
      const random = Math.random().toString(36).substring(2, 5).toUpperCase();
      teacherId = `T${timestamp}${random}`;
      
      // Update user with the new teacherId
      const User = await import('../models/user.model.js');
      await User.default.findByIdAndUpdate(userId, { teacherId });
      req.user.teacherId = teacherId;
    }

    // Get basic stats (we'll implement course/quiz stats later)
    const stats = {
      coursesCreated: 0,
      quizzesCreated: 0,
      totalStudents: 0,
      profileCompletion: 0
    };

    // Get profile completion if exists
    const profile = await TeacherProfile.findOne({ 
      $or: [{ userId }, { teacherId }] 
    });
    if (profile) {
      stats.profileCompletion = profile.profileCompletionScore || 0;
    }

    res.status(200).json({
      success: true,
      stats,
      message: 'Teacher statistics retrieved successfully'
    });

  } catch (error) {
    console.error('Error fetching teacher stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics',
      error: error.message
    });
  }
};

// Search teachers
const searchTeachers = async (req, res) => {
  try {
    const { query, subject, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    let searchQuery = { profileVisibility: { $ne: 'private' } };

    if (query) {
      searchQuery.$or = [
        { bio: { $regex: query, $options: 'i' } },
        { teachingSubjects: { $in: [new RegExp(query, 'i')] } },
        { specializations: { $in: [new RegExp(query, 'i')] } }
      ];
    }

    if (subject) {
      searchQuery.teachingSubjects = { $in: [new RegExp(subject, 'i')] };
    }

    const teachers = await TeacherProfile.find(searchQuery)
      .populate('userId', 'name email photoUrl')
      .sort({ profileCompletionScore: -1, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await TeacherProfile.countDocuments(searchQuery);

    res.status(200).json({
      success: true,
      teachers,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      },
      message: 'Teachers retrieved successfully'
    });

  } catch (error) {
    console.error('Error searching teachers:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to search teachers',
      error: error.message
    });
  }
};

// Test endpoint to verify teacher authentication
const testTeacherAuth = async (req, res) => {
  try {
    console.log('Test endpoint hit by user:', {
      userId: req.user._id,
      userType: req.user.userType,
      teacherId: req.user.teacherId,
      email: req.user.email
    });
    
    res.status(200).json({
      success: true,
      user: {
        userId: req.user._id,
        userType: req.user.userType,
        teacherId: req.user.teacherId,
        email: req.user.email
      },
      message: 'Teacher authentication test successful'
    });
  } catch (error) {
    console.error('Test endpoint error:', error);
    res.status(500).json({
      success: false,
      message: 'Test failed',
      error: error.message
    });
  }
};

export {
  getTeacherProfile,
  getPublicTeacherProfile,
  updateTeacherProfile,
  uploadProfilePhoto,
  getTeacherStats,
  searchTeachers,
  testTeacherAuth
};
