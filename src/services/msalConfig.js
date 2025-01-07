// filepath: /src/msalConfig.js
import { PublicClientApplication } from '@azure/msal-browser';

const MICROSOFT_CLIENT_ID= import.meta.env.VITE_MICROSOFT_CLIENT_ID;
const MICROSOFT_TENANT_ID= import.meta.env.VITE_MICROSOFT_TENANT_ID;

const msalConfig = {
  auth: {
    clientId: MICROSOFT_CLIENT_ID, // Reemplaza con tu Client ID de Azure AD
    authority: `https://login.microsoftonline.com/${MICROSOFT_TENANT_ID}`, // Reemplaza con tu Tenant ID de Azure AD
    redirectUri: window.location.origin, // Reemplaza con tu URI de redirección
    postLogoutRedirectUri: true  // Reemplaza con tu URI de redirección
  },
};

const msalInstance = new PublicClientApplication(msalConfig);

export default msalInstance;