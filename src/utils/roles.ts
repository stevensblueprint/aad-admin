export const sentenceCase = (role: string) =>
  `${role[0]?.toUpperCase()}${role.slice(1).toLowerCase()}`;
