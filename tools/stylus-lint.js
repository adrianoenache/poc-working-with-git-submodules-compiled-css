const path = require('node:path')
const glob = require('glob')
const Linter = require('stlint').Linter
const fs = require('node:fs')

const lintPath = '../stylus/'
const cssSource = `${path.resolve(__dirname, lintPath)}`
const params = fs.readFileSync(`${path.resolve(__dirname, '../.stlintrc')}`, { encoding: 'utf8'})

const linter = new Linter(JSON.parse(params))

glob.sync(cssSource + '/**/*.styl').reduce(function(x, file) {

  linter.lint(file)

})

if (linter.reporter.errors.length > 0) {

  for (let i = 0; i < linter.reporter.errors.length; i++) {

    const err = linter.reporter.errors[i].message[0]

    console.error(err.path + '\n')
    console.error(`Line: ${err.line}   |  Rule: ${err.rule}    |  Desc: ${err.descr} \n\n`)

  }

  throw new Error('Styl lint error')

}
