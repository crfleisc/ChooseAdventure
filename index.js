import React from 'react';
import ReactDOM from 'react-dom';
import {pages} from './story.js';

const PAGENUM = 0;
const STORY = 1;
const HASPIC = 2;
const PIC = 3;
const END = 4;
const NUMOP = 5;
const OPT1 = 6;
const OPT1GOTO = 7;
const OPT2 = 8;
const OPT2GOTO = 9;
const OPT3 = 10;
const OPT3GOTO = 11;

const images = require.context('./img', true);

//(int pageNum, String pic, String story, int end, String op1, 
//     int op1GoTo, String op2, int op2GoTo, String op3, int op3GoTo)

class Reader extends React.Component {
    constructor() {
        super();
        this.state =  {
            pageNum: pages[1][PAGENUM],
            hasPic: pages[1][HASPIC],
            pic: pages[1][PIC],
            story: pages[1][STORY],
            end: pages[1][END],
            numOptions: pages[1][NUMOP],
            option1: pages[1][OPT1],
            option1GoTo: pages[1][OPT1GOTO],
            option2: pages[1][OPT2],
            option2GoTo: pages[1][OPT2GOTO],
            option3: pages[1][OPT3],
            option3GoTo: pages[1][OPT3GOTO],
            img: images('./' + pages[1][PIC]),
        }
    }
    render(){
        let choose = (choice) => {
            this.setState(  
                {
                    pageNum: pages[choice][PAGENUM],
                    hasPic: pages[choice][HASPIC],
                    pic: pages[choice][PIC],
                    story: pages[choice][STORY],
                    end: pages[choice][END],
                    numOptions: pages[choice][NUMOP],
                    option1: pages[choice][OPT1],
                    option1GoTo: pages[choice][OPT1GOTO],
                    option2: pages[choice][OPT2],
                    option2GoTo: pages[choice][OPT2GOTO],
                    option3: pages[choice][OPT3],
                    option3GoTo: pages[choice][OPT3GOTO],
                    img: images('./' + pages[choice][PIC]),
                }
            );
        }

        if(this.state.numOptions === 0 && this.state.end === 1) // ending
            return(oneOption(this.state));

        else if(this.state.end === 2) //ending with option to continue
            return (twoOptions(this.state));

        else if(this.state.numOptions === 1)
            return (oneOption(this.state));

        else if(this.state.numOptions === 2)
            return (twoOptions(this.state));

        else if(this.state.numOptions === 3)
            return (threeOptions(this.state));

        else
            return ('INVALID NUMBER OF OPTIONS: ' + this.state.numOptions);
        
        function oneOption(state){
            return(
                <div class='container-fluid bg-light'>
                        <div>
                            {state.pageNum}
                        </div>
                    <div class='container-fluid'>
                        <img src={state.img} class='mt-3 mx-auto d-block' 
                        style={{maxWidth: 280}} alt='storyPic'></img>
                    </div>
                    <div class='row'>
                        <div class='col-2'>
                        </div>
                        <div class='col'>
                            <p> {state.story}</p>
                        </div>
                        <div class='col-2'>
                        </div>
                    </div>

                    <button class='mx-auto d-block my-3'
                    id="option1"
                    type="button"
                    onClick={() => choose(state.option1GoTo)}
                    >{state.option1}</button>
                </div>
            )
        }
        
        function twoOptions(state){
            return(
                <div class='container-fluid bg-light'>
                    <div>
                        {state.pageNum}
                    </div>
                    <div class='container-fluid bg-light'>
                        <img src={state.img} class='mx-auto d-block' 
                        style={{maxWidth: 280}}alt='storyPic'></img>
                    </div>
                    <div class='row'>
                        <div class='col-2'>
                        </div>
                        <div class='col'>
                            <p> {state.story}</p>
                            <div class="btn-group">
                                <button
                                id="option1"
                                type="button"
                                onClick={() => choose(state.option1GoTo)}
                                >{state.option1}</button>
                                <button
                                id="option2"
                                type="button"
                                onClick={() => choose(state.option2GoTo)}
                                >{state.option2}</button>
                            </div>
                        </div>
                        <div class='col-2'>
                        </div>
                    </div>
                </div>
            )
        }
        

        function threeOptions(state){
            return(
                <div class='container-fluid bg-light'>
                    <div>
                        {state.pageNum}
                    </div>
                    <div class='container-fluid bg-dark'>
                        <img src={state.img} class='mx-auto d-block' alt='storyPic'></img>
                    </div>
                    <div class='row'>
                        <div class='col-2'>
                        </div>
                        <div class='col'>
                            <p> {state.story}</p>
                            <div class="btn-group mx-auto">
                                <button
                                id="option1"
                                type="button"
                                onClick={() => choose(state.option1GoTo)}
                                >{state.option1}</button>
                                <button
                                id="option2"
                                type="button"
                                onClick={() => choose(state.option2GoTo)}
                                >{state.option2}</button>
                                <button
                                id="option3"
                                type="button"
                                onClick={() => choose(state.option3GoTo)}
                                >{state.option3}</button>
                            </div>
                        </div>
                        <div class='col-2'>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

ReactDOM.render(<Reader />, document.getElementById('root'));


