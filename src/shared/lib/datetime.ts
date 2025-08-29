/**
 * Converts Date to string format suitable for input[type="datetime-local"]
 * Format: "YYYY-MM-DDTHH:mm" (local timezone)
 */
export function toLocalDateTimeInputValue(d: Date): string {
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')
  
  return `${year}-${month}-${day}T${hours}:${minutes}`
}

/**
 * Parses string from input[type="datetime-local"] to Date
 * Returns null if the string is invalid
 * Format: "YYYY-MM-DDTHH:mm" (local timezone)
 */
export function fromLocalDateTimeInputValue(s: string): Date | null {
  if (!s || typeof s !== 'string') {
    return null
  }
  
  // Validate format: YYYY-MM-DDTHH:mm
  const dateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/
  if (!dateTimeRegex.test(s)) {
    return null
  }
  
  const date = new Date(s)
  
  // Check if date is valid
  if (isNaN(date.getTime())) {
    return null
  }
  
  return date
} 