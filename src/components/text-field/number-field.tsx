"use client";

import TextField from "@/components/text-field";
import { useEffect, useState } from "react";
import type { TextFieldProps } from "./text-field";

function formatNumber(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  return Number(digits).toLocaleString("vi-VN");
}

function parseNumber(formatted: string): number {
  return Number(formatted.replace(/\D/g, "")) || 0;
}

interface NumberFieldProps
  extends Omit<TextFieldProps, "value" | "onChange" | "type"> {
  value: number;
  onChange: (value: number) => void;
  suffix?: string;
}

const NumberField = ({
  value,
  onChange,
  suffix,
  label,
  ...rest
}: NumberFieldProps) => {
  const [display, setDisplay] = useState(
    value === 0 ? "" : value.toLocaleString("vi-VN"),
  );

  // Sync khi value thay đổi từ bên ngoài (reset form, v.v.)
  useEffect(() => {
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    setDisplay(value === 0 ? "" : value.toLocaleString("vi-VN"));
  }, [value]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value;
    const formatted = formatNumber(raw);
    setDisplay(formatted); // cập nhật display ngay
    onChange(parseNumber(formatted)); // báo lên parent
  }

  return (
    <TextField
      {...rest}
      label={label}
      value={display}
      inputMode="numeric"
      placeholder="0"
      onChange={handleChange}
      rightAdornment={
        suffix
          ? () => (
              <span
                style={{ fontSize: "0.75rem", color: "var(--colors-gray-400)" }}
              >
                {suffix}
              </span>
            )
          : undefined
      }
    />
  );
};

export default NumberField;
export { formatNumber, parseNumber };
