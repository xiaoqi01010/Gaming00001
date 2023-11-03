function diagonal(M){
    const row_length = array_length(M);
    let res = null;
    function flip_even(M){
        function swap(r1,c1,r2,c2){
            const tmp = M[r1][c1];
            M[r1][c1] = M[r2][c2];
            M[r2][c2] = tmp;
        }
        for(let i = 0; i<row_length; i = i+1){
            for(let j =i; j<row_length; j = j+1){
                display(i);
                display(j);
                if((i+j)%2===1){
                swap(i,j,j,i);
                }
            }
        }
    }
    flip_even(M);
    function traverse(M,i,j){
        let res = null;
        while(i<row_length && j>=0){
        if(M[i][j]===undefined){
            traverse(M,i+1,j-1);
        }else{
            res = append(res,list(M[i][j]));
            traverse(M,i+1,j-1);
        }
        }
        return res; 
    }
    for(let i = 0; i<row_length; i = i+1){
        res = append(traverse(M,i,row_length-1),res);
    }
    return res;
}

diagonal([[1,2,3],[4,5,6],[7,8,9]]);