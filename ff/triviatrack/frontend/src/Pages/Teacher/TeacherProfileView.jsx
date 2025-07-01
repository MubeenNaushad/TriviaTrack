import { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";
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
  FaEdit,
  FaSpinner,
  FaLanguage,
  FaTrophy,
  FaCertificate,
  FaExternalLinkAlt,
  FaYoutube,
  FaFacebook,
  FaCalendarAlt,
  FaAward
} from "react-icons/fa";
import Sidebars from "../../homecomponents/Dashboard/Sidebar";

const API_BASE_URL = import.meta.env.VITE_APP_BASEURL;

const TeacherProfileView = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { teacherId } = useParams();
  
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [stats, setStats] = useState({});

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        
        // If no teacherId in params, show current user's profile
        if (!teacherId && user?.userType === "Teacher") {
          setIsOwnProfile(true);
          const [profileResponse, statsResponse] = await Promise.all([
            axios.get(`${API_BASE_URL}/teacher/profile`),
            axios.get(`${API_BASE_URL}/teacher/stats`)
          ]);
          
          if (profileResponse.data.success) {
            setProfile(profileResponse.data.profile);
          }
          
          if (statsResponse.data.success) {
            setStats(statsResponse.data.stats);
          }
        } else if (teacherId) {
          // Show specific teacher's profile
          const response = await axios.get(`${API_BASE_URL}/teacher/public/${teacherId}`);
          if (response.data.success) {
            setProfile(response.data.profile);
            setIsOwnProfile(user?.teacherId === teacherId);
          }
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        if (error.response?.status === 404) {
          toast.error("Teacher profile not found.");
        } else if (error.response?.status === 403) {
          toast.error("This profile is private.");
        } else {
          toast.error("Failed to load profile.");
        }
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if user is loaded and is a teacher (for own profile) or if teacherId is provided
    if ((user && user.userType === "Teacher" && !teacherId) || teacherId) {
      fetchProfile();
    } else if (user && user.userType !== "Teacher" && !teacherId) {
      // If user is not a teacher and no teacherId, redirect
      navigate("/");
    }
  }, [teacherId, user?.userType, user?.teacherId, navigate]);

  const getSocialIcon = (platform) => {
    const icons = {
      website: <FaGlobe className="text-green-600" />,
      linkedin: <FaLinkedin className="text-blue-600" />,
      github: <FaGithub className="text-gray-800" />,
      twitter: <FaTwitter className="text-blue-400" />,
      youtube: <FaYoutube className="text-red-600" />,
      facebook: <FaFacebook className="text-blue-600" />
    };
    return icons[platform] || <FaGlobe className="text-gray-600" />;
  };

  const getCompletionColor = (score) => {
    if (score >= 80) return "text-green-600 bg-green-100";
    if (score >= 60) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  if (loading) {
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

  if (!profile) {
    return (
      <div className="flex pt-6 mt-6">
        <Sidebars />
        <div className="flex-1 max-w-6xl mx-auto mt-28 px-6">
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">👤</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Profile Not Found</h2>
            <p className="text-gray-600 mb-4">This teacher profile doesn't exist or hasn't been set up yet.</p>
            {isOwnProfile && (
              <button
                onClick={() => navigate("/teacher/profile/edit")}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Profile
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex pt-6 mt-6 bg-gray-50 min-h-screen">
      <Sidebars />
      
      <div className="flex-1 max-w-6xl mx-auto mt-28 px-6 pb-12">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            <img
              src={profile.userId?.photoUrl || `https://ui-avatars.com/api/?name=${profile.userId?.name}&background=6366f1&color=ffffff&size=120`}
              alt={profile.userId?.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
            />
            
            <div className="flex-1">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{profile.userId?.name}</h1>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {profile.teachingSubjects?.map((subject, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        {subject}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <FaUser className="text-blue-500" />
                      Teacher ID: {profile.teacherId}
                    </span>
                    {profile.yearsOfExperience > 0 && (
                      <span className="flex items-center gap-1">
                        <FaBriefcase className="text-green-500" />
                        {profile.yearsOfExperience} years experience
                      </span>
                    )}
                    {profile.userId?.email && (
                      <span className="flex items-center gap-1">
                        <FaEnvelope className="text-purple-500" />
                        {profile.userId.email}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-col gap-3">
                  {isOwnProfile && (
                    <button
                      onClick={() => navigate("/teacher/profile/edit")}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                      <FaEdit />
                      Edit Profile
                    </button>
                  )}
                  
                  {isOwnProfile && (
                    <div className={`px-3 py-2 rounded-lg text-sm font-medium ${getCompletionColor(profile.profileCompletionScore)}`}>
                      Profile {profile.profileCompletionScore}% Complete
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {profile.bio && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Professional Information */}
            {(profile.experience || profile.qualifications) && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                  <FaBriefcase className="text-blue-600" />
                  Professional Background
                </h2>
                
                {profile.experience && (
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-700 mb-2">Teaching Experience</h3>
                    <p className="text-gray-600 leading-relaxed">{profile.experience}</p>
                  </div>
                )}
                
                {profile.qualifications && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-700 mb-2">Qualifications</h3>
                    <p className="text-gray-600 leading-relaxed">{profile.qualifications}</p>
                  </div>
                )}
              </div>
            )}

            {/* Education */}
            {profile.education && (profile.education.degree || profile.education.institution) && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                  <FaGraduationCap className="text-blue-600" />
                  Education
                </h2>
                
                <div className="space-y-3">
                  {profile.education.degree && (
                    <div>
                      <span className="font-medium text-gray-700">Degree:</span>
                      <span className="ml-2 text-gray-600">{profile.education.degree}</span>
                    </div>
                  )}
                  {profile.education.institution && (
                    <div>
                      <span className="font-medium text-gray-700">Institution:</span>
                      <span className="ml-2 text-gray-600">{profile.education.institution}</span>
                    </div>
                  )}
                  {profile.education.field && (
                    <div>
                      <span className="font-medium text-gray-700">Field:</span>
                      <span className="ml-2 text-gray-600">{profile.education.field}</span>
                    </div>
                  )}
                  {profile.education.year && (
                    <div>
                      <span className="font-medium text-gray-700">Year:</span>
                      <span className="ml-2 text-gray-600">{profile.education.year}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Certifications */}
            {profile.certifications && profile.certifications.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                  <FaCertificate className="text-blue-600" />
                  Certifications
                </h2>
                
                <div className="space-y-4">
                  {profile.certifications.map((cert, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4">
                      <h3 className="font-medium text-gray-800">{cert.name}</h3>
                      {cert.issuingOrganization && (
                        <p className="text-gray-600">{cert.issuingOrganization}</p>
                      )}
                      {cert.dateIssued && (
                        <p className="text-sm text-gray-500">
                          Issued: {new Date(cert.dateIssued).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Achievements */}
            {profile.achievements && profile.achievements.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                  <FaTrophy className="text-blue-600" />
                  Achievements
                </h2>
                
                <div className="space-y-4">
                  {profile.achievements.map((achievement, index) => (
                    <div key={index} className="border-l-4 border-yellow-500 pl-4">
                      <h3 className="font-medium text-gray-800">{achievement.title}</h3>
                      {achievement.description && (
                        <p className="text-gray-600">{achievement.description}</p>
                      )}
                      {achievement.date && (
                        <p className="text-sm text-gray-500">
                          {new Date(achievement.date).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Teaching Stats */}
           
         
            {profile.contactInfo && (profile.contactInfo.phone || profile.contactInfo.office || profile.contactInfo.officeHours) && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FaPhone className="text-blue-600" />
                  Contact Information
                </h2>
                
                <div className="space-y-3">
                  {profile.contactInfo.phone && (
                    <div className="flex items-center gap-3">
                      <FaPhone className="text-green-500" />
                      <span className="text-gray-700">{profile.contactInfo.phone}</span>
                    </div>
                  )}
                  {profile.contactInfo.office && (
                    <div className="flex items-center gap-3">
                      <FaMapMarkerAlt className="text-red-500" />
                      <span className="text-gray-700">{profile.contactInfo.office}</span>
                    </div>
                  )}
                  {profile.contactInfo.officeHours && (
                    <div className="flex items-center gap-3">
                      <FaCalendarAlt className="text-blue-500" />
                      <span className="text-gray-700">{profile.contactInfo.officeHours}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Social Links */}
            {((profile.socialLinks && profile.socialLinks.filter(link => link.url).length > 0) || 
              (profile.customLinks && profile.customLinks.length > 0)) && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FaGlobe className="text-blue-600" />
                  Links & Social
                </h2>
                
                <div className="space-y-3">
                  {/* Social Links */}
                  {profile.socialLinks?.filter(link => link.url).map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                    >
                      {getSocialIcon(link.platform)}
                      <span className="flex-1 text-gray-700">{link.label || link.platform}</span>
                      <FaExternalLinkAlt className="text-gray-400 text-sm" />
                    </a>
                  ))}

                  {/* Custom Links */}
                  {profile.customLinks?.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                    >
                      <FaGlobe className="text-gray-500" />
                      <div className="flex-1">
                        <div className="text-gray-700 font-medium">{link.title}</div>
                        {link.description && (
                          <div className="text-sm text-gray-500">{link.description}</div>
                        )}
                      </div>
                      <FaExternalLinkAlt className="text-gray-400 text-sm" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Specializations */}
            {profile.specializations && profile.specializations.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Specializations</h2>
                
                <div className="flex flex-wrap gap-2">
                  {profile.specializations.map((spec, index) => (
                    <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfileView;
