// filepath: /src/msalConfig.js
import { PublicClientApplication } from '@azure/msal-browser';

const MICROSOFT_CLIENT_ID= import.meta.env.VITE_MICROSOFT_CLIENT_ID;
const MICROSOFT_TENANT_ID = import.meta.env.VITE_MICROSOFT_TENANT_ID;

// Añadir scopes necesarios
const graphScopes = {
  scopes: ['user.read', 'user.read.all', 'profile', 'openid']
};

const msalConfig = {
  auth: {
    clientId: MICROSOFT_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${MICROSOFT_TENANT_ID}`,
    redirectUri: window.location.origin,
    postLogoutRedirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: true
  },
  system: {
    allowRedirectInIframe: true,
    iframeHashTimeout: 6000,
    redirectNavigationTimeout: 6000,
    loggerOptions: {
      logLevel: 'Error',
      piiLoggingEnabled: false
    }
  }
};

// Función para obtener foto de perfil

const msalInstance = new PublicClientApplication(msalConfig);
await msalInstance.initialize();

export const loginWithMicrosoft = async () => {
  try {
    // Detectar si es móvil
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      return await msalInstance.loginRedirect({
        ...graphScopes,
        prompt: 'select_account'
      });
    } else {
      return await msalInstance.loginPopup({
        ...graphScopes,
        prompt: 'select_account'
      });
    }
  } catch (error) {
    console.error('Error en login:', error);
    throw error;
  }
};


export const getUserPhoto = async () => {
  try {
    const account = msalInstance.getAllAccounts()[0];
    const tokenResponse = await msalInstance.acquireTokenSilent({
      ...graphScopes,
      account: account
    });
    console.log('TokenResponse: ',tokenResponse);
    
    const response = await fetch('https://graph.microsoft.com/v1.0/me/photo/$value', {
      headers: {
        'Authorization': `Bearer ${tokenResponse.accessToken}`
      }
    });

    if (response.ok) {
      const blob = await response.blob();
      return URL.createObjectURL(blob);
    }
    return null;
  } catch (error) {
    console.error('Error getting user photo:', error);
    return null;
  }
};

export default msalInstance;