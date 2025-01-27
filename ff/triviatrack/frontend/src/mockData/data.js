export const getFilteredNavbarMenu = (userType) => {
    const NavbarMenu = [
      {
        id: 1,
        title: "Home",
        link: "/",
        allowedRoles: ["Student", "Teacher"], 
      },
      {
        id: 2,
        title: "Students Dashboard",
        link: "/students/dashboard",
        allowedRoles: ["Student"], // Only for students
      },
      {
        id: 3,
        title: "Courses",
        link: "/courses",
        allowedRoles: ["Student", "Teacher"], // Both roles can access
      },
      {
        id: 4,
        title: "Teacher Dashboard",
        link: "/teacher/dashboard",
        allowedRoles: ["Teacher"], // Only for teachers
      },
      {
        id: 5,
        title: "Contact",
        link: "/contact",
        allowedRoles: ["Student", "Teacher"], // Both roles can access
      },
      {
        id: 6,
        title: "Live Session",
        link: "/live",
        allowedRoles: ["Student", "Teacher"], // Both roles can access
      },
    ];
  
    // Filter menu items based on userType
    return NavbarMenu.filter((menu) => menu.allowedRoles.includes(userType));
  };
  