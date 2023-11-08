
function self_reflect(s) {
    const tmp = string_to_list(s);
    let res = reverse(tmp);
    return list_to_string(append(tmp,res));
}


function permutation(xs){
    return is_null(xs)
        ? list(null)
        : accumulate((x,y)=>append(x,y)
            ,null,map(term1=>map(term2=>pair(term1,term2),
            permutation(remove(term1,xs))),xs));
}

function string_to_list(str){
    function helper(tmp,count){
    return char_at(tmp,count)===undefined
        ? null
        : pair(char_at(tmp,count),helper(tmp,count+1));
    }
    return helper(str,0);
}

function is_palindrome(s) {
    const str_forward = string_to_list(s);
    const str_backward = reverse(str_forward);
    function helper(xs,ys,res){
    return is_null(xs)
        ? res
        : helper(tail(xs),tail(ys),equal(head(xs),head(ys))&&res)
        ;
    }
    return helper(str_forward,str_backward,true);
}

is_palindrome("hello");


function list_to_string(xs){
    function helper(ys,res){
    return is_null(ys)
        ? res
        : helper(tail(ys),head(ys)+res);
    }
    return helper(xs,"");
}
//base case must be correct for permutation to work well! 
//permutation(list(1,2,3));

function generate_palindrome(x) {
    const str = string_to_list(x);
    const tmp = map(y=>list_to_string(y),
    filter(x=>is_palindrome(list_to_string(x)),
    permutation(str)));
    function helper(ls){
        return is_null(ls)
            ? null
            : is_null(member(head(ls),tail(ls)))
            ? pair(head(ls),helper(tail(ls)))
            : helper(tail(ls))
            ;
    }
    return helper(tmp);
}
//OR you can simply use filter function 
function generatePalindrome(x) {
    const str = string_to_list(x);
    const tmp = map(y=>list_to_string(y),
    filter(x=>is_palindrome(list_to_string(x)),
    permutation(str)));
    
    function helper(ls){
    return is_null(ls)
        ? null
        : accumulate((x,y)=>is_null(filter(term=>term===x,y))? pair(x,y):y,null,ls);
    }
    return helper(tmp);
}
generatePalindrome("caabb");
//self_reflect("hello");

function geometric_sequence(a, r) {
    return pair(a,()=>geometric_sequence(a*r,r));
}
const a = geometric_sequence(1,4);
display(eval_stream(a,5));

function recurrence(t1, t2, f) {
    return pair(t1,()=>pair(t2,()=>recurrence(f(t1,t2),f(t2,f(t1,t2)),f)));
}
const c = recurrence(1,1,(x,y)=>x+y);
display(eval_stream(c,5));

// TASK 2D: ZIP SEQUENCES

function zip_sequences(xs) {
    return pair(head(head(xs)),()=>zip_sequences(append(tail(xs),list(stream_tail(head(xs))))));
}

const d = zip_sequences(list(a,c));
display(eval_stream(d,10));

function sum_sequences(xs) {
    function helper(xs){
        return is_null(xs)
            ? 0
            : head(head(xs)) + helper(tail(xs));
    }
    function helper1(ys){
        return is_null(ys)
            ? null
            : pair(stream_tail(head(ys)),helper1(tail(ys)));
    }
    return pair(
        helper(xs)
        ,()=>sum_sequences(helper1(xs)));
}
const e = sum_sequences(list(a,c,d));
eval_stream(e,5);

function traverse_diagonally(M) {
    const len = array_length(M);
    
    function submatrix(M,size){
        let res = [];
        for(let i = 0; i<size;i=i+1){
            res[i]=[];
            for(let j = 0; j<size;j= j+1){
                res[i][j]=M[i][j];
            }
        }
        return res;
    }
    function make_upper_submatrix(y){
        return equal(y,len+1)
            ? null
            : pair(display(submatrix(M,y),"upper submatrix"),make_upper_submatrix(y+1))
            ;
        }
    const upper = reverse(make_upper_submatrix(1));
    function lower_submatrix(M,size){
        let res = [];
        for(let i = 0; i<size;i=i+1){
            res[i]=[];

            }
            
        for(let i = 0; i<size;i=i+1){
            for(let j = 0; j<size;j= j+1){
                res[size-1-i][size-1-j]=M[len-1-i][len-1-j];
                }
            }
            

        return res;
        }
    function make_lower_submatrix(y){
        return equal(y,len)
            ? null
            : pair(display(lower_submatrix(M,y),"lower submatrix"),make_lower_submatrix(y+1))
            ;
        }
    const lower = make_lower_submatrix(1);
    const final = append(reverse(upper),reverse(lower));
    display(final,"final");
    function traverse(m){
        const len = array_length(m);
        let res = null;
        for(let i = 0; i <len; i=i+1){

                res = pair(m[len-1-i][i],res);
        }
        return len%2===1? reverse(res):res;
    }
    return accumulate((x,y)=>append(x,y),null,map(x=>traverse(x),final));
    }

function diagonal(M){
    const len = array_length(M);
    function helper1(x,y){
        return y<0
        ?null
        :pair(M[x][y],helper1(x+1,y-1));
    }
    let final = helper1(0,0);
    for (let i = 1;i<len;i=i+1){
        if(i%2!==0){
            final = append(final,helper1(0,i));
        }else{
            final = append(final,reverse(helper1(0,i)));
        }
    }
    function helper2(x,y){
        return x>len-1
        ?null
        :pair(M[x][y],helper2(x+1,y-1));
    }
    for (let i = 1;i<len;i=i+1){
        if(i%2!==0){
            final = append(final,helper2(i,len-1));
        }else{
            final = append(final,reverse(helper2(i,len-1)));
        }
    }
    return final; 
}
diagonal([
    [1,2,3,4,5,6,7,8,9,10],
    [11,12,13,14,15,16,17,18,19,20],
    [21,22,23,24,25,26,27,28,29,30],
    [31,32,33,34,35,36,37,38,39,40],
    [41,42,43,44,45,46,47,48,49,50],
    [51,52,53,54,55,56,57,58,59,60],
    [61,62,63,64,65,66,67,68,69,70],
    [71,72,73,74,75,76,77,78,79,80],
    [81,82,83,84,85,86,87,88,89,90],
    [91,92,93,94,95,96,97,98,99,100]
    ]);


//Note that the code below only works for matrix with distinct elements.
// This is because of a bug in the logic, assuming that each element appears only once in each row. 
function find_shortest_path(M) {
    //x is the number of rows 
    function find_shortest_path_helper(M){
    
    function reduce_rows_by_one(m){
        let len = array_length(m);
        display(len);
        if(len>1){
        let modifiedM = [];
        
            for(let i = 0; i<len-1; i = i+1){
                modifiedM[i]=M[i];
            }
            return modifiedM;
        }
        
    }
    
    function taking_front_part_of_paths(paths,element){
        return equal(element,head(display(paths,"path")))
            ? pair(element,null)
            : pair(head(paths),taking_front_part_of_paths(tail(paths),element));
        } 
        
    function paths_containing_cell(row,col,wish){
        const paths = filter(x=>!is_null(member(M[row-1][col],x)),display(wish,"wish"));
        display("here");
        return map(x=>taking_front_part_of_paths(x,M[row-1][col]),paths);
        }

    function take_rest_of_row(M,i,row_length){
        return equal(undefined,M[row_length-1][i])
                            ? null
                            : pair(M[row_length-1][i],take_rest_of_row(M,i+1,row_length));
        }
    
    
    if(array_length(M)===1){
        let res = null;
        const len = array_length(M[0]);
        for(let i = 0; i<len; i = i+1){
            res = pair(M[0][i],res);
            }
        display(res,"res in if block");
        return pair(reverse(res),null);
    }else{
        const row_length = array_length(M);
        const wish = find_shortest_path_helper(display(reduce_rows_by_one(M)));
        
        const column_length = array_length(M[0]);
        
        let result = map(x=>append(display(x,"test"),list(M[row_length-1][column_length-1])),wish);
        
        for(let i= 0; i<column_length-1; i= i+1){
            
            let current = paths_containing_cell(row_length-1,i,wish);
            display("else block");
            let secondpart = take_rest_of_row(M,i,row_length);
            display(secondpart,"secondpart");
            display(current,"current");
            current = map(x=>append(x,secondpart),current);
            result = append(current,result);
        }
        
        return result;
        }
    }
    
    function sum(xs){
        return is_null(xs)
            ? 0
            : head(xs) + sum(tail(xs));
    }
    const finalpaths = find_shortest_path_helper(M);
    const list_of_paths_with_sums = map(x=>pair(x,sum(x)),finalpaths);
    display(list_of_paths_with_sums,"list_of_paths_with_sums");
    return display(tail(accumulate((x,y)=>tail(x)<tail(y)? x: y, head(list_of_paths_with_sums),list_of_paths_with_sums)),"result");
}


function shortest_path(M){
    const len = array_length(M);
    const col_length = array_length(M[0]);
    let min = Infinity;

    function calc_cost(i,j,M,sum){
        if(i===len-1 && j===col_length-1){
            if(sum<min){
                display(M[i][j],"last loop");
                min = sum;
            }
        }else if(i<len && j<col_length){
            display(M[i][j]);
            calc_cost(i+1,j,M,sum+M[i][j]);
            calc_cost(i,j+1,M,sum+M[i][j]);
        }
    }
    calc_cost(0,0,M,0);
    return min+M[len-1][col_length-1];
}

    
    function util1() {
        const rooms = [[1, 2, 3, 4], 
					   [5, 6, 7, 8], 
					   [9, 10, 11, 12], 
					   [13, 14, 15, 16], 
					   [17, 18, 19, 20]];
		const path = find_shortest_path(rooms);
		if (is_number(path) && path === 5) {
		    display("TEST 4 - 1: PASS [Public Test Case]");
		} else {
		    display("TEST 4 - 1: FAIL [Public Test Case]");
		}
    }
    util1();
    
    
