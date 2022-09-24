import winston, { format } from 'winston';

const colorsFormat = winston.format.combine(
  winston.format.colorize({
    all: true,
  })
);

const textFormat = winston.format.combine(
  winston.format.label({
    label: '[LOGGER]',
  }),
  winston.format.timestamp({
    format: 'YY-MM-DD HH:MM:SS',
  }),
  winston.format.printf(
    (info) =>
      `${info.label} ${info.timestamp} [${info.level.toUpperCase()}] : ${
        info.message
      }`
  )
);

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: 'silly',
      format: format.combine(textFormat, colorsFormat),
      // handleExceptions: true,
      // handleRejections: true,
    }),
  ],
  exitOnError: false,
});

export default logger;
