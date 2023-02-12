export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: string;
};

export type Auth = {
  __typename?: 'Auth';
  mfa?: Maybe<Scalars['Boolean']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type Base = {
  __typename?: 'Base';
  success?: Maybe<Scalars['Boolean']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  logout?: Maybe<Auth>;
};

export type Query = {
  __typename?: 'Query';
  getUser?: Maybe<Users>;
};

export type UserProfile = {
  __typename?: 'UserProfile';
  firstName: Scalars['String'];
};

export type Users = {
  __typename?: 'Users';
  email: Scalars['String'];
};
