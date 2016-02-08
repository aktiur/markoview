/**
 * Created by Arthur on 06/02/2016.
 */

"use strict";

import path from 'path'
import { width, height } from "./constants.js";
import { import_eyetracking_data } from './import_data';
import { setup_controls } from './setup';
import d3 from "d3";

// initialize the svg element
const app_elem = d3.select('#app');
const svg = app_elem.append('svg')
    .attr('width', String(width) + 'px')
    .attr('height', String(height) + 'px');

const eye_markers = svg.append('g');


import_eyetracking_data('data/Data_saveurpalais_x_y.txt')
    .then((content) => {
        console.log(content);

        const total_frames = content[0].data.length;

        setup_controls(total_frames);

        const eyes = eye_markers.selectAll('circle')
            .data()
    });
