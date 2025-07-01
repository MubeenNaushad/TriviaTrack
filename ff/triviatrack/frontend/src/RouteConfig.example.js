// Add these routes to your main App.jsx or Router configuration

import TeacherProfileEdit from './Pages/Teacher/TeacherProfileEdit';
import TeacherProfileView from './Pages/Teacher/TeacherProfileView';

// In your routes configuration:
const routes = [
  // ...existing routes
  
  // Teacher Profile Routes
  {
    path: "/teacher/profile/edit",
    element: <TeacherProfileEdit />,
    protected: true,
    requiredRole: "Teacher"
  },
  {
    path: "/teacher/profile/view",
    element: <TeacherProfileView />,
    protected: true,
    requiredRole: "Teacher"
  },
  {
    path: "/teacher/profile/:teacherId",
    element: <TeacherProfileView />,
    protected: false
  }
];

// Example App.jsx structure
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ...existing routes */}
        
        {/* Teacher Profile Routes */}
        <Route 
          path="/teacher/profile/edit" 
          element={
            <ProtectedRoute requiredRole="Teacher">
              <TeacherProfileEdit />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/teacher/profile/view" 
          element={
            <ProtectedRoute requiredRole="Teacher">
              <TeacherProfileView />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/teacher/profile/:teacherId" 
          element={<TeacherProfileView />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
