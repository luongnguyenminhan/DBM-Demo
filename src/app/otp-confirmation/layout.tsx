export default function OtpConfirmationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 relative overflow-hidden">
      {/* Abstract Shape Elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-purple-100 to-indigo-200 rounded-full opacity-70 blur-3xl"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-blue-100 to-pink-100 rounded-full opacity-70 blur-3xl"></div>
      
      {/* Decorative Patterns */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 w-40 h-40 border-2 border-gray-700 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 border-2 border-gray-700 rounded-full"></div>
        <div className="absolute top-1/2 right-1/3 w-20 h-20 border-2 border-gray-700 rounded-full"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
