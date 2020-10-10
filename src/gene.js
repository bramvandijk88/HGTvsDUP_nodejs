
let _unique_gene_id = 0;
let fetchGeneID = () => _unique_gene_id++;

export class Gene {
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