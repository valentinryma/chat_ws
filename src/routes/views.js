const { Router } = require('express');
const router = Router();

router.get('/', (_, res) => {
    res.render('index', {
        title: "Aplicación de Chat",
        useWS: true,
        useSweetAlert: true,
        scripts: [
            'index.js',
            'recognitionApp.js',
        ],
        styles: [
            'style.css'
        ]

    })
});

module.exports = router;