import {Cell} from './cell.js'
import {reproducePop, traceAncestor} from './population.js'
import {MersenneTwister} from './mersenne.js'
import {setPar, mean} from './utility_functions.js'

let myArgs = [];

if(typeof process !== 'object') // Isn't executed in plain NODEJS mode
{     
    // const $ = document.querySelector.bind(document);
}
else
{
    myArgs = process.argv.slice(2);
}


                                 

// Variables related to the model
export let N = 2000;                          // Population size for Moran process
export let cost_expr=0.005;                   // Costs of expressing genes (only relevant when total expression > 1, otherwise the expression still confers fitness)
export let deletions=0.001;                   // Per-gene chance of deletion upon reproduction
export let duplications=0.001;                // Per-gene chance of duplication upon reproduction               
export let hgt=0.001;                         // Per-gene chance of uptake upon reproduction                   
export let mutate_expression=0.001; 		  // Per-gene chance that expression rate is mutated,               
export let mutate_up = 0.1;                  // 10% of expression-modifying mutations go up, so most mutations 'break' the genes.
//export let mut_step = 0.2;
export let s = 1;                            // Scales selection pressure by raising fitness to the power of this variable during reproductive competition
let max_Time = 100000;                       // Total runtime
let interval_Write = 200;                    // Interval to write to console / HTML elementss
let interval_Anc = 10000;
let interval_Raw = 10000;

// Setup MersenneTwister Random Number Generator
let seed = 53;

if (myArgs[1] !== undefined)
{
    deletions = parseFloat(myArgs[1]);
    duplications = parseFloat(myArgs[1]);
    hgt = parseFloat(myArgs[1]);
    mutate_expression = parseFloat(myArgs[1]);
}
if (myArgs[0] !== undefined)
    seed = parseInt(myArgs[0]);
if (myArgs[2] !== undefined)
    cost_expr = parseFloat(myArgs[2]);


// for s in 1 2 3 4 5 6 7 8 9 10; do for i in 0.0001953125 0.000390625 0.00078125 0.0015625 0.003125 0.00675 0.0125 0.025 0.05 0.1; do for j in 0.0001953125 0.000390625 0.00078125 0.0015625 0.003125 0.00675 0.0125 0.025 0.05 0.1; do echo node dist/hgtvsdup.js $s $j $i; done; done; done | parallel -k -j 8
// where s = seed, j = mutation, i = cost expression
// popsize sweep:           1,000                                                           
// time sweep:              100,000                                                          
// del/dup/hgt sweep:       0.0001953125    0.000390625    0.00078125      0.0015625   0.003125   0.00675   0.0125   0.025  0.05  0.1       / 2 -fold series      
// cost      sweep:         0.0001953125    0.000390625    0.00078125      0.0015625   0.003125   0.00675   0.0125   0.025  0.05  0.1       / 2 -fold series
// replicates seeds:        1, 2, 3 --> 300 simulations in total       


export var m = new MersenneTwister(seed); // e,g. m.random() or m.genrand_real1()

let pop_hgt = [];    // Population that undergoes only HGT, and no duplications
let pop_dup = [];       // Population that undergoes only duplications, and no HGT

// Initialise population of cells, all with 1 'perfect' gene ( == max fitness)
let initialise = function ()
{
    pop_hgt = [];
    pop_dup = [];
    for(let i=0;i<N;i++){
        const cell_dup = new Cell(1,'dup');
        const cell_hgt = new Cell(1,'hgt');
        cell_dup.setFitness();
        cell_hgt.setFitness();
        pop_dup.push(cell_dup);
        cell_dup.inpop = pop_dup;
        pop_hgt.push(cell_hgt);
        cell_hgt.inpop = pop_hgt;
    }
}
/* Below is the simulation part. You can run the entire simulation by calling run(), but this function
 * is mostly meant to run within nodejs, as you'll want to use requestAnimationFrame for an animation 
 * in a HTML page. */
    
// Simulation vars
let Time = 0;
initialise();
let running = true;





// Perform one simulation step 
function step()
{     
    reproducePop(pop_hgt, Time);
    reproducePop(pop_dup, Time);
    Time++;
}

// Toggle the running-variable (for pausing in browser)
function toggleRunning()
{
    running = !running;
    console.log('Switched running to ', running);
}
function restartRun()
{
    seed = Math.floor(Math.random()*10000);     // I chose not to use mersenne twister here, so it's seeded "really random" for only this seeding function
    document.querySelector('#seed').value = seed;
    window.clearGraphs();
    Time = 0;
    initialise();    
    console.log('Restarted ', running);
}

// Toggle the running-variable (for setting speed in browser)

/*  BEGIN INTERACTIONS WITH BROWSWER 
    The below functionality is only for when interacting with the script from within the browser, 
    and is therefore not called when the 'process' variable is 'object' (means you are in nodejs). */

function updateWebpage()
{    
    // .map returns a new array with the results of calling a function, here it is an arrowfunction:
    let gsize_1 = pop_dup.map(( {genomesize}) => genomesize);            // Gsize
    let gsize_2 = pop_hgt.map(({genomesize}) => genomesize);
    let fit_1 = pop_dup.map(({fitness}) => fitness);                     //Fitness
    let fit_2 = pop_hgt.map(({fitness}) => fitness);
    let expr_1 = pop_dup.map(({sumexpression}) => sumexpression);       // Sum expression    
    expr_1 = expr_1.map(function(n, i) { if(gsize_1[i] < 1 ) { return 0.0; } else { return n / gsize_1[i]; } } );     // Divide by gsize = avg expr.
    let expr_2 = pop_hgt.map(({sumexpression}) => sumexpression);
    expr_2 = expr_2.map(function(n, i) { if(gsize_2[i] < 1 ) { return 0.0; } else { return n / gsize_2[i]; } } );     // Divide by gsize = avg expr.
    window.updateGraphG(Time,gsize_1,gsize_2);        
    window.updateGraphF(Time,fit_1,fit_2);    
    window.updateGraphE(Time,expr_1,expr_2);
}

if(typeof process !== 'object')                 // Dont do this in NODEJS-mode
{    
    document.querySelector('#runpause').addEventListener('click', toggleRunning);
    document.querySelector('#restart').addEventListener('click', restartRun);
    
    let seedbox = document.querySelector('#seed'); 
    seedbox.value = seed; 
    seedbox.addEventListener('change', () => seed=seedbox.value);

    let lossbox = document.querySelector('#loss');     
    lossbox.value = deletions; 
    lossbox.addEventListener('change', () => {
        let rate = Math.min(0.25,parseFloat(lossbox.value));
        deletions=rate;
    });
    
    let ratebox = document.querySelector('#turnover');     
    ratebox.value = duplications;
    ratebox.addEventListener('change', () => 
    {
        let rate = Math.min(0.25,parseFloat(ratebox.value));
        duplications=rate;
        hgt=rate;
        ratebox = document.querySelector('#turnover');     
        ratebox.value = duplications;
    });

    let costbox = document.querySelector('#cost'); 
    costbox.value = cost_expr; 
    costbox.addEventListener('change', () => cost_expr=parseFloat(costbox.value));

    let mubox = document.querySelector('#mutexpr'); 
    mubox.value = mutate_expression;
    mubox.addEventListener('change', () => {
        let rate = Math.min(0.25,parseFloat(mubox.value));
        mutate_expression=rate;
        mubox = document.querySelector('#mutexpr'); 
        mubox.value = mutate_expression;
    });

    // let stepbox = document.querySelector('#stepsize'); 
    // stepbox.value = mut_step; 
    // stepbox.addEventListener('change', () => mut_step=parseFloat(stepbox.value));

    let upbox = document.querySelector('#up'); 
    upbox.value = mutate_up;
    upbox.addEventListener('change', () => mutate_up=parseFloat(upbox.value));

    let Nbox = document.querySelector('#Nbox'); 
    Nbox.value = N;
    Nbox.addEventListener('change', () => {
        let oldN = N;
        let newN = Nbox.value;
        newN = Math.max(10,Math.min(newN,50000));
        if(oldN > newN) // Delete the rest
        { 
            pop_hgt = pop_hgt.slice(0,newN);
            for(let i =0; i<pop_hgt.length; i++)
            {
                pop_hgt[i].inpop = pop_hgt;
            }
            pop_dup = pop_dup.slice(0,newN);
            for(let i =0; i<pop_dup.length; i++)
            {
                pop_dup[i].inpop = pop_dup;
            }             
        } 
        else 
        {
            while(pop_hgt.length < newN)    // Reproduce random cells until the new popsize is met
            {
                let randomcell = Math.floor(m.random() * pop_hgt.length); // Random pos in the n-size array 
                pop_hgt.push(Cell.reproduceCell(pop_hgt[randomcell]));
            }
            while(pop_dup.length < newN)    // Reproduce random cells until the new popsize is met
            {
                let randomcell = Math.floor(m.random() * pop_dup.length); // Random pos in the n-size array 
                pop_dup.push(Cell.reproduceCell(pop_dup[randomcell]));
            }            
        }
        N=newN;
    }
    );
}
/* END INTERACTIONS WITH BROWSWER  */

/* DATA STORING AND STUFF BELOW */

function writeDataFiles(avgfile, rawfile, ancfile)
{   
    let dup_trace = traceAncestor(pop_dup); // return [tps,fitnesses,gsizes,exprs,exprs_max]
    let hgt_trace = traceAncestor(pop_hgt);

    let gsize_dup_raw = pop_dup.map(({genomesize}) => genomesize);
    let gsize_dup = mean(gsize_dup_raw);            // Gsize arr.reduce((cum,val) => cum + val, 0) / arr.length;
    let gsize_hgt_raw = pop_hgt.map(({genomesize}) => genomesize);
    let gsize_hgt = mean(gsize_hgt_raw);

    let fit_dup_raw =  pop_dup.map(({fitness}) => fitness);                     //Fitness
    let fit_dup = mean(fit_dup_raw);
    let fit_hgt_raw =  pop_hgt.map(({fitness}) => fitness);
    let fit_hgt = mean(fit_hgt_raw);
    
    let expr_dup_raw =  pop_dup.map(({sumexpression}) => sumexpression);            // Sum expression
    expr_dup_raw = expr_dup_raw.map(function(n, i) { return n / gsize_dup_raw[i]; });     // Divide by gsize = avg expr.
    let expr_dup = mean(expr_dup_raw);
    let expr_hgt_raw =  pop_hgt.map(({sumexpression}) => sumexpression);
    expr_hgt_raw = expr_hgt_raw.map(function(n, i) { return n / gsize_hgt_raw[i]; });     // Divide by gsize = avg expr.
    let expr_hgt = mean(expr_hgt_raw);

    var fs = require('fs');
    fs.appendFileSync(avgfile,`${Time}	${fit_dup}	${gsize_dup}    ${expr_dup}   	${fit_hgt}	${gsize_hgt}    ${expr_hgt}   \n`);
    if(Time%interval_Raw === 0)
    {
        fs.appendFileSync(rawfile,`${Time}, dup, gsize,${gsize_dup_raw}\n`);
        fs.appendFileSync(rawfile,`${Time}, hgt, gsize,${gsize_hgt_raw}\n`);
        fs.appendFileSync(rawfile,`${Time}, dup, fitness,${fit_dup_raw}\n`);
        fs.appendFileSync(rawfile,`${Time}, hgt, fitness,${fit_hgt_raw}\n`);
        fs.appendFileSync(rawfile,`${Time}, dup, expression,${expr_dup_raw}\n`);
        fs.appendFileSync(rawfile,`${Time}, hgt, expression,${expr_hgt_raw}\n`);
        fs.appendFileSync(ancfile,`${Time}, dup, time_birth, ${dup_trace[0]}\n`);
        fs.appendFileSync(ancfile,`${Time}, dup, fitness, ${dup_trace[1]}\n`);
        fs.appendFileSync(ancfile,`${Time}, dup, gsizes, ${dup_trace[2]}\n`);
        fs.appendFileSync(ancfile,`${Time}, dup, exprs, ${dup_trace[3]}\n`);
        fs.appendFileSync(ancfile,`${Time}, dup, exprs_max, ${dup_trace[4]}\n`);
        fs.appendFileSync(ancfile,`${Time}, hgt, time_birth, ${hgt_trace[0]}\n`);
        fs.appendFileSync(ancfile,`${Time}, hgt, fitness, ${hgt_trace[1]}\n`);
        fs.appendFileSync(ancfile,`${Time}, hgt, gsizes, ${hgt_trace[2]}\n`);
        fs.appendFileSync(ancfile,`${Time}, hgt, exprs, ${hgt_trace[3]}\n`);
        fs.appendFileSync(ancfile,`${Time}, hgt, exprs_max, ${hgt_trace[4]}\n`);
    }
}

/* END DATA STORING AND STUFF */

function run()  // Run entire simulation (Only in NODEJS)
{    
    var dir = './Output_sweep';
    var avgfile = `${dir}/s${seed}_c${cost_expr}_u${mutate_expression}_avg.txt`;
    var rawfile = `${dir}/s${seed}_c${cost_expr}_u${mutate_expression}_raw.txt`;
    var ancfile = `${dir}/s${seed}_c${cost_expr}_u${mutate_expression}_anc.txt`;

    

    var fs = require('fs');   
    if (!fs.existsSync(dir))
    {
        fs.mkdirSync(dir);
    }

    // use {flags: 'a'} to append and {flags: 'w'} to erase and write a new file
    
    fs.writeFileSync(avgfile, 'Time   AvgfitDUP  AvglenDUP  exprDUP   AvgfitHGT  AvglenHGT  exprHGT\n');
    fs.writeFileSync(rawfile, '');
    fs.writeFileSync(ancfile, '');
    while (Time <= max_Time)    
    {
        if(running) 
        {
            if(Time%interval_Write === 0)
            {
                writeDataFiles(avgfile, rawfile,ancfile);
                console.log('Time: ' + Time);
            }
            
            step();            
        }
    }
}


function runAnimation()  // Only use in browser-mode!
{        
    if(running) 
    {
        let frame = requestAnimationFrame(runAnimation);
        let t = 0;      // Will track cumulative time per step in microseconds 
        while(t<16)//(t < 16)   // 1/60 = 0.016 = 16 microseconds
        {
            let startTime = performance.now();
            step();
            let endTime = performance.now();
            t += (endTime - startTime);
            if(Time%interval_Write === 0)
            {
                console.log('Time: ' + Time);
                console.log('Seed: ' + seed);
                console.log('N: ' + N);
                console.log(`s: ${s}`);
                console.log(`Rates: ${deletions} ${duplications} ${hgt}`);
                console.log(`Cost: ${cost_expr}`);
                console.log(`Mu: ${mutate_expression}`);
                console.log(`Up chance: ${mutate_up}`);
                console.log('Duppin pop:', pop_dup);
                console.log('HGTing pop:', pop_hgt);
            }
            if(Time%interval_Anc === 0)
            {
                let dup_trace = traceAncestor(pop_dup);
                let hgt_trace = traceAncestor(pop_hgt);
                window.updateGraphs_anc(dup_trace,hgt_trace);
            }
            if(Time%interval_Write === 0)updateWebpage();
            if (Time === max_Time) 
            {                
                running = false;
                cancelAnimationFrame(frame);
                wrapUpSequence();
                return;
            }
        }
        
        
    }
    else{
        let frame = requestAnimationFrame(runAnimation);
    }
}


if (typeof window === 'undefined') 
    run(); 
else
    runAnimation();
    

function wrapUpSequence()
{    
    updateWebpage();    
    console.log('done');
}