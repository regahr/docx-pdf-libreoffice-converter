import express from 'express';

const router = express.Router();

// eslint-disable-next-line import/no-extraneous-dependencies
const libre = require('libreoffice-convert');
const fs = require('fs');
// eslint-disable-next-line import/no-extraneous-dependencies
const { promisify } = require('bluebird');

const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'app/routes/process');
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

const libreConvert = promisify(libre.convert);

router.get('/menu', async (req, res) => {
  res.send(`
    <form action="/api/v1/docx-processor/process/upload" method="post" enctype="multipart/form-data" style="display: flex; flex-direction: column; align-items: center;">
      <input type="file" name="docx" />
      <input type="submit" value="Convert" />
    </form>
  `);
});

router.post('/upload', upload.single('docx'), async (req, res) => {
  const filePath = req.file.path;
  const file = await fs.readFileSync(filePath);
  const pdfFile = await libreConvert(file, '.pdf', undefined);
  const pdfPath = `${filePath.split('.')[0]}.pdf`;
  fs.writeFileSync(pdfPath, pdfFile);
  res.redirect(`/api/v1/docx-processor/process/converted?pdfPath=${pdfPath}`);
});

router.get('/converted', async (req, res) => {
  const { pdfPath } = req.query;
  const file = fs.readFileSync(pdfPath);
  const pdfBase64 = Buffer.from(file).toString('base64');
  const pdfUrl = `data:application/pdf;base64,${pdfBase64}`;
  res.send(`
    <iframe src="${pdfUrl}" width="100%" height="100%" style="border: none;"></iframe>
    <script src="https://mozilla.github.io/pdf.js/build/pdf.js"></script>
    <script>
      const url = '${pdfUrl}';
      const pdfjsLib = window['pdfjs-dist/build/pdf'];
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.js';
      const loadingTask = pdfjsLib.getDocument(url);
      loadingTask.promise.then(function(pdf) {
        pdf.getPage(1).then(function(page) {
          const scale = 1.5;
          const viewport = page.getViewport({ scale: scale, });
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          document.body.appendChild(canvas);
          const renderContext = {
            canvasContext: context,
            viewport: viewport,
          };
          page.render(renderContext);
        });
      });
    </script>
  `);
});
module.exports = router;
