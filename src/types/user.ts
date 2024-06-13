import { UserPreferences } from "../context/user/actions";
import { Team } from "./matches";
import { Sport } from "./sports";

export type User = {
  user: {
      id: number;
      name: string;
      email: string;
      preferences: UserPreferences;
  }
  errors? : string|string[];
  auth_token: string;
};

export type UserLogin = {
  email: string;
  password: string;
};

export type UserSignup = {
  name: string;
  email: string;
  password: string;
};

export type UserUpdate = {
  current_password: string;
  new_password: string;
};

export type Preferences = {
  sports?: Sport[];
  teams?: Team[];
  articles?: number[];
  matches?: number[];
};

// export type SetPreferences = {
//   preferences: Preferences;
// };
