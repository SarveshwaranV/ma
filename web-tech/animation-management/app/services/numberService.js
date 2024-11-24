angular.module('gridApp').service('numberService', function () {
    this.generateGrid = function (rows, cols) {
        const grid = [];
        for (let i = 0; i < rows * cols; i++) {
            grid.push(Math.floor(Math.random() * 100));
        }
        return grid;
    };
});
