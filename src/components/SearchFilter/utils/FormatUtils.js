export const gravityFormat = (v) => v > 99 ? `1.${v}` : v < 10 ? `1.00${v}` : `1.0${v}`;
export const abvFormat = (v) => v > 99 ? `${v}%` : `${v}%`;
export const defaultFormat = (v) => v;
