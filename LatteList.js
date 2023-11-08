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
