import React from 'react';
import StatCard from '@/components/molecules/StatCard';

export default function DashboardPage() {
  // Sample data - in a real app, this would come from API or database
  const meetings = [
    { id: 1, title: 'Weekly Sprint Review', date: '2023-06-10', duration: '45 mins', attendees: 8 },
    { id: 2, title: 'Product Design Discussion', date: '2023-06-12', duration: '60 mins', attendees: 5 },
    { id: 3, title: 'Quarterly Planning', date: '2023-06-15', duration: '120 mins', attendees: 12 },
    { id: 4, title: 'Client Presentation', date: '2023-06-18', duration: '30 mins', attendees: 4 },
  ];

  const usageSummary = [
    { metric: 'Total Meetings', value: 24, change: '+12%' },
    { metric: 'Meeting Hours', value: 36, change: '+8%' },
    { metric: 'Average Duration', value: '45 mins', change: '-5%' },
    { metric: 'Participants', value: 48, change: '+20%' },
  ];

  return (
    <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-4 overflow-hidden">
      {/* Usage Summary Cards - Top Row */}
      <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 h-auto">
        {usageSummary.map((item, index) => (
          <StatCard 
            key={`stat-${item.metric}-${index}`}
            metric={item.metric}
            value={item.value}
            change={item.change}
          />
        ))}
      </div>

      {/* Meeting List Table - Spans 2 columns */}
      <div className="lg:col-span-2 bg-white shadow rounded-lg flex flex-col h-full overflow-hidden">
        <div className="px-4 py-3 sm:px-6 border-b border-gray-200 flex-shrink-0">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Upcoming Meetings</h3>
        </div>
        <div className="flex-grow overflow-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Meeting
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Attendees
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {meetings.map((meeting) => (
                <tr key={meeting.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{meeting.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{meeting.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{meeting.duration}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{meeting.attendees}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Side Panel - Takes 1 column */}
      <div className="lg:col-span-1 bg-white shadow rounded-lg flex flex-col h-full">
        <div className="px-4 py-3 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Meeting Analytics</h3>
        </div>
        <div className="flex-grow p-4 overflow-auto">
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Most Active Participants</h4>
              <ul className="mt-2 divide-y divide-gray-200">
                <li className="py-2 flex justify-between">
                  <span className="text-sm">John Doe</span>
                  <span className="text-sm font-medium text-gray-900">12 meetings</span>
                </li>
                <li className="py-2 flex justify-between">
                  <span className="text-sm">Jane Smith</span>
                  <span className="text-sm font-medium text-gray-900">9 meetings</span>
                </li>
                <li className="py-2 flex justify-between">
                  <span className="text-sm">Mike Johnson</span>
                  <span className="text-sm font-medium text-gray-900">7 meetings</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500">Busiest Day</h4>
              <p className="mt-1 text-sm text-gray-900">Wednesday (8 meetings)</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-200 flex-shrink-0">
          <button className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
            View Full Report
          </button>
        </div>
      </div>
    </div>
  );
}
