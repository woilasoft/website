"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TeamMember {
  name: string;
  title: string;
  description: string; // Already localized
  image: string;
  social: {
    twitter: string;
    instagram: string;
    linkedin: string;
  };
}

interface SectionContent {
  title: string;
  subtitle: string;
}

interface TeamSectionProps {
  teamData: TeamMember[];
  sectionContent: SectionContent;
}

// Group team members into slides of 2
const createSlides = (members: TeamSectionProps["teamData"]) => {
  const slides = [];
  for (let i = 0; i < members.length; i += 2) {
    slides.push(members.slice(i, Math.min(i + 2, members.length)));
  }
  return slides;
};

export default function TeamSection({
  teamData,
  sectionContent,
}: TeamSectionProps) {
  const originalSlides = createSlides(teamData);
  const totalOriginalSlides = originalSlides.length;

  // Create cloned slides for infinite effect
  const clonedSlides = [
    ...originalSlides.slice(-1), // Last slide clone at beginning
    ...originalSlides, // Original slides
    ...originalSlides.slice(0, 1), // First slide clone at end
  ];

  const [activeIndex, setActiveIndex] = useState(1); // Start at index 1 (first real slide)
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  //@ts-ignore
  const autoPlayRef = useRef<NodeJS.Timeout>();
  const transitionRef = useRef(true);

  // Get the real slide index (for display purposes) with proper bounds checking
  const getRealIndex = useCallback(() => {
    // Normalize the activeIndex to be within bounds
    let normalizedIndex = activeIndex;

    // Handle cases where activeIndex might be way out of bounds
    if (normalizedIndex < 0) {
      normalizedIndex = 1;
    } else if (normalizedIndex > totalOriginalSlides + 1) {
      normalizedIndex = totalOriginalSlides;
    }

    if (normalizedIndex === 0) return totalOriginalSlides - 1;
    if (normalizedIndex === totalOriginalSlides + 1) return 0;
    return normalizedIndex - 1;
  }, [activeIndex, totalOriginalSlides]);

  // Reset slider to a safe state if index gets out of bounds
  const resetSliderIfNeeded = useCallback(() => {
    if (activeIndex < 0 || activeIndex > totalOriginalSlides + 1) {
      setActiveIndex(1); // Reset to first real slide
      transitionRef.current = false;
      setTimeout(() => {
        transitionRef.current = true;
      }, 50);
    }
  }, [activeIndex, totalOriginalSlides]);

  // Handle next slide
  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex((prev) => prev + 1);
  }, [isTransitioning]);

  // Handle previous slide
  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex((prev) => prev - 1);
  }, [isTransitioning]);

  // Reset position after transition ends
  useEffect(() => {
    const handleTransitionEnd = () => {
      setIsTransitioning(false);

      // If we've reached a clone, jump to the corresponding real slide without transition
      if (activeIndex === 0) {
        transitionRef.current = false;
        setActiveIndex(totalOriginalSlides);
        setTimeout(() => {
          transitionRef.current = true;
        }, 50);
      } else if (activeIndex === totalOriginalSlides + 1) {
        transitionRef.current = false;
        setActiveIndex(1);
        setTimeout(() => {
          transitionRef.current = true;
        }, 50);
      }
    };

    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener("transitionend", handleTransitionEnd);
      return () => {
        slider.removeEventListener("transitionend", handleTransitionEnd);
      };
    }
  }, [activeIndex, totalOriginalSlides]);

  // Auto-play functionality with visibility and hover checks
  const startAutoPlay = useCallback(() => {
    stopAutoPlay();
    if (isVisible && !isHovered) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 4000);
    }
  }, [isVisible, isHovered, nextSlide]);

  const stopAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      //autoPlayRef.current = undefined
    }
  }, []);

  // Intersection Observer to detect when component is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1, // Trigger when 10% of the component is visible
        rootMargin: "50px", // Add some margin to trigger slightly before/after
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Start/stop auto-play based on visibility and hover state
  useEffect(() => {
    if (isVisible && !isHovered) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }

    return () => stopAutoPlay();
  }, [isVisible, isHovered, startAutoPlay, stopAutoPlay]);

  // Reset slider if it gets out of bounds when becoming visible
  useEffect(() => {
    if (isVisible) {
      resetSliderIfNeeded();
    }
  }, [isVisible, resetSliderIfNeeded]);

  // Handle mouse enter/leave
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isVisible) return; // Only handle keyboard when visible

      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isVisible, nextSlide, prevSlide]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAutoPlay();
    };
  }, [stopAutoPlay]);

  return (
    <section
      ref={containerRef}
      className="py-10 bg-gray-200 w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="screen-wrapper max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {sectionContent.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {sectionContent.subtitle}
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative overflow-hidden mb-16">
          <div
            ref={sliderRef}
            className="flex"
            style={{
              transform: `translateX(-${activeIndex * 100}%)`,
              transition: transitionRef.current
                ? "transform 0.5s ease-in-out"
                : "none",
            }}
          >
            {clonedSlides.map((slide, slideIndex) => (
              <div key={`slide-${slideIndex}`} className="w-full flex-shrink-0">
                <div className="grid md:grid-cols-2 gap-12">
                  {slide.map((member, id) => (
                    <div key={`${slideIndex}-${id}`} className="flex gap-6">
                      {/* Profile Image */}
                      <div className="flex-shrink-0">
                        <div className="w-44 h-full rounded-2xl overflow-hidden bg-gray-100">
                          <img
                            src={member.image || "/placeholder.svg"}
                            alt={member.name}
                            width={200}
                            height={200}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 space-y-2">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-1">
                            {member.name}
                          </h3>
                          <p className="text-blue-600 font-medium">
                            {member.title}
                          </p>
                        </div>

                        <div className="border-t border-gray-200">
                          <p className="text-gray-600 leading-relaxed mb-6">
                            {member.description}
                          </p>

                          {/* Social Links */}
                          <div className="flex gap-4">
                            <a
                              href={member.social.twitter}
                              className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                              </svg>
                            </a>
                            <a
                              href={member.social.instagram}
                              className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center text-gray-600 hover:border-gray-400 hover:text-gray-800 transition-colors"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                              </svg>
                            </a>
                            <a
                              href={member.social.linkedin}
                              className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center text-gray-600 hover:border-gray-400 hover:text-gray-800 transition-colors"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-8">
          <button
            onClick={prevSlide}
            disabled={isTransitioning}
            className="w-12 h-12 border border-gray-300 rounded-full flex items-center justify-center text-gray-600 hover:border-gray-400 hover:text-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Progress Indicator */}
          <div className="flex items-center gap-2">
            {originalSlides.map((_, index) => (
              <div
                key={index}
                className={`h-1 rounded-full transition-all duration-300 ${
                  index === getRealIndex()
                    ? "w-16 bg-secondary"
                    : "w-8 bg-white"
                }`}
              ></div>
            ))}
          </div>

          <button
            onClick={nextSlide}
            disabled={isTransitioning}
            className="w-12 h-12 border border-gray-300 rounded-full flex items-center justify-center text-gray-600 hover:border-gray-400 hover:text-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Slide Counter */}
        <div className="text-center mt-4">
          <span className="text-gray-500 text-sm">
            {getRealIndex() + 1} / {totalOriginalSlides}
          </span>
        </div>
      </div>
    </section>
  );
}
