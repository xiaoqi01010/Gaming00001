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

