
export const validateEmail = (email) => {
    //eslint-disable-next-line
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email)
}

