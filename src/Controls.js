/**
 * Created by Arthur on 08/02/2016.
 */

import d3 from 'd3';
import EventEmitter from 'events';
import { radius } from './constants'

class Controls extends EventEmitter {
    constructor (elem, total_frames) {
        super();
        this.elem = elem;
        this.currentframe = null;

        this.elem.select('.total').text(String(total_frames));

        elem.select('button[name="Previous"').on('click', () => { this.emit('previous'); });
        elem.select('button[name="Next"]').on('click', () => { this.emit('next'); });
        elem.select('input').on('change', () => {
            // d3 has a funny convention for dealing with events
            // the current event is accessible through the global d3.event
            const value = parseInt(d3.event.target.value, 10);
            this.emit('setframe', { value });
        })
            .attr('max', String(total_frames));
    }

    render(frame_number) {

        this.elem.select('input')
            .attr('disabled', null)
            .property('value', frame_number);

        this.elem.selectAll('button')
            .attr('disabled', null);
    }
}

export default Controls;
