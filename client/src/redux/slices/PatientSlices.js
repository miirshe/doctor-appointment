import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../BASE_URL";
import Cookies, { } from 'js-cookie';
const setToken = (token) => {
    Cookies.set('patientToken', token)
}
const getToken = () => {
    return Cookies.get('patientToken')
}
export const PatientSlices = createApi({
    reducerPath: 'PatientSlices',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers) => {
            const token = getToken();
            if (token) {
                headers.set('Authorization',token);
            }
            return headers;
        },
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
                url: 'loginPatient',
                method: 'POST',
                body: patientLogin
            }),
            onQueryStarted: async (args, { queryFulfilled }) => {
                try {
                    const result = await queryFulfilled;
                    if (result) {
                        console.log(result);
                        setToken(result?.data?.patient);
                    }
                } catch (err) {
                    console.log(err);
                }
            },
            invalidatesTags: ['patient']
        }),
        updatePatient: builder.mutation({
            query: ({ id, updatePatient }) => ({
                url: `updatePatient/${id}`,
                method: 'POST',
                body: updatePatient
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
        getCurrentPatient: builder.query({
            query: () => {
                return {
                    url: 'getCurrentPatient',
                    method: 'GET',
                }
            },
            providesTags: ['patient']
        })
    })
})

export const {
    useRegisterPatientMutation,
    useUpdatePatientMutation,
    useDeletePatientMutation,
    useGetPatientsQuery,
    useGetPatientQuery,
    usePatientLoginMutation,
    useGetCurrentPatientQuery
} = PatientSlices