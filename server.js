const express = require('express');
const app = express();

app.listen(9000, () => {
    console.log('virtual klinik server is fired up and it has ears to listen for connection at port 9000');
});

app.use(express.static('public'));
