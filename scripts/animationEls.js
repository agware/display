/**
 * Created by war434 on 9/01/2017.
 */

function initBall(ballRadius) {

    d3.select('#ballContainer').append('circle')
        .attr('r', ballRadius)
        .attr('id', 'ball')
        .style('fill-opacity', 0)
        .transition()
        .duration(500)
        .style('fill-opacity', 1);
}

function resetBall(animation) {
    d3.select('#ball')
        .style('fill-opacity', 0)
        .attr('cx', 0)
        .transition()
        .duration(500)
        .style('fill-opacity', 1);
    animation.mem = 0;

    if (d3.select('#numbersRadio').classed('active')) {
        updateNumbers();
    }
}

function initDots(num, arrow) {

    arrow = arrow || false;

    const dots = {'r': 8, 'offset': 60};
    const arrowOffset = 10;

    d3.select('#ballContainer').append('g')
        .attr('transform', 'translate(0,' + (-dots.offset) + ')')
        .attr('id', 'dots');
    d3.select('#dots').selectAll('g')
        .data(d3.range(num))
        .enter().append('g')
        .attr('id', function(d) {return 'dots' + d; });

    for(var j = 0; j < num; j++) {
        d3.select('#dots' + j).append('circle')
            .attr('r', dots.r)
            .style('fill', '#000');

        if (arrow) {
            d3.select('#dots' + j).append('line')
                .attr('id', 'dotLineBody' + j);
            d3.select('#dots' + j).append('g')
                .attr('id', 'arrowHead' + j)
                .selectAll('line')
                .data(d3.range(2))
                .enter().append('line')
                .attr('x2', -arrowOffset)
                .attr('y2', function(d) {return (d ? -1 : 1) * arrowOffset; });
        }

        var dotText = [{'x': -20, 'y': -20, 'id': 'topText' + j},
            {'x': -5, 'y': 2*dots.offset, 'id': 'bottomText' + j}];
        d3.select('#dots' + j).selectAll('text')
            .data(dotText)
            .enter().append('text')
            .attr('x', function(d) {return d.x; })
            .attr('y', function(d) {return d.y; })
            .attr('id', function(d) {return d.id});
    }

    updateDots();
}