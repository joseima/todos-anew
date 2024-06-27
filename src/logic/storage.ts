interface SaveToStorageParams<T> {
    item: string;
    object: T;
}
export const saveToStorage = <T>({ item, object }: SaveToStorageParams<T>) : void => {
    window.localStorage.setItem(`${item}`, JSON.stringify(object))
}

export const resetStorage = (item : string) => {
    window.localStorage.removeItem(`${item}`)
}