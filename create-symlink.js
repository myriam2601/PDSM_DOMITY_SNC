import fs from 'fs';
import path from 'path';

function createSymlink() {
    const target = path.join(process.cwd(), 'public', 'storage');
    const source = path.join(process.cwd(), 'storage', 'app', 'public');

    try {
        // Supprimer le lien précédent si nécessaire
        if (fs.existsSync(target)) {
            fs.unlinkSync(target);
            console.log('Lien symbolique existant supprimé.');
        }
        // Créer un nouveau lien symbolique
        fs.symlinkSync(source, target, process.platform === 'win32' ? 'junction' : 'dir');
        console.log('Lien symbolique créé avec succès.');
    } catch (error) {
        console.error('Erreur lors de la création du lien symbolique:', error);
    }
}

createSymlink();
