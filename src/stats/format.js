/**
 * Formats huge numbers using standard incremental game abbreviations.
 * Fallbacks to scientific notation for numbers beyond decillions/vigintillions.
 */
export function formatBigNumber(value) {
  if (value === null || value === undefined || isNaN(value)) return "0";
  const num = Number(value);
  if (num === 0) return "0";
  
  const isNegative = num < 0;
  const absNum = Math.abs(num);
  
  // Under 1000, keep up to 3 decimals and strip trailing zeros
  if (absNum < 1000) {
    const formatted = parseFloat(absNum.toFixed(3));
    return (isNegative ? "-" : "") + formatted;
  }
  
  // Standard incremental game suffixes
  const suffixes = [
    "", "k", "m", "b", "t", "q", "Qi", "Sx", "Sp", "Oc", "No", "Dc", 
    "UDc", "DDc", "TDc", "qDc", "QiDc", "SxDc", "SpDc", "OcDc", "NoDc", 
    "Vg"
  ];
  
  const exp = Math.floor(Math.log10(absNum) / 3);
  
  if (exp < suffixes.length) {
    const shortVal = absNum / Math.pow(1000, exp);
    // Keep up to 2 decimal places, remove trailing zeros (e.g. 100.00 -> 100)
    let formatted = shortVal.toFixed(2);
    if (formatted.endsWith(".00")) {
      formatted = formatted.slice(0, -3);
    } else if (formatted.endsWith("0") && formatted.includes(".")) {
      formatted = formatted.slice(0, -1);
    }
    return (isNegative ? "-" : "") + formatted + suffixes[exp];
  } else {
    // Scientific notation fallback
    return (isNegative ? "-" : "") + absNum.toExponential(2);
  }
}

/**
 * Formats a stat value according to its type (chance, multi, cap, reduction, number)
 * and an optional custom suffix (like 's' for seconds).
 */
export function formatStatValue(val, type, suffix = "") {
  if (val === null || val === undefined || isNaN(Number(val))) return "-";
  const num = Number(val);
  
  if (type === "chance") {
    return `${formatBigNumber(num)}%`;
  }
  
  if (type === "multi") {
    return `x${formatBigNumber(num)}`;
  }
  
  if (type === "reduction") {
    const absVal = Math.abs(num);
    // If it's a fractional reduction (e.g. 0.12 or 0.25499) and unit is % or not specified,
    // format as a percentage reduction (e.g. -12% or -25.5%)
    if (absVal > 0 && absVal < 1 && (suffix === "" || suffix === "%")) {
      const pct = (absVal * 100).toFixed(1);
      const formattedPct = pct.endsWith(".0") ? pct.slice(0, -2) : pct;
      return `-${formattedPct}%`;
    }
    // Otherwise show it as a negative flat value (e.g. -52s)
    return `-${formatBigNumber(absVal)}${suffix}`;
  }
  
  if (type === "cap") {
    return `${formatBigNumber(num)}${suffix}`;
  }
  
  // Default 'number' type
  return `${formatBigNumber(num)}${suffix}`;
}
