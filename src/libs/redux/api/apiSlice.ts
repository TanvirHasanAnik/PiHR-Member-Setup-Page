import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_TAG_TYPE = [
  "getEmployeeTag",
  "userQuickLinks",
  "pfWithdrawalPoliciesTag",
  "pfCollectionMonth",
];

export const apiSlice = createApi({
  reducerPath: "pfApiSlice",
  baseQuery: fetchBaseQuery(
    {baseUrl:'http://live.pisales.xyz/api/v2',
    prepareHeaders: (headers) => {
      const token = "33_a276f578-9213-4db2-a1eb-be2ba16cbe97_1748494372";
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("apiKey", "QOV0rgp9-bLqdJV77iPRvSKhFQ5m9YMw");
      headers.set("service", "pihr");
      return headers;
    },
    }
  ),
  keepUnusedDataFor: 120,
  tagTypes: API_TAG_TYPE,
  endpoints: () => ({}),
});
