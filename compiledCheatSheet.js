
function self_reflect(s) {
    const tmp = string_to_list(s);
    let res = reverse(tmp);
    return list_to_string(append(tmp,res));
}


function permutation(xs){
    return is_null(xs)
        ? list(null)
        : accumulate((x,y)=>append(x,y)
            ,null,map(term1=>map(term2=>pair(display(term1),term2),
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