/**
 * The vision
 * Junming He
 * use left mouse button to interact 
 */

"use strict";


//eyeFrame value
let upperEyeFrame = {
    x1: 100,
    y1: 290,
    x2: 230,
    y2: 130,
    x3: 490,
    y3: 130,
    x4: 620,
    y4: 350,

    //color
    color: {
        R: 217,
        G: 136,
        B: 58
    },

    //stroke weight
    lineWeight: 2
}

let lowerEyeFrame = {
    x1: 100,
    y1: 289,
    x2: 230,
    y2: 490,
    x3: 490,
    y3: 490,
    x4: 620,
    y4: 349,

    //default color
    color: {
        R: 217,
        G: 136,
        B: 58
    }
}

// eyelid value
let upperEyelid = {
    x1: 100,
    y1: 290,
    x2: 230,
    y2: 180,
    x3: 490,
    y3: 180,
    x4: 620,
    y4: 350,
    color: 255,
    divideNumber: 1 / 100,
    widthDivideNumber: 100,
    closeSpeed: 1,
    openSpeed: -3

}

let lowerEyelid = {
    x1: 100,
    y1: 289,
    x2: 230,
    y2: 460,
    x3: 490,
    y3: 460,
    x4: 620,
    y4: 349,
    divideNumber: 1 / 100,
    widthDivideNumber: 100,
    closeSpeed: -1,
    openSpeed: 3
}

//eye sclera value 
let upperEyeSclera = {
    x1: 100,
    y1: 290,
    x2: 230,
    y2: 180,
    x3: 490,
    y3: 180,
    x4: 620,
    y4: 350,
    color: 255,

}

let lowerEyeSclera = {
    x1: 100,
    y1: 289,
    x2: 230,
    y2: 460,
    x3: 490,
    y3: 460,
    x4: 620,
    y4: 349,
    color: 255
}

//close and open temporary eyelid
let tmpUpperEyelid = {
    x1: 100,
    y1: 290,
    x2: 230,
    y2: 180,
    x3: 490,
    y3: 180,
    x4: 620,
    y4: 350,
    closeSpeed: 2,
    openSpeed: -5,
    closeActive: undefined,
    openActive: undefined
}

let tmpLowerEyelid = {
    x1: 100,
    y1: 289,
    x2: 230,
    y2: 460,
    x3: 490,
    y3: 460,
    x4: 620,
    y4: 349,
    closeSpeed: -2,
    openSpeed: 5,
    closeActive: undefined,
    openActive: undefined
}

//eyelash value
let eyeLashes = {
    size: 3,
    R: 0,
    G: 0,
    B: 0,

    upperX_offset: -8,
    upperY_offset: -15,
    lowerX_offset: -10,
    lowerY_offset: 10,

    upperDivideNumber: 1 / 50,
    lowerDivideNumber: 1 / 25,

    AnimationOrNot: undefined,

    upperAnimationDivide: 50,
    lowerAnimationDivide: 25,

    upperGrowSpeedX: -0.5,
    upperGrowSpeedY: -1.2,
    lowerGrowSpeedX: -0.5,
    lowerGrowSpeedY: 0.5,

    upperVelocityX: 0,
    upperVelocityY: 0,
    lowerVelocityX: 0,
    lowerVelocityY: 0


}

//eye lris value
let eyeLris = {
    x: 360,
    y: 317,
    size: 110,
    R: 73,
    G: 60,
    B: 46
}

//eye pupil value
//pupil position should follow the Lris
let eyePupil = {
    size: 60,
    R: 0,
    G: 0,
    B: 0
}

//background color
let backgroundColor = {
    R: 100,
    G: 100,
    B: 100
}

//mouseClik value
let isMouseCliked = undefined;
let isAnimationFinish = undefined;

//left edge and right edge 
let edgeData = {

    leftEdge: undefined,
    rightEdge: undefined,
    shouldRenewData: undefined,
    minDisatance: 1,
    divideNumber: 1 / 1000,
    intersectionNumber: 0,

    x1: undefined,
    y1: undefined,
    x2: undefined,
    y2: undefined
}

/*
 *array to storage the bezierPoint
 */

//only collect once
let collectPoint = undefined;

//upper
let upperArrayX = [];
let upperArrayY = [];

//lower
let lowerArrayX = [];
let lowerArrayY = [];



//map
let colorMix = 0;



function setup() {
    createCanvas(720, 640);

    //mouse default setting
    isMouseCliked = false;
    isAnimationFinish = true;

    //edge detect setting
    edgeData.shouldRenewData = true;

    //eyelips open and close state default setting
    tmpUpperEyelid.closeActive = false;
    tmpUpperEyelid.openActive = false;
    tmpLowerEyelid.closeActive = false;
    tmpLowerEyelid.openActive = false;

    //eyealshes animation default statement 
    eyeLashes.AnimationOrNot = false;

    //collectPoints
    collectPoint = true;

}


function draw() {
    background(backgroundColor.R, backgroundColor.G, backgroundColor.B);



    //map()
    colorMix = map(mouseX, 0, width, -10, 50);


    //only happen once
    if (collectPoint) {

        //collect all the upper eyelashes point(x,y) should be 50
        for (let i = 0; i < 1; i += eyeLashes.upperDivideNumber) {

            let upperTmpX = bezierPoint(upperEyelid.x1, upperEyelid.x2, upperEyelid.x3, upperEyelid.x4, i);
            let upperTmpY = bezierPoint(upperEyelid.y1, upperEyelid.y2, upperEyelid.y3, upperEyelid.y4, i);
            upperArrayX.push(upperTmpX);
            upperArrayY.push(upperTmpY);
        }


        //collect all the lower eyelashes point(x,y) should be 25 
        for (let i = 0; i < 1; i += eyeLashes.lowerDivideNumber) {
            let lowerTmpX = bezierPoint(lowerEyelid.x1, lowerEyelid.x2, lowerEyelid.x3, lowerEyelid.x4, i);
            let lowerTmpY = bezierPoint(lowerEyelid.y1, lowerEyelid.y2, lowerEyelid.y3, lowerEyelid.y4, i);
            lowerArrayX.push(lowerTmpX);
            lowerArrayY.push(lowerTmpY);
        }

        collectPoint = false;
    }



    /**
     * calculate the left and right edge point
     * I add or subtract some number because of the accuracy, it won't prefectly parallel, don't know why 
     */

    if (edgeData.shouldRenewData) {
        for (let i = 0; i < 1; i += edgeData.divideNumber) {
            let upperTmpX = bezierPoint(upperEyelid.x1, upperEyelid.x2, upperEyelid.x3, upperEyelid.x4, i);
            let upperTmpY = bezierPoint(upperEyelid.y1 + eyeLris.size / 2 + 6, upperEyelid.y2 + eyeLris.size / 2 + 3, upperEyelid.y3 + eyeLris.size / 2 + 5, upperEyelid.y4 + eyeLris.size / 2 + 16, i);


            for (let j = 0; j < 1; j += edgeData.divideNumber) {
                let lowerTmpX = bezierPoint(lowerEyelid.x1, lowerEyelid.x2, lowerEyelid.x3, lowerEyelid.x4, j);
                let lowerTmpY = bezierPoint(lowerEyelid.y1 - eyeLris.size / 2 - 25, lowerEyelid.y2 - eyeLris.size / 2 - 7, lowerEyelid.y3 - eyeLris.size / 2 - 5, lowerEyelid.y4 - eyeLris.size / 2 - 10, j);

                let d = dist(upperTmpX, upperTmpY, lowerTmpX, lowerTmpY);

                if (d < edgeData.minDisatance && edgeData.intersectionNumber == 0) {
                    edgeData.x1 = upperTmpX;
                    edgeData.y1 = upperTmpY;
                    edgeData.intersectionNumber += 1;


                    //debug
                    // console.log("x1");
                    // console.log(d);
                    // console.log(upperTmpX);
                    // console.log(upperTmpY);
                    // console.log(lowerTmpX);
                    // console.log(lowerTmpY);
                    // console.log("-------------")
                }
                else if (d < edgeData.minDisatance && edgeData.intersectionNumber == 1) {
                    edgeData.x2 = upperTmpX;
                    edgeData.y2 = upperTmpY;

                    let tmpX = abs(edgeData.x1 - edgeData.x2);

                    if (tmpX < 10) {
                        continue;
                    }
                    else {
                        if (edgeData.x1 < edgeData.x2) {
                            edgeData.intersectionNumber += 1;
                        }
                        else {
                            let tmpDataX = edgeData.x1;
                            let tmpDataY = edgeData.y1;

                            //exchange the x1,y1 and x2,y2
                            edgeData.x1 = edgeData.x2;
                            edgeData.y1 = edgeData.y2;
                            edgeData.x2 = tmpDataX;
                            edgeData.y2 = tmpDataY;

                            edgeData.intersectionNumber += 1;
                        }


                        //debug
                        // console.log("x2");
                        // console.log(d);
                        // console.log(upperTmpX);
                        // console.log(upperTmpY);
                        // console.log(lowerTmpX);
                        // console.log(lowerTmpY);
                        // console.log("-------------")
                    }
                }
                //check if already got 2 data
                if (edgeData.intersectionNumber == 2) {
                    break;
                }

            }

            //check if already got 2 data
            if (edgeData.intersectionNumber == 2) {
                break;
            }
        }
        edgeData.shouldRenewData = false;
        edgeData.intersectionNumber = 0;
    }

    //-----------------------------------------------------------



    //Draw eye sclera
    beginShape();
    fill(240);
    noStroke();

    //Upper edge
    vertex(upperEyeSclera.x1, upperEyeSclera.y1);
    bezierVertex(upperEyeSclera.x2, upperEyeSclera.y2, upperEyeSclera.x3, upperEyeSclera.y3, upperEyeSclera.x4, upperEyeSclera.y4);

    //lower edge
    vertex(upperEyeSclera.x4, upperEyeSclera.y4);
    bezierVertex(lowerEyeSclera.x3, lowerEyeSclera.y3, lowerEyeSclera.x2, lowerEyeSclera.y2, lowerEyeSclera.x1, lowerEyeSclera.y1);

    endShape(CLOSE);



    //-------------------------------------------------

    //Draw eye lris
    if (mouseX <= edgeData.x1) {
        eyeLris.x = edgeData.x1;
        eyeLris.y = edgeData.y1;
    }
    else if (mouseX >= edgeData.x2) {
        eyeLris.x = edgeData.x2;
        eyeLris.y = edgeData.y2;
    }
    else {
        if (mouseY >= 317) {

            //debug
            //bezier(lowerEyelid.x1, lowerEyelid.y1 - eyeLris.size / 2 - 25, lowerEyelid.x2, lowerEyelid.y2 - eyeLris.size / 2 - 7, lowerEyelid.x3, lowerEyelid.y3 - eyeLris.size / 2 - 5, lowerEyelid.x4, lowerEyelid.y4 - eyeLris.size / 2 - 10);


            for (let i = 0; i < 1; i += lowerEyelid.divideNumber) {
                let lowerTmpX = bezierPoint(lowerEyelid.x1, lowerEyelid.x2, lowerEyelid.x3, lowerEyelid.x4, i);
                let lowerTmpY = bezierPoint(lowerEyelid.y1 - eyeLris.size / 2 - 25, lowerEyelid.y2 - eyeLris.size / 2 - 7, lowerEyelid.y3 - eyeLris.size / 2 - 5, lowerEyelid.y4 - eyeLris.size / 2 - 10, i);

                const dx = mouseX - lowerTmpX;
                const dy = mouseY - lowerTmpY;

                if (dy > 0) {
                    if (abs(dx) <= width / lowerEyelid.widthDivideNumber) {
                        eyeLris.x = lowerTmpX;
                        eyeLris.y = lowerTmpY;
                        break;
                    }
                }
                else {
                    eyeLris.x = mouseX;
                    eyeLris.y = mouseY;
                }
            }
        }
        else {

            //debug
            //bezier(upperEyelid.x1, upperEyelid.y1 + eyeLris.size / 2 + 6, upperEyelid.x2, upperEyelid.y2 + eyeLris.size / 2 + 3, upperEyelid.x3, upperEyelid.y3 + eyeLris.size / 2 + 5, upperEyelid.x4, upperEyelid.y4 + eyeLris.size / 2 + 16);

            for (let i = 0; i < 1; i += upperEyelid.divideNumber) {
                let upperTmpX = bezierPoint(upperEyelid.x1, upperEyelid.x2, upperEyelid.x3, upperEyelid.x4, i);
                let upperTmpY = bezierPoint(upperEyelid.y1 + eyeLris.size / 2 + 6, upperEyelid.y2 + eyeLris.size / 2 + 3, upperEyelid.y3 + eyeLris.size / 2 + 5, upperEyelid.y4 + eyeLris.size / 2 + 16, i);

                const dx = mouseX - upperTmpX;
                const dy = mouseY - upperTmpY;

                if (dy < 0) {
                    if (abs(dx) <= width / upperEyelid.widthDivideNumber) {
                        eyeLris.x = upperTmpX;
                        eyeLris.y = upperTmpY;
                        break;
                    }
                }
                else {
                    eyeLris.x = mouseX;
                    eyeLris.y = mouseY;
                }
            }

        }
    }
    push();
    noStroke();
    fill(eyeLris.R, eyeLris.G, eyeLris.B);
    circle(eyeLris.x, eyeLris.y, eyeLris.size - 5); // -5 because the accuracy 
    pop();


    //-----------------------------------------------

    //draw eye pupil
    push();
    noStroke();
    fill(eyePupil.R, eyePupil.G, eyePupil.B);
    circle(eyeLris.x, eyeLris.y, eyePupil.size);
    pop();

    //----------------------------------------------


    /*
     * Draw eyeFrames and eyelid and eyelashes 
     */

    // upper part
    if (!isMouseCliked && isAnimationFinish) {
        beginShape();
        stroke(0);
        strokeWeight(upperEyeFrame.lineWeight);
        fill(upperEyeFrame.color.R, upperEyeFrame.color.G, upperEyeFrame.color.B);

        //upper eyeframe
        vertex(upperEyeFrame.x1, upperEyeFrame.y1);
        bezierVertex(upperEyeFrame.x2, upperEyeFrame.y2, upperEyeFrame.x3, upperEyeFrame.y3, upperEyeFrame.x4, upperEyeFrame.y4);

        //upper eyelid
        vertex(upperEyelid.x4, upperEyelid.y4);
        bezierVertex(upperEyelid.x3, upperEyelid.y3, upperEyelid.x2, upperEyelid.y2, upperEyelid.x1, upperEyelid.y1);

        endShape(CLOSE);

        // lower part 
        beginShape();
        stroke(0);
        strokeWeight(upperEyeFrame.lineWeight);
        fill(upperEyeFrame.color.R, upperEyeFrame.color.G, upperEyeFrame.color.B);

        //lower eyeframe
        vertex(lowerEyeFrame.x1, lowerEyeFrame.y1);
        bezierVertex(lowerEyeFrame.x2, lowerEyeFrame.y2, lowerEyeFrame.x3, lowerEyeFrame.y3, lowerEyeFrame.x4, lowerEyeFrame.y4);

        //lower eyelid
        vertex(lowerEyeFrame.x4, lowerEyeFrame.y4);
        bezierVertex(lowerEyelid.x3, lowerEyelid.y3, lowerEyelid.x2, lowerEyelid.y2, lowerEyelid.x1, lowerEyelid.y1);

        endShape(CLOSE);


        /**
         * Draw eyelashes
         * include animation statement and non animation statement
         * because the calculate speed is too fast, still figure out how to make it like an animation
         */


        if (!eyeLashes.AnimationOrNot) {

            push();
            stroke(eyeLashes.R, eyeLashes.G, eyeLashes.B);
            strokeWeight(eyeLashes.size);


            //upper eyelashes point (x,y)
            for (let i = 0; i < 1; i += eyeLashes.upperDivideNumber) {
                let upperTmpX = bezierPoint(upperEyelid.x1, upperEyelid.x2, upperEyelid.x3, upperEyelid.x4, i);
                let upperTmpY = bezierPoint(upperEyelid.y1, upperEyelid.y2, upperEyelid.y3, upperEyelid.y4, i);
                line(upperTmpX, upperTmpY, upperTmpX + eyeLashes.upperX_offset, upperTmpY + eyeLashes.upperY_offset);
            }


            //lower eyelashes point (x,y)
            for (let i = 0; i < 1; i += eyeLashes.lowerDivideNumber) {

                let lowerTmpX = bezierPoint(lowerEyelid.x1, lowerEyelid.x2, lowerEyelid.x3, lowerEyelid.x4, i);
                let lowerTmpY = bezierPoint(lowerEyelid.y1, lowerEyelid.y2, lowerEyelid.y3, lowerEyelid.y4, i);
                line(lowerTmpX, lowerTmpY, lowerTmpX + eyeLashes.lowerX_offset, lowerTmpY + eyeLashes.lowerY_offset);
            }
            pop();
        }

        else {


            for (let i = 0; i <= eyeLashes.upperAnimationDivide; i++) {


                push();
                stroke(eyeLashes.R, eyeLashes.G, eyeLashes.B);
                strokeWeight(eyeLashes.size);
                line(upperArrayX[i], upperArrayY[i], upperArrayX[i] + eyeLashes.upperVelocityX, upperArrayY[i] + eyeLashes.upperVelocityY);
                pop();

            }

            for (let j = 0; j <= eyeLashes.lowerAnimationDivide; j++) {

                push();
                stroke(eyeLashes.R, eyeLashes.G, eyeLashes.B);
                strokeWeight(eyeLashes.size);
                line(lowerArrayX[j], lowerArrayY[j], lowerArrayX[j] + eyeLashes.lowerVelocityX, lowerArrayY[j] + eyeLashes.lowerVelocityY);
                pop();
            }


            eyeLashes.upperVelocityX = constrain(eyeLashes.upperVelocityX, eyeLashes.upperX_offset, 0);
            eyeLashes.upperVelocityY = constrain(eyeLashes.upperVelocityY, eyeLashes.upperY_offset, 0);
            eyeLashes.upperVelocityX += eyeLashes.upperGrowSpeedX;
            eyeLashes.upperVelocityY += eyeLashes.upperGrowSpeedY;


            eyeLashes.lowerVelocityX = constrain(eyeLashes.lowerVelocityX, eyeLashes.lowerX_offset, 0);
            eyeLashes.lowerVelocityY = constrain(eyeLashes.lowerVelocityY, 0, eyeLashes.lowerY_offset);
            eyeLashes.lowerVelocityX += eyeLashes.lowerGrowSpeedX;
            eyeLashes.lowerVelocityY += eyeLashes.lowerGrowSpeedY;

            //debug
            // console.log("active true");
            // console.log("-----upper-----");
            // console.log(eyeLashes.upperVelocityX);
            // console.log(eyeLashes.upperVelocityY);
            // console.log("------lower----");
            // console.log(eyeLashes.lowerVelocityX);
            // console.log(eyeLashes.lowerVelocityY);



            if (eyeLashes.upperVelocityX <= eyeLashes.upperX_offset && eyeLashes.upperVelocityY <= eyeLashes.upperY_offset && eyeLashes.lowerVelocityX <= eyeLashes.lowerVelocityX && eyeLashes.lowerVelocityY >= eyeLashes.lowerY_offset) {

                eyeLashes.AnimationOrNot = false;
                eyeLashes.upperVelocityX = 0;
                eyeLashes.upperVelocityY = 0;
                eyeLashes.lowerVelocityX = 0;
                eyeLashes.lowerVelocityY = 0;

                //debug
                //console.log("active false");
            }
        }




    }

    //--------------------------------



    /**
     * mouse click situation 
     * 1.eyelashes disappear
     * 2.eyelips close
     */

    if (isMouseCliked || !isAnimationFinish) {
        //constrain upperEyelid
        tmpUpperEyelid.y2 = constrain(tmpUpperEyelid.y2, 180, 305.99);
        tmpUpperEyelid.y3 = constrain(tmpUpperEyelid.y3, 180, 335.99);

        //constrain lowerEyelip
        tmpLowerEyelid.y2 = constrain(tmpLowerEyelid.y2, 305.99, 460);
        tmpLowerEyelid.y3 = constrain(tmpLowerEyelid.y3, 335.99, 460);

        beginShape();
        stroke(0);
        strokeWeight(upperEyeFrame.lineWeight);
        fill(upperEyeFrame.color.R, upperEyeFrame.color.G, upperEyeFrame.color.B);

        //upper eyeframe
        vertex(upperEyeFrame.x1, upperEyeFrame.y1);
        bezierVertex(upperEyeFrame.x2, upperEyeFrame.y2, upperEyeFrame.x3, upperEyeFrame.y3, upperEyeFrame.x4, upperEyeFrame.y4);

        //upper eyelid
        vertex(upperEyeFrame.x4, upperEyeFrame.y4);
        bezierVertex(tmpUpperEyelid.x3, tmpUpperEyelid.y3, tmpUpperEyelid.x2, tmpUpperEyelid.y2, tmpUpperEyelid.x1, tmpUpperEyelid.y1);

        endShape(CLOSE);

        // lower part 
        beginShape();
        stroke(0);
        strokeWeight(upperEyeFrame.lineWeight);
        fill(upperEyeFrame.color.R, upperEyeFrame.color.G, upperEyeFrame.color.B);

        //lower eyeframe
        vertex(lowerEyeFrame.x1, lowerEyeFrame.y1);
        bezierVertex(lowerEyeFrame.x2, lowerEyeFrame.y2, lowerEyeFrame.x3, lowerEyeFrame.y3, lowerEyeFrame.x4, lowerEyeFrame.y4);

        //lower eyelid
        vertex(lowerEyeFrame.x4, lowerEyeFrame.y4);
        bezierVertex(tmpLowerEyelid.x3, tmpLowerEyelid.y3, tmpLowerEyelid.x2, tmpLowerEyelid.y2, tmpLowerEyelid.x1, tmpLowerEyelid.y1);

        endShape(CLOSE);

        if (tmpUpperEyelid.closeActive && tmpLowerEyelid.closeActive) {
            tmpUpperEyelid.y2 += tmpUpperEyelid.closeSpeed;
            tmpUpperEyelid.y3 += tmpUpperEyelid.closeSpeed;

            tmpLowerEyelid.y2 += tmpLowerEyelid.closeSpeed;
            tmpLowerEyelid.y3 += tmpLowerEyelid.closeSpeed;


            if (tmpUpperEyelid.y2 >= 305.99 && tmpUpperEyelid.y3 >= 335.99 && tmpLowerEyelid.y2 <= 305.99 && tmpLowerEyelid.y3 <= 335.99) {

                tmpUpperEyelid.openActive = true;
                tmpLowerEyelid.openActive = true;

                tmpUpperEyelid.closeActive = false;
                tmpLowerEyelid.closeActive = false;

                /**
                 * after the eyelip close, change some value 
                 */


                //eye lris(size, color)
                eyeLris.size = random(90, 120);
                eyeLris.R = random(50, 255) + colorMix;
                eyeLris.G = random(50, 255);
                eyeLris.B = random(50, 255);

                //eyepupil(size, color)
                eyePupil.size = random(40, 80);
                eyePupil.R = random(0, 255);
                eyePupil.G = random(0, 255) + colorMix;
                eyePupil.B = random(0, 255);

                //eye lid color 
                upperEyeFrame.color.R = random(0, 255);
                upperEyeFrame.color.G = random(0, 255);
                upperEyeFrame.color.B = random(0, 255) + colorMix;





                //debug
                //console.log(eyeLris.size);
                //console.log("active1");

            }


            //debug
            // console.log("--------------upper----------------");
            // console.log(tmpUpperEyelid.y2);
            // console.log(tmpUpperEyelid.y3);
            // console.log("--------------lower----------------");
            // console.log(tmpLowerEyelid.y2);
            // console.log(tmpLowerEyelid.y3);
        }

        //eyelip open
        if (tmpUpperEyelid.openActive && tmpLowerEyelid.openActive) {
            tmpUpperEyelid.y2 += tmpUpperEyelid.openSpeed;
            tmpUpperEyelid.y3 += tmpUpperEyelid.openSpeed;

            tmpLowerEyelid.y2 += tmpLowerEyelid.openSpeed;
            tmpLowerEyelid.y3 += tmpLowerEyelid.openSpeed;


            if (tmpUpperEyelid.y2 <= 180 && tmpUpperEyelid.y3 <= 180 && tmpLowerEyelid.y2 >= 460 && tmpLowerEyelid.y3 >= 460) {
                tmpUpperEyelid.openActive = false;
                tmpLowerEyelid.openActive = false;

                isAnimationFinish = true;
                isMouseCliked = false;
                eyeLashes.AnimationOrNot = true;

                //change the eyelashes color
                eyeLashes.R = random(0, 255);
                eyeLashes.G = random(0, 255) + colorMix;
                eyeLashes.B = random(0, 255);

                //change the background color
                backgroundColor.R = random(0, 255);
                backgroundColor.G = random(0, 255);
                backgroundColor.B = random(0, 255) + colorMix;


                //debug
                //console.log("end");
            }
            //debug
            //console.log("active2");
            //debug
            // console.log("--------------upper----------------");
            // console.log(tmpUpperEyelid.y2);
            // console.log(tmpUpperEyelid.y3);
            // console.log("--------------lower----------------");
            // console.log(tmpLowerEyelid.y2);
            // console.log(tmpLowerEyelid.y3);
        }




    }



    //----------------------------------------------------------------

    //debug
    // push();
    // noFill();
    // bezier(lowerEyelid.x1, lowerEyelid.y1 - eyeLris.size / 2 - 25, lowerEyelid.x2, lowerEyelid.y2 - eyeLris.size / 2 - 7, lowerEyelid.x3, lowerEyelid.y3 - eyeLris.size / 2 - 5, lowerEyelid.x4, lowerEyelid.y4 - eyeLris.size / 2 - 10);
    // bezier(upperEyelid.x1, upperEyelid.y1 + eyeLris.size / 2 + 6, upperEyelid.x2, upperEyelid.y2 + eyeLris.size / 2 + 3, upperEyelid.x3, upperEyelid.y3 + eyeLris.size / 2 + 5, upperEyelid.x4, upperEyelid.y4 + eyeLris.size / 2 + 16);
    // pop();
    // console.log("------------------mouseY----------------");
    // console.log(mouseY);
    // console.log("------------------mouseX----------------");
    // console.log(mouseX);

}


function mouseClicked() {
    if (isAnimationFinish) {

        isMouseCliked = true;
        isAnimationFinish = false;

        //eyelip state change 
        tmpUpperEyelid.closeActive = true;
        tmpLowerEyelid.closeActive = true;

        //debug
        //console.log("you click");
    }

}

