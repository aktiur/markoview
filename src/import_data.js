/**
 * Created by Arthur on 07/02/2016.
 */

import d3 from 'd3';

export function import_eyetracking_data(file) {
    return new Promise((resolve, reject) => {
        d3.text(file, (error, content) => {
            if (error) {
                reject(error);
            } else {
                // the content is space-separated with missing values as NaN
                const parser = d3.dsv(' ');

                // dsv.parseRows take an accessor function as a second argument
                const accessor = (row) => (
                    row.slice(0, -3)
                        .map((elem) => (elem === 'NaN' ? null : +elem))
                );

                resolve(parser.parseRows(content, accessor)
                    .map((row, i) => ({index: i, data: row})));
            }
        });
    });
}
