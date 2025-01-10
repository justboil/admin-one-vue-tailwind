// filepath: /src/msalConfig.js
import { PublicClientApplication, InteractionRequiredAuthError } from '@azure/msal-browser';

const MICROSOFT_CLIENT_ID= import.meta.env.VITE_MICROSOFT_CLIENT_ID;
const MICROSOFT_TENANT_ID = import.meta.env.VITE_MICROSOFT_TENANT_ID;

// Añadir scopes necesarios
const graphScopes = {
  scopes: [
    'User.Read',
    'profile',
    'openid',
    'email',
    'User.ReadBasic.All',
    // 'user.read.all'
  ]
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

//*************************************getUserProfile permisos Administrador*************************************** */
// export const getUserProfile = async () => {
//   try {
//     const account = msalInstance.getAllAccounts()[0];
//     let tokenResponse;

//     try {
//       tokenResponse = await msalInstance.acquireTokenSilent({
//         ...graphScopes,
//         account: account
//       });
//     } catch (error) {
//       if (error instanceof InteractionRequiredAuthError) {
//         // Solicitar token de forma interactiva si es necesario
//         tokenResponse = await msalInstance.acquireTokenPopup({
//           ...graphScopes,
//           account: account
//         });
//       } else {
//         throw error;
//       }
//     }

//     const response = await fetch('https://graph.microsoft.com/v1.0/me', {
//       headers: {
//         'Authorization': `Bearer ${tokenResponse.accessToken}`
//       }
//     });

//     if (response.ok) {
//       const userData = await response.json();
      
//       // Obtener foto de perfil
//       const photoResponse = await fetch('https://graph.microsoft.com/v1.0/me/photo/$value', {
//         headers: {
//           'Authorization': `Bearer ${tokenResponse.accessToken}`
//         }
//       });

//       let photoUrl = null;
//       if (photoResponse.ok) {
//         const blob = await photoResponse.blob();
//         photoUrl = URL.createObjectURL(blob);
//       }

//       return {
//         ...userData,
//         photoUrl,
//         displayName: userData.displayName,
//         email: userData.mail || userData.userPrincipalName
//       };
//     }
//     return null;
//   } catch (error) {
//     console.error('Error getting user profile:', error);
//     return null;
//   }
// };

//************************************************************************************* */

export const getUserProfile = async () => {
  try {
    const account = msalInstance.getAllAccounts()[0];
    if (!account) return null;

    const tokenResponse = await msalInstance.acquireTokenSilent({
      scopes: graphScopes.scopes,
      account: account
    }).catch(async (error) => {
      if (error instanceof InteractionRequiredAuthError) {
        return await msalInstance.acquireTokenPopup(graphScopes);
      }
      throw error;
    });

    // Obtener datos del perfil
    const response = await fetch('https://graph.microsoft.com/v1.0/me', {
      headers: {
        'Authorization': `Bearer ${tokenResponse.accessToken}`
      }
    });

    // Obtener foto de perfil
    const photoResponse = await fetch('https://graph.microsoft.com/v1.0/me/photo/$value', {
      headers: {
        'Authorization': `Bearer ${tokenResponse.accessToken}`
      }
    });

    if (response.ok) {
      const userData = await response.json();
      let photoUrl = null;

      if (photoResponse.ok) {
        const blob = await photoResponse.blob();
        photoUrl = URL.createObjectURL(blob);
        console.log('photoUrl: ', photoUrl);
        console.log('BLOB: ', blob);
      }

      return {
        userData: userData,
        telephone:userData.businessPhones[0],
        displayName: userData.displayName,
        email: userData.mail || userData.userPrincipalName,
        id: userData.id,
        photoUrl: photoUrl,
        jobTitle: userData.jobTitle,
        mobilePhone: userData.mobilePhone,
        officeLocation: userData.officeLocation,
        preferredLanguage: userData.preferredLanguage,
        department: userData.department
      };
    }
    return null;
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    return null;
  }
};


// export const getUserPhoto = async () => {
//   try {
//     const account = msalInstance.getAllAccounts()[0];
//     const tokenResponse = await msalInstance.acquireTokenSilent({
//       ...graphScopes,
//       account: account
//     });
//     console.log('TokenResponse: ',tokenResponse);
    
//     const response = await fetch('https://graph.microsoft.com/v1.0/me/photo/$value', {
//       headers: {
//         'Authorization': `Bearer ${tokenResponse.accessToken}`
//       }
//     });

//     if (response.ok) {
//       const blob = await response.blob();
//       return URL.createObjectURL(blob);
//     }
//     return null;
//   } catch (error) {
//     console.error('Error getting user photo:', error);
//     return null;
//   }
// };

// export const getUserProfile = async () => {
//   try {
//     const account = msalInstance.getAllAccounts()[0];
//     const tokenResponse = await msalInstance.acquireTokenSilent({
//       ...graphScopes,
//       account: account
//     });

//     const response = await fetch('https://graph.microsoft.com/v1.0/me', {
//       headers: {
//         'Authorization': `Bearer ${tokenResponse.accessToken}`
//       }
//     });

//     if (response.ok) {
//       const userData = await response.json();
//       const photoUrl = await getUserPhoto();
      
//       return {
//         ...userData,
//         photoUrl,
//         displayName: userData.displayName,
//         email: userData.mail || userData.userPrincipalName,
//         phone: userData.mobilePhone,
//         jobTitle: userData.jobTitle,
//         department: userData.department
//       };
//     }
//     return null;
//   } catch (error) {
//     console.error('Error getting user profile:', error);
//     return null;
//   }
// };


  

export default msalInstance;