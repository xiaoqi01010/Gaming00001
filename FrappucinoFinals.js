//2020/2021 Final assessment sem1
function accumulate_iter(f, init, xs){
    function iter_helper(f,init,xs_new){
        return is_null(xs_new)
            ? init
            : iter_helper(f,display(f(display(head(xs_new),"head"),init)),tail(xs_new));
    }
    return iter_helper(f,init,reverse(xs));
}

accumulate_iter((x,y)=>x/y,2, list(24,16,8));

//This method uses continuous passing style, which basically forms a long long lambda function. 
// Over here, you need a helper function to keep operating on the lambda expression. 
function accumulate_iterate(f,init,xs){
    function acc(ys,cont){
        return is_null(ys)
            ? cont(init)
            : acc(tail(ys),x=>cont(f(head(ys),x)));
    }
    return acc(xs,x=>x);
}

accumulate_iterate((x,y)=>x/y,2, list(24,16,8));

function map(f,xs){
    return is_null(xs)? null: pair(f(head(xs)),map(f,tail(xs)));
}

function copy(xs){
    return map(x=>x,xs);
}

function last_pair(xs){
    return is_null(tail(xs))
        ? xs
        : last_pair(tail(xs))
        ;
}
//Hoop streams 
function hoopify(xs){
    set_tail(display(last_pair(xs)),copy(xs));
    const res = copy(xs);
    set_head(xs,res);
    set_tail(xs,()=>hoopify(res));
    return xs;
}

const A = list(1,2,3,4,5);
const B = hoopify(A);

function hoop_ref(hoop,n){
    return n===0
        ? hoop
        : hoop_ref(display(tail(hoop)()),n-1)
        ;
}
hoop_ref(B,2);

// Hoopify answers
function hoopify(xs){
    const c = copy(xs);
    const lp = last_pair(c);
    set_tail(c,lp);
}