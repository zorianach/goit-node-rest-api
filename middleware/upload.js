import * as path from "node:path"
import * as crypto from "node:crypto"
import multer from "multer";

const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, path.join(process.cwd(), "tmp"))
    },
    filename(req, file, cb){
        // file.originalname = avka.jpeg
        const extname = path.extname(file.originalname);//розширення файла => .jpeg
        const basename = path.basename(file.originalname, extname);//назва файла => avka
        const suffix = crypto.randomUUID();
        const newName = `${basename}-${suffix}${extname}`
        // cb(null, file.originalname)
        cb(null, newName)
    }
})

export default multer({storage});