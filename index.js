import {$, html2canvas, THREE, PDFJS} from './src/libs'
import "./styles.css";

window.jQuery = $;
/*window.PDFJS_LOCALE = {
  pdfJsWorker: './flip-book/js/pdf.worker.js'
};*/

require('flip-book');


// Sample 0 {
// $('#container').FlipBook({
//   pdf: 'books/pdf/FoxitPdfSdk.pdf',
//   template: {
//     html: './flip-book/templates/default-book-view.html',
//     styles: [
//       './flip-book/css/short-black-book-view.css'
//     ],
//     links: [{
//       rel: 'stylesheet',
//       href: './flip-book/css/font-awesome.min.css'
//     }],
//     script: './flip-book/js/default-book-view.js'
//   }
// });
// // }
//
// Sample 1 {
function theKingIsBlackPageCallback(n) {
  if (n > 10){
    n = Math.random() * 10;
    n = Math.floor(n)
    if (n == 0){ n = 1;}
  }
  return {
    type: 'image',
    src: 'books/images/theKingIsBlack/'+(n+1)+'.jpg',
    interactive: false
  };
}

$('#container').FlipBook({
  pageCallback: theKingIsBlackPageCallback,
  pages: 100,
  controlsProps: {
    downloadURL: 'books/pdf/FoxitPdfSdk.pdf',
    actions: {
      cmdBackward: {
        code: 37,
      },
      cmdForward: {
        code: 39
      },
      cmdSave: {
        code: 68,
        flags: 1,
      },
      mouseCmdRotate: {
        enabled: true
      }
    }
  },
  propertiesCallback: function(props) {
    props.cover.color = 0x000000;
    props.page.depth *= 2;
    return props;
  },
  template: {
    html: './flip-book/templates/default-book-view.html',
    styles: [
      './flip-book/css/short-white-book-view.css'
    ],
    links: [{
      rel: 'stylesheet',
      href: './flip-book/css/font-awesome.min.css'
    }],
    script: './flip-book/js/default-book-view.js',
    sounds: {
      startFlip: './flip-book/sounds/start-flip.mp3',
      endFlip: './flip-book/sounds/end-flip.mp3'
    }
  }
});
// }
//
// // Sample 2 {
// $('#container').FlipBook({
//   pdf: 'books/pdf/CondoLiving.pdf',
//   template: {
//     html: 'node_modules/flip-book/templates/default-book-view.html',
//     links: [
//       {
//         rel: 'stylesheet',
//         href: 'node_modules/flip-book/css/font-awesome.min.css'
//       }
//     ],
//     styles: [
//       'node_modules/flip-book/css/white-book-view.css'
//     ],
//     links: [{
//       rel: 'stylesheet',
//       href: 'node_modules/flip-book/css/font-awesome.min.css'
//     }],
//     script: 'node_modules/flip-book/js/default-book-view.js'
//   }
// });
// // }
//
// // Sample 3 {
// $('#container').FlipBook({
//   pdf: 'books/pdf/TheThreeMusketeers.pdf',
//   propertiesCallback: function(props) {
//     props.page.depth /= 2.5;
//     props.cover.padding = 0.002;
//     return props;
//   },
//   template: {
//     html: 'node_modules/flip-book/templates/default-book-view.html',
//     links: [
//       {
//         rel: 'stylesheet',
//         href: 'node_modules/flip-book/css/font-awesome.min.css'
//       }
//     ],
//     styles: [
//       'node_modules/flip-book/css/short-black-book-view.css'
//     ],
//     links: [{
//       rel: 'stylesheet',
//       href: 'node_modules/flip-book/css/font-awesome.min.css'
//     }],
//     script: 'node_modules/flip-book/js/default-book-view.js'
//   }
// });
// // }
//
// // Sample 4 {
// function preview(n) {
//   return {
//     type: 'html',
//     src: 'books/html/preview/'+(n%3+1)+'.html',
//     interactive: true
//   };
// }

// $('#container').FlipBook({
//   pageCallback: preview,
//   pages: 10,
//   propertiesCallback: function(props) {
//     props.sheet.color = 0x008080;
//     props.cover.padding = 0.002;
//     return props;
//   },
//   template: {
//     html: 'node_modules/flip-book/templates/default-book-view.html',
//     links: [
//       {
//         rel: 'stylesheet',
//         href: 'node_modules/flip-book/css/font-awesome.min.css'
//       }
//     ],
//     styles: [
//       'node_modules/flip-book/css/black-book-view.css'
//     ],
//     links: [{
//       rel: 'stylesheet',
//       href: 'node_modules/flip-book/css/font-awesome.min.css'
//     }],
//     script: 'node_modules/flip-book/js/default-book-view.js'
//   }
// });
// // }
