import fs from 'fs/promises';
import path from 'path';

export const saveImage = async (imageBase64, fileName, folder = 'uploads') => {
  try {
    const uploadDir = path.resolve(folder);

    await fs.mkdir(uploadDir, { recursive: true });

    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');
    const filePath = path.join(uploadDir, fileName);

    await fs.writeFile(filePath, base64Data, 'base64');

    return filePath;
  } catch (err) {
    console.error('Error saving image:', err);
    throw err;
  }
};
