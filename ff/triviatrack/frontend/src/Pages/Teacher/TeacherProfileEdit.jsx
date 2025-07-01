import { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaGraduationCap, 
  FaBriefcase, 
  FaLinkedin, 
  FaGithub, 
  FaTwitter, 
  FaGlobe, 
  FaPlus, 
  FaTrash, 
  FaSave,
  FaCamera,
  FaSpinner,
  FaYoutube,
  FaFacebook,
  FaTrophy,
  FaCertificate
} from "react-icons/fa";
import Sidebars from "../../homecomponents/Dashboard/Sidebar.jsx";

const API_BASE_URL = import.meta.env.VITE_APP_BASEURL;

const TeacherProfileEdit = () => {
  const { user, login } = useUser();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [profileData, setProfileData] = useState({
    // Basic info
    name: "",
    email: "",
    bio: "",
    
    // Professional info
    experience: "",
    qualifications: "",
    teachingSubjects: [],
    specializations: [],
    yearsOfExperience: 0,
    
    // Education
    education: {
      degree: "",
      institution: "",
      year: "",
      field: ""
    },
    
    // Contact info
    contactInfo: {
      phone: "",
      office: "",
      officeHours: "",
      preferredContactMethod: "email"
    },
    
    // Social links
    socialLinks: [
      { platform: "website", url: "", label: "Website" },
      { platform: "linkedin", url: "", label: "LinkedIn" },
      { platform: "github", url: "", label: "GitHub" },
      { platform: "twitter", url: "", label: "Twitter" },
      { platform: "youtube", url: "", label: "YouTube" },
      { platform: "facebook", url: "", label: "Facebook" }
    ],
    
    // Custom links
    customLinks: [],
    
    // Certifications
    certifications: [],
    
    // Achievements
    achievements: [],
    
    // Settings
    profileVisibility: "students-only"
  });

  axios.defaults.withCredentials = true;

  useEffect(() => {
    console.log('Current user:', user);
    console.log('User type:', user?.userType);
    
    if (!user) {
      // Wait for user to load
      return;
    }
    
    if (user.userType !== "Teacher") {
      toast.error("Only teachers can access this page.");
      navigate("/");
      return;
    }
    
    fetchTeacherProfile();
  }, [user?.userType, navigate]);

  const fetchTeacherProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/teacher/profile`);
      
      if (response.data.success) {
        const profile = response.data.profile;
        setProfileData({
          name: profile.userId?.name || user?.name || "",
          email: profile.userId?.email || user?.email || "",
          bio: profile.bio || "",
          experience: profile.experience || "",
          qualifications: profile.qualifications || "",
          teachingSubjects: profile.teachingSubjects || [],
          specializations: profile.specializations || [],
          yearsOfExperience: profile.yearsOfExperience || 0,
          education: profile.education || {
            degree: "",
            institution: "",
            year: "",
            field: ""
          },
          contactInfo: profile.contactInfo || {
            phone: "",
            office: "",
            officeHours: "",
            preferredContactMethod: "email"
          },
          socialLinks: profile.socialLinks && profile.socialLinks.length > 0 
            ? profileData.socialLinks.map(defaultLink => {
                const existingLink = profile.socialLinks.find(sl => sl.platform === defaultLink.platform);
                return existingLink || defaultLink;
              })
            : profileData.socialLinks,
          customLinks: profile.customLinks || [],
          certifications: profile.certifications || [],
          achievements: profile.achievements || [],
          profileVisibility: profile.profileVisibility || "students-only"
        });
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      // Initialize with default values if profile doesn't exist
      setProfileData(prev => ({
        ...prev,
        name: user?.name || "",
        email: user?.email || ""
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setProfileData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setProfileData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleArrayChange = (field, index, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const handleSocialLinkChange = (index, url) => {
    setProfileData(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.map((link, i) => 
        i === index ? { ...link, url } : link
      )
    }));
  };

  const addToArray = (field, newItem) => {
    setProfileData(prev => ({
      ...prev,
      [field]: [...prev[field], newItem]
    }));
  };

  const removeFromArray = (field, index) => {
    setProfileData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleCustomLinkChange = (index, field, value) => {
    setProfileData(prev => ({
      ...prev,
      customLinks: prev.customLinks.map((link, i) => 
        i === index ? { ...link, [field]: value } : link
      )
    }));
  };

  const handleCertificationChange = (index, field, value) => {
    setProfileData(prev => ({
      ...prev,
      certifications: prev.certifications.map((cert, i) => 
        i === index ? { ...cert, [field]: value } : cert
      )
    }));
  };

  const handleAchievementChange = (index, field, value) => {
    setProfileData(prev => ({
      ...prev,
      achievements: prev.achievements.map((achievement, i) => 
        i === index ? { ...achievement, [field]: value } : achievement
      )
    }));
  };

  const handlePhotoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error("Please select a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB.");
      return;
    }

    const formData = new FormData();
    formData.append('profilePhoto', file);

    try {
      setUploadingPhoto(true);
      const response = await axios.post(`${API_BASE_URL}/teacher/upload-photo`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        toast.success("Profile photo updated successfully!");
        // Update user context
        login({
          ...user,
          profilePhoto: response.data.photoUrl
        });
      }
    } catch (error) {
      console.error("Error uploading photo:", error);
      toast.error("Failed to upload photo. Please try again.");
    } finally {
      setUploadingPhoto(false);
    }
  };

  const validateForm = () => {
    if (!profileData.name.trim()) {
      toast.error("Name is required.");
      return false;
    }
    if (!profileData.email.trim()) {
      toast.error("Email is required.");
      return false;
    }
    if (profileData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileData.email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setLoading(true);
      
      // Filter out empty social links and custom links before sending
      const filteredProfileData = {
        ...profileData,
        socialLinks: profileData.socialLinks.filter(link => 
          link.url && link.url.trim() !== ''
        ),
        customLinks: profileData.customLinks.filter(link => 
          link.url && link.url.trim() !== ''
        )
      };
      
      console.log('Sending profile data:', filteredProfileData);
      
      const response = await axios.put(`${API_BASE_URL}/teacher/profile`, filteredProfileData);
      
      if (response.data.success) {
        login({
          ...user,
          name: profileData.name,
          email: profileData.email
        });
        
        toast.success("Profile updated successfully!");
        navigate("/teacher/dashboard");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to update profile. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const getSocialIcon = (platform) => {
    const icons = {
      website: <FaGlobe />,
      linkedin: <FaLinkedin />,
      github: <FaGithub />,
      twitter: <FaTwitter />,
      youtube: <FaYoutube />,
      facebook: <FaFacebook />
    };
    return icons[platform] || <FaGlobe />;
  };

  if (loading && !profileData.name) {
    return (
      <div className="flex pt-6 mt-6">
        <Sidebars />
        <div className="flex-1 max-w-6xl mx-auto mt-28 px-6">
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center">
              <FaSpinner className="animate-spin text-4xl text-blue-600 mx-auto mb-4" />
              <p className="text-gray-600">Loading profile...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex pt-6 mt-6 bg-gray-50 min-h-screen">
      <Sidebars />
      
      <div className="flex-1 max-w-6xl mx-auto mt-28 px-6 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Teacher Profile</h1>
          <p className="text-gray-600">Update your professional information and showcase your expertise</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Profile Photo Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FaCamera className="text-blue-600" />
              Profile Photo
            </h2>
            
            <div className="flex items-center gap-6">
              <div className="relative">
                <img
                  src={user?.profilePhoto || `https://ui-avatars.com/api/?name=${profileData.name}&background=6366f1&color=ffffff&size=100`}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                />
                {uploadingPhoto && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                    <FaSpinner className="animate-spin text-white text-xl" />
                  </div>
                )}
              </div>
              
              <div>
                <label className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors inline-flex items-center gap-2">
                  <FaCamera />
                  Change Photo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                    disabled={uploadingPhoto}
                  />
                </label>
                <p className="text-sm text-gray-500 mt-2">JPG, PNG or GIF. Max size 5MB.</p>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <FaUser className="text-blue-600" />
              Basic Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>
            
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              <textarea
                value={profileData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Tell us about yourself, your teaching philosophy, and what makes you passionate about education..."
              />
            </div>
          </div>

          {/* Professional Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <FaBriefcase className="text-blue-600" />
              Professional Information
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Teaching Experience</label>
                <textarea
                  value={profileData.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe your teaching experience, years of experience, previous institutions..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Qualifications</label>
                <textarea
                  value={profileData.qualifications}
                  onChange={(e) => handleInputChange('qualifications', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe your educational background, degrees, institutions..."
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Teaching Subjects</label>
                  <input
                    type="text"
                    value={profileData.teachingSubjects.join(', ')}
                    onChange={(e) => handleInputChange('teachingSubjects', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Mathematics, Physics, Computer Science (comma separated)"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
                  <input
                    type="number"
                    min="0"
                    max="50"
                    value={profileData.yearsOfExperience}
                    onChange={(e) => handleInputChange('yearsOfExperience', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <FaGraduationCap className="text-blue-600" />
              Education
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Highest Degree</label>
                <input
                  type="text"
                  value={profileData.education.degree}
                  onChange={(e) => handleInputChange('education.degree', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., PhD, Master's, Bachelor's"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Institution</label>
                <input
                  type="text"
                  value={profileData.education.institution}
                  onChange={(e) => handleInputChange('education.institution', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="University/College name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Field of Study</label>
                <input
                  type="text"
                  value={profileData.education.field}
                  onChange={(e) => handleInputChange('education.field', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Computer Science, Mathematics"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                <input
                  type="number"
                  min="1950"
                  max={new Date().getFullYear()}
                  value={profileData.education.year}
                  onChange={(e) => handleInputChange('education.year', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Graduation year"
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <FaPhone className="text-blue-600" />
              Contact Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={profileData.contactInfo.phone}
                  onChange={(e) => handleInputChange('contactInfo.phone', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your phone number"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Office Location</label>
                <input
                  type="text"
                  value={profileData.contactInfo.office}
                  onChange={(e) => handleInputChange('contactInfo.office', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Office room number or location"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Office Hours</label>
                <input
                  type="text"
                  value={profileData.contactInfo.officeHours}
                  onChange={(e) => handleInputChange('contactInfo.officeHours', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Mon-Fri 2-4 PM"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Contact Method</label>
                <select
                  value={profileData.contactInfo.preferredContactMethod}
                  onChange={(e) => handleInputChange('contactInfo.preferredContactMethod', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                  <option value="office">Office Visit</option>
                </select>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <FaGlobe className="text-blue-600" />
              Social Links
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {profileData.socialLinks.map((link, index) => (
                <div key={link.platform}>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    {getSocialIcon(link.platform)}
                    {link.label}
                  </label>
                  <input
                    type="url"
                    value={link.url}
                    onChange={(e) => handleSocialLinkChange(index, e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={`Your ${link.label} URL`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Custom Links */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <FaGlobe className="text-blue-600" />
              Custom Links
            </h2>
            
            <div className="space-y-4">
              {profileData.customLinks.map((link, index) => (
                <div key={index} className="flex gap-3 items-end">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      value={link.title}
                      onChange={(e) => handleCustomLinkChange(index, 'title', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Link title"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">URL</label>
                    <input
                      type="url"
                      value={link.url}
                      onChange={(e) => handleCustomLinkChange(index, 'url', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="https://..."
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromArray('customLinks', index)}
                    className="px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
              
              <button
                type="button"
                onClick={() => addToArray('customLinks', { title: '', url: '', description: '' })}
                className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <FaPlus /> Add Custom Link
              </button>
            </div>
          </div>

  
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Profile Visibility</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Who can see your profile?</label>
              <select
                value={profileData.profileVisibility}
                onChange={(e) => handleInputChange('profileVisibility', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="public">Public - Anyone can see</option>
                <option value="students-only">Students Only - Only enrolled students</option>
                <option value="private">Private - Only you</option>
              </select>
            </div>
          </div>

    
          <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 rounded-xl shadow-sm">
            <div className="flex gap-4 justify-end">
              <button
                type="button"
                onClick={() => navigate("/teacher-dashboard")}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <FaSave />
                    Save Profile
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherProfileEdit;
