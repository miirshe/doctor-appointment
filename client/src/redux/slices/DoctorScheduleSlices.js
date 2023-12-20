import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../BASE_URL";

export const DoctorScheduleSlices = createApi({
    reducerPath: 'DoctorScheduleSlices',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL
    }),
    tagTypes: ['doctorSchedule'],
    endpoints: (builder) => ({


        createDoctorSchedules: builder.mutation({
            query: (newDoctorSchedules) => ({
                url: 'createDoctorSchedule',
                method: 'POST',
                body: newDoctorSchedules
            }),
            invalidatesTags: ['doctorSchedule']
        }),


        updateDoctorSchedules: builder.mutation({
            query: ({ id, updateDoctorSchedules }) => ({
                url: `updateDoctorSchedule/${id}`,
                method: 'POST',
                body: updateDoctorSchedules
            }),
            invalidatesTags: ['doctorSchedule']
        }),


        deleteDoctorSchedules: builder.mutation({
            query: (id) => ({
                url: `deleteDoctorSchedule/${id}`,
                method: 'POST',
            }),
            invalidatesTags: ['doctorSchedule']
        }),


        getDoctorSchedules: builder.query({
            query: () => {
                return {
                    url: 'getDoctorSchedules',
                    method: 'GET'
                }
            },
            providesTags: ['doctorSchedule']
        })
    })

})

export const {
    useCreateDoctorSchedulesMutation,
    useUpdateDoctorSchedulesMutation,
    useDeleteDoctorSchedulesMutation,
    useGetDoctorSchedulesQuery
} = DoctorScheduleSlices