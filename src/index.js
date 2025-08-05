import './style/index.less'; 
import './style/index.css'

function insertImageEliment(imageFile) {
    const img = new Image();
    img.src = imageFile;
    img.classList.add('image');
    document.body.appendChild(img);
}

import image1 from './imgs/img1.jpg'
import image2 from './imgs/img2.png'
import { add } from './component/utils';

insertImageEliment(image1);
insertImageEliment(image2);

import _ from 'lodash'

console.log(_.join(['a', 'b', 'c'], '---'));


console.log(add(1, 2));

setTimeout(() => {
   import ('./component/sync').then((sync) => {
        console.log(sync.default.message)
   })
}, 3000)