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

    files.forEach(file => {
        const fullPath = path.join(directory, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            // Si es carpeta, entramos a revisar
            processDirectory(fullPath);
        } else {
            // Si es archivo, miramos la extensión
            const ext = path.extname(file);
            
            // Si la extensión tiene mayúsculas (ej: .JPG), la cambiamos
            if (ext && ext !== ext.toLowerCase()) {
                const newName = file.replace(ext, ext.toLowerCase());
                const newPath = path.join(directory, newName);
                
                fs.renameSync(fullPath, newPath);
                console.log(`✅ Corregido: ${file} -> ${newName}`);
            }
        }
    });
}

console.log("🧹 Iniciando limpieza de nombres...");
processDirectory(uploadsDir);
console.log("✨ ¡Listo! Todas las extensiones están en minúscula.");