const groups = []

function addGroup (name, tags) {
  groups.push({ name, tags })
}

addGroup('special', [
  'award',
  'featured',
])

addGroup('domain', [
  'creative',
  'technical',
  'hackathon',
])

addGroup('technology', [
  'front end',
  'back end'
])

addGroup('input', [
  'api',
  '3d',
  'animation',
  'concept',
  'data',
  'database',
  'mapping',
  'physics',
  'social',
  'ugc',
  'video',
])

addGroup('output', [
  'chrome extension',
  'game',
  'mashup',
  'plugin',
  'rapid prototype',
  'spa',
  'web app',
])

addGroup('software', [
  '3dsmax',
  'after effects',
  'laravel',
  'nuxt',
  'vuejs',
])

addGroup('language', [
  'actionscript',
  'flash',
  'html',
  'html5',
  'javascript',
  'php',
  'svg',
  'vba',
])

addGroup('device', [
  'ipad',
  'mobile',
  'responsive',
])

addGroup('category', [
  'productivity',
  'tools',
])
