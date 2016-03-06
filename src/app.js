/**
 * Created by Arthur on 06/02/2016.
 */

"use strict";

import path from 'path'
import { width, height } from "./constants.js";
import { import_eyetracking_data } from './import_data';
import Controls from './Controls';
import MarkerLayer from './MarkerLayer'
import VideoController from './VideoController'
import d3 from "d3";

// initialize the svg element
const app_elem = d3.select('#layers');
const svg = app_elem.append('svg')
    .attr('width', String(width) + 'px')
    .attr('height', String(height) + 'px');


import_eyetracking_data('data/Data_saveurpalais_x_y.txt')
    .then((content) => {
        console.log(content);

        let current_frame = 1;
        const total_frames = content[0].length;

        const controls = new Controls(d3.select('.controls'), total_frames);
        controls.render(current_frame);

        const markers = new MarkerLayer(svg, content);
        markers.render(1);

        const video = new VideoController(d3.select('#video video')[0][0], 25.);

        function update(value) {
            if (value > 0 && value <= total_frames) {
                current_frame = value;
                controls.render(value);
                markers.render(value);
                video.render(value);
            }
        }

        controls.on('next', () => { update(current_frame + 1); });
        controls.on('previous', () => { update(current_frame - 1); });
        controls.on('setframe', ({ value }) => { update(value); });
    });
