export const getErrorApi = error =>
  error.response && error.response.data.error
    ? error.response.data.error
    : error.message
