let log_On = true;
let log_freq = 10000;


class NeuralNetwork {
    constructor({ numInputs, numHidden, numOutput }) {
        this._hidden = [];
        this._input = []
        this._numInputs = numInputs;
        this._numHidden = numHidden;
        this._numOutput = numOutput;

        this._bias0 = new Matrix({
            rows: 1,
            cols: this._numHidden
        });

        this._bias1 = new Matrix({
            rows: 1,
            cols: this._numOutput
        });

        this._weights0 = new Matrix({
            rows: this._numInputs,
            cols: this._numHidden
        });

        this._weights1 = new Matrix({
            rows: this._numHidden,
            cols: this._numOutput
        });

        //randomize inital weights
        this._bias0.randomWeight();
        this._bias1.randomWeight();
        this._weights0.randomWeight();
        this._weights1.randomWeight();


        //error logs
        this.log_count = log_freq;

    }

    //input
    get input() {
        return this._input;
    }

    set input(value) {
        this._input = value;
    }

    //hidden
    get hidden() {
        return this._hidden;
    }

    set hidden(value) {
        this._hidden = value;
    }

    //weight0
    get weights0() {
        return this._weights0;
    }

    set weights0(value) {
        this._weights0 = value;
    }

    //weight1
    get weights1() {
        return this._weights1;
    }

    set weights1(value) {
        this._weights1 = value;
    }

    //bias0
    get bias0() {
        return this.bias0;
    }

    set bias0(value) {
        this._bias0 = value;
    }

    //bias1
    get bias1() {
        return this.bias1;
    }

    set bias1(value) {
        this._bias1 = value;
    }


    FeedForward(inputArray) {
        this.input = Matrix.arrayToMatrix(inputArray);


        this.hidden = Matrix.dot(this.input, this._weights0);
        this.hidden = Matrix.add(this.hidden, this._bias0) //apply bias
        this.hidden = Matrix.map(this.hidden, x => Sigmoid(x));


        let output = Matrix.dot(this.hidden, this._weights1);
        output = Matrix.add(output, this._bias1) //apply bias
        output = Matrix.map(output, x => Sigmoid(x))


        return output;

    }


    Train(inputArray, targetArray) {
        let output = this.FeedForward(inputArray);


        let target = Matrix.arrayToMatrix(targetArray);
        let outputError = Matrix.subtract(target, output);
        if(log_On){
            if(this.log_count == log_freq){
                console.log("error: " + outputError.data[0][0])
                this.log_count = 0;
            }else{
                this.log_count ++;
            }
        }



        let outputDerivs = Matrix.map(output, x => Sigmoid(x, true));
        let outputDeltas = Matrix.multiply(outputError, outputDerivs);




        let weights1Trans = Matrix.transpose(this.weights1);
        let hiddenErrors = Matrix.dot(outputDeltas, weights1Trans);


        let hiddenDerivs = Matrix.map(this.hidden, x => Sigmoid(x, true));
        let hiddenDeltas = Matrix.multiply(hiddenErrors, hiddenDerivs);


        let hiddenTrans = Matrix.transpose(this.hidden);
        this.weights1 = Matrix.add(this.weights1, Matrix.dot(hiddenTrans, outputDeltas));

        let inputTrans = Matrix.transpose(this.input);
        this.weights0 = Matrix.add(this.weights0, Matrix.dot(inputTrans, hiddenDeltas));

        //updt bias
        this._bias1 = Matrix.add(this._bias1, outputDeltas);
        this._bias0 = Matrix.add(this._bias0, hiddenDeltas);



    }





}

