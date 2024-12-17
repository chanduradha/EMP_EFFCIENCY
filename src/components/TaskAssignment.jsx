import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TaskAssignment = ({ userDetails }) => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([
    'SMDDC', 'NMTC', 'IT', 'PD', 'ADMIN'
  ]);
  const [departmentMembers, setDepartmentMembers] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [taskDetails, setTaskDetails] = useState({
    projectName: '',
    description: '',
    startDate: '',
    endDate: '',
    period: 1 // default to 1 month
  });
  const [error, setError] = useState('');

  // Fetch department members when a department is selected
  useEffect(() => {
    const fetchDepartmentMembers = async () => {
      if (!selectedDepartment) return;

      try {
        const response = await fetch(`http://127.0.0.1:8002/department-members?department=${selectedDepartment}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch department members');
        }

        const data = await response.json();
        setDepartmentMembers(data.members);
      } catch (err) {
        console.error('Error fetching department members:', err);
        setError(err.message);
      }
    };

    fetchDepartmentMembers();
  }, [selectedDepartment]);

  // Handle department selection
  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
    setSelectedMembers([]); // Reset selected members
  };

  // Handle member selection (multi-select)
  const handleMemberSelection = (member) => {
    setSelectedMembers(prev => 
      prev.includes(member) 
        ? prev.filter(m => m !== member)
        : [...prev, member]
    );
  };

  // Handle input changes for task details
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle task assignment
  const handleTaskAssignment = async (e) => {
    e.preventDefault();

    // Validation
    if (!selectedDepartment || selectedMembers.length === 0) {
      setError('Please select a department and at least one member');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8002/assign-task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...taskDetails,
          department: selectedDepartment,
          assignedTo: selectedMembers.map(member => member.username)
        })
      });

      if (!response.ok) {
        throw new Error('Failed to assign task');
      }

      // Navigate back to homepage or show success message
      navigate('/');
    } catch (err) {
      console.error('Error assigning task:', err);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Assign New Task
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleTaskAssignment} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          {/* Project Name */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="projectName">
              Project Name
            </label>
            <input
              type="text"
              name="projectName"
              value={taskDetails.projectName}
              onChange={handleInputChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter project name"
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              name="description"
              value={taskDetails.description}
              onChange={handleInputChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter task description"
              rows="4"
            />
          </div>

          {/* Department Selection */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="department">
              Select Department
            </label>
            <select
              value={selectedDepartment}
              onChange={handleDepartmentChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select a Department</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          {/* Department Members Selection */}
          {selectedDepartment && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Select Team Members
              </label>
              <div className="grid grid-cols-2 gap-2">
                {departmentMembers.map((member) => (
                  <label 
                    key={member.username} 
                    className={`flex items-center p-2 rounded cursor-pointer ${
                      selectedMembers.includes(member) 
                        ? 'bg-indigo-100 border-indigo-300' 
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    <input 
                      type="checkbox"
                      checked={selectedMembers.includes(member)}
                      onChange={() => handleMemberSelection(member)}
                      className="mr-2"
                    />
                    {member.username}
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Date and Period */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={taskDetails.startDate}
                onChange={handleInputChange}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endDate">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                value={taskDetails.endDate}
                onChange={handleInputChange}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Assign Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskAssignment;