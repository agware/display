/**
 * Created by war434 on 10/01/2017.
 */

function initFormula(g, formula, textGap) {

    const formulaOffset = {'x': 230, 'y': 70};
    const fontSize = 50;

    g.append('g')
        .attr('transform', 'translate(' + formulaOffset.x + ',' + formulaOffset.y + ')')
        .attr('id', 'formulaContainer')
        .datum(formula);

    formula = formula[0].constructor === Array ? formula[0] : formula;
    for (var i = 0; i < formula.length; i++) {
        var id = '#formulaContainer' + (i ? i-1 : '');
        d3.select(id).append('g')
            .attr('transform', 'translate(' + textGap[i] + ',0)')
            .attr('id', 'formulaContainer' + i)
            .datum(textGap[i]);
        d3.select('#formulaContainer' + i).append('text')
            .attr('id', 'formula' + i)
            .style('font-size', fontSize + 'px');
    }
}

function initFormulaRadio(g) {

    initRadio(g, ['formula', 'numbers']);

    if (d3.select('#formulaRadio').classed('active')) {
        updateFormula();
    } else {
        updateNumbers();
    }

    d3.select('#formulaRadioSelect').on('click', clickFormula);
    d3.select('#numbersRadioSelect').on('click', clickNumbers);
}

function clickFormula() {
    d3.select('#formulaRadio').classed('active',true);
    d3.select('#numbersRadio').classed('active', false);

    updateFormula();
}

function clickNumbers() {
    d3.select('#numbersRadio').classed('active',true);
    d3.select('#formulaRadio').classed('active', false);

    updateNumbers();
}

function updateFormula() {
    var formula = d3.select('#formulaContainer').datum();
    formula = formula[0].constructor === Array ? formula[0] : formula;
    for (var m = 0; m < formula.length; m++) {
        var temp = d3.select('#formulaContainer' + m).datum();
        d3.select('#formulaContainer' + m).attr('transform', 'translate(' + temp + ',0)');
        d3.select('#formula' + m).text(formula[m]);
    }
}

function updateNumbers(t, changingVar) {

    t = t || 0;
    changingVar = changingVar || 0;

    for (var i = 0; i < eqVars.length; i++) {
        if (eqVars[i].name.indexOf('2') >= 0) {
            changingVar = (eqVars[i].name == 'v2' && changingVar == 0) ? eqVars[i-1].active / scalingFactor : changingVar;
            var index = matchToFormula(eqVars[i].name.substring(0,1));
            d3.select('#formula' + index).text(Math.floor(changingVar));
        } else {
            var index = matchToFormula(eqVars[i].name);
            if (eqVars[i].name == 'h' || eqVars[i].name == 'θ') {
                var text = Math.round(eqVars[i].active*10)/10;
                d3.select('#formula' + index).text(text);
                var textGap = 27*(text.toString().length);
                d3.select('#formulaContainer' + (index+1)).attr('transform', 'translate(' + textGap + ',0)');
            } else {
                d3.select('#formula' + index).text(Math.floor(eqVars[i].active / scalingFactor));
            }
        }
    }

    var index = matchToFormula('t');
    while (index >= 0) {
        d3.select('#formula' + index).text(t);
        index = matchToFormula('t', index+1);
    }
}

function matchToFormula(name, startAt) {

    startAt = startAt || 0;

    var formula = d3.select('#formulaContainer').datum();
    formula = formula[0].constructor === Array ? formula[0] : formula;
    return formula.indexOf(name, startAt);
}