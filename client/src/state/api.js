// api.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  endpoints: (build) => ({
    submitSurvey: build.mutation({
      query: (surveyData) => ({
        url: '/surveyApi',
        method: 'POST',
        body: surveyData,
      }),
    }),
    getBrokenToolsByOperation: build.query({
      query: ({ page, pageSize, operation }) => ({
        url: `/fetchData/${operation}broken`, 
        method: "GET",
        params: { page, pageSize },
      }),
    }),
    getOtherAlarmsByOperation: build.query({
      query: ({ page, pageSize, operation }) => ({
        url: `/fetchData/${operation}other`,
        method: "GET",
        params: { page, pageSize },
      }),
    }),
    getAirCheckByOperation: build.query({
      query: ({  operation }) =>  `/fetchData/${operation}air`, 
      
    }),
    getPartsByOperation: build.query({
      query: ({  operation }) =>  `/fetchData/${operation}parts`, 
    }),

  }),
});

export const {useSubmitSurveyMutation, useGetBrokenToolsByOperationQuery, useGetOtherAlarmsByOperationQuery, useGetAirCheckByOperationQuery, useGetPartsByOperationQuery } = api;

