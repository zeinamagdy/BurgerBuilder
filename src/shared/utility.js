export const updatedObject = (oldObj, updatedProps) => {
    return {
        ...oldObj,
        ...updatedProps
    }
}

export const updatedState = (state, updateState) => {

}

export const checkValidaity = (value, rules) => {
    if (!rules)
        return true;
    let isValid = true;
    if (rules.required) {
        isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
        isValid = value.trim().length >= rules.minLength && isValid;
    }
    if (rules.maxlength) {
        isValid = value.trim().length <= rules.maxlength && isValid;
    }
    // if (rules.email) {
    //     const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //     isValid = re.test(value) && isValid
    // }
    return isValid;
}