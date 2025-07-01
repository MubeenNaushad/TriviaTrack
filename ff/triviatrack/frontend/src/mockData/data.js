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
        allowedRoles: ["Student"], 
      },
      {
        id: 3,
        title: "Courses",
        link: "/courses",
        allowedRoles: ["Student", "Teacher"], 
      },
      {
        id: 4,
        title: "Teacher Dashboard",
        link: "/teacher/dashboard",
        allowedRoles: ["Teacher"], 
      },
      {
        id: 5,
        title: "Contact",
        link: "/contact",
        allowedRoles: ["Student", "Teacher"], 
      },
      {
        id: 6,
        title: "Live Session",
        link: "/live",
        allowedRoles: ["Student", "Teacher"], 
      },
    ];
  
  
    return NavbarMenu.filter((menu) => menu.allowedRoles.includes(userType));
  };
  