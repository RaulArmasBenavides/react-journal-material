

export const fileUpload = async( file ) => {
    if ( !file ) throw new Error('No tenemos ningúna archivo a subir');

    const cloudUrl = 'https://api.cloudinary.com/v1_1/dhtqqqm6v/upload';

    const formData = new FormData();
    //import.meta.env.VITE_CLOUD_UPLOAD_PRESET
    formData.append('upload_preset', 'z0j3gbsf' );
    formData.append('file', file );

    try {
    //import.meta.env.VITE_CLOUD_URL_BINARY
        const resp = await fetch(cloudUrl , {
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