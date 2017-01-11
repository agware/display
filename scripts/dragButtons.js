/**
 * Created by war434 on 9/01/2017.
 */

function initDrag(g) {

    const fixedBallRadius = 20;
    const dragBallRadius = fixedBallRadius - 5;
    const dragOffset = {'x': fixedBallRadius + 5, 'gap': 70, 'accText': 20, 'dragBall': 5, 'arrow': 10, 'shift': 3};

    for (var n = 0; n < eqVars.length; n++) {
        g.append('g')
            .attr('transform', 'translate(' + dragOffset.x + ',' + (n * dragOffset.gap) + ')')
            .attr('id', eqVars[n].name + 'Container');
        d3.select('#' + eqVars[n].name + 'Container').append('text')
            .attr('x', -fixedBallRadius)
            .attr('y', (-3 / 2) * dragOffset.accText)
            .attr('id', eqVars[n].name + 'Text');
        d3.select('#' + eqVars[n].name + 'Container').append('line')
            .attr('id', eqVars[n].name + 'LineBody');
        d3.select('#' + eqVars[n].name + 'Container').append('g')
            .attr('id', eqVars[n].name + 'DraggableContainer');
        d3.select('#' + eqVars[n].name + 'DraggableContainer').selectAll('line')
            .data(d3.range(2))
            .enter().append('line')
            .attr('x2', -dragOffset.arrow)
            .attr('y2', function (d) {
                return (d ? -1 : 1) * dragOffset.arrow
            });
        d3.select('#' + eqVars[n].name + 'DraggableContainer').append('circle')
            .attr('cx', -dragOffset.arrow + dragOffset.shift)
            .attr('r', dragBallRadius)
            .attr('id', eqVars[n].name + 'DragBall')
            .style('fill-opacity', 0.2)
            .classed('clickable', true)
            .call(d3.drag()
                .on('start', dragStart)
                .on('drag', dragUpdate)
                .on('end', dragEnd));
        d3.select('#' + eqVars[n].name + 'Container').append('circle')
            .attr('r', fixedBallRadius);

        updateDrag(n);
    }

    d3.select('#' + eqVars[0].name + 'DragBall')

}

function dragStart() {
    d3.select(this).classed('active', true);
}

function dragUpdate() {
    var id = d3.select(this).attr('id');
    id = id.substring(0, id.length - 8);
    var lim = {'min': 45, 'max': controlWidth-40};
    var index = -1;

    for (var i = 0; i < eqVars.length; i++) {
        if (id == eqVars[i].name) {
            index = i;
            eqVars[index].active = Math.max(Math.min(d3.event.x+eqVars[index].active, lim.max), lim.min);
        }
    }

    updateDrag(index);
    if (d3.select('#numbersRadio').classed('active')) updateNumbers();
    updateDots(index);
}

function dragEnd() {
    d3.select(this).classed('active', false);
}