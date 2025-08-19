type ClassValue = 
  | string 
  | number 
  | boolean 
  | undefined 
  | null 
  | ClassValue[] 
  | Record<string, boolean | undefined | null>;

export function cn(...inputs: ClassValue[]) {
  const classes: string[] = [];
  
  for (const input of inputs) {
    if (typeof input === 'string' && input) {
      classes.push(input);
    } else if (Array.isArray(input)) {
      for (const item of input) {
        if (typeof item === 'string' && item) {
          classes.push(item);
        }
      }
    } else if (input && typeof input === 'object') {
      for (const [key, value] of Object.entries(input)) {
        if (value) {
          classes.push(key);
        }
      }
    }
  }
  
  return classes.filter(Boolean).join(' ');
}