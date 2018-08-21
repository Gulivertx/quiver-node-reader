const express = require('express')
const cors = require('cors')
const compression = require('compression')
//const cacheControl = require('express-cache-controller')
const logger = require('morgan')
const os = require('os')

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

const app = express()

app.use(compression())
//app.use(cacheControl(node_env === 'production' ? { maxAge: 15768000 } : { noCache:true }));
app.use(cors())
app.use(logger(node_env === 'production' ? 'combined':'dev'))
app.use(express.static('app'))

app.get('/', (req, res, next) => {
    res.send('Hello Quiver Node Reader')
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

// catch 404 and forward to error handler
app.use((req, res, next) => {
    res.status(404).json({status: 'error', msg: 'Not found', url: req.url})
})

app.listen(3000, () => {
    if (node_env === 'development') console.log('Server running on http://localhost:3000')
})
