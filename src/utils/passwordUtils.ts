import bcrypt from "bcrypt";

const saltRounds = 10;

export const hashPassword = async (password: string): Promise<string> => {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

export const comparePasswords = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  const match = await bcrypt.compare(password, hashedPassword);
  return match;
};

export const excludePassword = (user: any): any => {
  const { password, ...userWithoutPassword } = user._doc;
  return userWithoutPassword;
};
