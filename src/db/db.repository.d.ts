import type { UsersType } from "../types/types.js";
export declare const createUsers: (user: UsersType) => Promise<void>;
export declare const updateUsers: (user: UsersType) => Promise<void>;
export declare const getUserForId: (id: number) => Promise<UsersType>;
export declare const getUserForEmail: (email: string) => Promise<UsersType>;
export declare const getUserForToken: (token: string) => Promise<UsersType>;
export declare const getUsers: () => Promise<UsersType[]>;
export declare const deleteUser: (id: number) => Promise<void>;
export declare const deleteAll: () => Promise<void>;
//# sourceMappingURL=db.repository.d.ts.map