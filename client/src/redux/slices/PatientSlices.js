import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../BASE_URL";

export const PatientSlices = createApi({
    reducerPath: 'PatientSlices',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL
    }),
    tagTypes: ['patient'],
    endpoints: (builder) => ({
        registerPatient: builder.mutation({
            query: (newRegister) => ({
                url: 'registerPatient',
                method: 'POST',
                body: newRegister
            }),
            invalidatesTags: ['patient']
        }),
        patientLogin: builder.mutation({
            query: (patientLogin) => ({
                url: '',
                method: 'POST',
                body: patientLogin
            }),
            invalidatesTags: ['patient']
        }),
        updatePatient:builder.mutation({
            query : ({id , updatePatient}) => ({
                url : `updatePatient/${id}`,
                method : 'POST',
                body : updatePatient
            })
        }),
        deletePatient: builder.mutation({
            query: (id) => ({
                url: `deletePatient/${id}`,
                method: 'POST',
            }),
            invalidatesTags: ['patient']
        }),
        getPatients: builder.query({
            query: () => {
                return {
                    url: 'getPatients',
                    method: 'GET',
                }
            },
            providesTags: ['patient']
        }),
        getPatient: builder.query({
            query: () => {
                return {
                    url: 'getPatient',
                    method: 'GET',
                }
            },
            providesTags: ['patient']
        }),
    })
})

export const {
    useRegisterPatientMutation,
    useUpdatePatientMutation,
    useDeletePatientMutation,
    useGetPatientsQuery,
    useGetPatientQuery
} = PatientSlices