/**
 * Created by war434 on 10/01/2017.
 */

function initRadio(g, ids) {

    const radioOffset = {'x': 30, 'button': 50, 'textX': 20, 'textY': 4};
    const radioRadius = 15;

    g.append('g')
        .attr('transform', 'translate(' + radioOffset.x + ',0)')
        .attr('id', 'radio' + ids[0]);
    for (var m = 0; m < ids.length; m++) {
        d3.select('#radio' + ids[0]).append('circle')
            .attr('cy', radioOffset.button * m)
            .attr('r', radioRadius)
            .attr('id', ids[m] + 'Radio')
            .style('fill', '#8db6be')
            .classed('active', !m)
            .classed('clickable', true);
        d3.select('#radio' + ids[0]).append('text')
            .attr('x', radioOffset.textX)
            .attr('y', radioOffset.button * m + radioOffset.textY)
            .text(ids[m]);
    }
}