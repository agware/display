/**
 * Created by war434 on 12/01/2017.
 */

function initCurtain(ballRadius, dotsNum) {
    const curtainNum = 2*dotsNum;

    d3.select('#ballContainer').append('g')
        .attr('id', 'curtainContainer')
        .selectAll('circle')
        .data(d3.range(curtainNum)).enter()
        .append('circle')
        .attr('r', ballRadius)
        .attr('id', function(d) {return 'curtain' + d; })
        .classed('shadow', true);

    updateDrag();
}

function updateCurtain(a, u) {

    u = u || 0;

    var curtainNum = d3.select('#curtainContainer').selectAll('circle').size();

    for (var i = 0; i < curtainNum; i++) {
        var t = i/2;
        d3.select('#curtain' + i)
            .transition()
            .duration(750)
            .attr('cx', u*t + (1/2)*a*Math.pow(t, 2));
    }
}

function updateDistCurtain(a, u, x) {

    var curtainNum = d3.select('#curtainContainer').selectAll('circle').size();

    for (var i = 0; i < curtainNum; i++) {
        var t = i/2;
        var cx = u*t + (1/2)*a*Math.pow(t, 2);
        var v = u + a*t;
        d3.select('#curtain' + i)
            .transition()
            .duration(750)
            .attr('cx', cx);

        d3.select('#curtain' + i).classed('hidden', (x < cx || cx < 0 || v < 0));
    }

}