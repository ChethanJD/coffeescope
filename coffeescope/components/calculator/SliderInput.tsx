"use client";

interface SliderInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  unit: string;
  icon: React.ElementType;
}

export function SliderInput({
  label,
  value,
  onChange,
  min,
  max,
  step,
  unit,
  icon: Icon,
}: SliderInputProps) {
  const progress = ((value - min) / (max - min)) * 100;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="flex items-center gap-2 text-sm font-medium text-white/70">
          <Icon className="h-4 w-4 text-coffee-gold" />
          {label}
        </span>
        <span className="flex items-baseline gap-1 font-heading text-lg font-semibold text-white">
          {value.toLocaleString()}
          <span className="text-xs font-normal text-white/40">{unit}</span>
        </span>
      </div>
      <input
        type="range"
        className="brand-slider w-full"
        style={{ ["--slider-progress" as string]: `${progress}%` }}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <div className="mt-1 flex justify-between text-[11px] text-white/30">
        <span>{min.toLocaleString()}</span>
        <span>{max.toLocaleString()}</span>
      </div>
    </div>
  );
}
