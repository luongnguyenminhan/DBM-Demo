"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type Question = {
    id: number;
    title: string;
    description: string;
    component: React.ReactNode;
    isRequired?: boolean;
};

export default function EnterViuQuestionnaire() {
    const [currentStep, setCurrentStep] = useState(0);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [answers, setAnswers] = useState<Record<string, any>>({});
    const [, setAnimationComplete] = useState(false);

    // Available skills for the skills question
    const availableSkills = [
        // Programming Languages
        "JavaScript", "TypeScript", "Python", "Java", "C#", "PHP", "Ruby", "Go", "Swift", "C++", 
        // Frontend
        "React", "Angular", "Vue.js", "HTML/CSS", "Next.js", "Tailwind CSS", "Bootstrap", 
        // Backend
        "Node.js", "Express", "Django", "Spring Boot", "ASP.NET", "Laravel", "Ruby on Rails",
        // Database
        "SQL", "MongoDB", "PostgreSQL", "MySQL", "Firebase", "Oracle", 
        // Data & Analytics
        "PowerBI", "Tableau", "Excel", "Data Analysis", "Machine Learning", "R", "SPSS",
        // DevOps & Tools
        "Git", "Docker", "Kubernetes", "AWS", "Azure", "Google Cloud", "CI/CD"
    ];

    useEffect(() => {
        // Trigger animation completion after mount
        setAnimationComplete(true);
    }, []);

    const questions: Question[] = [
        {
            id: 1,
            title: "Trình Độ Học Vấn",
            description: "Cho chúng tôi biết về trình độ học vấn của bạn.",
            isRequired: true,
            component: (
                <div className="py-4 overflow-y-auto max-h-[400px]">
                    <h3 className="text-lg font-medium">Bạn đã hoàn thành trình độ học vấn nào?</h3>
                    <div className="mt-4 space-y-2">
                        {[
                            "Trung học phổ thông", 
                            "Cao đẳng", 
                            "Đại học", 
                            "Thạc sĩ", 
                            "Tiến sĩ", 
                            "Chứng chỉ nghề"
                        ].map((option) => (
                            <button 
                                key={option} 
                                className={`w-full text-left px-4 py-3 rounded-md border ${
                                    answers["education"] === option 
                                        ? "bg-[var(--color-primary)] text-[var(--text-on-primary)] border-[var(--border-primary)]" 
                                        : "bg-[var(--color-white)] text-[var(--text-primary)] border-[var(--border-gray)] hover:bg-[var(--color-off-white)]"
                                }`}
                                onClick={() => setAnswers({...answers, education: option})}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            ),
        },
        {
            id: 2,
            title: "Kinh Nghiệm",
            description: "Hãy cho chúng tôi biết về kinh nghiệm làm việc của bạn.",
            isRequired: true,
            component: (
                <div className="py-4 overflow-y-auto max-h-[400px]">
                    <h3 className="text-lg font-medium">Bạn có bao nhiêu năm kinh nghiệm làm việc?</h3>
                    <div className="mt-4 space-y-2">
                        {[
                            "Chưa có kinh nghiệm", 
                            "Dưới 1 năm", 
                            "1-3 năm", 
                            "3-5 năm", 
                            "5-10 năm", 
                            "Trên 10 năm"
                        ].map((option) => (
                            <button 
                                key={option} 
                                className={`w-full text-left px-4 py-3 rounded-md border ${
                                    answers["experience"] === option 
                                        ? "bg-[var(--color-primary)] text-[var(--text-on-primary)] border-[var(--border-primary)]" 
                                        : "bg-[var(--color-white)] text-[var(--text-primary)] border-[var(--border-gray)] hover:bg-[var(--color-off-white)]"
                                }`}
                                onClick={() => setAnswers({...answers, experience: option})}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            ),
        },
        {
            id: 3,
            title: "Lĩnh Vực",
            description: "Chọn lĩnh vực bạn đang làm việc hoặc muốn làm việc.",
            isRequired: true,
            component: (
                <div className="py-4 overflow-y-auto max-h-[400px]">
                    <h3 className="text-lg font-medium">Bạn quan tâm đến lĩnh vực nào?</h3>
                    <div className="mt-4 space-y-2">
                        {[
                            "Công nghệ thông tin", 
                            "Tài chính - Ngân hàng", 
                            "Marketing - Truyền thông", 
                            "Giáo dục - Đào tạo", 
                            "Y tế - Dược phẩm", 
                            "Kỹ thuật - Công nghệ", 
                            "Nhà hàng - Khách sạn",
                            "Bán lẻ - Thương mại"
                        ].map((option) => (
                            <button 
                                key={option} 
                                className={`w-full text-left px-4 py-3 rounded-md border ${
                                    answers["field"] === option 
                                        ? "bg-[var(--color-primary)] text-[var(--text-on-primary)] border-[var(--border-primary)]" 
                                        : "bg-[var(--color-white)] text-[var(--text-primary)] border-[var(--border-gray)] hover:bg-[var(--color-off-white)]"
                                }`}
                                onClick={() => setAnswers({...answers, field: option})}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            ),
        },
        {
            id: 4,
            title: "Kỹ Năng",
            description: "Chọn các kỹ năng bạn đã thành thạo.",
            isRequired: true,
            component: (
                <div className="py-4">
                    <h3 className="text-lg font-medium mb-4">Kỹ năng của bạn?</h3>
                    <div className="mb-6">
                        <input 
                            type="text" 
                            className="w-full px-4 py-2 border border-[var(--border-gray)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                            placeholder="Tìm kiếm kỹ năng..."
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            onChange={(e) => {
                                // Filter skills functionality can be added here
                            }}
                        />
                    </div>
                    <div className="flex flex-wrap gap-2 max-h-[300px] overflow-y-auto custom-scrollbar p-2">
                        {availableSkills.map((skill) => (
                            <motion.button
                                key={skill}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.2 }}
                                className={`px-3 py-2 rounded-full text-sm border transition-all duration-200 ${
                                    answers["skills"]?.includes(skill)
                                        ? "bg-[var(--color-primary)] text-[var(--text-on-primary)] border-[var(--border-primary)]"
                                        : "bg-[var(--color-white)] text-[var(--text-primary)] border-[var(--border-gray)] hover:bg-[var(--color-off-white)]"
                                }`}
                                onClick={() => {
                                    const skills = answers["skills"] || [];
                                    const updated = skills.includes(skill)
                                        ? skills.filter((s: string) => s !== skill)
                                        : [...skills, skill];
                                    setAnswers({...answers, skills: updated});
                                }}
                            >
                                {skill} {answers["skills"]?.includes(skill) && "✓"}
                            </motion.button>
                        ))}
                    </div>
                    <div className="mt-4">
                        <p className="text-sm text-[var(--text-secondary)]">
                            Đã chọn: {(answers["skills"] || []).length} kỹ năng
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2">
                            {(answers["skills"] || []).slice(0, 5).map((skill: string, index: number) => (
                                <span key={index} className="text-xs bg-[var(--color-primary-light)] text-[var(--text-primary)] px-2 py-1 rounded-full">
                                    {skill}
                                </span>
                            ))}
                            {(answers["skills"] || []).length > 5 && (
                                <span className="text-xs bg-[var(--color-primary-light)] text-[var(--text-primary)] px-2 py-1 rounded-full">
                                    +{(answers["skills"] || []).length - 5}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            ),
        },
        {
            id: 5,
            title: "Mục Tiêu",
            description: "Hãy cho chúng tôi biết về mục tiêu nghề nghiệp của bạn.",
            isRequired: true,
            component: (
                <div className="py-4 overflow-y-auto max-h-[400px]">
                    <h3 className="text-lg font-medium">Mục tiêu nghề nghiệp của bạn trong 3-5 năm tới là gì?</h3>
                    <div className="mt-4 space-y-2">
                        {[
                            "Thăng tiến trong công việc hiện tại", 
                            "Chuyển đổi sang lĩnh vực mới", 
                            "Khởi nghiệp kinh doanh riêng", 
                            "Phát triển kỹ năng chuyên môn", 
                            "Làm việc ở nước ngoài", 
                            "Cân bằng cuộc sống và công việc tốt hơn"
                        ].map((option) => (
                            <button 
                                key={option} 
                                className={`w-full text-left px-4 py-3 rounded-md border ${
                                    answers["goals"] === option 
                                        ? "bg-[var(--color-primary)] text-[var(--text-on-primary)] border-[var(--border-primary)]" 
                                        : "bg-[var(--color-white)] text-[var(--text-primary)] border-[var(--border-gray)] hover:bg-[var(--color-off-white)]"
                                }`}
                                onClick={() => setAnswers({...answers, goals: option})}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            ),
        },
        {
            id: 6,
            title: "Thách Thức",
            description: "Chia sẻ về thách thức nghề nghiệp bạn đang gặp phải.",
            isRequired: true,
            component: (
                <div className="py-4 overflow-y-auto max-h-[400px]">
                    <h3 className="text-lg font-medium">Thách thức lớn nhất trong sự nghiệp của bạn hiện tại là gì?</h3>
                    <div className="mt-4 space-y-2">
                        {[
                            "Thiếu cơ hội thăng tiến", 
                            "Mức lương không như mong đợi", 
                            "Thiếu kỹ năng cần thiết", 
                            "Cân bằng công việc và cuộc sống", 
                            "Không hài lòng với công việc hiện tại", 
                            "Không biết nên phát triển hướng nào", 
                            "Áp lực công việc quá lớn"
                        ].map((option) => (
                            <button 
                                key={option} 
                                className={`w-full text-left px-4 py-3 rounded-md border ${
                                    answers["challenges"] === option 
                                        ? "bg-[var(--color-primary)] text-[var(--text-on-primary)] border-[var(--border-primary)]" 
                                        : "bg-[var(--color-white)] text-[var(--text-primary)] border-[var(--border-gray)] hover:bg-[var(--color-off-white)]"
                                }`}
                                onClick={() => setAnswers({...answers, challenges: option})}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            ),
        },
    ];

    const isCurrentQuestionAnswered = () => {
        const currentQuestion = questions[currentStep];
        switch(currentQuestion.id) {
            case 1:
                return !!answers.education;
            case 2:
                return !!answers.experience;
            case 3:
                return !!answers.field;
            case 4:
                return answers.skills && answers.skills.length > 0;
            case 5:
                return !!answers.goals;
            case 6:
                return !!answers.challenges;
            default:
                return true;
        }
    };

    const handleNext = () => {
        if (!isCurrentQuestionAnswered() && questions[currentStep].isRequired) {
            return;
        }
        
        if (currentStep < questions.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            console.log("Đã hoàn thành khảo sát:", answers);
            // Handle completion logic here
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const currentQuestion = questions[currentStep];

    const pageVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 }
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header with Ant Design Steps */}
            <motion.div 
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full bg-[var(--color-white)] border-b border-[var(--border-gray)] sticky top-0 z-30 shadow-sm"
            >
                {/* Logo */}
                <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-[var(--color-primary)]">EnterViu</h1>
                </div>
                
                {/* Progress bar and indicators */}
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-6 relative">
                    {/* Background line */}
                    <div className="absolute top-[18px] left-0 w-full h-1 bg-[var(--color-off-white)]" />
                    
                    {/* Progress line */}
                    <motion.div 
                        className="absolute top-[18px] left-0 h-1 bg-[var(--color-primary)]"
                        initial={{ width: "0%" }}
                        animate={{ width: `${(currentStep / (questions.length - 1)) * 100}%` }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                    
                    {/* Steps - More responsive with better spacing on different screens */}
                    <div className="relative z-10 flex justify-between w-full">
                        {questions.map((question, index) => (
                            <div key={index} className="flex flex-col items-center px-1 sm:px-2">
                                <motion.div 
                                    className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border-2 ${
                                        index <= currentStep 
                                            ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-[var(--text-on-primary)]"
                                            : "border-[var(--border-gray)] bg-white text-[var(--text-secondary)]"
                                    }`}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ 
                                        scale: index === currentStep ? 1 : 0.9, 
                                        opacity: 1,
                                    }}
                                    transition={{ 
                                        duration: 0.3, 
                                        delay: index * 0.1,
                                        type: "spring", 
                                        stiffness: 300
                                    }}
                                >
                                    {index < currentStep ? (
                                        <motion.span 
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", stiffness: 400 }}
                                            className="text-xs sm:text-sm md:text-base"
                                        >✓</motion.span>
                                    ) : (
                                        <span className="font-medium text-xs sm:text-sm md:text-base">{index + 1}</span>
                                    )}
                                </motion.div>
                                <motion.span 
                                    className={`mt-2 text-[10px] sm:text-xs md:text-sm font-medium hidden sm:block ${
                                        index === currentStep 
                                            ? "text-[var(--color-primary)]" 
                                            : index < currentStep 
                                                ? "text-[var(--color-primary-dark)]"
                                                : "text-[var(--text-muted)]"
                                    }`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                                >
                                    {question.title}
                                </motion.span>
                                {/* Mobile title - only visible for current step */}
                                {index === currentStep && (
                                    <motion.span 
                                        className="mt-2 text-[10px] font-medium block sm:hidden text-[var(--color-primary)]"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                    >
                                        {question.title}
                                    </motion.span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Main content - Improved responsiveness */}
            <div className="flex-1 bg-[var(--background)] py-6 sm:py-8 md:py-10 lg:py-12">
                <motion.div 
                    className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl sm:max-w-4xl lg:max-w-5xl xl:max-w-6xl"
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    key={currentStep}
                    transition={{ duration: 0.4 }}
                >
                    {/* Question Title & Description - Responsive typography */}
                    <motion.div 
                        className="mb-4 sm:mb-6 md:mb-8"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <motion.h2 
                            className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--text-primary)]"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            {currentQuestion.title}
                        </motion.h2>
                        <motion.p 
                            className="text-sm sm:text-base md:text-lg text-[var(--text-secondary)] mt-2"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            {currentQuestion.description}
                        </motion.p>
                    </motion.div>

                    {/* Question Component - Responsive padding and sizing */}
                    <motion.div
                        className="bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-sm border border-[var(--border-gray)]"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        {currentQuestion.component}
                        {currentQuestion.isRequired && !isCurrentQuestionAnswered() && (
                            <motion.p 
                                className="mt-3 text-[var(--color-error)] text-xs sm:text-sm"
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                * Câu hỏi này yêu cầu phải trả lời
                            </motion.p>
                        )}
                    </motion.div>
                </motion.div>
            </div>

            {/* Fixed Navigation - Improved responsive layout */}
            <motion.div 
                className="fixed bottom-0 left-0 right-0 bg-white border-t border-[var(--border-gray)] z-20"
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
            >
                <div className="container mx-auto py-3 sm:py-4 md:py-5 px-4 sm:px-6 lg:px-8 flex justify-between items-center max-w-3xl sm:max-w-4xl lg:max-w-5xl xl:max-w-6xl">
                    <motion.button 
                        className={`px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-md border border-[var(--border-gray)] flex items-center text-sm sm:text-base ${
                            currentStep === 0 
                                ? "opacity-50 cursor-not-allowed" 
                                : "hover:bg-[var(--color-off-white)] transition-all duration-200"
                        }`}
                        onClick={handlePrevious}
                        disabled={currentStep === 0}
                        whileHover={{ scale: currentStep !== 0 ? 1.02 : 1 }}
                        whileTap={{ scale: currentStep !== 0 ? 0.98 : 1 }}
                    >
                        <span className="mr-2">←</span>
                        <span className="hidden sm:inline">Quay lại</span>
                        <span className="sm:hidden">Quay</span>
                    </motion.button>
                    
                    <div className="text-center hidden sm:block">
                        <span className="text-sm text-[var(--text-secondary)]">
                            Câu {currentStep + 1}/{questions.length}
                        </span>
                    </div>
                    
                    <motion.button 
                        className={`px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-md flex items-center text-sm sm:text-base ${
                            currentQuestion.isRequired && !isCurrentQuestionAnswered()
                                ? "opacity-50 cursor-not-allowed bg-gray-300 text-[var(--text-disabled)]"
                                : "bg-[var(--color-primary)] text-[var(--text-on-primary)] hover:bg-[var(--color-primary-dark)] transition-all duration-200"
                        }`}
                        onClick={handleNext}
                        disabled={currentQuestion.isRequired && !isCurrentQuestionAnswered()}
                        whileHover={{ scale: !(currentQuestion.isRequired && !isCurrentQuestionAnswered()) ? 1.02 : 1 }}
                        whileTap={{ scale: !(currentQuestion.isRequired && !isCurrentQuestionAnswered()) ? 0.98 : 1 }}
                    >
                        <span className="hidden sm:inline">
                            {currentStep === questions.length - 1 ? "Hoàn thành" : "Tiếp theo"}
                        </span>
                        <span className="sm:hidden">
                            {currentStep === questions.length - 1 ? "Hoàn thành" : "Tiếp"}
                        </span>
                        <span className="ml-2">{currentStep === questions.length - 1 ? "✓" : "→"}</span>
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
}