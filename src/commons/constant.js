import { format } from 'date-fns';

export const styles = ["white", "basic"];

export const regex = /^[A-Za-z\s]+$/;
export const regexWithoutSpace = /^[A-Za-z]+$/;
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const capitalizeFirstLetter = (inputString) => {
  if (inputString) {
    return inputString.charAt(0).toUpperCase() + inputString.slice(1).toLowerCase();
  }
  return '';
};

export const removeNullProperties = (obj) => {
  for (const key in obj) {
    if (obj[key] === null) {
      delete obj[key];
    }
  }
  return obj;
};

export const removeZeroProperties = (obj) => {
  for (const key in obj) {
    if (obj[key] === 0) {
      delete obj[key];
    }
  }
  return obj;
};

export const generateRandomPassword = () => {
  const length = 15;
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#&_";
  let newPassword = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    newPassword += charset.charAt(randomIndex);
  }

  return newPassword;
};

export const handleError = (response) => {
  let errorMessages = [];

  console.log(response)
  if (response) {
    if (response.errors) {
      const errorObject = response.errors;
      for (const key in errorObject) {
        if (Array.isArray(errorObject[key])) {
          errorMessages = errorMessages.concat(errorObject[key]);
        }
      }
      return errorMessages.join('\n');
    } else if (response.error) {
      if(response.error.name !== 'undefined') {
        return response.error.name[0];
      }
      return response.error;
    }
  }

  return response;
}

export const formatDate = (timestamp) => {
  const formattedDate = format(new Date(timestamp), 'yyyy-MM-dd HH:mm:ss');
  return formattedDate;
};

export const percentageArray = () => {
  let result = [];
  for (let i = 0; i <= 100; i += 10) {
    result.push(i);
  }
  return result;
}

export const perPageOptions = [2, 5, 10, 25, 50, 100];

export const isImageFile = (fileName) => {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
  const fileExtension = fileName ? fileName.toLowerCase().substr(fileName.lastIndexOf('.')) : '';

  return imageExtensions.includes(fileExtension);
};


export const permissionsToRoleEdit = ['admin', 'role:edit'];
export const permissionsToRoleAdd = ['admin', 'role:add'];
export const permissionsToRoleDelete = ['admin', 'role:delete'];
export const permissionsToRoleView = ['admin', 'role:view'];

export const permissionsToUserAdd = ['admin', 'manager:add', 'employee:add', 'user-own:add'];
export const permissionsToUserView = ['admin', 'manager:view', 'employee:view'];
export const permissionsToUserEdit = ['admin', 'manager:edit', 'employee:edit', 'user-own:edit'];
export const permissionsToUserDelete = ['admin', 'manager:delete', 'employee:delete', 'user-own:delete'];

export const permissionsToProjectAdd = ['admin', 'projects:add'];
export const permissionsToProjectView = ['admin', 'projects:view'];
export const permissionsToProjectEdit = ['admin', 'projects:edit'];
export const permissionsToProjectDelete = ['admin', 'projects:delete'];

export const permissionsToAddMembersProject = ['admin', 'projects-member:add'];
export const permissionsToViewMembersProject = ['admin', 'projects-member:view'];
export const permissionsToDeleteMembersProject = ['admin', 'projects-member:delete'];


export const permissionsToPermissionAdd = ['admin', 'permissions:add'];
export const permissionsToPermissionView = ['admin', 'permissions:view'];
export const permissionsToPermissionEdit = ['admin', 'permissions:edit'];
export const permissionsToPermissionDelete = ['admin', 'permissions:delete'];

