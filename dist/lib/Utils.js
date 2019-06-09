"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sampleImageCreator = (maxIndex) => {
    const assetsPath = 'assets/sample/';
    const extension = '.jpg';
    function zeroPadding(num, length) {
        return ('0000000000' + num).slice(-length);
    }
    const size = new Array(maxIndex).fill(0);
    const images = size.map((n, index) => {
        const No = zeroPadding(index + 1, 4);
        const image = {
            src: assetsPath + 'img' + No + extension,
            alt: 'sample'
        };
        return image;
    });
    console.log(images);
    return images;
};
//# sourceMappingURL=Utils.js.map