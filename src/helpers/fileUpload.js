

export const fileUpload = async( file ) => {
    if ( !file ) throw new Error('No tenemos ningúna archivo a subir');

    const cloudUrl = 'https://api.cloudinary.com/v1_1/dhtqqqm6v/upload';

    const formData = new FormData();
    formData.append('upload_preset',import.meta.env.VITE_CLOUD_UPLOAD_PRESET);
    formData.append('file', file );

    try {
 
        const resp = await fetch( import.meta.env.VITE_CLOUD_URL_BINARY, {
            method: 'POST',
            body: formData
        });


        if ( !resp.ok ) {
            console.log(resp)
            throw new Error('No se pudo subir imagen')
        }
            const cloudResp = await resp.json();

        return cloudResp.secure_url;

    } catch (error) {
        console.log(error);
        throw new Error( error.message );
    }

}