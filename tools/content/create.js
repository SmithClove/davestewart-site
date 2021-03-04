const Fs = require('fs')

function fillTemplate (templateString, templateVars){
  return new Function("return `"+ templateString.replace(/\${(\w+)}/g, '${this.$1}') +"`;").call(templateVars);
}


// ---------------------------------------------------------------------------------------------------------------------
// data
// ---------------------------------------------------------------------------------------------------------------------

const data = require('./data.json')
const template = Fs.readFileSync('./template.md').toString()

const linkTitles = {
  url: null,
  cl_url: null,
  gh_url: 'GitHub',
  ph_url: 'Product Hunt',
  rd_url: 'Reddit',
  ih_url: 'Indie Hackers',
  yt_url: 'YouTube',
}

data.forEach(data => {
  data.links = Object
    .keys(linkTitles)
    .reduce((lines, key) => {
      const url = data[key]
      if (url) {
        const title = linkTitles[key]
        const output = title
          ? `- [${title}](${url})`
          : `- [${url.replace(/https?:\/\//, '')}](${url})`
        lines.push(output)
      }
      return lines
    }, [])
    .join('\n') + '\n'

  const output = fillTemplate(template, data)

  let path = `./output/${data.id}/`
  Fs.mkdirSync(path)
  Fs.mkdirSync(`${path}/images`)
  Fs.writeFileSync(`${path}/index.md`, output)

  console.log(data.id)
})

// loop over
// console.log(data, template)

