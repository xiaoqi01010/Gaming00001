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

//Traverse a matrix diagnally
function diagnol(A){
    const len = array_length(A);
    let res = null;
    function destr_transpose_even_diagnols(A){
        if(A[0]===undefined){ //base case of []
            return A;
        }
        const row_len = array_length(A);
        const col_len = array_length(A[0]);
        for(let i = 0; i<row_len; i = i+1){
            for(let j = i; j<col_len; j = j+1){
                //Wirte the coordinates out and notice how i+j always are odd 
                if((i+j)%2===1){
                let temp = A[i][j];
                A[i][j] = A[j][i];   
                A[j][i] = temp;
                }
            }
        }
    return A;
    } 
    destr_transpose_even_diagnols(A);
    
    function traverse(A,i,j){
        //need pointers since i and j are constants that cannot be changed directly
        let pointer1 = i;
        let pointer2 = j;
        while(pointer1>=0 && pointer2<len){
            res = append(res,list(A[pointer1][pointer2]));
            pointer1 = pointer1-1;
            pointer2 = pointer2+1;
        }
    }
    for(let i = 0; i<len; i = i+1){
        traverse(A,i,0);
    }
    return res;
}
const BB = [[1,2,3],[4,5,6],[7,8,9]];
display(diagnol(BB));

//linear search
function linear_search(A,cond){
    // In this case, using while loop would be a smarter choice. 
    const len = array_length(A);
    let pointer = 0;
    for(let i =0; A[i]!==undefined && !cond(A[i]);i=i+1){
        pointer = pointer +1;
    }
    return pointer<=len? pointer: -1;
}
linear_search([1,2,3],x=>x===2);

function binary_search(A,x){
     const len = array_length(A);
     let high = len-1;
     let low = 0;
     let mid = math_floor((high + low)/2);
     while(low<=high){
         if(!equal(x,A[mid])){
             if(A[mid]<x){
                 low = mid+1;
                 mid = math_floor((high + low)/2);
             }else if(A[mid]>x){
                 high = mid-1; //careful, should be mid -1 if not will encounter infinite loop since low will never === high
                 mid = math_floor((high + low)/2);
             }
         }else{
             return mid;
         }
     }
     return stringify(x)+" is not in array"; //even though it is strongly recommended for you to use the same data type for consistency purpose
}

binary_search([1,2,3],10);

//A much shorter implementation of binary search using recursion is recommended
function short_binary_search(A,x){
    const low = 0;
    const high = array_length(A) -1;
    function helper(low,high){
        if(low>high){
            return stringify(x)+" is not in array";
        }else{
            const mid = math_floor((low+high)/2);
            display(mid,"mid");
            return equal(x,A[mid])
                ? mid
                : A[mid] < x
                ? helper(mid+1,high)
                : helper(low,mid-1)
                ;
        }
    }
    return helper(low,high);
}

display(short_binary_search([1,2,3],2),"Notice how much shorter implementation becomes with recursion. This is the beauty of recursion/functional programming:");

/******************************SORTING ALGORITHMS*********************************************/
//Sorting without destruction of original data structure 
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
            newArr[new_len] = A[i];
        }
    }
    return newArr;
}
display(insert_sort([1,4,3,2]),"Notice this is a new array returned ---> ");
//The other insertion sort method. This is similar to bubble sort except that the idea of insertion is to insert the a certain element in the array to the correct position in the back of the array. 
//Thus there are more swaps in insertion sort compared to bubble sort. Bubble sort is merely swapping of 2 elements next to each other 
function insert_and_sort(A){
    const len = array_length(A);
    for(let i =0;  i<len; i = i+1){
        for(let j = i;j<len; j = j+1){
            if(A[i]>A[j]){
                let temp = A[j];
                A[j] = A[i];
                A[i] = temp;
            }
        }
    }
    return A;
}
display(insert_and_sort([1,4,3,2,2,3,4,51,2,3,1]),"Notice this is a destructive method ---> ");
//selection sort 
function find_min_pos(low,high,A,min){
    return low === high
        ? min
        : find_min_pos(low+1,high,A,A[min]<=A[low+1]? min: low+1);
        //Do take noe of the condition here, which is that A[min]<A[low+1] since you want to compare the current element with the next element 
}
function selection_sort(A){
    const len = array_length(A);
    for(let i = 0; i<len; i = i+1){
        const min_pos = find_min_pos(i,len-1,A,i);
        let temp = A[i];
        A[i] = A[min_pos];
        A[min_pos] = temp;
    }
    return A;
}
display(selection_sort([1,4,3,2,5,6,7,3]),"Notice this is the same array returned ---> ");

//Merge sort algorithm
//This way of implementation can be tedious and space consuming so a much better alternative can be used. 
function merge_sort(A){
    if(A[0]===undefined){
        display("here now");
        return A; //again,always tackle base case first  
    }else if(array_length(A)===1){
        return A;
    }else{
        const len = array_length(A);
        const low = 0;
        const high = len - 1;
        const mid = math_floor((low+high)/2);
        const front = split(A,low,mid);
        const back = split(A,mid+1,high);
        return merge(merge_sort(front),merge_sort(back));
    }
}

    function split(A,low,high){
        let res = [];
        for(let i = low; i<=high; i = i+1){
            res[i-low] = A[i];
        }
        return res;
    }
    
    
    function merge(A,B){
        let res = [];
        let i = 0;
        let pointerA = 0;
        let pointerB = 0;
        while(A[pointerA]!==undefined && B[pointerB]!==undefined){
            if(A[pointerA]>B[pointerB]){
                res[i] = B[pointerB];
                pointerB = pointerB + 1;
            }else{
                res[i]= A[pointerA];
                pointerA = pointerA + 1;
            }
            i =i+1;
        }
        while(A[pointerA]!==undefined){
            res[i] = A[pointerA];
            i = i+1;
            pointerA = pointerA + 1;
        }
        while(B[pointerB]!==undefined){
            res[i] = B[pointerB];
            i = i+1;
            pointerB = pointerB + 1;
        }
        
        return res;
    }

display(merge_sort([1,3,2,3,4,5,6,2123,2,3,4]),"Notice how this way of implementing is extremely space consuming --> ");