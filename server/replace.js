import fs from 'fs';
import path from 'path';

const replaceInFile = (filePath) => {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    if (filePath.endsWith('.jsx')) {
        // Handle all tailwind class variations
        content = content.replace(/bg-\[\#5f6FFF\]/ig, 'bg-primary');
        content = content.replace(/text-\[\#5f6FFF\]/ig, 'text-primary');
        content = content.replace(/border-\[\#5f6FFF\]/ig, 'border-primary');
        // Handle standalone cases if any
        content = content.replace(/#5f6FFF/ig, 'primary');
    } else if (filePath.endsWith('.svg')) {
        content = content.replace(/#5F6FFF/ig, '#0F766E');
    }

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${filePath}`);
    }
}

const walkDir = (dir) => {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== 'node_modules' && file !== 'dist' && file !== '.git') {
                walkDir(fullPath);
            }
        } else {
            if (fullPath.endsWith('.jsx') || fullPath.endsWith('.svg')) {
                replaceInFile(fullPath);
            }
        }
    }
}

walkDir('d:/Mediconnect_mern_v1.0/client/src');
walkDir('d:/Mediconnect_mern_v1.0/admin/src');
console.log("Done replacing colors");
