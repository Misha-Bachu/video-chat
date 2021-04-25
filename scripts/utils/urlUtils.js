/**
 * Appends query params to a URL
 *
 * @param {string} target - An URL endpoint with or without query params
 *     e.g. http://someresource or http://someresource?xyz=123
 * @param {Object|string[]} queryParamsToAppend - Object or list of query params strings with or
 *     without resource path prepended, where resource path is discarded
 *     e.g., ['xyz=123'] or ['http://someresource?xyz=123'] or { var1: val1, var2: val2 }
 * @return {string} - Target URL appended with query params from sourceQueryString
 */
function appendQueryParams(target, queryParamsToAppend) {
    var targetMatches = /^([^?]+)?\??(.*)$/g.exec(target);
    var targetResource = targetMatches[1] || '';
    var targetQueryString = targetMatches[2] || '';
    var resultQueryString = new QueryString(targetQueryString);

    if (!Array.isArray(queryParamsToAppend) && typeof queryParamsToAppend === 'object') {
        Object.keys(queryParamsToAppend).forEach(function (key) {
            var value = queryParamsToAppend[key];

            if (!Object.prototype.hasOwnProperty.call(resultQueryString, key) && value) {
                resultQueryString[key] = queryParamsToAppend[key] || '';
            }
        });
    } else {
        resultQueryString = queryParamsToAppend.reduce(function (current, params) {
            var currentCopy = current;
            var queryToAppend = new QueryString(params);

            Object.keys(queryToAppend).forEach(function (key) {
                if (!Object.prototype.hasOwnProperty.call(currentCopy, key)) {
                    currentCopy[key] = queryToAppend[key] || '';
                }
            });

            return currentCopy;
        }, resultQueryString);
    }
    return targetResource + '?' + resultQueryString.toString();
}

/**
 * Removes a given option from URL
 *
 * @param {String} url An URL endpoint with or without query params
 *     e.g. http://someresource or http://someresource?xyz=123
 * @param {String} optionID ID of an option to be removed
 * @returns {String}
 */
function removeOption(url, optionID) {
    if (empty(url)) {
        return '';
    }

    if (empty(optionID)) {
        return url;
    }

    var urlMatches = /^([^?]+)?\??(.*)$/g.exec(url);
    var urlResource = urlMatches[1] || '';
    var urlQueryString = urlMatches[2] || '';
    var urlQuery = new QueryString(urlQueryString);

    urlQuery.options = (urlQuery.options || []).filter(function (urlQueryOption) {
        return urlQueryOption.optionId !== optionID;
    });

    return urlResource + '?' + urlQuery.toString();
}

/**
 * Removes a given param from URL
 *
 * @param {String} url An URL endpoint with or without query params
 *     e.g. http://someresource or http://someresource?xyz=123
 * @param {String} paramID ID of an param to be removed
 * @param {String} paramValue param value to verify (optional).
 * If the actual param value equals paramValue, the param will be removed.
 * @returns {String}
 */
function removeParamFromURL(url, paramID, paramValue) {
    if (empty(url)) {
        return '';
    }

    if (empty(paramID)) {
        return url;
    }

    var urlMatches = /^([^?]+)?\??(.*)$/g.exec(url);
    var urlResource = urlMatches[1] || '';
    var urlQueryString = urlMatches[2] || '';
    var urlQuery = new QueryString(urlQueryString);
    if (paramValue) {
        if (urlQuery[paramID].toString() === paramValue) {
            delete urlQuery[paramID];
        }
    } else {
        delete urlQuery[paramID];
    }

    return Object.keys(urlQuery).length > 0 ? urlResource + '?' + urlQuery.toString() : urlResource;
}

module.exports = {
    appendQueryParams,
    removeOption,
    removeParamFromURL
};
