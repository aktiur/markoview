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
        this.content = content.map((data, i) => ({coords: data, index: i, toggled: false}));
    }

    render(frame_number, duration = 200) {
        const self = this;
        const i = frame_number - 1;

        // we get only the current frame data and filter for null values
        const active_participants = this.content.map(({ coords, index, toggled }) => ({ point: coords[i], index, toggled }))
            .filter(({ point }) => (point !== null));

        const markers = this.markers_group.selectAll('circle').data(active_participants, (d) => d.index);

        // update selection ==> we slowly move the points
        markers.transition()
            .duration(duration)
            .attr({
                cx: (d) => d.point[0],
                cy: (d) => d.point[1],
                opacity: 1.0
            });

        markers.enter()
            .append('circle')
            .attr({
                r: radius,
                cx: (d) => d.point[0],
                cy: (d) => d.point[1],
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
            .duration(duration)
            .attr('opacity', 1.);

        markers.exit()
            .transition()
            .duration(duration)
            .attr('opacity', 0.)
            .remove();
    }
}

export default MarkerLayer;
