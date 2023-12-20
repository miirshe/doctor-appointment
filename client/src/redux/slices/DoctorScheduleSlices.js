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
                url: '',
                method: 'POST',
                body: newDoctorSchedules
            }),
            invalidatesTags: ['doctorSchedule']
        }),


        updateDoctorSchedules: builder.mutation({
            query: ({ id, updateDoctorSchedules }) => ({
                url: `/${id}`,
                method: 'POST',
                body: updateDoctorSchedules
            }),
            invalidatesTags: ['doctorSchedule']
        }),


        deleteDoctorSchedules: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'POST',
            }),
            invalidatesTags: ['doctorSchedule']
        }),


        getDoctorSchedules: builder.query({
            query: () => {
                return {
                    url: '',
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