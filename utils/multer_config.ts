import { Request } from "express"
import multer, { FileFilterCallback } from "multer"
import fs from "fs"

const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, destination: string) => void
  ) => {
    const folder = "./uploads/images/"
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder)
    }
    callback(null, folder)
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, filename: string) => void
  ) => {
    const ext = file.mimetype.split("/")[1]
    callback(null, `${file.fieldname}-${Date.now()}.${ext}`)
  },
})

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
) => {
  //image/ man hup tae sa phc houp pharb
  if (file.mimetype.startsWith("image/")) {
    callback(null, true)
  } else {
    callback(new Error("Not an image! Please upload an image."))
  }
}

const multerConfig = {
  config: {
    storage,
    //set hai houp pharb mee kha nard br kern 5MB
    limits: { fileSize: 1024 * 1024 * 5 },//limit kha nard khg houp va hai mun mee kha nard thao dai
    fileFilter,
  },
  keyUpload: "photo",//hao sai key photo man hai up dai theua la houp
}

export default multerConfig
