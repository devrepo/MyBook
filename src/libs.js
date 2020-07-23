const _$ = GLOBAL_LIBS.jQuery? window.jQuery: require('jquery'),
      _html2canvas = GLOBAL_LIBS.html2canvas? window.html2canvas: require('html2canvas'),
      _THREE = GLOBAL_LIBS.THREE? window.THREE: require('three'),
      _PDFJS = GLOBAL_LIBS.PDFJS? window.PDFJS: require('pdfjs');
      console.log("Jquery", _$);
      console.log("Html2Canvas", _html2canvas);
      console.log("Three", _THREE);
      console.log("PDFJS", _PDFJS);
export {
  _$ as $,
  _html2canvas as html2canvas,
  _THREE as THREE,
  _PDFJS as PDFJS
};
