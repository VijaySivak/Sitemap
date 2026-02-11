import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MetricCard {
  id: string;
  title: string;
  value: string | number;
  subtitle?: string;
  color: string;
  icon: React.ReactNode;
}

interface MetricCarouselProps {
  metrics: MetricCard[];
  onMetricClick: (metricId: string) => void;
  autoSlide?: boolean;
  slideInterval?: number;
}

export const MetricCarousel: React.FC<MetricCarouselProps> = ({
  metrics,
  onMetricClick,
  autoSlide = true,
  slideInterval = 4000
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const visibleCards = 4; // Show 4 cards at a time on desktop
  const maxIndex = Math.max(0, metrics.length - visibleCards);

  useEffect(() => {
    if (!autoSlide || isPaused || metrics.length <= visibleCards) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, slideInterval);

    return () => clearInterval(interval);
  }, [autoSlide, isPaused, maxIndex, slideInterval, metrics.length]);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  if (metrics.length === 0) return null;

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Navigation Arrows */}
      {metrics.length > visibleCards && (
        <>
          <button
            onClick={goToPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-slate-50 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-slate-600" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-slate-50 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-slate-600" />
          </button>
        </>
      )}

      {/* Cards Container */}
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out gap-4"
          style={{ transform: `translateX(-${currentIndex * (100 / visibleCards + 1.5)}%)` }}
        >
          {metrics.map((metric) => (
            <button
              key={metric.id}
              onClick={() => onMetricClick(metric.id)}
              className={`flex-shrink-0 w-[calc(25%-12px)] min-w-[200px] p-6 rounded-xl shadow-sm border border-slate-100 
                hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer text-left
                ${metric.color}`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  {metric.icon}
                </div>
                <h3 className="font-semibold text-white/90 text-sm">{metric.title}</h3>
              </div>
              <p className="text-4xl font-bold text-white">{metric.value}</p>
              {metric.subtitle && (
                <p className="text-sm text-white/70 mt-1">{metric.subtitle}</p>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      {metrics.length > visibleCards && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition-colors ${
                idx === currentIndex ? 'bg-blue-600' : 'bg-slate-300'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
