export const getId = () => {
    return new Date().getTime().toString();
};

export const returnEmptyStringOrValue = (value: any) => {
    return value ? value : '';
};
