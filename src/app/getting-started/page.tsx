"use client";

import { useState } from "react";
import Button from "@/components/atomic/button";
import { faArrowLeft, faArrowRight, faCheck } from "@fortawesome/free-solid-svg-icons";

type Question = {
    id: number;
    title: string;
    description: string;
    component: React.ReactNode;
    isRequired?: boolean;
};

export default function GettingStarted() {
    const [currentStep, setCurrentStep] = useState(0);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [answers, setAnswers] = useState<Record<string, any>>({});

    const questions: Question[] = [
        {
            id: 1,
            title: "Welcome",
            description: "Let's get to know you better.",
            isRequired: true,
            component: (
                <div className="py-4">
                    <h3 className="text-lg font-medium">What brings you here today?</h3>
                    <div className="mt-4 space-y-2">
                        {["Personal project", "Work related", "Just exploring"].map((option) => (
                            <Button 
                                key={option} 
                                variant={answers["purpose"] === option ? "primary" : "outline"} 
                                customClassName="w-full justify-start text-left"
                                onClick={() => setAnswers({...answers, purpose: option})}
                            >
                                {option}
                            </Button>
                        ))}
                    </div>
                </div>
            ),
        },
        {
            id: 2,
            title: "Experience Level",
            description: "Help us tailor the content to your needs.",
            isRequired: true,
            component: (
                <div className="py-4">
                    <h3 className="text-lg font-medium">What is your experience level?</h3>
                    <div className="mt-4 space-y-2">
                        {["Beginner", "Intermediate", "Advanced"].map((option) => (
                            <Button 
                                key={option} 
                                variant={answers["experience"] === option ? "primary" : "outline"} 
                                customClassName="w-full justify-start text-left"
                                onClick={() => setAnswers({...answers, experience: option})}
                            >
                                {option}
                            </Button>
                        ))}
                    </div>
                </div>
            ),
        },
        {
            id: 3,
            title: "Preferences",
            description: "Select your preferences to customize your dashboard.",
            isRequired: true,
            component: (
                <div className="py-4">
                    <h3 className="text-lg font-medium">What are you most interested in?</h3>
                    <div className="mt-4 space-y-2">
                        {["Data Visualization", "Analytics", "Reporting", "Automation"].map((option) => (
                            <Button 
                                key={option} 
                                variant={answers["interests"]?.includes(option) ? "primary" : "outline"} 
                                customClassName="w-full justify-start text-left"
                                onClick={() => {
                                    const interests = answers["interests"] || [];
                                    const updated = interests.includes(option) 
                                        ? interests.filter((i: string) => i !== option) 
                                        : [...interests, option];
                                    setAnswers({...answers, interests: updated});
                                }}
                            >
                                {option}
                            </Button>
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
                return !!answers.purpose;
            case 2:
                return !!answers.experience;
            case 3:
                return answers.interests && answers.interests.length > 0;
            default:
                return true;
        }
    };

    const handleNext = () => {
        if (!isCurrentQuestionAnswered() && questions[currentStep].isRequired) {
            // Show error or prevent next
            return;
        }
        
        if (currentStep < questions.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            console.log("All answers:", answers);
            // Handle completion here
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const currentQuestion = questions[currentStep];

    return (
        <div className="container max-w-3xl mx-auto py-10">
            {/* Step indicator header */}
            <div className="mb-6">
                <div className="flex justify-between items-center relative">
                    {questions.map((question, index) => (
                        <div key={index} className="flex flex-col items-center z-10">
                            <div 
                                className={`flex items-center justify-center h-10 w-10 rounded-full border-2 
                                ${index <= currentStep 
                                    ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white" 
                                    : "border-gray-300 bg-white text-gray-500"}`}
                            >
                                {index + 1}
                            </div>
                            <span className={`text-xs mt-2 font-medium ${index <= currentStep ? "text-[var(--color-primary)]" : "text-gray-500"}`}>
                                {question.title}
                            </span>
                        </div>
                    ))}
                    
                    {/* Connecting line */}
                    <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200" style={{ zIndex: 0 }}>
                        <div 
                            className="h-full bg-[var(--color-primary)]" 
                            style={{ 
                                width: `${(currentStep / (questions.length - 1)) * 100}%`,
                                transition: 'width 0.3s ease-in-out'
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b">
                    <h2 className="text-xl font-bold">{currentQuestion.title}</h2>
                    <p className="text-gray-500">{currentQuestion.description}</p>
                </div>
                <div className="p-6">
                    {currentQuestion.component}
                    {currentQuestion.isRequired && !isCurrentQuestionAnswered() && (
                        <p className="mt-3 text-red-500 text-sm">* This question requires an answer</p>
                    )}
                </div>
                <div className="p-6 border-t flex justify-between items-center">
                    <div className="flex space-x-2">
                        <Button 
                            variant="outline" 
                            onClick={handlePrevious}
                            isDisabled={currentStep === 0}
                            leftIcon={faArrowLeft}
                        >
                            Previous
                        </Button>
                    </div>
                    <div>
                        <Button 
                            variant="primary" 
                            onClick={handleNext}
                            isDisabled={currentQuestion.isRequired && !isCurrentQuestionAnswered()}
                            rightIcon={currentStep === questions.length - 1 ? faCheck : faArrowRight}
                            withRipple
                        >
                            {currentStep === questions.length - 1 ? "Finish" : "Next"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}