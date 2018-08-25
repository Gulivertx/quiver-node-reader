const express = require('express')
const cors = require('cors')
const compression = require('compression')
//const cacheControl = require('express-cache-controller')
const logger = require('morgan')
const os = require('os')
const fs = require('fs')

const package = require('./package.json')

const node_env = process.env.NODE_ENV || 'development'

/**
 * Transform milliseconds to Day Hours Minutes Seconds
 * @param milli
 * @returns {string}
 */
const getTimeString = (milli) => {
    let d, h, m, s, ms;
    s = Math.floor(milli / 1000);
    m = Math.floor(s / 60);
    s = s % 60; s = s < 10 ? '0' + s : s;
    h = Math.floor(m / 60);
    m = m % 60; m = m < 10 ? '0' + m : m;
    d = Math.floor(h / 24);
    h = h % 24; h = h < 10 ? '0' + h : h;
    ms = Math.floor((milli % 1000) * 1000) / 1000;
    return `${d}d ${h}:${m}:${s}`;
}

/**
 * Remove duplicate entries in array
 * @param Array array
 * @returns {array[]}
 */
const removeDuplicate = array => [...new Set(array)];

/**
 * Gete Quiver Notebooks and Notes
 * Format result as a array<JSON>
 * @return {array}
 */
const getQuiverNoteBooks = () => {
    const result = []
    const path = 'data'; // Path of Quiver Notebooks

    // Get notebooks from path
    const notebooks = fs.readdirSync(path)

    // Get notes from notebooks
    notebooks.map(notebook => {
        let tags = []

        // Read notebooks meta.json
        const notebookMeta = JSON.parse(fs.readFileSync(`${path}/${notebook}/meta.json`, 'utf8'))

        // Read notes inside notebook
        const notes = fs.readdirSync(`${path}/${notebook}`)

        // Read notes meta.json
        const notesObj = []
        notes.map(note => {
            // Do note read meta.json as a note
            if (note === 'meta.json') return

            const noteMeta = JSON.parse(fs.readFileSync(`${path}/${notebook}/${note}/meta.json`, 'utf8'))
            notesObj.push({
                'title': noteMeta.title,
                'uuid': noteMeta.uuid,
                'dir': `${path}/${notebook}/${note}`,
                'created_at': noteMeta.created_at,
                'updated_at': noteMeta.updated_at,
                'tags': noteMeta.tags
            })

            // Add tags in tags array only if there is more than one
            if (noteMeta.tags.length >0) tags = [...tags, ...noteMeta.tags]
        })

        // Format the result
        result.push({
            'name': notebookMeta.name,
            'uuid': notebookMeta.uuid,
            'dir': `${path}/${notebook}`,
            'notes': notesObj.sort((a, b) => a.title.localeCompare(b.title)),
            'tags': removeDuplicate(tags.sort())
        })
    })

    return result
}

/**
 * Gets note by full path
 * @param path
 * @returns {}
 */
const getQuiverNote = (path) => {
    const noteMeta = JSON.parse(fs.readFileSync(`${path}/meta.json`, 'utf8')) // TODO: already inside React APP, should not be re-read here

    // Replace Quiver images URL by real image path
    let noteStr = fs.readFileSync(`${path}/content.json`, 'utf8')
    noteStr = noteStr.replace(/quiver-image-url/g, `${path}/resources`)

    const noteContent = JSON.parse(noteStr)

    return {
        title: noteMeta.title,
        tags: noteMeta.tags,
        created_at: noteMeta.created_at,
        updated_at: noteMeta.updated_at,
        cells: noteContent.cells
    }
}

const app = express()

app.use(compression())
//app.use(cacheControl(node_env === 'production' ? { maxAge: 15768000 } : { noCache:true }));
app.use(cors())
app.use(logger(node_env === 'production' ? 'combined':'dev'))
app.use(express.static('app'))
app.use('/data', express.static('data'))

app.get('/', (req, res, next) => {
    res.send('Hello Quiver Node Note')
})

app.get('/app-info', (req, res, next) => {
    res.json({
        name: package.name,
        description: package.description,
        version: package.version,
        author: package.author,
        process: {
            platform: os.platform(),
            arch: os.arch(),
            release: os.release(),
            hostname: os.hostname(),
            type: os.type(),
            cpuload: os.loadavg(),
            usedmem: Math.round((os.totalmem() - os.freemem()) / 1024 / 1024),
            totalmem: Math.round(os.totalmem() / 1024 / 1024),
            uptime: getTimeString(os.uptime() * 1000)

        }
    })
})

app.get('/quiver/notebooks', (req, res, next) => {
    const notebooks = getQuiverNoteBooks();

    res.json(notebooks)
})

app.get('/quiver/note/:path', (req, res, next) => {
    const note = getQuiverNote(req.params.path)

    res.json(note)
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
    res.status(404).json({status: 'error', msg: 'Not found', url: req.url})
})

app.listen(3000, () => {
    if (node_env === 'development') console.log('Server running on http://localhost:3000')
})
