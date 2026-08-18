import { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Calculate target date: 4 days from now
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 4);
    
    const calculateTimeLeft = (): TimeLeft => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        };
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    // Update immediately
    setTimeLeft(calculateTimeLeft());

    // Set up interval to update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.minutes, label: 'Minutes' },
    { value: timeLeft.seconds, label: 'Seconds' }
  ];

  return (
    <div className="flex justify-center gap-4 md:gap-8 mb-12">
      {timeUnits.map((unit, index) => (
        <div 
          key={unit.label}
          className="flex flex-col items-center bg-card border border-border rounded-lg shadow-aviation p-4 md:p-6 min-w-[80px] md:min-w-[100px] animate-float"
          style={{ animationDelay: `${index * 0.2}s` }}
        >
          <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-aviation-navy mb-2 animate-pulse-glow">
            {unit.value.toString().padStart(2, '0')}
          </div>
          <div className="text-sm md:text-base text-muted-foreground font-medium uppercase tracking-wider">
            {unit.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;