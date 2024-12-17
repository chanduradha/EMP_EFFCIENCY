// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';

// const DepartmentDetails = ({ userDetails }) => {
//   const { department } = useParams();
//   const navigate = useNavigate();
//   const [departmentMembers, setDepartmentMembers] = useState([]);
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(true);

//   // Fetch department members
//   useEffect(() => {
//     const fetchDepartmentMembers = async () => {
//       try {
//         const response = await fetch(`http://127.0.0.1:8000/department-members?department=${department}`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           }
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch department members');
//         }

//         const data = await response.json();
//         setDepartmentMembers(data.members);
//         setIsLoading(false);
//       } catch (err) {
//         console.error('Error fetching department members:', err);
//         setError(err.message);
//         setIsLoading(false);
//       }
//     };

//     fetchDepartmentMembers();
//   }, [department]);

//   // Logout handler
//   const handleLogout = () => {
//     navigate('/home');
//   };

//   // Go back to homepage
//   const handleBack = () => {
//     navigate('/');
//   };

//   if (isLoading) {
//     return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="container mx-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-8">
//           <div className="flex items-center space-x-4">
//             <button 
//               onClick={handleBack}
//               className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
//             >
//               Back to Departments
//             </button>
//             <h1 className="text-3xl font-bold text-gray-800">
//               {department} Department Members
//             </h1>
//           </div>
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

//         {/* Error Handling */}
//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//             {error}
//           </div>
//         )}

//         {/* Department Members Table */}
//         {departmentMembers.length === 0 ? (
//           <p className="text-center text-gray-500 text-xl">No members found in {department} Department</p>
//         ) : (
//           <div className="bg-white shadow-md rounded-lg overflow-hidden">
//             <table className="w-full border-collapse">
//               <thead>
//                 <tr className="bg-gray-200">
//                   <th className="border p-3 text-left">Username</th>
//                   <th className="border p-3 text-left">Staff ID</th>
//                   <th className="border p-3 text-left">Contact Number</th>
//                   <th className="border p-3 text-left">Date of Joining</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {departmentMembers.map((member) => (
//                   <tr key={member.username} className="hover:bg-gray-100">
//                     <td className="border p-3">{member.username}</td>
//                     <td className="border p-3">{member.staff_id}</td>
//                     <td className="border p-3">{member.contact_number}</td>
//                     <td className="border p-3">{member.date_of_joining}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DepartmentDetails;


//correct working code ...............//

// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { format } from 'date-fns';

// const CreateTask = ({ userDetails }) => {
//   const { department } = useParams();
//   const navigate = useNavigate();

//   // State for form fields
//   const [projectName, setProjectName] = useState('');
//   const [description, setDescription] = useState('');
//   const [startTime, setStartTime] = useState('');
//   const [endTime, setEndTime] = useState('');
//   const [status, setStatus] = useState('not_started');
//   const [departmentMembers, setDepartmentMembers] = useState([]);
//   const [selectedStaff, setSelectedStaff] = useState([]);

//   // State for error and success messages
//   const [error, setError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   // Fetch department members
//   useEffect(() => {
//     const fetchDepartmentMembers = async () => {
//       try {
//         const response = await fetch(`http://127.0.0.1:8000/department-members?department=${department}`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           }
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch department members');
//         }

//         const data = await response.json();
//         setDepartmentMembers(data.members);
//       } catch (err) {
//         console.error('Error fetching department members:', err);
//         setError(err.message);
//       }
//     };

//     fetchDepartmentMembers();
//   }, [department]);

//   // Handle staff selection
//   const handleStaffSelection = (username) => {
//     setSelectedStaff(prev => 
//       prev.includes(username) 
//         ? prev.filter(staff => staff !== username)
//         : [...prev, username]
//     );
//   };

//   // Create task handler
//   const handleCreateTask = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');
//     setSuccessMessage('');

//     // Validate inputs
//     if (!projectName || !description || !startTime || !endTime || selectedStaff.length === 0) {
//       setError('Please fill in all fields and select at least one staff member');
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const taskData = {
//         project_name: projectName,
//         description,
//         start_time: new Date(startTime).toISOString(),
//         end_time: new Date(endTime).toISOString(),
//         status,
//         assigned_staff: selectedStaff
//       };

//       const response = await fetch('http://127.0.0.1:8000/create-task', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(taskData)
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.detail || 'Failed to create task');
//       }

//       setSuccessMessage('Task created successfully!');
      
//       // Reset form
//       setProjectName('');
//       setDescription('');
//       setStartTime('');
//       setEndTime('');
//       setStatus('not_started');
//       setSelectedStaff([]);
//     } catch (err) {
//       console.error('Error creating task:', err);
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Logout and back navigation handlers
//   const handleLogout = () => {
//     navigate('/home');
//   };

//   const handleBack = () => {
//     navigate(`/department/${department}`);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="container mx-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-8">
//           <div className="flex items-center space-x-4">
//             <button 
//               onClick={handleBack}
//               className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
//             >
//               Back to Department
//             </button>
//             <h1 className="text-3xl font-bold text-gray-800">
//               Create New Task for {department} Department
//             </h1>
//           </div>
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

//         {/* Error and Success Messages */}
//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//             {error}
//           </div>
//         )}
//         {successMessage && (
//           <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
//             {successMessage}
//           </div>
//         )}

//         {/* Task Creation Form */}
//         <form onSubmit={handleCreateTask} className="bg-white shadow-md rounded-lg p-8 space-y-6">
//           <div className="grid grid-cols-2 gap-6">
//             <div>
//               <label className="block text-gray-700 font-bold mb-2">Project Name</label>
//               <input
//                 type="text"
//                 value={projectName}
//                 onChange={(e) => setProjectName(e.target.value)}
//                 className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter project name"
//               />
//             </div>

//             <div>
//               <label className="block text-gray-700 font-bold mb-2">Task Status</label>
//               <select
//                 value={status}
//                 onChange={(e) => setStatus(e.target.value)}
//                 className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="not_started">Not Started</option>
//                 <option value="processing">Processing</option>
//                 <option value="completed">Completed</option>
//               </select>
//             </div>
//           </div>

//           <div>
//             <label className="block text-gray-700 font-bold mb-2">Description</label>
//             <textarea
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               rows="4"
//               placeholder="Enter task description"
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-6">
//             <div>
//               <label className="block text-gray-700 font-bold mb-2">Start Time</label>
//               <input
//                 type="datetime-local"
//                 value={startTime}
//                 onChange={(e) => setStartTime(e.target.value)}
//                 className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block text-gray-700 font-bold mb-2">End Time</label>
//               <input
//                 type="datetime-local"
//                 value={endTime}
//                 onChange={(e) => setEndTime(e.target.value)}
//                 className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           </div>

//           {/* Staff Selection */}
//           <div>
//             <label className="block text-gray-700 font-bold mb-2">Assign Team Members</label>
//             <div className="grid grid-cols-3 gap-4">
//               {departmentMembers.map((member) => (
//                 <div 
//                   key={member.username} 
//                   className={`flex items-center p-2 border rounded-md cursor-pointer ${
//                     selectedStaff.includes(member.username) 
//                       ? 'bg-blue-100 border-blue-500' 
//                       : 'bg-white'
//                   }`}
//                   onClick={() => handleStaffSelection(member.username)}
//                 >
//                   <input
//                     type="checkbox"
//                     checked={selectedStaff.includes(member.username)}
//                     readOnly
//                     className="mr-2"
//                   />
//                   <span>{member.username}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Submit Button */}
//           <div className="flex justify-end">
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition disabled:opacity-50"
//             >
//               {isLoading ? 'Creating Task...' : 'Create Task'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateTask;



// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { format } from 'date-fns';

// const CreateTask = ({ userDetails }) => {
//   const { department } = useParams();
//   const navigate = useNavigate();

//   // State for form fields
//   const [projectName, setProjectName] = useState('');
//   const [description, setDescription] = useState('');
//   const [startTime, setStartTime] = useState('');
//   const [endTime, setEndTime] = useState('');
//   const [status, setStatus] = useState('not_started');
//   const [departmentMembers, setDepartmentMembers] = useState([]);
//   const [selectedStaff, setSelectedStaff] = useState([]);

//   // State for tasks and project details
//   const [assignedTasks, setAssignedTasks] = useState([]);
//   const [projectDetails, setProjectDetails] = useState([]);

//   // State for error and success messages
//   const [error, setError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   // Fetch department members and tasks based on user role
//   useEffect(() => {
//     const fetchDepartmentData = async () => {
//       try {
//         // Fetch department members
//         const membersResponse = await fetch(`http://127.0.0.1:8000/department-members?department=${department}`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           }
//         });
  
//         if (!membersResponse.ok) {
//           throw new Error('Failed to fetch department members');
//         }
  
//         const membersData = await membersResponse.json();
//         setDepartmentMembers(membersData.members);
  
//         // Fetch assigned tasks for normal user
//         if (!userDetails.is_admin) {
//           const tasksResponse = await fetch(`http://127.0.0.1:8000/staff-tasks?username=${userDetails.username}`, {
//             method: 'GET',
//             headers: {
//               'Content-Type': 'application/json',
//             }
//           });
  
//           if (!tasksResponse.ok) {
//             throw new Error('Failed to fetch assigned tasks');
//           }
  
//           const tasksData = await tasksResponse.json();
//           setAssignedTasks(tasksData.tasks || []);
  
//           // Fetch project details for normal user
//           const projectsResponse = await fetch(`http://127.0.0.1:8000/department-projects?department=${department}`, {
//             method: 'GET',
//             headers: {
//               'Content-Type': 'application/json',
//             }
//           });
          
//           if (!projectsResponse.ok) {
//             throw new Error('Failed to fetch project details');
//           }
          
//           const projectsData = await projectsResponse.json();
//           setProjectDetails(Array.isArray(projectsData) ? projectsData : []); 
//         }
//       } catch (err) {
//         console.error('Error fetching data:', err);
//         setError(err.message);
        
//         // Ensure state is reset to prevent undefined errors
//         setAssignedTasks([]);
//         setProjectDetails([]);
//       }
//     };
  
//     fetchDepartmentData();
//   }, [department, userDetails]);

//   // Handle staff selection (only for admin)
//   const handleStaffSelection = (username) => {
//     if (!userDetails.is_admin) return;

//     setSelectedStaff(prev => 
//       prev.includes(username) 
//         ? prev.filter(staff => staff !== username)
//         : [...prev, username]
//     );
//   };

//   // Create task handler (only for admin)
//   const handleCreateTask = async (e) => {
//     if (!userDetails.is_admin) return;

//     e.preventDefault();
//     setIsLoading(true);
//     setError('');
//     setSuccessMessage('');

//     // Validate inputs
//     if (!projectName || !description || !startTime || !endTime || selectedStaff.length === 0) {
//       setError('Please fill in all fields and select at least one staff member');
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const taskData = {
//         project_name: projectName,
//         description,
//         start_time: new Date(startTime).toISOString(),
//         end_time: new Date(endTime).toISOString(),
//         status,
//         assigned_staff: selectedStaff
//       };

//       const response = await fetch('http://127.0.0.1:8000/create-task', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(taskData)
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.detail || 'Failed to create task');
//       }

//       setSuccessMessage('Task created successfully!');
      
//       // Reset form
//       setProjectName('');
//       setDescription('');
//       setStartTime('');
//       setEndTime('');
//       setStatus('not_started');
//       setSelectedStaff([]);
//     } catch (err) {
//       console.error('Error creating task:', err);
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Logout and back navigation handlers
//   const handleLogout = () => {
//     navigate('/home');
//   };

//   const handleBack = () => {
//     navigate(`/department/${department}`);
//   };

//   // Render admin view
//   const renderAdminView = () => (
//     <form onSubmit={handleCreateTask} className="bg-white shadow-md rounded-lg p-8 space-y-6">
//       {/* Existing form fields from previous implementation */}
//       <div className="grid grid-cols-2 gap-6">
//         <div>
//           <label className="block text-gray-700 font-bold mb-2">Project Name</label>
//           <input
//             type="text"
//             value={projectName}
//             onChange={(e) => setProjectName(e.target.value)}
//             className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter project name"
//           />
//         </div>

//         <div>
//           <label className="block text-gray-700 font-bold mb-2">Task Status</label>
//           <select
//             value={status}
//             onChange={(e) => setStatus(e.target.value)}
//             className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="not_started">Not Started</option>
//             <option value="processing">Processing</option>
//             <option value="completed">Completed</option>
//           </select>
//         </div>
//       </div>

//       <div>
//         <label className="block text-gray-700 font-bold mb-2">Description</label>
//         <textarea
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           rows="4"
//           placeholder="Enter task description"
//         />
//       </div>

//       <div className="grid grid-cols-2 gap-6">
//         <div>
//           <label className="block text-gray-700 font-bold mb-2">Start Time</label>
//           <input
//             type="datetime-local"
//             value={startTime}
//             onChange={(e) => setStartTime(e.target.value)}
//             className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div>
//           <label className="block text-gray-700 font-bold mb-2">End Time</label>
//           <input
//             type="datetime-local"
//             value={endTime}
//             onChange={(e) => setEndTime(e.target.value)}
//             className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//       </div>

//       {/* Staff Selection */}
//       <div>
//         <label className="block text-gray-700 font-bold mb-2">Assign Team Members</label>
//         <div className="grid grid-cols-3 gap-4">
//           {departmentMembers.map((member) => (
//             <div 
//               key={member.username} 
//               className={`flex items-center p-2 border rounded-md cursor-pointer ${
//                 selectedStaff.includes(member.username) 
//                   ? 'bg-blue-100 border-blue-500' 
//                   : 'bg-white'
//               }`}
//               onClick={() => handleStaffSelection(member.username)}
//             >
//               <input
//                 type="checkbox"
//                 checked={selectedStaff.includes(member.username)}
//                 readOnly
//                 className="mr-2"
//               />
//               <span>{member.username}</span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Submit Button */}
//       <div className="flex justify-end">
//         <button
//           type="submit"
//           disabled={isLoading}
//           className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition disabled:opacity-50"
//         >
//           {isLoading ? 'Creating Task...' : 'Create Task'}
//         </button>
//       </div>
//     </form>
//   );

//   // Render user view
//   const renderUserView = () => (
//     <div className="space-y-6">
//       {/* Assigned Tasks Section */}
//       <div className="bg-white shadow-md rounded-lg p-6">
//         <h2 className="text-2xl font-bold mb-4 text-gray-800">My Assigned Tasks</h2>
//         {(!assignedTasks || assignedTasks.length === 0) ? (
//           <p className="text-gray-600">No tasks assigned</p>
//         ) : (
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {assignedTasks.map((task) => (
//               <div key={task.id} className="border rounded-lg p-4 hover:shadow-md transition">
//                 <h3 className="font-semibold text-lg mb-2">{task.project_name}</h3>
//                 <p className="text-gray-600 mb-2">{task.description}</p>
//                 <div className="space-y-1">
//                   <p><strong>Status:</strong> {task.status}</p>
//                   <p><strong>Start:</strong> {format(new Date(task.start_time), 'PPp')}</p>
//                   <p><strong>End:</strong> {format(new Date(task.end_time), 'PPp')}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
  
//       {/* Project Details Section */}
//       <div className="bg-white shadow-md rounded-lg p-6">
//         <h2 className="text-2xl font-bold mb-4 text-gray-800">Department Projects</h2>
//         {(!projectDetails || projectDetails.length === 0) ? (
//           <p className="text-gray-600">No projects found</p>
//         ) : (
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {projectDetails.map((project) => (
//               <div key={project.id} className="border rounded-lg p-4 hover:shadow-md transition">
//                 <h3 className="font-semibold text-lg mb-2">{project.project_name}</h3>
//                 <p className="text-gray-600 mb-2">{project.description}</p>
//                 <div className="space-y-1">
//                   <p><strong>Status:</strong> {project.status}</p>
//                   <p><strong>Start:</strong> {format(new Date(project.start_time), 'PPp')}</p>
//                   <p><strong>End:</strong> {format(new Date(project.end_time), 'PPp')}</p>
//                   <p><strong>Team Members:</strong></p>
//                   <ul className="list-disc list-inside">
//                     {project.assigned_staff?.map((member) => (
//                       <li key={member}>{member}</li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="container mx-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-8">
//           <div className="flex items-center space-x-4">
//             <button 
//               onClick={handleBack}
//               className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
//             >
//               Back to Department
//             </button>
//             <h1 className="text-3xl font-bold text-gray-800">
//               {userDetails.is_admin 
//                 ? `Create New Task for ${department} Department`
//                 : `${department} Department Dashboard`
//               }
//             </h1>
//           </div>
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

//         {/* Error and Success Messages */}
//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//             {error}
//           </div>
//         )}
//         {successMessage && (
//           <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
//             {successMessage}
//           </div>
//         )}

//         {/* Conditional Rendering based on user role */}
//         {userDetails.is_admin ? renderAdminView() : renderUserView()}
//       </div>
//     </div>
//   );
// };

// export default CreateTask;


// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { format } from 'date-fns';

// // Add default props to prevent null errors
// const defaultUserDetails = {
//   username: '',
//   is_admin: false,
//   department: ''
// };

// const CreateTask = ({ userDetails = defaultUserDetails }) => {
//   const { department } = useParams();
//   const navigate = useNavigate();

//   // State for form fields
//   const [projectName, setProjectName] = useState('');
//   const [description, setDescription] = useState('');
//   const [startTime, setStartTime] = useState('');
//   const [endTime, setEndTime] = useState('');
//   const [status, setStatus] = useState('not_started');
//   const [departmentMembers, setDepartmentMembers] = useState([]);
//   const [selectedStaff, setSelectedStaff] = useState([]);

//   // State for tasks and project details
//   const [assignedTasks, setAssignedTasks] = useState([]);
//   const [projectDetails, setProjectDetails] = useState([]);

//   // State for error and success messages
//   const [error, setError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   // Fetch department members and tasks based on user role
//   useEffect(() => {
//     const fetchDepartmentData = async () => {
//       try {
//         // Validate department and user details
//         if (!department) {
//           throw new Error('Department not specified');
//         }

//         // Fetch department members
//         const membersResponse = await fetch(`http://127.0.0.1:8000/department-members?department=${department}`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           }
//         });

//         if (!membersResponse.ok) {
//           throw new Error('Failed to fetch department members');
//         }

//         const membersData = await membersResponse.json();
//         setDepartmentMembers(membersData.members || []);

//         // Fetch data only for non-admin users
//         if (!userDetails.is_admin) {
//           // Fetch assigned tasks
//           const tasksResponse = await fetch(`http://127.0.0.1:8000/staff-tasks?username=${userDetails.username}`, {
//             method: 'GET',
//             headers: {
//               'Content-Type': 'application/json',
//             }
//           });

//           if (!tasksResponse.ok) {
//             throw new Error('Failed to fetch assigned tasks');
//           }

//           const tasksData = await tasksResponse.json();
//           setAssignedTasks(tasksData.tasks || []);

//           // Fetch project details
//           const projectsResponse = await fetch(`http://127.0.0.1:8000/department-projects?department=${department}`, {
//             method: 'GET',
//             headers: {
//               'Content-Type': 'application/json',
//             }
//           });
          
//           if (!projectsResponse.ok) {
//             throw new Error('Failed to fetch project details');
//           }
          
//           const projectsData = await projectsResponse.json();
//           setProjectDetails(Array.isArray(projectsData) ? projectsData : []);
//         }
//       } catch (err) {
//         console.error('Error fetching data:', err);
//         setError(err.message);
        
//         // Reset states to prevent undefined errors
//         setDepartmentMembers([]);
//         setAssignedTasks([]);
//         setProjectDetails([]);
//       }
//     };

//     // Only fetch if we have a valid user
//     if (userDetails && department) {
//       fetchDepartmentData();
//     }
//   }, [department, userDetails]);

//   // Handle staff selection (only for admin)
//   const handleStaffSelection = (username) => {
//     if (!userDetails.is_admin) return;

//     setSelectedStaff(prev => 
//       prev.includes(username) 
//         ? prev.filter(staff => staff !== username)
//         : [...prev, username]
//     );
//   };

//   // Create task handler (only for admin)
//   const handleCreateTask = async (e) => {
//     // Prevent non-admin users from creating tasks
//     if (!userDetails.is_admin) return;

//     e.preventDefault();
//     setIsLoading(true);
//     setError('');
//     setSuccessMessage('');

//     // Validate inputs
//     if (!projectName || !description || !startTime || !endTime || selectedStaff.length === 0) {
//       setError('Please fill in all fields and select at least one staff member');
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const taskData = {
//         project_name: projectName,
//         description,
//         start_time: new Date(startTime).toISOString(),
//         end_time: new Date(endTime).toISOString(),
//         status,
//         assigned_staff: selectedStaff
//       };

//       const response = await fetch('http://127.0.0.1:8000/create-task', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(taskData)
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.detail || 'Failed to create task');
//       }

//       setSuccessMessage('Task created successfully!');
      
//       // Reset form
//       setProjectName('');
//       setDescription('');
//       setStartTime('');
//       setEndTime('');
//       setStatus('not_started');
//       setSelectedStaff([]);
//     } catch (err) {
//       console.error('Error creating task:', err);
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Logout and back navigation handlers
//   const handleLogout = () => {
//     navigate('/home');
//   };

//   const handleBack = () => {
//     navigate(`/department/${department}`);
//   };

//   // Render admin view
//   const renderAdminView = () => (
//     <form onSubmit={handleCreateTask} className="bg-white shadow-md rounded-lg p-8 space-y-6">
//       <div className="grid grid-cols-2 gap-6">
//         <div>
//           <label className="block text-gray-700 font-bold mb-2">Project Name</label>
//           <input
//             type="text"
//             value={projectName}
//             onChange={(e) => setProjectName(e.target.value)}
//             className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter project name"
//           />
//         </div>

//         <div>
//           <label className="block text-gray-700 font-bold mb-2">Task Status</label>
//           <select
//             value={status}
//             onChange={(e) => setStatus(e.target.value)}
//             className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="not_started">Not Started</option>
//             <option value="processing">Processing</option>
//             <option value="completed">Completed</option>
//           </select>
//         </div>
//       </div>

//       <div>
//         <label className="block text-gray-700 font-bold mb-2">Description</label>
//         <textarea
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           rows="4"
//           placeholder="Enter task description"
//         />
//       </div>

//       <div className="grid grid-cols-2 gap-6">
//         <div>
//           <label className="block text-gray-700 font-bold mb-2">Start Time</label>
//           <input
//             type="datetime-local"
//             value={startTime}
//             onChange={(e) => setStartTime(e.target.value)}
//             className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div>
//           <label className="block text-gray-700 font-bold mb-2">End Time</label>
//           <input
//             type="datetime-local"
//             value={endTime}
//             onChange={(e) => setEndTime(e.target.value)}
//             className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//       </div>

//       {/* Staff Selection */}
//       <div>
//         <label className="block text-gray-700 font-bold mb-2">Assign Team Members</label>
//         <div className="grid grid-cols-3 gap-4">
//           {departmentMembers.map((member) => (
//             <div 
//               key={member.username} 
//               className={`flex items-center p-2 border rounded-md cursor-pointer ${
//                 selectedStaff.includes(member.username) 
//                   ? 'bg-blue-100 border-blue-500' 
//                   : 'bg-white'
//               }`}
//               onClick={() => handleStaffSelection(member.username)}
//             >
//               <input
//                 type="checkbox"
//                 checked={selectedStaff.includes(member.username)}
//                 readOnly
//                 className="mr-2"
//               />
//               <span>{member.username}</span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Submit Button */}
//       <div className="flex justify-end">
//         <button
//           type="submit"
//           disabled={isLoading}
//           className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition disabled:opacity-50"
//         >
//           {isLoading ? 'Creating Task...' : 'Create Task'}
//         </button>
//       </div>
//     </form>
//   );

//   // Render user view
//   const renderUserView = () => (
//     <div className="space-y-6">
//       {/* Assigned Tasks Section */}
//       {/* <div className="bg-white shadow-md rounded-lg p-6">
//         <h2 className="text-2xl font-bold mb-4 text-gray-800">My Assigned Tasks</h2>
//         {(!assignedTasks || assignedTasks.length === 0) ? (
//           <p className="text-gray-600">No tasks assigned</p>
//         ) : (
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {assignedTasks.map((task) => (
//               <div key={task.id} className="border rounded-lg p-4 hover:shadow-md transition">
//                 <h3 className="font-semibold text-lg mb-2">{task.project_name}</h3>
//                 <p className="text-gray-600 mb-2">{task.description}</p>
//                 <div className="space-y-1">
//                   <p><strong>Status:</strong> {task.status}</p>
//                   <p><strong>Start:</strong> {format(new Date(task.start_time), 'PPp')}</p>
//                   <p><strong>End:</strong> {format(new Date(task.end_time), 'PPp')}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div> */}

//       {/* Project Details Section */}
//       <div className="bg-white shadow-md rounded-lg p-6">
//         <h2 className="text-2xl font-bold mb-4 text-gray-800">Department Projects</h2>
//         {(!projectDetails || projectDetails.length === 0) ? (
//           <p className="text-gray-600">No projects found</p>
//         ) : (
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {projectDetails.map((project) => (
//               <div key={project.id} className="border rounded-lg p-4 hover:shadow-md transition">
//                 <h3 className="font-semibold text-lg mb-2">{project.project_name}</h3>
//                 <p className="text-gray-600 mb-2">{project.description}</p>
//                 <div className="space-y-1">
//                   <p><strong>Status:</strong> {project.status}</p>
//                   <p><strong>Start:</strong> {format(new Date(project.start_time), 'PPp')}</p>
//                   <p><strong>End:</strong> {format(new Date(project.end_time), 'PPp')}</p>
//                   <p><strong>Team Members:</strong></p>
//                   <ul className="list-disc list-inside">
//                     {project.assigned_staff?.map((member) => (
//                       <li key={member}>{member}</li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );

//   // Main render method with additional null checks
//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="container mx-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-8">
//           <div className="flex items-center space-x-4">
//             <button 
//               onClick={handleBack}
//               className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
//             >
//               Back to Department
//             </button>
//             <h1 className="text-3xl font-bold text-gray-800">
//               {userDetails.is_admin 
//                 ? `Create New Task for ${department} Department`
//                 : `${department} Department Dashboard`
//               }
//             </h1>
//           </div>
//           <div className="flex items-center space-x-4">
//             <span className="text-gray-600">
//               Department: {userDetails?.department || 'N/A'}
//             </span>
//             <button 
//               onClick={handleLogout}
//               className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
//             >
//               Logout
//             </button>
//           </div>
//         </div>

//         {/* Error and Success Messages */}
//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//             {error}
//           </div>
//         )}
//         {successMessage && (
//           <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
//             {successMessage}
//           </div>
//         )}

//         {/* Conditional Rendering based on user role */}
//         {userDetails.is_admin ? renderAdminView() : renderUserView()}
//       </div>
//     </div>
//   );
// };

// // Default props to prevent null errors
// CreateTask.defaultProps = {
//   userDetails: {
//     username: '',
//     is_admin: false,
//     department: ''
//   }
// };

// export default CreateTask;





import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

// Main CreateTask Component
const CreateTask = ({ userDetails = {
  username: '',
  is_admin: false,
  department: ''
} }) => {
  // Use useParams to get department from URL
  const { department } = useParams();
  const navigate = useNavigate();

  // State Hooks for Form Fields
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [status, setStatus] = useState('not_started');
  
  // State for Department and Staff Management
  const [departmentMembers, setDepartmentMembers] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState([]);

  // State for Tasks and Projects
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [projectDetails, setProjectDetails] = useState([]);

  // State for Error Handling and Loading
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // Add these state variables near your other state declarations
const [departmentHOD, setDepartmentHOD] = useState('');
const [departmentManager, setDepartmentManager] = useState('');


  // Fetch Department Data and Tasks on Component Mount
  useEffect(() => {
    const fetchDepartmentData = async () => {
      
      try {
        // Validate department and user details
        if (!department) {
          throw new Error('Department not specified');
        }

        // Fetch Department Members
        const membersResponse = await fetch(`http://127.0.0.1:8002/department-members?department=${department}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!membersResponse.ok) {
          throw new Error('Failed to fetch department members');
        }

        const membersData = await membersResponse.json();
        setDepartmentMembers(membersData.members || []);
        setDepartmentHOD(membersData.hod || 'Not Assigned');
        setDepartmentManager(membersData.manager || 'Not Assigned');
    

        // Fetch Tasks and Projects for Non-Admin Users
        if (!userDetails.is_admin) {
          // Fetch Assigned Tasks
          const tasksResponse = await fetch(`http://127.0.0.1:8002/staff-tasks?username=${userDetails.username}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          });

          if (!tasksResponse.ok) {
            const errorText = await tasksResponse.text();
            console.error('Tasks fetch error:', errorText);
            throw new Error(`Failed to fetch tasks: ${errorText}`);
          }

          const tasksData = await tasksResponse.json();
          console.log('Fetched tasks:', tasksData);
          setAssignedTasks(tasksData.tasks || []);

          // Fetch Department Projects
          const projectsResponse = await fetch(`http://127.0.0.1:8002/department-projects?department=${department}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          });
          
          if (!projectsResponse.ok) {
            throw new Error('Failed to fetch project details');
          }
          
          const projectsData = await projectsResponse.json();
          setProjectDetails(Array.isArray(projectsData) ? projectsData : []);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message || 'An unexpected error occurred');
        
        // Reset states to prevent undefined errors
        setDepartmentMembers([]);
        setAssignedTasks([]);
        setProjectDetails([]);
        setDepartmentHOD('');
        setDepartmentManager('');
      }
    };

    // Only fetch if we have a valid user and department
    if (userDetails.username && department) {
      fetchDepartmentData();
    }
  }, [department, userDetails.username, userDetails.is_admin]);

  // Handle Staff Selection (Admin Only)
  const handleStaffSelection = (username) => {
    if (!userDetails.is_admin) return;

    setSelectedStaff(prev => 
      prev.includes(username) 
        ? prev.filter(staff => staff !== username)
        : [...prev, username]
    );
  };

  // Create Task Handler (Admin Only)
  const handleCreateTask = async (e) => {
    // Prevent non-admin users from creating tasks
    if (!userDetails.is_admin) return;

    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    // Validate Inputs
    if (!projectName || !description || !startTime || !endTime || selectedStaff.length === 0) {
      setError('Please fill in all fields and select at least one staff member');
      setIsLoading(false);
      return;
    }

    try {
      // Prepare Task Data
      const taskData = {
        project_name: projectName,
        description,
        start_time: new Date(startTime).toISOString(),
        end_time: new Date(endTime).toISOString(),
        status,
        assigned_staff: selectedStaff,
        department: department
      };

      // Send Create Task Request
      const response = await fetch('http://127.0.0.1:8002/create-task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Failed to create task');
      }

      // Success Handling
      setSuccessMessage('Task created successfully!');
      
      // Reset Form
      setProjectName('');
      setDescription('');
      setStartTime('');
      setEndTime('');
      setStatus('not_started');
      setSelectedStaff([]);
    } catch (err) {
      console.error('Error creating task:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Navigation Handlers
  const handleLogout = () => {
    navigate('/home');
  };


  // Render Admin View
  const renderAdminView = () => (
    <form onSubmit={handleCreateTask} className="bg-white shadow-md rounded-lg p-8 space-y-6">
      {/* Project Name and Status */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 font-bold mb-2">Project Name</label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter project name"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2">Task Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="not_started">Not Started</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-gray-700 font-bold mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
          placeholder="Enter task description"
          required
        />
      </div>

      {/* Start and End Times */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 font-bold mb-2">Start Time</label>
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2">End Time</label>
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      {/* Staff Selection */}
      <div>
        <label className="block text-gray-700 font-bold mb-2">Assign Team Members</label>
        <div className="grid grid-cols-3 gap-4">
          {departmentMembers.map((member) => (
            <div 
              key={member.username} 
              className={`flex items-center p-2 border rounded-md cursor-pointer ${
                selectedStaff.includes(member.username) 
                  ? 'bg-blue-100 border-blue-500' 
                  : 'bg-white'
              }`}
              onClick={() => handleStaffSelection(member.username)}
            >
              <input
                type="checkbox"
                checked={selectedStaff.includes(member.username)}
                readOnly
                className="mr-2"
              />
              <span>{member.username}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition disabled:opacity-50"
        >
          {isLoading ? 'Creating Task...' : 'Create Task'}
        </button>
      </div>
    </form>
  );

  // Render User View
  const renderUserView = () => (
    <div className="space-y-6">
      {/* Assigned Tasks Section */}
      {assignedTasks && assignedTasks.length > 0 && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">My Assigned Tasks</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {assignedTasks.map((task) => (
              <div key={task.id} className="border rounded-lg p-4 hover:shadow-md transition">
                <h3 className="font-semibold text-lg mb-2">{task.project_name}</h3>
                <p className="text-gray-600 mb-2">{task.description}</p>
                <div className="space-y-1">
                  <p><strong>Status:</strong> {task.status}</p>
                  <p><strong>Start:</strong> {format(new Date(task.start_time), 'PPp')}</p>
                  <p><strong>End:</strong> {format(new Date(task.end_time), 'PPp')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Project Details Section */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Department Projects</h2>
        {(!projectDetails || projectDetails.length === 0) ? (
          <p className="text-gray-600">No projects found</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projectDetails.map((project) => (
              <div key={project.id} className="border rounded-lg p-4 hover:shadow-md transition">
                <h3 className="font-semibold text-lg mb-2">{project.project_name}</h3>
                <p className="text-gray-600 mb-2">{project.description}</p>
                <div className="space-y-1">
                  <p><strong>Status:</strong> {project.status}</p>
                  <p><strong>Start:</strong> {format(new Date(project.start_time), 'PPp')}</p>
                  <p><strong>End:</strong> {format(new Date(project.end_time), 'PPp')}</p>
                  <p><strong>Team Members:</strong></p>
                  <ul className="list-disc list-inside">
                    {project.assigned_staff?.map((member) => (
                      <li key={member}>{member}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // Main Render Method
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
           
            <h1 className="text-3xl font-bold text-gray-800">
              {userDetails.is_admin 
                ? `Create New Task for ${department} Department`
                : `${department} Department Dashboard`
              }
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">
              Logged in as: {userDetails.username || 'N/A'}
            </span>
            {/* <span className="text-gray-600">
              Department: {userDetails.department || 'N/A'}
            </span> */}

            <span className="text-gray-600">
            Department: {department || 'N/A'}
            </span>

            <span className="text-gray-600">
            HOD: {departmentHOD || 'N/A'}
            </span>
            <span className="text-gray-600">
            Manager: {departmentManager || 'N/A'}
            </span>
            <button 
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Error and Success Messages */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {successMessage}
          </div>
        )}

        {/* Conditional Rendering based on user role */}
        {userDetails.is_admin ? renderAdminView() : renderUserView()}
      </div>
    </div>
  );
};

// Export the component
export default CreateTask;