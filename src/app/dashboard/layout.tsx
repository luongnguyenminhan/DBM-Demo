import React from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gray-50">
      <header className="bg-white shadow-sm flex-shrink-0">
        <div className="max-w-full mx-auto px-4 py-3 sm:px-6 lg:px-8">
          <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
        </div>
      </header>
      
      <main className="flex-grow overflow-hidden px-4 sm:px-6 lg:px-8 py-4">
        {children}
      </main>
      
      <footer className="bg-white flex-shrink-0">
        <div className="max-w-full mx-auto px-4 py-2 sm:px-6 lg:px-8">
          <p className="text-xs text-gray-500">&copy; 2023 DBM Demo</p>
        </div>
      </footer>
    </div>
  );
}
