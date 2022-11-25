import Axios from 'axios';

export async function getSignedPhotoUrl(data: { key: string }): Promise<{ payload: { url: string } }> {
    return await Axios.post('multimedia/getPhotoUrl', data);
}

export async function deleteImage(data: { key: string }) {
    return await Axios.post('multimedia/deleteImage', data);
}
