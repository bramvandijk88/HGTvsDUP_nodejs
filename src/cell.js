//_priv = new WeakMap();

import {Gene} from './gene.js'

import {cost_expr,
        m,
        deletions,                      // Per-gene chance of deletion upon reproduction
        duplications,                   // Per-gene chance of duplication upon reproduction
        hgt,
        mutate_expression,
        mutate_up
        } from './index.js'             // Luckily, JS allows ugly globals ¬_¬, better solutions are available

// Unique identifier functionality
let _unique_cell_id = 0;
let fetchCellID = () => _unique_cell_id++;

export class Cell {
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
        let clone = new Cell(0); // new cell with 0 genes
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