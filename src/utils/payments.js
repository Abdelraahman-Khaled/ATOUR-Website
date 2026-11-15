// Online payment (Tap) is switched off until a merchant account exists.
// Set REACT_APP_ONLINE_PAYMENT=true in the environment to show it again.
export const ONLINE_PAYMENT_ENABLED = import.meta.env.REACT_APP_ONLINE_PAYMENT === "true";
export const DEFAULT_PAYMENT_WAY = ONLINE_PAYMENT_ENABLED ? "online" : "cash";
