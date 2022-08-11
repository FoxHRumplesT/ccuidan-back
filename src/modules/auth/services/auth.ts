import { query } from "@utils/db";

export const registerWithEmailAndPassword = (email: string, password: string): Promise<any> => {
  return new Promise(() => {});
};

export const loginWithEmailAndPassword = async (email: string, password: string): Promise<boolean> => {
  await query(`SELECT * FROM roles`);
  return new Promise((resolve, reject) => {resolve(true)});
};

export const logout = (sessionId: string): void => {
  // Logout
};

