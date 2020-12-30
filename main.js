const readFile = require('fs').readFileSync;

const INPUTS = [];
readFile('input.txt', 'utf-8').split(",").forEach(data => {
    INPUTS.push(parseInt(data.trim()));
})
console.log(INPUTS);

const LOG = new Map(); // {number, turn}
let SPOKEN_LAST = -1;

let TOTAL = 30000000;// change total for both the parts. 

function solve1(inputs){
    let turn = 1;
    for(let input of inputs){
        let log = { number : input, turn_first : turn, turn_second : -1}
        SPOKEN_LAST = input;
        // console.log("TURN :"+turn+" SPOKEN "+SPOKEN_LAST)
        turn++;
        LOG.set(input,log);
    }
    // console.log(LOG)
    
    // console.log("\nSPOKEN LAST : "+SPOKEN_LAST);
    // turn--;
    while(turn <= TOTAL){
        let value = LOG.get(SPOKEN_LAST)
        if(LOG.get(SPOKEN_LAST).turn_second == -1){
            // first time spoken.
            //LOG.set(SPOKEN_LAST, {...value, number : SPOKEN_LAST, turn_second : turn})
            SPOKEN_LAST = 0;
        }else{
            let t1 = value.turn_first;
            let t2 = value.turn_second;
            SPOKEN_LAST = t2 - t1;
        }
        if(LOG.has(SPOKEN_LAST)){
            let v = LOG.get(SPOKEN_LAST);
            if(v.turn_second == -1){
                LOG.set(SPOKEN_LAST, {number : SPOKEN_LAST, turn_first : v.turn_first, turn_second : turn})
            }else{
                LOG.set(SPOKEN_LAST, {number : SPOKEN_LAST, turn_first : v.turn_second, turn_second : turn})
            }
            
        }else{
            LOG.set(SPOKEN_LAST, {number : SPOKEN_LAST, turn_first : turn, turn_second : -1})
        }
        // console.log("TURN :"+turn+" SPOKEN "+SPOKEN_LAST)
        // console.log(LOG)
        
        turn++;
    }    
    console.log("FINISH")
    // console.log(LOG)
    console.log("\nSPOKEN LAST : "+SPOKEN_LAST);
}   

solve1(INPUTS);