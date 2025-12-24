import { useState } from "react";

function FloatingInput({
  id,
  label,
  inputType = "text",
  value,
  onChange,
  children,
}) {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className="relative h-12.5 w-full">
      <input
        id={id}
        type={inputType}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="border-b-primary/50 w-full border-b outline-none"
      />

      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-0 transition-all duration-200 ${isFocused || value ? "-top-7 text-gray-700" : "-top-2 text-black/50"}`}
      >
        {label}
      </label>

      {children}
    </div>
  );
}

export default FloatingInput;
