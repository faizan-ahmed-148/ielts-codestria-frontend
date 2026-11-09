/**
 * Single source of truth for the account password policy.
 * Keep these rules in sync with backend/src/auth/password.policy.ts.
 */
export const PASSWORD_MIN_LENGTH = 10;
export const PASSWORD_MAX_LENGTH = 128;

export interface PasswordCheck {
  id: "length" | "lower" | "upper" | "number" | "symbol";
  label: string;
  ok: boolean;
}

/** Individual password requirements, in the order shown to the candidate. */
export function passwordChecks(value: string): PasswordCheck[] {
  return [
    {
      id: "length",
      label: `At least ${PASSWORD_MIN_LENGTH} characters`,
      ok: value.length >= PASSWORD_MIN_LENGTH && value.length <= PASSWORD_MAX_LENGTH,
    },
    { id: "lower", label: "A lowercase letter (a–z)", ok: /[a-z]/.test(value) },
    { id: "upper", label: "An uppercase letter (A–Z)", ok: /[A-Z]/.test(value) },
    { id: "number", label: "A number (0–9)", ok: /\d/.test(value) },
    { id: "symbol", label: "A special character (!@#$…)", ok: /[^A-Za-z0-9]/.test(value) },
  ];
}

export function isStrongPassword(value: string): boolean {
  return passwordChecks(value).every((check) => check.ok);
}

export const PASSWORD_POLICY_SUMMARY =
  `At least ${PASSWORD_MIN_LENGTH} characters with an uppercase letter, a lowercase letter, a number and a special character.`;
