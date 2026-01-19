const fs = require('fs');
const path = require('path');

// Carpeta donde están las fotos
const uploadsDir = path.join(__dirname, 'public', 'uploads');

function processDirectory(directory) {
    if (!fs.existsSync(directory)) {
        console.log(`❌ No encuentro la carpeta: ${directory}`);
        return;
    }

    const files = fs.readdirSync(directory);
    let cambios = 0;

    files.forEach(file => {
        const fullPath = path.join(directory, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            processDirectory(fullPath);
        } else {
            const ext = path.extname(file);
            // Si tiene extensión y NO es totalmente minúscula
            if (ext && ext !== ext.toLowerCase()) {
                const lowerName = file.replace(ext, ext.toLowerCase());
                const tempName = file + '.temp_renaming'; // Nombre temporal feo

                const oldPath = path.join(directory, file);
                const tempPath = path.join(directory, tempName);
                const newPath = path.join(directory, lowerName);

                try {
                    // 1. Renombrar a temporal (A.JPG -> A.JPG.temp_renaming)
                    fs.renameSync(oldPath, tempPath);
                    // 2. Renombrar al final (A.JPG.temp_renaming -> a.jpg)
                    fs.renameSync(tempPath, newPath);
                    
                    console.log(`✅ Forzado: ${file} -> ${lowerName}`);
                    cambios++;
                } catch (e) {
                    console.error(`❌ Error con ${file}:`, e);
                }
            }
        }
    });
}

console.log("🔨 Iniciando renombrado forzoso (JPG -> temp -> jpg)...");
processDirectory(uploadsDir);
console.log("✨ Proceso terminado.");