export const removeElementFromArray = (processingArray: any[], item: any) => {
    let indx = processingArray.findIndex((itm) => itm == item);

    indx > -1 && processingArray.splice(indx, 1);
};
