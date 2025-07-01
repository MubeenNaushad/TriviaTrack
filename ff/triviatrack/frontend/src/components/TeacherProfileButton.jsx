// Add this component to your teacher dashboard or navigation

import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEdit } from "react-icons/fa";

const TeacherProfileButton = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  if (user?.userType !== "Teacher") {
    return null;
  }

  return (
    <div className="p-4">
      <div className="flex gap-2">
        <button
          onClick={() => navigate("/teacher/profile/view")}
          className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
        >
          <FaUser />
          View Profile
        </button>
        
        <button
          onClick={() => navigate("/teacher/profile/edit")}
          className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
        >
          <FaEdit />
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default TeacherProfileButton;

// Usage in Sidebar component:
/*
import TeacherProfileButton from './TeacherProfileButton';

// Inside your Sidebar component
<div className="sidebar-content">
  {user?.userType === "Teacher" && <TeacherProfileButton />}
  // ...other sidebar items
</div>
*/
