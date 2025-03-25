import React from 'react';

export default function GettingStartedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="h-screen flex flex-col overflow-hidden bg-gray-50">
            <header className="bg-white shadow-sm flex-shrink-0">
                <div className="max-w-full mx-auto px-4 py-3 sm:px-6 lg:px-8">
                    <h1 className="text-xl font-semibold text-gray-900">Bắt Đầu</h1>
                </div>
            </header>
            
            <main className="flex-grow overflow-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white shadow rounded-lg p-6">
                        <div className="mb-6">
                            <h2 className="text-lg font-medium text-gray-900">Chào mừng đến với Meobeo.ai</h2>
                            <p className="text-sm text-gray-500">Hãy thiết lập tài khoản của bạn với một số thông tin cần thiết</p>
                        </div>
                        
                        {/* Nội dung phân bước */}
                        <div className="mb-8">
                            {children}
                        </div>
                    </div>
                </div>
            </main>
            
            <footer className="bg-white flex-shrink-0">
                <div className="max-w-full mx-auto px-4 py-2 sm:px-6 lg:px-8">
                    <p className="text-xs text-gray-500">&copy; 2023 Meobeo.ai</p>
                </div>
            </footer>
        </div>
    );
}
