function diagonal(M){
    const row_length = array_length(M);
    let res = list(null);
    function flip_even(M){
        display("here");
        function swap(r1,c1,r2,c2){
            const tmp = M[r1][c1];
            M[r1][c1] = M[r2][c2];
            M[r2][c2] = tmp;
        }
        for(let i = 0; i<row_length; i = i+1){
            for(let j =i; j<row_length; j = j+1){
                if((i+j)%2===1){
                swap(i,j,j,i);
                }
            }
        }
    }
    flip_even(M);
    //if you use while(j<length ...)as condition it will run into an infinite loop 
    function traverse(M,i,j){
        if(j<row_length && i>=0){
        if(M[i]===undefined || M[i][j]===undefined){
            traverse(M,i-1,j+1);
        }else{
            res = append(res,list(M[i][j]));
            traverse(M,i-1,j+1);
                }
            }
    }
    for(let i = 0; i<2*row_length-1; i = i+1){
        traverse(M,i,0);
    }
    return res;
}

diagonal([[1,2,3],[4,5,6],[7,8,9]]);
