const { randomBytes } = await
import ('node:crypto')

const PB_HOST = process.env.POCKETBASE_HOST || "http://localhost:8090";

export const serializeNonPOJOs = (obj) => {
    return structuredClone(obj)
}

export const generateUsername = (name) => {
    const id = randomBytes(2).toString('hex')
    return `${name.slice(0,5)}${id}`
}

export const getImageURL = (collectionId, recordId, fileName, size = '0x0') => {
    return `${PB_HOST}/api/files/${collectionId}/${recordId}/${fileName}?thumb=${size}`
}