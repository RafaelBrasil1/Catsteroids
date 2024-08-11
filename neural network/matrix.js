"use strict";

/*****************************
  MATRIX FUNCTIONS
******************************/
class Matrix {
    constructor({ rows, cols, data = [] }) {
        this._rows = rows;
        this._cols = cols
        this._data = data


        if (data == null || data.length == 0) {
            this._data = [];
            for (let i = 0; i < this._rows; i++) {
                this._data[i] = [];
                for (let j = 0; j < this._cols; j++) {
                    this._data[i][j] = 0
                }
            }
        } else {
            if (data.length != rows || data[0].length != cols) {
                throw Error("Incorrect data dimensions!")
            }
        }


    }

    get rows() {
        return this._rows
    }
    get cols() {
        return this._cols
    }
    get data() {
        return this._data
    }

    //check matrix dimension
    static checkDimensions(m0, m1) {
        if (m0.rows != m1.rows || m0.cols != m1.cols) {
            throw Error("Matrix dimensions do not match!");
        }
    }

    /*
    Operations
    */


    //add matrices
    static add(m0, m1) {
        Matrix.checkDimensions(m0, m1);
        let m = new Matrix({
            rows: m0.rows,
            cols: m0.cols
        });

        for (let i = 0; i < m.rows; i++) {
            for (let j = 0; j < m.cols; j++) {
                m.data[i][j] = m0.data[i][j] + m1.data[i][j]
            }
        }
        return m
    }

    //subtract matrices

    static subtract(m0, m1) {
        Matrix.checkDimensions(m0, m1);
        let m = new Matrix({
            rows: m0.rows,
            cols: m0.cols
        });

        for (let i = 0; i < m.rows; i++) {
            for (let j = 0; j < m.cols; j++) {
                m.data[i][j] = m0.data[i][j] - m1.data[i][j]
            }
        }
        return m
    }

    //multiply matrices (not dot product)

    static multiply(m0, m1) {
        Matrix.checkDimensions(m0, m1);
        let m = new Matrix({
            rows: m0.rows,
            cols: m0.cols
        });

        for (let i = 0; i < m.rows; i++) {
            for (let j = 0; j < m.cols; j++) {
                m.data[i][j] = m0.data[i][j] * m1.data[i][j]
            }
        }
        return m
    }

    //dot product (for real this time)
    static dot(m0, m1) {
        if (m0.cols !== m1.rows) {
            throw new Error("Matrix dimensions are not compatible for dot product");
        }

        let m = new Matrix({
            rows: m0.rows,
            cols: m1.cols,
        });

        for (let i = 0; i < m.rows; i++) {
            for (let j = 0; j < m.cols; j++) {
                let sum = 0;
                for (let k = 0; k < m0.cols; k++) {
                    sum += m0.data[i][k] * m1.data[k][j];
                }
                m.data[i][j] = sum;
            }
        }

        return m;
    }


    // convert array to one-row matrix
    static arrayToMatrix(arr) {
        return new Matrix({
            rows: 1,
            cols: arr.length,
            data: [arr]
        })
    }


    // apply given function to each cell of matrix
    static map(m0, mFunction) {
        let m = new Matrix({
            rows: m0.rows,
            cols: m0.cols,
        });

        for (let i = 0; i < m.rows; i++) {
            for (let j = 0; j < m.cols; j++) {
                m.data[i][j] = mFunction(m0.data[i][j]);
            }
        }
        return m
    }

    //find transpose of given matrix (switch rows / cols)

    static transpose(m0){
        let m = new Matrix({
            rows: m0.cols,
            cols: m0.rows,
        });

        for (let i = 0; i < m0.rows; i++) {
            for (let j = 0; j < m0.cols; j++) {
                m.data[j][i] = m0.data[i][j]
            }
        }
        return m
    }
    







    //weight between 1 and -1
    randomWeight() {
        for (let i = 0; i < this._rows; i++) {
            for (let j = 0; j < this._cols; j++) {
                this._data[i][j] = Math.random() * 2 - 1
            }
        }
    }




}

