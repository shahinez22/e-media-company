import React, { useState, useEffect } from 'react';
import { User, Briefcase, Plus, X, Edit, Trash } from 'lucide-react';

const API_URL = "http://localhost/news-platform";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEmployee, setNewEmployee] = useState({ name: '', position: '', department: '', email: '' });
  const [editingEmployeeId, setEditingEmployeeId] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await fetch(`${API_URL}/getEmployees.php`);
      const data = await res.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setNewEmployee(prev => ({ ...prev, [name]: value }));
  };

  const handleAddEmployee = async e => {
    e.preventDefault();
    if (!newEmployee.name || !newEmployee.position) return;

    try {
      const endpoint = editingEmployeeId ? 'updateEmployee.php' : 'addEmployee.php';
      const payload = editingEmployeeId ? { ...newEmployee, id: editingEmployeeId } : newEmployee;

      const res = await fetch(`${API_URL}/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (data.success) {
        fetchEmployees();
        setShowAddForm(false);
        setNewEmployee({ name: '', position: '', department: '', email: '' });
        setEditingEmployeeId(null);
      }
    } catch (error) {
      console.error("Error saving employee:", error);
    }
  };

  const handleEdit = emp => {
    setNewEmployee({ ...emp });
    setEditingEmployeeId(emp.id);
    setShowAddForm(true);
  };

  const handleDelete = async id => {
    try {
      const res = await fetch(`${API_URL}/deleteEmployee.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleCancel = () => {
    setNewEmployee({ name: '', position: '', department: '', email: '' });
    setEditingEmployeeId(null);
    setShowAddForm(false);
  };

  

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg">
        <div className="bg-yellow-300 text-black p-6 rounded-t-lg">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <User className="w-6 h-6" />
            Employee Directory
          </h1>
          <div className="flex justify-between items-center mt-2">
            <p className="opacity-90">Meet our amazing team members</p>
            <button
              onClick={() => {
                setShowAddForm(true);
                setEditingEmployeeId(null);
                setNewEmployee({ name: '', position: '', department: '', email: '' });
              }}
              className="bg-white text-yellow-600 px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-blue-50 transition-colors duration-200"
            >
              <Plus className="w-4 h-4" />
              Add Member
            </button>
          </div>
        </div>

        <div className="p-6">
          {showAddForm && (
            <div className="mb-6 bg-yellow-50 border border-yellow-600 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-black-900">
                  {editingEmployeeId ? "Edit Employee" : "Add New Employee"}
                </h2>
                <button
                  onClick={handleCancel}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleAddEmployee}>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={newEmployee.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Position *
                    </label>
                    <input
                      type="text"
                      name="position"
                      value={newEmployee.position}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Department
                    </label>
                    <input
                      type="text"
                      name="department"
                      value={newEmployee.department}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={newEmployee.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <button
                    type="submit"
                    className="bg-yellow-300 text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-600 transition-colors duration-200"
                  >
                    {editingEmployeeId ? "Update Employee" : "Add Employee"}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-400 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {employees.map((employee) => (
              <div
                key={employee.id}
                className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 rounded-full p-2">
                    <User className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {employee.name}
                    </h3>
                    <div className="flex items-center gap-1 mt-1">
                      <Briefcase className="w-4 h-4 text-gray-500" />
                      <span className="text-yellow-600 font-medium">
                        {employee.position}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {employee.department}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      {employee.email}
                    </p>

                    {/* Edit & Delete buttons */}
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => handleEdit(employee)}
                        className="flex items-center gap-1 text-sm bg-yellow-100 text-yellow-700 px-3 py-1 rounded hover:bg-yellow-200"
                      >
                        <Edit className="w-4 h-4" /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(employee.id)}
                        className="flex items-center gap-1 text-sm bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200"
                      >
                        <Trash className="w-4 h-4" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-100 px-6 py-4 rounded-b-lg">
          <p className="text-sm text-gray-600 text-center">
            Total Employees: {employees.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Employees;
