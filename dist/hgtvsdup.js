/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "N", function() { return /* binding */ N; });
__webpack_require__.d(__webpack_exports__, "cost_expr", function() { return /* binding */ cost_expr; });
__webpack_require__.d(__webpack_exports__, "deletions", function() { return /* binding */ deletions; });
__webpack_require__.d(__webpack_exports__, "duplications", function() { return /* binding */ duplications; });
__webpack_require__.d(__webpack_exports__, "hgt", function() { return /* binding */ hgt; });
__webpack_require__.d(__webpack_exports__, "mutate_expression", function() { return /* binding */ mutate_expression; });
__webpack_require__.d(__webpack_exports__, "mutate_up", function() { return /* binding */ mutate_up; });
__webpack_require__.d(__webpack_exports__, "s", function() { return /* binding */ s; });
__webpack_require__.d(__webpack_exports__, "m", function() { return /* binding */ m; });

// CONCATENATED MODULE: ./src/gene.js

let _unique_gene_id = 0;
let fetchGeneID = () => _unique_gene_id++;

class Gene {
    constructor(expression){
        this.id = fetchGeneID();
        this.expression = expression;
    }

    static copyGene(gene){
        const newgene = new Gene(0.0);
        newgene.expression = gene.expression;
        return newgene;
    }
}
// CONCATENATED MODULE: ./src/cell.js
//_priv = new WeakMap();



             // Luckily, JS allows ugly globals ¬_¬, better solutions are available

// Unique identifier functionality
let _unique_cell_id = 0;
let fetchCellID = () => _unique_cell_id++;

class cell_Cell {
    constructor(numgenes, type) 
    {
        this.uid = fetchCellID();
        this.time_birth = 0;
        this.ancestor = null;
        this.sum_hgt = 0;
        this.sum_dup = 0;
        this.type = type;        // Or if you want a private member: _priv.set(this, fitness), enable weakmap!
        this.genome = [];
        this.genomesize = 0;
        this.sumexpression = 0;
        for(let i = 0; i < numgenes; i++) 
        {
            this.genomesize++;
            const gene = new Gene(1.00);
            this.sumexpression += 1.00;
            this.genome.push(gene);
        }
    }
    
    static reproduceCell(mother) {  // Alternative constructor 
        //let clone = Object.assign( Object.create( Object.getPrototypeOf(this)), this);
        let clone = new cell_Cell(0); // new cell with 0 genes
        clone.fitness = mother.fitness;        
        clone.genome = [];
        clone.inpop = mother.inpop;
        clone.sum_hgt = mother.sum_hgt;
        clone.sum_dup = mother.sum_dup;
        clone.sumexpression = mother.sumexpression;
        clone.type = mother.type;
        for(let i=0; i<mother.genome.length; i++)
        {
            const gene = Gene.copyGene(mother.genome[i]);
            clone.genome.push(gene);
        }
        let mut = clone.mutate();
        clone.genomesize = clone.genome.length;
        if(mut) clone.setFitness();    
        clone.ancestor = mother;    
        return clone;
    }

    mutate(){
        let mutation = false;
        let expr = mutate_expression;
        let dup = duplications;
        let h = hgt;
        let del = deletions;
        //console.log(`expr: ${expr}, dup: ${dup}, h: ${h}, del: ${del}\n`);
                
        if (this.type == 'dup')
            h = 0;
        else if (this.type == 'hgt')
            dup = 0;
        else throw new Error("Unkown cell type")
        
        let gained_genes = [];

        for(let i=0; i<this.genome.length; i++)
        {
            let which = m.random();
            if(which < expr)   // Mutate expression
            {
                // console.log('expr!');
                mutation = true;                
                if(m.random() < mutate_up)
                    this.genome[i].expression = this.genome[i].expression+m.random()*(1-this.genome[i].expression); //this.genome[i].expression = Math.min(1.0,Math.max(0.0,this.genome[i].expression + m.random()*mut_step));
                else
                    this.genome[i].expression = this.genome[i].expression-m.random()*(this.genome[i].expression); //this.genome[i].expression = Math.min(1.0,Math.max(0.0,this.genome[i].expression - m.random()*mut_step));
            }
            else if(which < expr + dup)   // Duplicate a gene
            {
                // console.log('dup!');
                mutation = true;
                const gene = Gene.copyGene(this.genome[i]);
                this.sum_dup++;
                gained_genes.push(gene);
            }
            else if(which < expr + dup + h)   // HGT a gene
            {
                // console.log('hgt!');
                mutation = true;
                let donorpos = Math.floor(m.random() * this.inpop.length); 
                let donor = this.inpop[donorpos];                
                if(donor.genome.length > 0)
                {
                    let genepos = Math.floor(m.random(), donor.genome.length);                
                    const gene = Gene.copyGene(donor.genome[genepos]);                
                    this.sum_hgt++;
                    gained_genes.push(gene);
                }
                //else
                //    throw new Error("Does this ever happen?") <-- happens sometimes, but as DUP can also not duplicate non-existing genes, this is a fair assumption
            }
            else if(which < expr + dup + h + del) // Delete a gene
            {
                if(this.genome.length == 1)
                    continue;
                mutation = true;
                // console.log('del!');
                let pos = Math.floor(m.random()*this.genome.length);
                this.genome.splice(pos,1);                
            }
        }          
        this.genome = this.genome.concat(gained_genes); //gained_genes.forEach(function(g) {this.genome.push(g)}, this.genome);
        return mutation;
    }
    
    setFitness() 
    {
        this.sumexpression = 0.0;
        this.fitness = 0.0;
        for(let i=0; i<this.genome.length; i++)
            this.sumexpression += this.genome[i].expression;
        this.penalty = this.sumexpression > 1.0 ? (this.sumexpression-1)*cost_expr : 0.0;
        this.yield = this.sumexpression > 1.0 ? 1.0 : this.sumexpression;
        this.fitness = this.yield - this.penalty;
    }
    
}
// CONCATENATED MODULE: ./src/population.js
// POPULATION.JS IS NOT A CLASS DESCRIBING FILE, IT IS JUST FUNCTIONS THAT USE ARRAYS OF CELLS ("POPULATIONS") AND MODIFY THEM


             // Luckily, JS allows ugly globals ¬_¬, better solutions are available

function reproducePop(pop, Time){
    //let fitnesses = pop_hgt.map(({fitness}) => fitness); nice way to grab props
    //var t0 = performance.now(); //  die weighted concat is te slow :(
    for(let i =0;i<N;i++) // Moran process, reproducing N random individuals proportional to fitness.
    {
        let sumfit = 0.0;
        for(let i =0; i<pop.length; i++)
            sumfit += pop[i].fitness;
        let rpos = m.random()*sumfit;
        let cumul = 0.0;
        let winnerpos = -1;
        for(let i =0; i<pop.length; i++)
        {
            cumul += pop[i].fitness;
            if(cumul > rpos)
            {
                winnerpos = i;
                break;
            }
        }
        let winner = pop[winnerpos];    
        let clone = cell_Cell.reproduceCell(winner,Time);
        let loserpos = Math.floor(m.random() * pop.length); // Random pos in the n-size array 
        clone.time_birth = Time;
        pop[loserpos] = clone;
    }
}

// Sample a random cell and trace it back to the first ancestor, retur 
function traceAncestor(pop)
{
    let randomcell = pop[Math.floor(m.random() * pop.length)]; // Random pos in the n-size array 
    let ancestor = randomcell.ancestor;
    let fitnesses = [];
    let gsizes = [];
    let exprs = [];
    let exprs_max = [];
    let tps = [];

    while(ancestor != null)
    {
        tps.push(ancestor.time_birth);
        fitnesses.push(ancestor.fitness);
        gsizes.push(ancestor.genome.length);
        exprs.push(ancestor.sumexpression/ancestor.genome.length);
        let exprs_all = [];
        for(let i=0;i<ancestor.genome.length;i++){
            exprs_all.push(ancestor.genome[i].expression);
        }        
        exprs_max.push(Math.max(...exprs_all));
        ancestor = ancestor.ancestor;
    }
   return([tps,fitnesses,gsizes,exprs,exprs_max]);}
// CONCATENATED MODULE: ./src/mersenne.js
/*
  I've wrapped Makoto Matsumoto and Takuji Nishimura's code in a namespace
  so it's better encapsulated. Now you can have multiple random number generators
  and they won't stomp all over eachother's state.
  
  If you want to use this as a substitute for Math.random(), use the random()
  method like so:
  
  var m = new MersenneTwister();
  var randomNumber = m.random();
  
  You can also call the other genrand_{foo}() methods on the instance.
  If you want to use a specific seed in order to get a repeatable random
  sequence, pass an integer into the constructor:
  var m = new MersenneTwister(123);
  and that will always produce the same random sequence.
  Sean McCullough (banksean@gmail.com)
*/

/* 
   A C-program for MT19937, with initialization improved 2002/1/26.
   Coded by Takuji Nishimura and Makoto Matsumoto.
 
   Before using, initialize the state by using init_genrand(seed)  
   or init_by_array(init_key, key_length).
 
   Copyright (C) 1997 - 2002, Makoto Matsumoto and Takuji Nishimura,
   All rights reserved.                          
 
   Redistribution and use in source and binary forms, with or without
   modification, are permitted provided that the following conditions
   are met:
 
     1. Redistributions of source code must retain the above copyright
        notice, this list of conditions and the following disclaimer.
 
     2. Redistributions in binary form must reproduce the above copyright
        notice, this list of conditions and the following disclaimer in the
        documentation and/or other materials provided with the distribution.
 
     3. The names of its contributors may not be used to endorse or promote 
        products derived from this software without specific prior written 
        permission.
 
   THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
   "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
   LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
   A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
   CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
   EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
   PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
   PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
   LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
   NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
   SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 
 
   Any feedback is very welcome.
   http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/emt.html
   email: m-mat @ math.sci.hiroshima-u.ac.jp (remove space)
*/

function MersenneTwister(seed) {
    if (seed == undefined) {
      seed = new Date().getTime();
    } 
    /* Period parameters */  
    this.N = 624;
    this.M = 397;
    this.MATRIX_A = 0x9908b0df;   /* constant vector a */
    this.UPPER_MASK = 0x80000000; /* most significant w-r bits */
    this.LOWER_MASK = 0x7fffffff; /* least significant r bits */
   
    this.mt = new Array(this.N); /* the array for the state vector */
    this.mti=this.N+1; /* mti==N+1 means mt[N] is not initialized */
  
    this.init_genrand(seed);
  }  
   
  /* initializes mt[N] with a seed */
  MersenneTwister.prototype.init_genrand = function(s) {
    this.mt[0] = s >>> 0;
    for (this.mti=1; this.mti<this.N; this.mti++) {
        var s = this.mt[this.mti-1] ^ (this.mt[this.mti-1] >>> 30);
     this.mt[this.mti] = (((((s & 0xffff0000) >>> 16) * 1812433253) << 16) + (s & 0x0000ffff) * 1812433253)
    + this.mti;
        /* See Knuth TAOCP Vol2. 3rd Ed. P.106 for multiplier. */
        /* In the previous versions, MSBs of the seed affect   */
        /* only MSBs of the array mt[].                        */
        /* 2002/01/09 modified by Makoto Matsumoto             */
        this.mt[this.mti] >>>= 0;
        /* for >32 bit machines */
    }
  }
   
  /* initialize by an array with array-length */
  /* init_key is the array for initializing keys */
  /* key_length is its length */
  /* slight change for C++, 2004/2/26 */
  MersenneTwister.prototype.init_by_array = function(init_key, key_length) {
    var i, j, k;
    this.init_genrand(19650218);
    i=1; j=0;
    k = (this.N>key_length ? this.N : key_length);
    for (; k; k--) {
      var s = this.mt[i-1] ^ (this.mt[i-1] >>> 30)
      this.mt[i] = (this.mt[i] ^ (((((s & 0xffff0000) >>> 16) * 1664525) << 16) + ((s & 0x0000ffff) * 1664525)))
        + init_key[j] + j; /* non linear */
      this.mt[i] >>>= 0; /* for WORDSIZE > 32 machines */
      i++; j++;
      if (i>=this.N) { this.mt[0] = this.mt[this.N-1]; i=1; }
      if (j>=key_length) j=0;
    }
    for (k=this.N-1; k; k--) {
      var s = this.mt[i-1] ^ (this.mt[i-1] >>> 30);
      this.mt[i] = (this.mt[i] ^ (((((s & 0xffff0000) >>> 16) * 1566083941) << 16) + (s & 0x0000ffff) * 1566083941))
        - i; /* non linear */
      this.mt[i] >>>= 0; /* for WORDSIZE > 32 machines */
      i++;
      if (i>=this.N) { this.mt[0] = this.mt[this.N-1]; i=1; }
    }
  
    this.mt[0] = 0x80000000; /* MSB is 1; assuring non-zero initial array */ 
  }
   
  /* generates a random number on [0,0xffffffff]-interval */
  MersenneTwister.prototype.genrand_int32 = function() {
    var y;
    var mag01 = new Array(0x0, this.MATRIX_A);
    /* mag01[x] = x * MATRIX_A  for x=0,1 */
  
    if (this.mti >= this.N) { /* generate N words at one time */
      var kk;
  
      if (this.mti == this.N+1)   /* if init_genrand() has not been called, */
        this.init_genrand(5489); /* a default initial seed is used */
  
      for (kk=0;kk<this.N-this.M;kk++) {
        y = (this.mt[kk]&this.UPPER_MASK)|(this.mt[kk+1]&this.LOWER_MASK);
        this.mt[kk] = this.mt[kk+this.M] ^ (y >>> 1) ^ mag01[y & 0x1];
      }
      for (;kk<this.N-1;kk++) {
        y = (this.mt[kk]&this.UPPER_MASK)|(this.mt[kk+1]&this.LOWER_MASK);
        this.mt[kk] = this.mt[kk+(this.M-this.N)] ^ (y >>> 1) ^ mag01[y & 0x1];
      }
      y = (this.mt[this.N-1]&this.UPPER_MASK)|(this.mt[0]&this.LOWER_MASK);
      this.mt[this.N-1] = this.mt[this.M-1] ^ (y >>> 1) ^ mag01[y & 0x1];
  
      this.mti = 0;
    }
  
    y = this.mt[this.mti++];
  
    /* Tempering */
    y ^= (y >>> 11);
    y ^= (y << 7) & 0x9d2c5680;
    y ^= (y << 15) & 0xefc60000;
    y ^= (y >>> 18);
  
    return y >>> 0;
  }
   
  /* generates a random number on [0,0x7fffffff]-interval */
  MersenneTwister.prototype.genrand_int31 = function() {
    return (this.genrand_int32()>>>1);
  }
   
  /* generates a random number on [0,1]-real-interval */
  MersenneTwister.prototype.genrand_real1 = function() {
    return this.genrand_int32()*(1.0/4294967295.0); 
    /* divided by 2^32-1 */ 
  }
  
  /* generates a random number on [0,1)-real-interval */
  MersenneTwister.prototype.random = function() {
    return this.genrand_int32()*(1.0/4294967296.0); 
    /* divided by 2^32 */
  }
   
  /* generates a random number on (0,1)-real-interval */
  MersenneTwister.prototype.genrand_real3 = function() {
    return (this.genrand_int32() + 0.5)*(1.0/4294967296.0); 
    /* divided by 2^32 */
  }
   
  /* generates a random number on [0,1) with 53-bit resolution*/
  MersenneTwister.prototype.genrand_res53 = function() { 
    var a=this.genrand_int32()>>>5, b=this.genrand_int32()>>>6; 
    return(a*67108864.0+b)*(1.0/9007199254740992.0); 
  } 
  
  /* These real versions are due to Isaku Wada, 2002/01/09 added */
// CONCATENATED MODULE: ./src/utility_functions.js
let setPar = function(parname, value)
{
  this[parname] = value;
}

let mean = function(arr)
{
  return arr.reduce((cum,val) => cum + val, 0) / arr.length;
}


// CONCATENATED MODULE: ./src/index.js





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
let N = 2000;                          // Population size for Moran process
let cost_expr=0.005;                   // Costs of expressing genes (only relevant when total expression > 1, otherwise the expression still confers fitness)
let deletions=0.001;                   // Per-gene chance of deletion upon reproduction
let duplications=0.001;                // Per-gene chance of duplication upon reproduction               
let hgt=0.001;                         // Per-gene chance of uptake upon reproduction                   
let mutate_expression=0.001; 		  // Per-gene chance that expression rate is mutated,               
let mutate_up = 0.1;                  // 10% of expression-modifying mutations go up, so most mutations 'break' the genes.
//export let mut_step = 0.2;
let s = 1;                            // Scales selection pressure by raising fitness to the power of this variable during reproductive competition
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


// for s in 1 2 3; do for i in 0.0001953125 0.000390625 0.00078125 0.0015625 0.003125 0.00675 0.0125 0.025 0.05 0.1; do for j in 0.0001953125 0.000390625 0.00078125 0.0015625 0.003125 0.00675 0.0125 0.025 0.05 0.1; do echo node dist/hgtvsdup.js $s $j $i; done; done; done | parallel -k -j 8
// where s = seed, j = mutation, i = cost expression
// popsize sweep:           1,000                                                           
// time sweep:              100,000                                                          
// del/dup/hgt sweep:       0.0001953125    0.000390625    0.00078125      0.0015625   0.003125   0.00675   0.0125   0.025  0.05  0.1       / 2 -fold series      
// cost      sweep:         0.0001953125    0.000390625    0.00078125      0.0015625   0.003125   0.00675   0.0125   0.025  0.05  0.1       / 2 -fold series
// replicates seeds:        1, 2, 3 --> 300 simulations in total       


var m = new MersenneTwister(seed); // e,g. m.random() or m.genrand_real1()

let pop_hgt = [];    // Population that undergoes only HGT, and no duplications
let pop_dup = [];       // Population that undergoes only duplications, and no HGT

// Initialise population of cells, all with 1 'perfect' gene ( == max fitness)
let initialise = function ()
{
    pop_hgt = [];
    pop_dup = [];
    for(let i=0;i<N;i++){
        const cell_dup = new cell_Cell(1,'dup');
        const cell_hgt = new cell_Cell(1,'hgt');
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
let src_Time = 0;
initialise();
let running = true;





// Perform one simulation step 
function step()
{     
    reproducePop(pop_hgt, src_Time);
    reproducePop(pop_dup, src_Time);
    src_Time++;
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
    src_Time = 0;
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
    window.updateGraphG(src_Time,gsize_1,gsize_2);        
    window.updateGraphF(src_Time,fit_1,fit_2);    
    window.updateGraphE(src_Time,expr_1,expr_2);
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
                pop_hgt.push(cell_Cell.reproduceCell(pop_hgt[randomcell]));
            }
            while(pop_dup.length < newN)    // Reproduce random cells until the new popsize is met
            {
                let randomcell = Math.floor(m.random() * pop_dup.length); // Random pos in the n-size array 
                pop_dup.push(cell_Cell.reproduceCell(pop_dup[randomcell]));
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

    var fs = __webpack_require__(0);
    fs.appendFileSync(avgfile,`${src_Time}	${fit_dup}	${gsize_dup}    ${expr_dup}   	${fit_hgt}	${gsize_hgt}    ${expr_hgt}   \n`);
    if(src_Time%interval_Raw === 0)
    {
        fs.appendFileSync(rawfile,`${src_Time}, dup, gsize,${gsize_dup_raw}\n`);
        fs.appendFileSync(rawfile,`${src_Time}, hgt, gsize,${gsize_hgt_raw}\n`);
        fs.appendFileSync(rawfile,`${src_Time}, dup, fitness,${fit_dup_raw}\n`);
        fs.appendFileSync(rawfile,`${src_Time}, hgt, fitness,${fit_hgt_raw}\n`);
        fs.appendFileSync(rawfile,`${src_Time}, dup, expression,${expr_dup_raw}\n`);
        fs.appendFileSync(rawfile,`${src_Time}, hgt, expression,${expr_hgt_raw}\n`);
        fs.appendFileSync(ancfile,`${src_Time}, dup, time_birth, ${dup_trace[0]}\n`);
        fs.appendFileSync(ancfile,`${src_Time}, dup, fitness, ${dup_trace[1]}\n`);
        fs.appendFileSync(ancfile,`${src_Time}, dup, gsizes, ${dup_trace[2]}\n`);
        fs.appendFileSync(ancfile,`${src_Time}, dup, exprs, ${dup_trace[3]}\n`);
        fs.appendFileSync(ancfile,`${src_Time}, dup, exprs_max, ${dup_trace[4]}\n`);
        fs.appendFileSync(ancfile,`${src_Time}, hgt, time_birth, ${hgt_trace[0]}\n`);
        fs.appendFileSync(ancfile,`${src_Time}, hgt, fitness, ${hgt_trace[1]}\n`);
        fs.appendFileSync(ancfile,`${src_Time}, hgt, gsizes, ${hgt_trace[2]}\n`);
        fs.appendFileSync(ancfile,`${src_Time}, hgt, exprs, ${hgt_trace[3]}\n`);
        fs.appendFileSync(ancfile,`${src_Time}, hgt, exprs_max, ${hgt_trace[4]}\n`);
    }
}

/* END DATA STORING AND STUFF */

function run()  // Run entire simulation (Only in NODEJS)
{    
    var dir = './Output_sweep';
    var avgfile = `${dir}/s${seed}_c${cost_expr}_u${mutate_expression}_avg.txt`;
    var rawfile = `${dir}/s${seed}_c${cost_expr}_u${mutate_expression}_raw.txt`;
    var ancfile = `${dir}/s${seed}_c${cost_expr}_u${mutate_expression}_anc.txt`;

    

    var fs = __webpack_require__(0);   
    if (!fs.existsSync(dir))
    {
        fs.mkdirSync(dir);
    }

    // use {flags: 'a'} to append and {flags: 'w'} to erase and write a new file
    
    fs.writeFileSync(avgfile, 'Time   AvgfitDUP  AvglenDUP  exprDUP   AvgfitHGT  AvglenHGT  exprHGT\n');
    fs.writeFileSync(rawfile, '');
    fs.writeFileSync(ancfile, '');
    while (src_Time <= max_Time)    
    {
        if(running) 
        {
            if(src_Time%interval_Write === 0)
            {
                writeDataFiles(avgfile, rawfile,ancfile);
                console.log('Time: ' + src_Time);
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
            if(src_Time%interval_Write === 0)
            {
                console.log('Time: ' + src_Time);
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
            if(src_Time%interval_Anc === 0)
            {
                let dup_trace = traceAncestor(pop_dup);
                let hgt_trace = traceAncestor(pop_hgt);
                window.updateGraphs_anc(dup_trace,hgt_trace);
            }
            if(src_Time%interval_Write === 0)updateWebpage();
            if (src_Time === max_Time) 
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

/***/ })
/******/ ]);