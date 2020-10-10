// POPULATION.JS IS NOT A CLASS DESCRIBING FILE, IT IS JUST FUNCTIONS THAT USE ARRAYS OF CELLS ("POPULATIONS") AND MODIFY THEM

import {Cell} from './cell.js'
import { N, m, s } from './index.js'             // Luckily, JS allows ugly globals ¬_¬, better solutions are available

export function reproducePop(pop, Time){
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
        let clone = Cell.reproduceCell(winner,Time);
        let loserpos = Math.floor(m.random() * pop.length); // Random pos in the n-size array 
        clone.time_birth = Time;
        pop[loserpos] = clone;
    }
}

// Sample a random cell and trace it back to the first ancestor, retur 
export function traceAncestor(pop)
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