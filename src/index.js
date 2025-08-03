import './index.less'; 
import './index.css'

function insertImageEliment(imageFile) {
    const img = new Image();
    img.src = imageFile;
    img.classList.add('image');
    document.body.appendChild(img);
}

import image1 from './imgs/img1.jpg'
import image2 from './imgs/img2.png'

insertImageEliment(image1);
insertImageEliment(image2);