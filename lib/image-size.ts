import fs from 'fs';

export function getImageSize(filePath: string): { width: number; height: number } | null {
    try {
        const buffer = Buffer.alloc(4096);
        const fd = fs.openSync(filePath, 'r');
        fs.readSync(fd, buffer, 0, 4096, 0);
        fs.closeSync(fd);

        // PNG Header
        if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47) {
            return {
                width: buffer.readInt32BE(16),
                height: buffer.readInt32BE(20)
            };
        }

        // JPEG Header
        if (buffer[0] === 0xff && buffer[1] === 0xd8) {
            let i = 2;
            while (i < buffer.length - 8) {
                if (buffer[i] !== 0xff) break;
                const marker = buffer[i + 1];
                // SOF0 (Start of Frame) markers 0xC0, 0xC1, 0xC2, 0xC3
                if (marker === 0xc0 || marker === 0xc1 || marker === 0xc2 || marker === 0xc3) {
                    return {
                        height: buffer.readUInt16BE(i + 5),
                        width: buffer.readUInt16BE(i + 7)
                    };
                }
                i += 2 + buffer.readUInt16BE(i + 2);
            }
        }

        // Default safe fallbacks if not found or other format
        return null;
    } catch (e) {
        return null;
    }
}
