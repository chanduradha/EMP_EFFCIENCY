// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     username: '',
//     password: ''
//   });

//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevData => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage('');
//     setError('');

//     // Log the request payload for debugging
//     console.log('Login Request:', formData);

//     try {
//       const response = await fetch('http://127.0.0.1:8000/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();
//       console.log('Server Response:', data); // Debug log

//       if (!response.ok) {
//         throw new Error(data.detail || 'Login failed');
//       }

//       setMessage(data.message);
//       alert(data.message);
      
//       // Clear form
//       setFormData({
//         username: '',
//         password: ''
//       });
//     } catch (err) {
//       console.error('Login Error:', err); // Debug log
//       setError('Invalid credentials. Please check your username and password.');
//     }
//   };

//   const goToRegister = () => {
//     navigate('/register');
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
//         <div>
//           <h2 className="text-center text-3xl font-extrabold text-gray-900">Login</h2>
//         </div>

//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
//             {error}
//           </div>
//         )}

//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div className="rounded-md shadow-sm space-y-4">
//             <div>
//               <input
//                 type="text"
//                 name="username"
//                 value={formData.username}
//                 onChange={handleChange}
//                 required
//                 className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Username"
//               />
//             </div>

//             <div>
//               <input
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//                 className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Password"
//               />
//             </div>
//           </div>

//           <div className="flex flex-col space-y-4">
//             <button
//               type="submit"
//               className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               Login
//             </button>
            
//             <div className="text-center">
//               <span className="text-gray-600">Don't have an account? </span>
//               <button
//                 type="button"
//                 onClick={goToRegister}
//                 className="text-indigo-600 hover:text-indigo-500 font-medium"
//               >
//                 Register here
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;

//''''''''''''''''''''''''''''''''''''''''''''''''''''''//

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     username: '',
//     password: ''
//   });

//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const [staffDetails, setStaffDetails] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevData => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage('');
//     setError('');
//     setStaffDetails(null);

//     try {
//       const response = await fetch('http://127.0.0.1:8000/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.detail || 'Login failed');
//       }

//       setMessage(data.message);
//       setStaffDetails(data.staff_details);

//       // Clear form
//       setFormData({
//         username: '',
//         password: ''
//       });
//     } catch (err) {
//       console.error('Login Error:', err);
//       setError('Invalid credentials. Please check your username and password.');
//     }
//   };

//   const goToRegister = () => {
//     navigate('/register');
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
//         <div>
//           <h2 className="text-center text-3xl font-extrabold text-gray-900">Login</h2>
//         </div>

//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
//             {error}
//           </div>
//         )}

//         {staffDetails && (
//           <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
//             <h3 className="text-lg font-semibold text-blue-900 mb-2">Staff Information</h3>
//             <div className="space-y-1">
//               <p className="text-blue-800">
//                 <span className="font-medium">Username: </span>
//                 <span className="text-blue-700">{staffDetails.username}</span>
//               </p>
//               <p className="text-blue-800">
//                 <span className="font-medium">Department: </span>
//                 <span className="text-blue-700">{staffDetails.department}</span>
//               </p>
//               <p className="text-blue-800">
//                 <span className="font-medium">Manager: </span>
//                 <span className="text-blue-700">{staffDetails.manager}</span>
//               </p>
//               <p className="text-blue-800">
//                 <span className="font-medium">HOD: </span>
//                 <span className="text-blue-700">{staffDetails.hod}</span>
//               </p>
//             </div>
//           </div>
//         )}

//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div className="rounded-md shadow-sm space-y-4">
//             <div>
//               <input
//                 type="text"
//                 name="username"
//                 value={formData.username}
//                 onChange={handleChange}
//                 required
//                 className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Username"
//               />
//             </div>

//             <div>
//               <input
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//                 className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Password"
//               />
//             </div>
//           </div>

//           <div className="flex flex-col space-y-4">
//             <button
//               type="submit"
//               className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
//             >
//               Login
//             </button>
            
//             <div className="text-center">
//               <span className="text-gray-600">Don't have an account? </span>
//               <button
//                 type="button"
//                 onClick={goToRegister}
//                 className="text-indigo-600 hover:text-indigo-500 font-medium focus:outline-none focus:underline"
//               >
//                 Register here
//               </button>
//             </div>
//           </div>
//         </form>

//         {message && (
//           <div className="mt-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative">
//             {message}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUserDetails }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [staffDetails, setStaffDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setStaffDetails(null);
    setIsLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8002/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
     

      if (!response.ok) {
        throw new Error(data.detail || 'Login failed');
      }

  // Create user details object
  const userDetails = {
    ...data.staff_details,
    is_admin: data.message.includes('Admin')
  };
  
  // Store in localStorage
  localStorage.setItem('userDetails', JSON.stringify(userDetails));
  
  setUserDetails(userDetails);

      setMessage(data.message);
      setStaffDetails(data.staff_details);

      // Clear form
      setFormData({
        username: '',
        password: ''
      });

      // Navigate to homepage
      navigate('/home');
    } catch (err) {
      console.error('Login Error:', err);
      setError('Invalid credentials. Please check your username and password.');
    } finally {
      setIsLoading(false);
    }
  };

  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">Employee Management</h2>
          <h3 className="text-center text-xl mt-2 text-gray-600">Login</h3>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}

        {staffDetails && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Staff Information</h3>
            <div className="space-y-1">
              <p className="text-blue-800">
                <span className="font-medium">Username: </span>
                <span className="text-blue-700">{staffDetails.username}</span>
              </p>
              <p className="text-blue-800">
                <span className="font-medium">Department: </span>
                <span className="text-blue-700">{staffDetails.department}</span>
              </p>
              <p className="text-blue-800">
                <span className="font-medium">Manager: </span>
                <span className="text-blue-700">{staffDetails.manager}</span>
              </p>
              <p className="text-blue-800">
                <span className="font-medium">HOD: </span>
                <span className="text-blue-700">{staffDetails.hod}</span>
              </p>
            </div>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="username" className="sr-only">Username</label>
              <input
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
              />
            </div>

            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                isLoading 
                  ? 'bg-indigo-400 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out`}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
            
            <div className="text-center">
              <span className="text-gray-600">Don't have an account? </span>
              <button
                type="button"
                onClick={goToRegister}
                className="text-indigo-600 hover:text-indigo-500 font-medium focus:outline-none focus:underline"
              >
                Register here
              </button>
            </div>
          </div>
        </form>

        {message && (
          <div className="mt-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;



