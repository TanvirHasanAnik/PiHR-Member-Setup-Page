import { apiSlice } from "../libs/redux/api/apiSlice";

export const memerSetupApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPfStutusDropdown: builder.query<any, void>({
      query: () => ({
        url: "/pf-member-setups/pf-status-dropdown",
      }),
    }),

    getMemerSetupHistory: builder.query<any, string>({
      query: (employee_id) => ({
        url: `/pf-member-setups/member-history/${employee_id}`,
      }),
      providesTags: ["MemberSetup"],
    }),

    getCurrentPfStutus: builder.query<any, string>({
      query: (employee_id) => ({
        url: `/pf-member-setups/current-pf-status/${employee_id}`,
      }),
    }),
    createPfMemberSetup: builder.mutation<any, any>({
      query: (data) => ({
        url: "/pf-member-setups",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(memerSetupApi.util.invalidateTags(["MemberSetup"]));
        } catch (error) {
          console.error(error);
        }
      },
    }),

    createBulkPfMemberSetup: builder.mutation<any, any>({
      query: (data) => ({
        url: "/pf-member-setups/bulk",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(memerSetupApi.util.invalidateTags(["MemberSetup"]));
        } catch (error) {
          console.error(error);
        }
      },
    }),
  }),
});

export const {
  useGetPfStutusDropdownQuery,
  useGetMemerSetupHistoryQuery,
  useGetCurrentPfStutusQuery,
  useCreateBulkPfMemberSetupMutation,
  useCreatePfMemberSetupMutation,
} = memerSetupApi;
