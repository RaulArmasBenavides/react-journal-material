import { getEnvironments } from './getEnvironments';
import { logger } from '../utils/logger';

interface CloudinaryResponse {
  secure_url: string;
  public_id: string;
  version: number;
  width?: number;
  height?: number;
}

export const fileUpload = async(file: File): Promise<string> => {
  if (!file) {
    logger.error('No file provided for upload');
    throw new Error('No tenemos ningúna archivo a subir');
  }

  const { VITE_CLOUDINARY_URL, VITE_CLOUDINARY_UPLOAD_PRESET } = getEnvironments();

  const formData = new FormData();
  formData.append('upload_preset', VITE_CLOUDINARY_UPLOAD_PRESET);
  formData.append('file', file);

  try {
    logger.debug(`Uploading file: ${file.name}`, { size: file.size, type: file.type });

    const resp = await fetch(VITE_CLOUDINARY_URL, {
      method: 'POST',
      body: formData
    });

    if (!resp.ok) {
      logger.error(`Cloudinary upload failed with status ${resp.status}`, undefined, {
        status: resp.status,
        statusText: resp.statusText
      });
      throw new Error('No se pudo subir imagen');
    }

    const cloudResp = await resp.json() as CloudinaryResponse;
    logger.info(`File uploaded successfully: ${file.name}`, { url: cloudResp.secure_url });
    return cloudResp.secure_url;
  } catch (error) {
    logger.error('Error during file upload', error instanceof Error ? error : new Error(String(error)), {
      fileName: file.name
    });
    throw new Error(error instanceof Error ? error.message : 'Error desconocido');
  }
};
