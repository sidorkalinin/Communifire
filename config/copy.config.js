// this is a custom dictionary to make it easy to extend/override
// provide a name for an entry, it can be anything such as 'copyAssets' or 'copyFonts'
// then provide an object with a `src` array of globs and a `dest` string
module.exports = {
  copyFontAwesome: {
    src: ['{{ROOT}}/node_modules/font-awesome/fonts/**/*'],
    dest: '{{WWW}}/assets/fonts'
  },
  copyFroalaEditorCss: {
    src: ['{{ROOT}}/node_modules/froala-editor/css/froala_editor.pkgd.min.css', '{{ROOT}}/node_modules/froala-editor/css/froala_style.min.css'],
    dest: '{{BUILD}}'
  },
  copyFontAwesome: {
    src: '{{ROOT}}/node_modules/font-awesome/css/font-awesome.min.css',
    dest: '{{BUILD}}'
  },
  copyFontsAwesomeFonts: {
    src: '{{ROOT}}/node_modules/font-awesome/fonts/*',
    dest: '{{WWW}}/fonts'
  },
  copyFontAwesome: {
    src: '{{ROOT}}/node_modules/font-awesome/css/font-awesome.min.css',
    dest: '{{BUILD}}'
  },
  copyChatFonts: {
    src: ['{{SRC}}/assets/chat/fonts/*'],
    dest: '{{WWW}}/assets/fonts'
  },
  copyChatScriptFolder: {
    src: ['{{SRC}}/assets/chat/scripts/jquery-2.0.3.min.js'],
    dest: '{{WWW}}/assets/chat/scripts'
  },
  copyAssets: {
    src: ['{{SRC}}/assets/**/*'],
    dest: '{{WWW}}/assets'
  },
  copyIndexContent: {
    src: ['{{SRC}}/index.html', '{{SRC}}/manifest.json', '{{SRC}}/service-worker.js'],
    dest: '{{WWW}}'
  },
  copyFonts: {
    src: ['{{ROOT}}/node_modules/ionicons/dist/fonts/**/*', '{{ROOT}}/node_modules/ionic-angular/fonts/**/*'],
    dest: '{{WWW}}/assets/fonts'
  },
  copyPolyfills: {
    src: [`{{ROOT}}/node_modules/ionic-angular/polyfills/${process.env.IONIC_POLYFILL_FILE_NAME}`],
    dest: '{{BUILD}}'
  },
  copySwToolbox: {
    src: ['{{ROOT}}/node_modules/sw-toolbox/sw-toolbox.js'],
    dest: '{{BUILD}}'
  },
  copyMobiscrollCss: {
    src: ['{{ROOT}}/src/lib/mobiscroll/css/*'],
    dest: '{{WWW}}/lib/mobiscroll/css/'
  },
  copyIonicInput: {
    src: ['{{ROOT}}/src/lib/ion-tags-input.js'],
    dest: '{{ROOT}}/node_modules/ionic-tags-input/dist/'
  },
  copyZoomArea1: {
    src: ['{{ROOT}}/src/lib/zoom-area.module.js'],
    dest: '{{ROOT}}/node_modules/ionic2-zoom-area/dist/'
  },
  copyZoomArea2: {
    src: ['{{ROOT}}/src/lib/zoom-area.module.metadata.json'],
    dest: '{{ROOT}}/node_modules/ionic2-zoom-area/dist/'
  },
  copyZoomArea3: {
    src: ['{{ROOT}}/src/lib/zoom-area.module.js.map'],
    dest: '{{ROOT}}/node_modules/ionic2-zoom-area/dist/'
  }
}
