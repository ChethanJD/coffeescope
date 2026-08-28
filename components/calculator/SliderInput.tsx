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

export function SliderInput({ label, value, onChange, min, max, step, unit, icon: Icon }: SliderInputProps) {
  const progress = ((value - min) / (max - min)) * 100;

  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-4">
      <div className="mb-3 flex items-center justify-between gap-4">
        <span className="flex items-center gap-2 text-sm font-medium text-white/70">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-coffee-gold/10">
            <Icon className="h-4 w-4 text-coffee-gold" />
          </span>
          {label}
        </span>
        <span className="flex items-baseline gap-1 font-heading text-lg font-semibold tabular-nums text-white">
          {value.toLocaleString()}
          <span className="text-xs font-normal text-white/40">{unit}</span>
        </span>
      </div>
      <input
        type="range"
        aria-label={label}
        className="brand-slider w-full"
        style={{ ["--slider-progress" as string]: `${progress}%` }}
        min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <div className="mt-1.5 flex justify-between text-[11px] text-white/30">
        <span>{min.toLocaleString()}</span><span>{max.toLocaleString()}</span>
      </div>
    </div>
  );
}
