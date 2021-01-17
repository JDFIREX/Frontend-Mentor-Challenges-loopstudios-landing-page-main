module.exports = {
  "globDirectory": "src/",
  "globPatterns": [
    // "**/*.{html}",
    "**/*.{html,js,css}",
    "../images/**/*.{img,png,svg,jpg,jpeg}"
  ],
  "swDest": "src/sw.js",
  "swSrc" : "src/src-sw.js"
};