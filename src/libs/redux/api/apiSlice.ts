import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_TAG_TYPE = [
  "getEmployeeTag",
  "userQuickLinks",
  "pfWithdrawalPoliciesTag",
  "pfCollectionMonth",
];

export const apiSlice = createApi({
  reducerPath: "pfApiSlice",
  baseQuery: fetchBaseQuery({baseUrl: 'http://live.pisales.xyz/api/v2'}),
  keepUnusedDataFor: 120,
  tagTypes: API_TAG_TYPE,
  endpoints: () => ({}),
});
