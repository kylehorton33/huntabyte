const { randomBytes } = await
import ('node:crypto')

export const serializeNonPOJOs = (obj) => {
    return structuredClone(obj)
}

export const generateUsername = (name) => {
    const id = randomBytes(2).toString('hex')
    return `${name.slice(0,5)}${id}`
}

export const getImageURL = (host, collectionId, recordId, fileName, size = '0x0') => {
    return `${host}/api/files/${collectionId}/${recordId}/${fileName}?thumb=${size}`
}