
export const sortArrayByObjectValue = (array: any[], key: string) => {
	array.sort(({ [key]: a }, { [key]: b }) => a === b ? 0 : a.toLowerCase() > b.toLowerCase() ? 1 : -1);
}
