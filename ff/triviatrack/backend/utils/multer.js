import multer from "multer";
import os from "os";

const dest = process.env.VERCEL
  ? os.tmpdir()  
  : "uploads";   

export default multer({ dest });
