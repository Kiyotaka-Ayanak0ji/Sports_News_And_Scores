export type Sport = {
  id: number;
  name: string;
}

export interface initialState{
  sports: Sport[],
  isLoading: boolean,
  isError: boolean,
  errorMessage: string
}