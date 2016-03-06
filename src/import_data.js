/**
 * Created by Arthur on 07/02/2016.
 */

"use strict";

import d3 from 'd3';

function pairs_or_null(array) {
    const length = Math.floor(array.length / 2);

    const res = new Array(length);

    for (let i = 0; i < length; i++) {
        if (array[2 * i] === null || array[2 * i + 1] === null) {
            res[i] = null;
        } else {
            res[i] = [array[2 * i], array[2 * i + 1]];
        }
    }

    return res;
}

export function import_eyetracking_data(file) {
    return new Promise((resolve, reject) => {
        d3.text(file, function(error, content) {
            if (error) {
                reject(error);
            } else {
                // the content is space-separated with missing values as NaN
                const parser = d3.dsv(' ');

                // dsv.parseRows take an accessor function as a second argument
                // this one verifies if elem is 'NaN' or negative and sets its value to null in these cases
                // in the standard case it just converts it to float
                const accessor = row => pairs_or_null(
                    row.slice(0, -3).map((elem) => ((elem === 'NaN' || +elem < 0) ? null : +elem))
                );

                resolve(parser.parseRows(content, accessor));
            }
        });
    });
}
