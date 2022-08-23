export const getGroupType = (type) => {
    switch (type) {
        case "1":
            return "ขั้นบันได";     
        case "2":
            return "บิทเรทดอกตาม";
        case "3":
            return "เรทดอกตาม";  
    }
}

export const getGroupStatus = (type) => {
    switch (type) {
        case "P":
            return "วงกำลังเล่น";     
        case "N":
            return "วงสร้างใหม่";
        case "S":
            return "วงจบแล้ว";  
    }
}

export const getCareFeeType = (type) => {
    switch (type) {
        case "1":
            return "งวดแรก";     
        case "2":
            return "เมื่อได้รับเงิน";
    }
}