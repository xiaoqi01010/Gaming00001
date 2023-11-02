function permutation(xs){
    return accumulate((x,y)=>append(x,y),null,
    map(term1=>map(term2=>pair(term1,term2),remove(xs,term2)),xs));
}

permutation(list(1,2,3));
    