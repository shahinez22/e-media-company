import React, { useState, useEffect } from 'react';
import { Award, TrendingUp, Calendar, Bell, Users, Coffee, Gift, Star, DollarSign } from 'lucide-react';

const Announcements = () => {
  const [currentDate] = useState(new Date());
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  // Sample announcements data
  const announcements = [
    {
      id: 1,
      type: 'employee-of-month',
      title: 'Employee of the Month - shahinez',
      content: 'Congratulations to shahinez from the Marketing Department for winning Employee of the Month for September 2025, thanks to his outstanding performance and creative contributions to the new product campaign.',
      date: '2025-09-05',
      priority: 'high',
      icon: Award,
      color: 'bg-gradient-to-r from-yellow-400 to-orange-500'
    },
    {
      id: 2,
      type: 'salary-increase',
      title: 'Salary Increase - Important Announcement',
      content: 'We are pleased to announce an 8% salary increase for all employees effective from the beginning of October 2025. This increase comes as recognition of your continuous efforts and outstanding achievements.',
      date: '2025-09-04',
      priority: 'high',
      icon: TrendingUp,
      color: 'bg-gradient-to-r from-green-400 to-emerald-500'
    },
    {
      id: 3,
      type: 'holiday',
      title: 'Independence Day Holiday',
      content: 'Reminder: Thursday, September 28 is an official holiday on the occasion of Independence Day. Offices will be closed, and work will resume on Sunday, October 1.',
      date: '2025-09-03',
      priority: 'medium',
      icon: Calendar,
      color: 'bg-gradient-to-r from-blue-400 to-indigo-500'
    },
    {
      id: 4,
      type: 'training',
      title: 'New Training Program',
      content: 'We invite you to participate in the "Leadership & Creativity" program that will take place on September 15-16 in the training hall. Registration is open until September 10.',
      date: '2025-09-02',
      priority: 'medium',
      icon: Users,
      color: 'bg-gradient-to-r from-purple-400 to-pink-500'
    },
    {
      id: 5,
      type: 'benefit',
      title: 'Exclusive Employee Discounts',
      content: 'Take advantage of the new exclusive discounts: 20% at partner restaurants, 15% at gyms, and 25% on health insurance services.',
      date: '2025-09-01',
      priority: 'low',
      icon: Gift,
      color: 'bg-gradient-to-r from-cyan-400 to-teal-500'
    },
    {
      id: 6,
      type: 'policy',
      title: 'Flexible Work Policy Update',
      content: 'The flexible work policy has been updated to include 3 work-from-home days per week for all eligible departments. For more details, please refer to the employee handbook.',
      date: '2025-08-30',
      priority: 'medium',
      icon: Coffee,
      color: 'bg-gradient-to-r from-rose-400 to-red-500'
    }
  ];

  // Upcoming events
  const upcomingEvents = [
    { title: 'Monthly Team Meeting', date: 'September 10', type: 'meeting' },
    { title: 'Outstanding Employee Award Ceremony', date: 'September 20', type: 'celebration' },
    { title: 'Safety & Security Training', date: 'September 25', type: 'training' },
    { title: 'Family Open Day', date: 'October 5', type: 'social' }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-yellow-600 bg-yellow-50';
      case 'medium': return 'border-yellow-600 bg-yellow-50';
      case 'low': return 'border-yellow-600 bg-yellow-50';
      default: return 'border-yellow-600 bg-yellow-50';
    }
  };

  const getTypeLabel = (type) => {
    const labels = {
      'employee-of-month': 'Employee of the Month',
      'salary-increase': 'Salary Increase',
      'holiday': 'Holiday',
      'training': 'Training',
      'benefit': 'Benefits',
      'policy': 'Policies'
    };
    return labels[type] || 'Announcement';
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Employee Announcements Board
          </h1>
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <Bell className="w-5 h-5" />
            <span>Last update: {currentDate.toLocaleDateString('en-US')}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Announcements */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <Bell className="w-6 h-6 text-yellow-600" />
              Latest Announcements
            </h2>
            
            <div className="space-y-4">
              {announcements.map((announcement) => {
                const IconComponent = announcement.icon;
                return (
                  <div
                    key={announcement.id}
                    className={`rounded-xl border-l-4 ${getPriorityColor(announcement.priority)} p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1`}
                    onClick={() => setSelectedAnnouncement(announcement)}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`rounded-full p-3 ${announcement.color} text-white shadow-lg`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="bg-yellow-100 text-black-800 text-xs font-medium px-2 py-1 rounded-full">
                            {getTypeLabel(announcement.type)}
                          </span>
                          <span className="text-sm text-gray-500">
                            {new Date(announcement.date).toLocaleDateString('en-US')}
                          </span>
                        </div>
                        
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                          {announcement.title}
                        </h3>
                        
                        <p className="text-gray-600 line-clamp-2">
                          {announcement.content}
                        </p>
                        
                        <button className="mt-3 text-yellow-600 hover:text-yellow-800 font-medium text-sm transition-colors">
                          Read more →
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                Quick Stats
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Employee of the Month</span>
                  <span className="font-semibold text-blue-600">shahinez</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Last Salary Increase</span>
                  <span className="font-semibold text-green-600">8%</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Remaining Leave Days</span>
                  <span className="font-semibold text-orange-600">12 days</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Completed Trainings</span>
                  <span className="font-semibold text-purple-600">5/8</span>
                </div>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-500" />
                Upcoming Events
              </h3>
              
              <div className="space-y-3">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800 text-sm">{event.title}</p>
                      <p className="text-xs text-gray-500">{event.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Employee Benefits Quick Access */}
            <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Your Current Benefits
              </h3>
              
              <div className="space-y-2 text-sm">
                <div>• Comprehensive Health Insurance</div>
                <div>• 20% Discount at Restaurants</div>
                <div>• Flexible Work 3 Days/Week</div>
                <div>• 30 Days Annual Leave</div>
                <div>• Free Training Programs</div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal for detailed announcement */}
        {selectedAnnouncement && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedAnnouncement(null)}>
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-8" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-start gap-4 mb-6">
                <div className={`rounded-full p-4 ${selectedAnnouncement.color} text-white shadow-lg`}>
                  <selectedAnnouncement.icon className="w-8 h-8" />
                </div>
                
                <div className="flex-1">
                  <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                    {getTypeLabel(selectedAnnouncement.type)}
                  </span>
                  <h2 className="text-2xl font-bold text-gray-800 mt-3">
                    {selectedAnnouncement.title}
                  </h2>
                  <p className="text-gray-500 mt-1">
                    {new Date(selectedAnnouncement.date).toLocaleDateString('en-US')}
                  </p>
                </div>
                
                <button 
                  onClick={() => setSelectedAnnouncement(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
              
              <div className="text-gray-700 leading-relaxed text-lg">
                {selectedAnnouncement.content}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <button 
                  onClick={() => setSelectedAnnouncement(null)}
                  className="bg-yellow-300 hover:bg-yellow-600 text-black px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


export default Announcements;