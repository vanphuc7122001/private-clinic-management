import { Request } from 'express'

import { UPLOAD_IMAGES_TEM_DIR } from '~/constants/dir'
import formidable, { Fields, Files, File } from 'formidable'
import fs from 'fs'

export const initFolder = () => {
  ;[UPLOAD_IMAGES_TEM_DIR].forEach((folder) => {
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, {
        recursive: true
      })
    }
  })
}

export const handleUploadSignleImage = (req: Request) => {
  const form = formidable({
    uploadDir: UPLOAD_IMAGES_TEM_DIR,
    maxFiles: 1,
    keepExtensions: true,
    maxFileSize: 300 * 1024, // 300KB,
    filter: function ({ name, originalFilename, mimetype }) {
      // name la ten truong nhap len originalFilename la ten file goc mimetype hau to file ex image/jpeg
      const valid = name === 'images' && Boolean(mimetype?.includes('image/'))
      if (!valid) {
        if (!valid) {
          form.emit('error' as any, new Error('File type is not valid') as any)
        }
      }
      return valid
    }
  })

  return new Promise<File>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      // console.log('fields', fields, 'files', files)
      // fields la cac truong gui len con lai
      // file la file gui len
      const isEmpty = Boolean(files.images)
      if (err) {
        return reject(err)
      }

      if (!isEmpty) {
        return reject(new Error('File is required'))
      }

      // if (files) {
      return resolve((files.images as File[])[0])
    })
  })
}

export const getNameFromFullName = (fullName: string) => {
  const name = fullName.split('.')
  name.pop()
  return name.join('')
}
