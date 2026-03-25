"use client";

import { useEffect, useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";

export function FAQSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What is the beta testing for?",
      answer:
        "Beta helps us refine myPawPair before launch. We're testing features, gathering feedback, and improving the experience for the public release. Your input shapes how we build.",
    },
    {
      question: "How do I join the beta?",
      answer:
        "Sign up with your email on this page. We'll send you access and updates as we add new features and improvements during the beta period. Check your inbox for next steps.",
    },
    {
      question: "When will the full product launch?",
      answer:
        "We're actively building and improving. The launch date will be announced to beta testers first. Your feedback shapes our timeline and priorities for the public release.",
    },
    {
      question: "Is my data safe during beta?",
      answer:
        "Yes. We use the same security standards for beta as we will for launch. Your dog's profile and data are protected and never shared. We take privacy seriously.",
    },
    {
      question: "Can I invite friends to beta?",
      answer:
        "We're gradually expanding beta access. Share your feedback and we may open more spots. Check back for updates on waitlist availability and referral options.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="w-full py-[60px] md:py-[80px] bg-[#F6F2EA]"
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16">
        <div className="flex flex-col lg:flex-row gap-[40px] lg:gap-[60px] xl:gap-[80px]">
          {/* Left Side - Title and Description */}
          <div
            className={`w-full lg:max-w-[400px] xl:max-w-[450px] transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <h2 className="font-['Modern_Sans'] font-normal text-[27px] md:text-[36px] lg:text-[40px] xl:text-[46px] leading-[120%] text-[#2F3E4E]">
              Ask myPawPair Anything
            </h2>
            <p
              className="font-inter font-normal text-[18px] leading-[120%] text-[#4A5563] mt-[20px]"
            >
              These are sample questions we&apos;re testing in beta. Real answers will be tailored to your dog&apos;s breed, age, and personality once we launch.
            </p>
          </div>

          {/* Right Side - FAQ Items */}
          <div
            className={`w-full flex-1 space-y-4 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`bg-[#DFE5EB] rounded-[12px] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{
                  transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
                }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors duration-200"
                >
                  <span className="font-inter font-mediuml text-[18px] md:text-[20px] leading-[120%] tracking-[-0.5px] text-[#4A5563] pr-4">
                    {faq.question}
                  </span>

         
                  <div className=" accordion-btn flex-shrink-0 w-6 h-6 flex items-center justify-center text-[#5F7E9D]">
                    {openIndex === index ? (
                      <Minus className="w-5 h-5" />
                    ) : (
                      <Plus className="w-5 h-5" />
                    )}
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index ? "max-h-[500px]" : "max-h-0"
                  }`}
                >
                  <div className="px-6 pb-4 pt-2">
                    <p
                      className="font-inter font-normal text-[16px] leading-[140%] text-[#4A5563]"
                      style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}
                    >
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
