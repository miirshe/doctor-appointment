import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../BASE_URL";

export const DoctorProfession = createApi({
    reducerPath: 'DoctorProfession',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL
    }),
    tagTypes: ['profession'],
    endpoints: (builder) => ({

        createDoctorProfession: builder.mutation({
            query: (newDoctorProfession) => ({
                url: '',
                method: 'POST',
                body: newDoctorProfession
            }),
            invalidatesTags: ['profession']
        }),

        updateDoctorProfession: builder.mutation({
            query: ({ id, updateDoctorProfession }) => ({
                url: `/${id}`,
                method: 'POST',
                body: updateDoctorProfession
            }),
            invalidatesTags: ['profession']
        }),

        deleteDoctorProfession: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'POST',
            }),
            invalidatesTags: ['profession']
        }),

        getDoctorSchedules : builder.query({
            query : () => {
                return {
                    url : '',
                    method : 'GET',
                }
            },
            providesTags : ['profession']
        })


    })
})

export const {
    useCreateDoctorProfessionMutation,
    useUpdateDoctorProfessionMutation,
    useDeleteDoctorProfessionMutation,
    useGetDoctorSchedulesQuery
} = DoctorProfession