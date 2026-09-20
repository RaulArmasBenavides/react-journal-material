import { getEnvironments } from './getEnvironments';

export const fileUpload = async( file ) => {
    if ( !file ) throw new Error('No tenemos ningúna archivo a subir');

    const { VITE_CLOUDINARY_URL, VITE_CLOUDINARY_UPLOAD_PRESET } = getEnvironments();

    const formData = new FormData();
    formData.append('upload_preset', VITE_CLOUDINARY_UPLOAD_PRESET );
    formData.append('file', file );

    try {
        const resp = await fetch(VITE_CLOUDINARY_URL , {
            method: 'POST',
            body: formData
        });

        if ( !resp.ok ) {
            throw new Error('No se pudo subir imagen')
        }
        const cloudResp = await resp.json();

        return cloudResp.secure_url;

    } catch (error) {
        throw new Error( error.message );
    }
}