/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
    // `on` is used to hook into various events Cypress emits
    // `config` is the resolved Cypress config
}

var mysql = require('mysql')
var crypto = require('crypto');
var OAuth = require('oauth-request');
var pdftohtml = require('pdftohtmljs');
var os = require('os');
var rimraf = require("rimraf");


/**
 * This function will run DB Query.
 *
 * @param query
 * Database query
 *
 * @param config
 * DB Credentials in cypress.json > env > db
 *
 * @returns {Promise<any>}
 */
function queryTestDb(query, config) {
    // creates a new mysql connection using credentials from cypress.json env's
    const connection = mysql.createConnection(config.env.db)
    // start connection to db
    connection.connect()
    // exec query + disconnect to db as a Promise
    return new Promise((resolve, reject) => {
        connection.query(query, (error, results) => {
            if (error) reject(error)
            else {
                connection.end()
                return resolve(results)
            }
        })
    })
}

/**
 * This function will convert pdf to html format, keeping the format.
 *
 * @param inputPdfFilePath
 * Input PDF file path
 *
 * @param outputHtmlFileName
 * Output HTML file path
 *
 * @returns {Promise<string | never>}
 */
function convertPdfToHtml(inputPdfFilePath, outputHtmlFileName) {
    var converter = new pdftohtml(os.homedir() + inputPdfFilePath, outputHtmlFileName);
    return converter.convert('ipad').then(function () {
        return "converted";
    }).catch(function (err) {
        throw err;
    });
}

/**
 * This function will trigger the APIs those are based on oAuth1 authentication.
 *
 * @param requestURL
 * URI of the API
 *
 * @param clientKey
 * Client key
 *
 * @param clientSecret
 * Client secret
 *
 * @returns {Promise<any>}
 */
function getResponseFromOAuth1API(requestURL, clientKey, clientSecret) {
    return new Promise((resolve, reject) => {
        OAuth({
            consumer: {
                key: clientKey,
                secret: clientSecret
            },
            signature_method: 'HMAC-SHA1',
            hash_function: function (base_string, key) {
                return crypto.createHmac('sha1', key).update(base_string).digest('base64');
            }
        }).get({
            url: requestURL,
            json: true
        }, function (err, res, responseBody) {
            if (err) reject(err)
            else {
                return resolve(responseBody)
            }
        });
    })
}

/**
 * This function will delete any file by passing it's fully qualified path with fileName.
 *
 * @param filePath
 * File name along with file path (e.g. cypress/ConvertedPDF/CustomAttribute_TC01.html)
 *
 * @returns {Promise<any>}
 */
function deleteFile(filePath) {
    return new Promise((resolve, reject) => {
        rimraf(filePath, function (err, res) {
            if (err) reject(err)
            else {
                return resolve("Done")
            }
        });
    })
}

module.exports = (on, config) => {
    // Usage: cy.task('queryDb', query)
    on('task', {
        queryDb: query => {
            return queryTestDb(query, config)
        },
        convertPdfToHtml({inputPdfFilePath, outputFileName}) {
            return convertPdfToHtml(inputPdfFilePath, outputFileName)
        },
        getResponseBodyFromOAuth1API: ({requestURL, clientKey, clientSecret}) => {
            return getResponseFromOAuth1API(requestURL, clientKey, clientSecret)
        },
        deleteFile: filePath => {
            return deleteFile(filePath)
        }
    })
}