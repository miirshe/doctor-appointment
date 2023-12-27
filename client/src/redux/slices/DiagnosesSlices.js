import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../BASE_URL";

export const DiagnosesSlices = createApi({
    reducerPath: 'DiagnosesSlices',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL
    }),
    tagTypes: ['diagnoses'],
    endpoints: (builder) => ({

        createDiagnoses: builder.mutation({
            query: (newDiagnoses) => (
                console.log(newDiagnoses), {
                    url: 'createDiagnoses',
                    method: 'POST',
                    body: newDiagnoses
                }),
            invalidatesTags: ['diagnoses']
        }),

        updateDiagnoses: builder.mutation({
            query: ({ id, updateDiagnoses }) => ({
                url: `updateDiagnose/${id}`,
                method: 'POST',
                body: updateDiagnoses
            }),
            invalidatesTags: ['diagnoses']
        }),

        deleteDiagnoses: builder.mutation({
            query: (id) => ({
                url: `deleteDiagnose/${id}`,
                method: 'POST',
            }),
            invalidatesTags: ['diagnoses']
        }),

        getDiagnoses: builder.query({
            query: () => {
                return {
                    url: 'getDiagnoses',
                    method: 'GET',
                }
            },
            providesTags: ['diagnoses']
        })


    })
})

export const {
    useCreateDiagnosesMutation,
    useUpdateDiagnosesMutation,
    useDeleteDiagnosesMutation,
    useGetDiagnosesQuery
} = DiagnosesSlices