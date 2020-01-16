const path = require('path')
const fs = require('fs')
const pdf = require('html-pdf')
const json = require('./data.json')

const template = path.join(__dirname, 'index.html')
const result = template.replace('.html', '.pdf')
let htmlTemplate = fs.readFileSync(template, 'utf8')

function writeData(json) {
    let s = ''
    for (const item of json) {
        s += '<tr>'
        const {name, gender, phone} = item
        for (const field of [name, gender, phone]) {
           s += `<td style="border:1px solid red;">${field}</td>`
        }
        s += '</tr>'
    }
    return s
}

function writeTable(m, n) {
    let s = ''
    // const tb = document.getElementById('tbody')
    for (let i = 0; i < m; i++) {
        s += '<tr>'
        // const el = document.createElement('tr')
        // el.style.cssText = 'height: 23px;'
        for (let j = 0; j < n; j++) {
            // const el2 = document.createElement('td')
            // el2.style.cssText = 'height: 23px; width: 15px;'
            // el2.innerHTML = 'ola'
            // el.appendChild(el2)
            s += '<td style="border:1px solid red;"></td>'
        }
        s += '</tr>'
        // tb.appendChild(el)
    }
    return s
}

const s = writeData(json)
console.log(s)
htmlTemplate = htmlTemplate.replace('{{content}}', s) 

pdf.create(htmlTemplate, {width: '210mm', height: '297mm'})
   .toFile(result, (err, pdf) => {
        console.log(pdf.filename)
   })
