export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: string; output: string; }
};

export type Auth = {
  __typename?: 'Auth';
  mfa?: Maybe<Scalars['Boolean']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type Base = {
  __typename?: 'Base';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type ForgotPasswordInput = {
  email: Scalars['String']['input'];
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  rememberMe?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  forgotPassword: Auth;
  login: Auth;
  logout: Auth;
  register: Auth;
};


export type MutationForgotPasswordArgs = {
  input: ForgotPasswordInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};

export type Query = {
  __typename?: 'Query';
  getUser?: Maybe<User>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isVerified: Scalars['Boolean']['output'];
  profile: UserProfile;
  vehicles: Array<UserVehicle>;
};

export type UserProfile = {
  __typename?: 'UserProfile';
  firstName: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  image: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
};

export type UserVehicle = {
  __typename?: 'UserVehicle';
  active: Scalars['Boolean']['output'];
  color: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isDeleted: Scalars['Boolean']['output'];
  license?: Maybe<Scalars['String']['output']>;
  make: Scalars['String']['output'];
  model: Scalars['String']['output'];
  year: Scalars['String']['output'];
};
