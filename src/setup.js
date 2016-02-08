/**
 * Created by Arthur on 08/02/2016.
 */

import d3 from 'd3';

export function setup_controls(total_frames) {
    "use strict";

    console.log(total_frames);

    const controls = d3.select('.controls');

    console.log(controls.select('.total'));
    controls.select('.total').text(String(total_frames));

    controls.select('input').attr('disabled', null);
    controls.selectAll('button').attr('disabled', null);
}

