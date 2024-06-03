import { Team } from "./matches";
import { Sport } from "./sports";

export type User = {
  id: number;
  email: string;
  name: string;
  preferences: Preferences;
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
