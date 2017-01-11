/**
 * Created by war434 on 10/01/2017.
 */

function initTrigRadio(g) {

    initRadio(g, ['sin', 'cos', 'tan']);

    d3.select('#sinRadio').on('click', clickSin);
    d3.select('#cosRadio').on('click', clickCos);
    d3.select('#tanRadio').on('click', clickTan);
}

function clickSin() {
    d3.select('#radiosin').selectAll('circle').classed('active', false);
    d3.select('#sinRadio').classed('active', true);

    d3.select('#triangle').selectAll('text').style('fill', 'rgba(0, 0, 0, 1)');
    d3.select('#textX').style('fill', 'rgba(0, 0, 0, 0)');

    updateEqVars();
    moveFormulaToTop('sin');

    updateFormula();
    if (d3.select('#numbersRadio').classed('active')) {
        updateNumbers();
    }
}

function clickCos() {
    d3.select('#radiosin').selectAll('circle').classed('active', false);
    d3.select('#cosRadio').classed('active', true);

    d3.select('#triangle').selectAll('text').style('fill', 'rgba(0, 0, 0, 1)');
    d3.select('#textY').style('fill', 'rgba(0, 0, 0, 0)');

    updateEqVars();
    moveFormulaToTop('cos');

    updateFormula();
    if (d3.select('#numbersRadio').classed('active')) {
        updateNumbers();
    }
}

function clickTan() {
    d3.select('#radiosin').selectAll('circle').classed('active', false);
    d3.select('#tanRadio').classed('active', true);

    d3.select('#triangle').selectAll('text').style('fill', 'rgba(0, 0, 0, 1)');
    d3.select('#textVel').style('fill', 'rgba(0, 0, 0, 0)');

    updateEqVars();
    moveFormulaToTop('tan');

    updateFormula();
    if (d3.select('#numbersRadio').classed('active')) {
        updateNumbers();
    }
}

function moveFormulaToTop(name) {
    var formula = d3.select('#formulaContainer').datum();
    var index = -1;

    for (var i = 0; i < formula.length; i++) {
        console.log(formula[i][4]);
        if (formula[i][0] == name || formula[i][4] == name) {
            index = i;
            break;
        }
    }

    if (index != 0) {
        for (var j = 0; j < formula[0].length; j++) {
            var temp = formula[0][j];
            formula[0][j] = formula[index][j];
            formula[index][j] = temp;
        }
    }
}