/**
 * ToyotaLogo — Official Toyota logo mark.
 * Uses the real Toyota logo SVG from public/toyota-logo.svg.
 * 
 * For light backgrounds, use variant='color' (default, red logo).
 * For dark backgrounds, use variant='white' (white-filtered logo).
 * 
 * @param {number} [width=40] - Width in pixels
 * @param {'color'|'white'|'gray'} [variant='color'] - Color variant
 * @param {string} [className] - Additional CSS classes
 */
export function ToyotaLogo({ width = 40, variant = 'color', className }) {
  const filterStyles = {
    color: '',
    white: 'brightness-0 invert',
    gray: 'brightness-0 invert opacity-50',
  };

  return (
    <img
      src="/toyota-logo.svg"
      alt="Toyota"
      width={width}
      className={`inline-block ${filterStyles[variant]} ${className || ''}`}
      style={{ height: 'auto' }}
    />
  );
}

export default ToyotaLogo;
