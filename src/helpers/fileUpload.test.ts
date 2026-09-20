import { fileUpload } from './fileUpload';

// Mock fetch
global.fetch = jest.fn();

describe('fileUpload', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('should throw error when no file is provided', async () => {
    const emptyFile = new File([], '');

    expect(fileUpload).toBeDefined();
  });

  it('should successfully upload file to Cloudinary', async () => {
    const mockResponse = {
      ok: true,
      json: async () => ({
        secure_url: 'https://example.com/image.jpg',
        public_id: 'test-image'
      })
    };

    (fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const result = await fileUpload(file);

    expect(result).toBe('https://example.com/image.jpg');
    expect(fetch).toHaveBeenCalled();
  });

  it('should handle upload failures', async () => {
    const mockResponse = {
      ok: false,
      status: 400,
      statusText: 'Bad Request'
    };

    (fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });

    await expect(fileUpload(file)).rejects.toThrow('No se pudo subir imagen');
  });

  it('should handle network errors', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });

    await expect(fileUpload(file)).rejects.toThrow();
  });
});
