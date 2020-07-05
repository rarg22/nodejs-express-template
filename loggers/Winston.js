const winston = require('winston')
const _ = require('underscore');
const path = require('path')

const createLogger = (options) => {
    const {
        moduleName = 'unknown',
        correlation = false,
        level = "info",
        outputDir = "./logs",
        getCorrelationId,
        noCorrelationId
    } = options;
    
    return winston.createLogger({
        level,
        format: winston.format.combine(
            winston.format((info) => {
                if (correlation) {
                    info.correlationId = getCorrelationId() || noCorrelationId;
                }
                return info;
            })(),
            winston.format.label({ label: moduleName }),
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            winston.format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] }),
            winston.format.colorize()
        ),
        transports: [
            new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.printf(({ timestamp, level, label, message, metadata }) => {
                        const { correlationId } = metadata;
                        const metadataCopy = _.omit(metadata, ['correlationId']);
                        return `${timestamp} ${level} [${label}] (${correlationId ? correlationId : ''}): ${message} ${!_.isEmpty(metadataCopy) ? JSON.stringify(metadataCopy) : ''}`
                    })
                )
            }),
            new winston.transports.File({
                filename: outputDir + '/server.log',
                format: winston.format.json()
            })
        ],
        exitOnError: false
    })
}

module.exports = {
    createLogger
}