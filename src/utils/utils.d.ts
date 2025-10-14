import type { UsersType } from "../types/types.js";
export declare const isUser: (data: unknown) => data is UsersType;
export declare const dateNow: string;
export declare const hashedPass: (password_hash: string) => Promise<string>;
export declare const comparePass: (password_hash: string, passwordInput: string) => Promise<boolean>;
//# sourceMappingURL=utils.d.ts.map