
import React, { useState, useEffect } from "react";
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
} from "lucide-react";
import { useAuth } from "./Authcontext";

const CalendarPage = () => {
  const { API_URL } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [filterCategory, setFilterCategory] = useState("all");
  const [programs, setPrograms] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newProgram, setNewProgram] = useState({
    title: "",
    category: "tv",
    time: "",
    location: "",
    participants: "",
    date: "",
  });

  // Fetch programs from the database
  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    setIsLoading(true);
    setError(null);
    try {
      console.log("Fetching programs from:", `${API_URL}/programs.php`);
      
      const response = await fetch(`${API_URL}/programs.php`, {
        method: 'GET',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log("Response status:", response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Received data:", data);

      if (data.success) {
        setPrograms(data.programs);
        console.log("Programs loaded:", data.programs.length);
      } else {
        setError(data.message || "Failed to fetch programs");
        console.error("Failed to fetch programs:", data.message);
      }
    } catch (error) {
      console.error("Error fetching programs:", error);
      setError("An error occurred while connecting to the server: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddProgram = async () => {
    if (!newProgram.title || !newProgram.date) {
      setError("Please enter the title and date");
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const programData = {
        title: newProgram.title,
        category: newProgram.category,
        time: newProgram.time || "00:00",
        location: newProgram.location || "",
        date: newProgram.date,
        participants: newProgram.participants
          .split(",")
          .map((p) => p.trim())
          .filter((p) => p),
      };

      console.log("Sending program data:", programData);

      const response = await fetch(`${API_URL}/programs.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(programData),
      });

      console.log("Add response status:", response.status);
      
      const data = await response.json();
      console.log("Add response data:", data);

      if (data.success) {
        await fetchPrograms(); // Update the list
        setNewProgram({
          title: "",
          category: "tv",
          time: "",
          location: "",
          participants: "",
          date: "",
        });
        setIsModalOpen(false);
        window.alert("Program added successfully");
      } else {
        setError(data.message || "Failed to add program");
      }
    } catch (error) {
      console.error("Error adding program:", error);
      setError("An error occurred while adding the program: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProgram = async (programId) => {
    if (!window.confirm("Are you sure you want to delete this program?")) {
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_URL}/programs.php`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ id: programId }),
      });

      const data = await response.json();

      if (data.success) {
        await fetchPrograms();
        setSelectedProgram(null);
        window.alert("Program deleted successfully");
      } else {
        setError(data.message || "Failed to delete program");
      }
    } catch (error) {
      console.error("Error deleting program:", error);
      setError("An error occurred while deleting the program: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <CalendarIcon className="w-8 h-8 text-yellow-600" />
              Media Programs Calendar
            </h1>
            <div className="flex gap-2">
              <button
                onClick={() => setIsModalOpen(true)}
                disabled={isLoading}
                className="bg-yellow-300 text-black px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-yellow-600 disabled:opacity-50"
              >
                <Plus className="w-4 h-4" /> Add Program
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevMonth}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-semibold text-gray-700">
                {currentDate.toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </h2>
              <button
                onClick={handleNextMonth}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="border rounded-lg px-3 py-1"
            >
              <option value="all">All</option>
              <option value="tv">Television</option>
              <option value="radio">Radio</option>
              <option value="event">Event</option>
            </select>
          </div>
        </div>

        {/* Calendar Grid */}
        {isLoading && (
          <div className="text-center py-4">Loading...</div>
        )}
        
        <div className="grid grid-cols-7 gap-2 bg-white rounded-xl shadow-lg p-4">
          {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
            <div
              key={day}
              className="text-center font-medium text-gray-500 pb-2"
            >
              {day}
            </div>
          ))}

          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} className="h-24" />
          ))}

          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const fullDate = new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              day
            )
              .toISOString()
              .split("T")[0];
            const dayPrograms = programs.filter((p) => p.date === fullDate);

            return (
              <div
                key={day}
                className="h-24 border rounded-lg p-1 flex flex-col hover:bg-yellow-50 cursor-pointer"
                onClick={() =>
                  setSelectedDate(
                    new Date(
                      currentDate.getFullYear(),
                      currentDate.getMonth(),
                      day
                    )
                  )
                }
              >
                <div className="text-sm font-semibold">{day}</div>
                <div className="flex flex-col gap-1 overflow-y-auto">
                  {dayPrograms
                    .filter(
                      (p) =>
                        filterCategory === "all" ||
                        p.category === filterCategory
                    )
                    .map((p) => (
                      <div
                        key={p.id}
                        className="text-xs bg-yellow-100 text-black-800 rounded px-1 truncate"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProgram(p);
                        }}
                      >
                        {p.title}
                      </div>
                    ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Program Modal */}
        {selectedProgram && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedProgram(null)}
          >
            <div
              className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold mb-4">{selectedProgram.title}</h2>
              <p className="flex items-center gap-2 text-gray-700 mb-2">
                <Clock className="w-4 h-4" /> {selectedProgram.time}
              </p>
              <p className="flex items-center gap-2 text-gray-700 mb-2">
                <MapPin className="w-4 h-4" /> {selectedProgram.location}
              </p>
              <p className="flex items-center gap-2 text-gray-700 mb-4">
                <Users className="w-4 h-4" />{" "}
                {selectedProgram.participants.join(", ")}
              </p>
              <div className="flex gap-2">
                <button
                  className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center justify-center gap-2 disabled:opacity-50"
                  onClick={() => handleDeleteProgram(selectedProgram.id)}
                  disabled={isLoading}
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
                <button
                  className="flex-1 bg-yellow-300 text-black px-4 py-2 rounded-lg hover:bg-yellow-400"
                  onClick={() => setSelectedProgram(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Program Modal */}
        {isModalOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setIsModalOpen(false)}
          >
            <div
              className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold mb-4">Add New Program</h2>
              
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
                  {error}
                </div>
              )}
              
              <input
                type="text"
                placeholder="Title *"
                value={newProgram.title}
                onChange={(e) =>
                  setNewProgram({ ...newProgram, title: e.target.value })
                }
                className="w-full border outline-yellow-600 rounded-lg p-2 mb-2"
                required
              />
              <input
                type="date"
                value={newProgram.date}
                onChange={(e) =>
                  setNewProgram({ ...newProgram, date: e.target.value })
                }
                className="w-full border outline-yellow-600 rounded-lg p-2 mb-2"
                required
              />
              <input
                type="time"
                value={newProgram.time}
                onChange={(e) =>
                  setNewProgram({ ...newProgram, time: e.target.value })
                }
                className="w-full border outline-yellow-600 rounded-lg p-2 mb-2"
              />
              <input
                type="text"
                placeholder="Location"
                value={newProgram.location}
                onChange={(e) =>
                  setNewProgram({ ...newProgram, location: e.target.value })
                }
                className="w-full border outline-yellow-600 rounded-lg p-2 mb-2"
              />
              <input
                type="text"
                placeholder="Participants (comma separated)"
                value={newProgram.participants}
                onChange={(e) =>
                  setNewProgram({
                    ...newProgram,
                    participants: e.target.value,
                  })
                }
                className="w-full border outline-yellow-600 rounded-lg p-2 mb-2"
              />
              <select
                value={newProgram.category}
                onChange={(e) =>
                  setNewProgram({ ...newProgram, category: e.target.value })
                }
                className="w-full border outline-yellow-600 rounded-lg p-2 mb-4"
              >
                <option value="tv">Television</option>
                <option value="radio">Radio</option>
                <option value="event">Event</option>
              </select>
              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-2 rounded-lg border"
                  onClick={() => {
                    setIsModalOpen(false);
                    setError(null);
                  }}
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 rounded-lg bg-yellow-600 text-black disabled:opacity-50"
                  onClick={handleAddProgram}
                  disabled={isLoading}
                >
                  {isLoading ? "Adding..." : "Add"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarPage;

