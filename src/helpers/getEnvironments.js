export const getEnvironments = () => ({
  VITE_APIKEY: import.meta.env.VITE_APIKEY,
  VITE_AUTHDOMAIN: import.meta.env.VITE_AUTHDOMAIN,
  VITE_DATABASEURL: import.meta.env.VITE_DATABASEURL,
  VITE_PROJECTID: import.meta.env.VITE_PROJECTID,
  VITE_STORAGEBUCKET: import.meta.env.VITE_STORAGEBUCKET,
  VITE_MESSAGINGSENDERID: import.meta.env.VITE_MESSAGINGSENDERID,
  VITE_APPID: import.meta.env.VITE_APPID,
  VITE_CLOUD_URL_BINARY: import.meta.env.VITE_CLOUD_URL_BINARY
});