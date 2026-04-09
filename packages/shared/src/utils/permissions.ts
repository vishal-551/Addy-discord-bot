export const isGuildAdmin = (permissions: bigint): boolean => {
  const ADMINISTRATOR = BigInt(0x8);
  return (permissions & ADMINISTRATOR) === ADMINISTRATOR;
};
