// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Register = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//     department: '',
//     contact_number: '',
//     date_of_joining: '',
//     staff_id: '',
//     qualification: '',
//     is_admin: false
//   });

//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');

//   const departments = ['SMDDC', 'NMTC', 'IT', 'PD', 'ADMIN'];

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prevData => ({
//       ...prevData,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage('');
//     setError('');

//     // Log the request payload for debugging
//     console.log('Register Request:', formData);

//     try {
//       const response = await fetch('http://127.0.0.1:8000/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();
//       console.log('Server Response:', data); // Debug log

//       if (!response.ok) {
//         throw new Error(data.detail || 'Registration failed');
//       }

//       setMessage(data.message);
//       alert('Registration successful! Redirecting to login...');
//       setTimeout(() => {
//         navigate('/login');
//       }, 2000);
//     } catch (err) {
//       console.error('Registration Error:', err); // Debug log
//       setError(err.message);
//     }
//   };

//   const goToLogin = () => {
//     navigate('/login');
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
//         <div className="flex justify-between items-center">
//           <button
//             onClick={goToLogin}
//             className="text-indigo-600 hover:text-indigo-500 flex items-center"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L4.414 9H17a1 1 0 110 2H4.414l5.293 5.293a1 1 0 010 1.414z" clipRule="evenodd" />
//             </svg>
//             Back to Login
//           </button>
//           <h2 className="text-2xl font-extrabold text-gray-900">Register</h2>
//         </div>
        
//         {message && (
//           <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
//             {message}
//           </div>
//         )}
        
//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
//             {error}
//           </div>
//         )}

//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           {/* Rest of the form fields remain the same */}
//           {/* ... (previous form fields code) ... */}
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

//             <div>
//               <select
//                 name="department"
//                 value={formData.department}
//                 onChange={handleChange}
//                 required
//                 className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//               >
//                 <option value="">Select Department</option>
//                 {departments.map((dept) => (
//                   <option key={dept} value={dept}>{dept}</option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <input
//                 type="tel"
//                 name="contact_number"
//                 value={formData.contact_number}
//                 onChange={handleChange}
//                 required
//                 className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Contact Number"
//               />
//             </div>

//             <div>
//               <input
//                 type="date"
//                 name="date_of_joining"
//                 value={formData.date_of_joining}
//                 onChange={handleChange}
//                 required
//                 className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//               />
//             </div>

//             <div>
//               <input
//                 type="text"
//                 name="staff_id"
//                 value={formData.staff_id}
//                 onChange={handleChange}
//                 required
//                 className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Staff ID"
//               />
//             </div>

//             <div>
//               <input
//                 type="text"
//                 name="qualification"
//                 value={formData.qualification}
//                 onChange={handleChange}
//                 required
//                 className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Qualification"
//               />
//             </div>

//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 name="is_admin"
//                 checked={formData.is_admin}
//                 onChange={handleChange}
//                 className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//               />
//               <label className="ml-2 block text-sm text-gray-900">
//                 Register as Admin
//               </label>
//             </div>
//           </div>

//           <div>
//             <button
//               type="submit"
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               Register
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    department: '',
    contact_number: '',
    date_of_joining: '',
    staff_id: '',
    qualification: '',
    is_admin: false
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const departments = ['SMDDC', 'NMTC', 'IT', 'PD', 'ADMIN'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => {
      // If switching to admin, clear department and staff_id
      if (name === 'is_admin') {
        return {
          ...prevData,
          [name]: checked,
          ...(checked ? { department: '', staff_id: '' } : {})
        };
      }
      
      return {
        ...prevData,
        [name]: type === 'checkbox' ? checked : value
      };
    });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setMessage('');
  //   setError('');

  //   // If admin, ensure department and staff_id are empty
  //   const finalFormData = formData.is_admin 
  //     ? { ...formData, department: '', staff_id: '' }
  //     : formData;

  //   // Log the request payload for debugging
  //   console.log('Register Request:', finalFormData);

  //   try {
  //     const response = await fetch('http://127.0.0.1:8000/register', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(finalFormData),
  //     });

  //     const data = await response.json();
  //     console.log('Server Response:', data); // Debug log

  //     if (!response.ok) {
  //       throw new Error(data.detail || 'Registration failed');
  //     }

  //     setMessage(data.message);
  //     alert('Registration successful! Redirecting to login...');
  //     setTimeout(() => {
  //       navigate('/login');
  //     }, 2000);
  //   } catch (err) {
  //     console.error('Registration Error:', err); // Debug log
  //     setError(err.message);
  //   }
  // };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
  
    // Prepare the registration payload
    const finalFormData = formData.is_admin 
      ? {
          username: formData.username,
          password: formData.password,
          contact_number: formData.contact_number,
          date_of_joining: formData.date_of_joining,
          qualification: formData.qualification,
          is_admin: true,
          department: null,  // explicitly set to null for admin
          staff_id: null    // explicitly set to null for admin
        }
      : formData;
  
    // Log the request payload for debugging
    console.log('Register Request:', finalFormData);
  
    try {
      const response = await fetch('http://127.0.0.1:8002/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalFormData),
      });
  
      const data = await response.json();
      console.log('Server Response:', data); // Debug log
  
      if (!response.ok) {
        throw new Error(data.detail || 'Registration failed');
      }
  
      setMessage(data.message);
      alert('Registration successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      console.error('Registration Error:', err.message); // Improved error logging
      setError(err.message);
    }
  };

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-between items-center">
          <button
            onClick={goToLogin}
            className="text-indigo-600 hover:text-indigo-500 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L4.414 9H17a1 1 0 110 2H4.414l5.293 5.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Login
          </button>
          <h2 className="text-2xl font-extrabold text-gray-900">Register</h2>
        </div>
        
        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
            {message}
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
              />
            </div>

            <div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>

            {!formData.is_admin && (
              <>
                <div>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                    className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <input
                    type="text"
                    name="staff_id"
                    value={formData.staff_id}
                    onChange={handleChange}
                    required
                    className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Staff ID"
                  />
                </div>
              </>
            )}

            <div>
              <input
                type="tel"
                name="contact_number"
                value={formData.contact_number}
                onChange={handleChange}
                required
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Contact Number"
              />
            </div>

            <div>
              <input
                type="date"
                name="date_of_joining"
                value={formData.date_of_joining}
                onChange={handleChange}
                required
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>

            <div>
              <input
                type="text"
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                required
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Qualification"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="is_admin"
                checked={formData.is_admin}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900">
                Register as Admin
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;