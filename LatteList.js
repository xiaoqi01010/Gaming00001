function take(xs, n) {
    return n === 0 ? null : pair(head(xs), take(tail(xs), n - 1));
}

function drop(xs, n) {
    return n === 0 ? xs : drop(tail(xs), n - 1);
}

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

function flatten_list(lst){
    return accumulate((x,y)=>append(x,y),null,lst);
}

function remove_duplicates(lst) {
    return is_null(lst)
    ? null
    : pair(head(lst),
    remove_duplicates(
    filter(x => !equal(x, head(lst)), tail(lst))));
}