//Basic operation on arrays 
//Notice how this is basically the mathematical formula of dot product where you have 3 pointers. 
// pointer 1 responsible for moving along the rows of A, pointer 2 for moving along the columns and pointer 3 for moving along the col of B. 
function dot_product(A,B){
    let res = [];
    let row_len = array_length(A);
    let col_len = array_length(B);
    for(let i = 0; i<row_len; i = i+1){
        res[i]= [];
        for(let j = 0; j<row_len; j = j+1){
            res[i][j]=0;
            for(let k = 0; k< col_len; k= k+1){
                res[i][j] = A[i][k]*B[k][j]+res[i][j];
            }
        }
    }
    return res;
}
const C =  [[1,2,3],
            [4,5,6],
            [7,8,9],
            [10,11,12]];
const D = [[1,2,3,4],
            [5,6,7,8],
            [9,10,11,12]];
            
dot_product(C,D);

function transpose(A){
    if(A[0]===undefined){ //base case of []
        return [];
    }
    let res = [];
    const row_len = array_length(A);
    const col_len = array_length(A[0]);
    for(let i = 0; i<row_len ; i = i+1){
        res[i] = []; //remember to define the row here 
        for(let j = 0; j<col_len ; j = j+1){
            res[i][j] = A[j][i];   
        }
    }
    return res;
}
const AA = [[1,2,3],[4,5,6],[7,8,9]];
display(transpose(AA));

function rotate_90_deg(A){
    let res = transpose(A);
    if(A[0]===undefined){ //base case of []
        return [];
    }
    const row_len = array_length(A);
    const col_len = array_length(A[0]);
    for(let i = 0; i<row_len; i = i+1){
        for(let j = 0; j<math_floor(col_len/2); j = j+1){
            //swap 
            let temp = res[i][j];
            res[i][j] = res[i][col_len-1-j];
            res[i][col_len-1-j] = temp;
        }
    }
    return res;
}
display(rotate_90_deg(AA));
display(AA,"Notice how AA doesnt change-->");

//Notice how the above is not destructive, ie. original structure is not changed! 
// But what if we want to change the data structure directly? 
function dest_transpose(A){
    if(A[0]===undefined){ //base case of []
        return A;
    }
    const row_len = array_length(A);
    const col_len = array_length(A[0]);
    for(let i = 0; i<row_len; i = i+1){
        for(let j = i; j<col_len; j = j+1){
            let temp = A[i][j];
            A[i][j] = A[j][i];   
            A[j][i] = temp;
        }
    }
    return A;
}

display(dest_transpose(AA),"Notice now that AA changed -->");

function destr_rotate_90_deg(A){
    transpose(A);
    if(A[0]===undefined){ //base case of []
        return A;
    }
    const row_len = array_length(A);
    const col_len = array_length(A[0]);
    for(let i = 0; i<row_len; i = i+1){
        for(let j = 0; j<math_floor(col_len/2); j = j+1){
            //swap 
            let temp = A[i][j];
            A[i][j] = A[i][col_len-1-j];
            A[i][col_len-1-j] = temp;
        }
    }
    return A;
}
display(destr_rotate_90_deg(AA),"Notice now that AA changed -->");

function search_cond(A,cond){
    const len = array_length(A);
    let i = 0;
    while(A[i]!==undefined && !cond(A[i])){
        i = i+1;
    }
    return i<len? i: -1;
}
search_cond([1,2,3],x=>x<3);

function insert(A,pos,x){
    const len = array_length(A);
    for(let i = len-1; i>=pos; i = i-1){
        A[i+1] = A[i];
    }
    A[pos] = x;
}
const A = [1,2,3];
insert(A,0,"x");
A;

function insert_sort(A){
    const len = array_length(A);
    let newArr = [];
    for(let i = 0; i<len; i = i+1){
        const new_len = array_length(newArr);
        const result = search_cond(newArr,x=>x>A[i]);
        if(result!==-1){
            display(newArr);
            insert(newArr,result,A[i]);
        }else{
            //insert(newArr,new_len,A[i]);
            display(newArr);
            newArr[new_len] = A[i];
        }
    }
    return newArr;
}
insert_sort([1,4,3,2]);

