
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

generate_palindrome("caabb");
//self_reflect("hello");