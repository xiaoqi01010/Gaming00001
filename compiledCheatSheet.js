function permutation(xs){
    return is_null(xs)
        ? list(null)
        : accumulate((x,y)=>append(x,y)
            ,null,map(term1=>map(term2=>pair(display(term1),term2),
            permutation(remove(term1,xs))),xs));
}
//base case must be correct for permutation to work well! 
permutation(list(1,2,3));
    