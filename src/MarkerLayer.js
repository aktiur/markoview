/**
 * Created by Arthur on 12/02/2016.
 */

import d3 from 'd3';
import { radius, color, toggled_color } from './constants'

class MarkerLayer {
    constructor(svg, content) {
        this.svg = svg;

        this.markers_group = svg.append('g');

        // each row has some additional metadata: the index, and a toggled value,
        // initialized at false
        this.content = content.map((data, i) => ({data: data, index: i, toggled: false}));
    }

    render(frame_number, speed = 200) {
        const self = this;
        const i = frame_number - 1;

        // we get only the current frame data and filter for null values
        const data = this.content.map(({ data, index, toggled }) => ({ data: data[i], index, toggled }))
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
                'fill-opacity': 0.,
                stroke: (d) => (d.toggled ? toggled_color : color)
            })
            .on('click', function(d) {
                const toggled = self.content[d.index].toggled = !self.content[d.index].toggled;
                console.log('gestionnaire ' + toggled);
                d3.select(this).attr('stroke', toggled ? toggled_color : color);
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
