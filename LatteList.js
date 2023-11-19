/*function take(xs, n) {
    return n === 0 ? null : pair(head(xs), take(tail(xs), n - 1));
}

function drop(xs, n) {
    return n === 0 ? xs : drop(tail(xs), n - 1);
}
*/
function permutations(xs) {
    if (is_null(xs)) {
        return list(null);
    } else {
        return accumulate(
            append,
            null,
            map((x) => {
                const perm_without_x = permutations(remove(x, xs));
                return map((p) => pair(x, p), perm_without_x);
            }, xs)
        );
    }
}

function combinations(xs, r) {
    if ((r !== 0 && is_null(xs)) || r < 0) {
        return null;
    } else if (r === 0) {
        return list(null);
    } else {
        const no_choose = combinations(tail(xs), r);
        const yes_choose = combinations(tail(xs), r - 1);
        const yes_item = map((x) => pair(head(xs), x), yes_choose);
        return append(no_choose, yes_item);
    }
}

function list_to_array(L) {
    const A = [];
    let i = 0;
    for (let p = L; !is_null(p); p = tail(p)) {
        A[i] = head(p);
        i = i + 1;
    }
    return A;
}

function list_to_array_recursive(L) {
    if (!is_list(L)) {
        return L;
    } else {
        const A = [];
        let i = 0;
        for (let p = L; !is_null(p); p = tail(p)) {
            A[i] = list_to_array_recursive(head(p));
            i = i + 1;
        }
        return A;
    }
}
/*
function flatten_list(lst){
    return accumulate((x,y)=>append(x,y),null,lst);
}*/

function remove_duplicates(lst) {
    return is_null(lst)
    ? null
    : pair(head(lst),
    remove_duplicates(
    filter(x => !equal(x, head(lst)), tail(lst))));
}

function flatten_list(xs){
    return accumulate(
        (x,y)=> is_list(x)
            ? append(flatten_list(x),y)
            : pair(x,y)
            ,null,xs
            );
}
const A = list(1,2,3,4);
const B = list(1,2,3);
const C = enum_list(1,10);
const tree = list(A,B,C);
display(tree);
flatten_list(tree);

function flatten_bin_tree(T) {
    if(is_null(T)){
        return null;
    }else if(is_number(T)){
        return list(T);
    }else{
        display(T);
        const left = append(flatten_bin_tree(head(tail(T))),list(head(T)));
        const right = flatten_bin_tree(head(tail(tail(T))));
        return append(left, right);
    }
}

const D1 = list(1, null, null);
const D4 = list(4, null, null);
const D3 = list(3, D1, D4);
const D8 = list(8, null, null);
const D7 = list(7, null, D8);
const treeD = list(5, D3, D7);
flatten_bin_tree(treeD);


// TASK 3B
function insert(x, xs) {
    return is_null(xs)
           ? list(x)
           : x <= head(xs)
           ? pair(x, xs)
           : pair(head(xs), insert(x, tail(xs)));
}

function insertion_sort(xs) {
    return is_null(xs)
           ? xs
           : insert(head(xs), insertion_sort(tail(xs)));
}

// You may write helper functions here.
function nth_item(xs,n){
    return n===0
        ? head(xs)
        : nth_item(tail(xs),n-1);
}

function drop(xs,n){
    return n===0
        ? xs
        : drop(tail(xs),n-1);
}

function take(xs,n,res){
    return n===0
        ? res
        : take(tail(xs),n-1,pair(head(xs),res));
}

function make_balanced_BST(L) {
    if(is_null(L)){
        return null;
    }else if(is_null(tail(L))){
        return list(head(L),null,null);
    }else{
        const mid = math_floor(length(L)/2);
        const sorted_list = insertion_sort(L);
        display(sorted_list,"");

        const front = take(sorted_list,mid,null);
        display(front,"front");
        const back = tail(drop(sorted_list,mid));
        const elem = head(drop(sorted_list,mid));
        display(elem,"elem");
        display(back,"back");
        return list(elem,make_balanced_BST(front),make_balanced_BST(back));
        
    }

}
//list(5, list(3, list(1, null, null), list(4, null, null)),
//list(7, list(6, null, null), null))
make_balanced_BST( list(4, 6, 1, 3, 7, 5) );