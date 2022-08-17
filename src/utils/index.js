  export const getCurrentTime = () => {
    const now = new Date()
    return now.getHours() + ':' + now.getMinutes()
  }
  
  export const getCurrentUser = () => {
    let user = null;
    try {
      user = localStorage.getItem('user') != null ? JSON.parse(localStorage.getItem('user')) : null;
    } catch (error) {
      console.log(">>>> src/utils/index.js : getCurrentUser -> error", error)
      user = null;
    }
    return user;
  }
  
  export const setCurrentUser = (user) => {
    try {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user))
      } else {
        localStorage.removeItem('user');
      }
    } catch (error) {
      console.log(">>>> src/utils/index.js : setCurrentUser -> error", error)
    }
  }

  export const getCountSendToday = () => {
    let count = 0;
    try {
        count = localStorage.getItem('countSendToday') != null ? localStorage.getItem('countSendToday') : 0;
    } catch (error) {
        console.log(">>>> src/utils/index.js : getCountSendToday -> error", error)
        count = 0;
    }
    return count;
  }
  
  export const setCountSendToday = (count) => {
    try {
      if (count) {
        localStorage.setItem('countSendToday',count)
      } else {
        localStorage.removeItem('countSendToday');
      }
    } catch (error) {
      console.log(">>>> src/utils/index.js : setCountSendToday -> error", error)
    }
  }

  export const getCountReceiveToday = () => {
    let count = 0;
    try {
        count = localStorage.getItem('countReceiveToday') != null ? localStorage.getItem('countReceiveToday') : 0;
    } catch (error) {
        console.log(">>>> src/utils/index.js : getCountReceiveToday -> error", error)
        count = 0;
    }
    return count;
  }
  
  export const setCountReceiveToday = (count) => {
    try {
      if (count) {
        localStorage.setItem('countReceiveToday',count)
      } else {
        localStorage.removeItem('countReceiveToday');
      }
    } catch (error) {
      console.log(">>>> src/utils/index.js : setCountReceiveToday -> error", error)
    }
  }

  export const getCountBitToday = () => {
    let count = 0;
    try {
        count = localStorage.getItem('countBitToday') != null ? localStorage.getItem('countBitToday') : 0;
    } catch (error) {
        console.log(">>>> src/utils/index.js : getCountBitToday -> error", error)
        count = 0;
    }
    return count;
  }
  
  export const setCountBitToday = (count) => {
    try {
      if (count) {
        localStorage.setItem('countBitToday',count)
      } else {
        localStorage.removeItem('countBitToday');
      }
    } catch (error) {
      console.log(">>>> src/utils/index.js : setCountBitToday -> error", error)
    }
  }

  export const getCountDebt = () => {
    let count = 0;
    try {
        count = localStorage.getItem('countDebt') != null ? localStorage.getItem('countDebt') : 0;
    } catch (error) {
        console.log(">>>> src/utils/index.js : getCountDebt -> error", error)
        count = 0;
    }
    return count;
  }
  
  export const setCountDebt = (count) => {
    try {
      if (count) {
        localStorage.setItem('countDebt',count)
      } else {
        localStorage.removeItem('countDebt');
      }
    } catch (error) {
      console.log(">>>> src/utils/index.js : setCountDebt -> error", error)
    }
  }