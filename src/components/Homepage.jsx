
//correct code below final one
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Homepage = ({ userDetails }) => {
//   const navigate = useNavigate();
//   const [departments, setDepartments] = useState([
//     'SMDDC', 'NMTC', 'IT', 'PD', 'ADMIN'
//   ]);

//   // Determine which departments to show
//   const getDisplayDepartments = () => {
//     // If admin, show all departments
//     if (userDetails?.is_admin) {
//       return departments;
//     }
//     // Otherwise, show only the user's department
//     return [userDetails?.department];
//   };

//   // Department card click handler
//   const handleDepartmentClick = (department) => {
//     // Navigate to a new route for department details
//     navigate(`/department/${department}`);
//   };

//   // Logout handler
//   const handleLogout = () => {
//     navigate('/login');
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="container mx-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-800">
//             Welcome, {userDetails?.username}
//           </h1>
//           <div className="flex items-center space-x-4">
//             <span className="text-gray-600">
//               Department: {userDetails?.department}
//             </span>
//             <button 
//               onClick={handleLogout}
//               className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
//             >
//               Logout
//             </button>
//           </div>
//         </div>

//         {/* Departments Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {getDisplayDepartments().map((department) => (
//             <div 
//               key={department}
//               onClick={() => handleDepartmentClick(department)}
//               className="bg-white shadow-md rounded-lg p-6 cursor-pointer hover:shadow-xl transition"
//             >
//               <h2 className="text-xl font-semibold text-gray-800 mb-4">
//                 {department} Department
//               </h2>
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Total Members</span>
//                 <span className="font-bold text-indigo-600">
//                   TBD
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Homepage;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building, LogOut } from 'lucide-react';

const DepartmentBuildingModel = ({ department, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="relative group transform transition-all duration-300 hover:scale-105 hover:rotate-3 cursor-pointer"
    >
      <div className="absolute -inset-0.5 bg-gray-400 rounded-xl opacity-75 group-hover:opacity-100 blur-xl transition duration-300"></div>
      <div className="relative bg-white rounded-xl shadow-lg overflow-hidden p-6 flex flex-col items-center space-y-4">
        <div className="w-32 h-32 relative">
          <div className="absolute inset-0 bg-blue-100 rounded-lg opacity-50 group-hover:opacity-75 transition"></div>
          <Building 
            size={96} 
            className="relative z-10 text-blue-600 group-hover:text-blue-800 transition-colors"
          />
          <div className="absolute bottom-0 left-0 right-0 h-4 bg-gray-300 rounded-b-lg"></div>
        </div>
        <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition">
          {department} Department
        </h2>
        <div className="text-gray-500 group-hover:text-gray-700 transition">
          <span className="text-sm">Total Members: </span>
          <span className="font-bold text-blue-600">TBD</span>
        </div>
      </div>
    </div>
  );
};

const Homepage = ({ userDetails }) => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([
    'SMDDC', 'NMTC', 'IT', 'PD', 'ADMIN'
  ]);

  // Determine which departments to show
  const getDisplayDepartments = () => {
    // If admin, show all departments
    if (userDetails?.is_admin) {
      return departments;
    }
    // Otherwise, show only the user's department
    return [userDetails?.department];
  };

  // Department card click handler
  const handleDepartmentClick = (department) => {
    // Navigate to a new route for department details
    navigate(`/department/${department}`);
  };

  // Logout handler
  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-black to-indigo-600">
            Welcome, {userDetails?.username}
          </h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600 font-medium">
              Department: {userDetails?.department}
            </span>
            <button 
              onClick={handleLogout}
              className="group flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              <LogOut className="mr-2 group-hover:rotate-6 transition" size={20} />
              Logout
            </button>
          </div>
        </div>

        {/* Departments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {getDisplayDepartments().map((department) => (
            <DepartmentBuildingModel 
              key={department}
              department={department}
              onClick={() => handleDepartmentClick(department)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;