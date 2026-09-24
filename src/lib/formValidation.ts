/** Strip anything that is not a letter, number, or space. */
export function lettersNumbersOnly(value: string): string {
  return value.replace(/[^a-zA-Z0-9\s]/g, '');
}

/** Digits only (phone). */
export function numbersOnly(value: string): string {
  return value.replace(/[^0-9]/g, '');
}

/**
 * Email must allow @ . _ + -
 * Still blocks other special characters.
 */
export function emailSafe(value: string): string {
  return value.replace(/[^a-zA-Z0-9@._+-]/g, '');
}

export function isLettersNumbersOnly(value: string): boolean {
  return /^[a-zA-Z0-9\s]*$/.test(value);
}

export function isNumbersOnly(value: string): boolean {
  return /^[0-9]*$/.test(value);
}

export function isEmailSafe(value: string): boolean {
  return /^[a-zA-Z0-9@._+-]+$/.test(value) && value.includes('@');
}

export const FORM_CHAR_HINT =
  'Letters and numbers only (spaces allowed). No special characters.';
