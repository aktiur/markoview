/**
 * Created by Arthur on 12/02/2016.
 */

import d3 from 'd3';
import { radius } from './constants'

class MarkerLayer {
    constructor(svg, content) {
        this.svg = svg;

        this.markers_group = svg.append('g');

        this.content = content;
    }

    render(frame_number, speed = 200) {
        const i = frame_number - 1;

        // we get only the current frame data and filter for null values
        const data = this.content.map(({ index, data }) => ({index, data: data[i]}))
            .filter(({ data }) => (data !== null));

        const markers = this.markers_group.selectAll('circle').data(data, (d) => d.index);

        // update selection ==> we slowly move the points
        markers.transition()
            .duration(speed)
            .attr({
                cx: (d) => d.data[0],
                cy: (d) => d.data[1],
                opacity: 1.0
            });

        markers.enter()
            .append('circle')
            .attr({
                r: radius,
                cx: (d) => d.data[0],
                cy: (d) => d.data[1],
                opacity: 0.,
                fill: 'none',
                stroke: 'blue'
            })
            .transition()
            .duration(speed)
            .attr('opacity', 1.);

        markers.exit()
            .transition()
            .duration(speed)
            .attr('opacity', 0.)
            .remove();
    }
}

export default MarkerLayer;
