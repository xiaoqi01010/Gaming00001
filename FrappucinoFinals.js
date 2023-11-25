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
function hoopif(xs){
    const c = copy(xs);
    const lp = last_pair(c);
    set_tail(lp,c);
    return c;
}
//returns a circualr list. Note that the previous answer is not a circular list but rather a stream which is not what the question wants. 
hoopif(list(1,2,3,4,5));

//Once again, for a recursive structure to be created for which you cant destruct the original data,what you can do is to
// 1. create a copy 2. create the cycle atthe right position in the copy 3. return the copied structure. 
function partially_hoopify(xs,m){
    function list_pairs(xs,m){
        return m === 0
            ? xs
            : list_pairs(tail(xs),m-1);
    }
    const c = copy(xs);
    const lp = last_pair(c);
    set_tail(lp,list_pairs(c,m));
    return c;
}
draw_data(partially_hoopify(list(1,2,3,4,5),2));

const hh1 = pair(undefined,undefined);
const hh2 = pair(undefined,undefined);
const hh3 = pair(undefined,undefined);

set_head(hh1,hh1);
set_tail(hh1,hh1);
const tmp = pair(undefined, undefined);
set_head(tmp,tmp);
set_head(hh2,tmp);
set_tail(tmp, hh2);
set_tail(hh2, hh2);

const tmp2 = pair(undefined,undefined);
set_head(tmp2,hh3);
set_head(hh3,tmp2);
set_tail(tmp2,hh3);
set_tail(hh3,tmp2);

draw_data(hh1);
draw_data(hh2);
draw_data(hh3);

function is_hula_hoop(x){
    let pairs = null;
    function check(y){
        if(is_pair(y)){
            if(!is_null(member(y,pairs))){
                return true;
            }else{
                pairs = pair(y,pairs);
                return check(head(y)) && check(tail(y));
                }
            }else{
                return false;
            }
    }
    return check(x);
}

const test = list(1,2,3);
is_hula_hoop(test);

const fibonacci = pair(0,(s1,ignore)=> pair(1,(s2,ignore)=> pair(head(s1)+head(s2),(s3,ignore)=>tail(tail(s1)(s2,0))(s3,0))));

function scream_ref(s,n){
    function helper(s,i,k){
        return k === 0
            ? head(s)
            : helper(tail(s)(s,i+1),i+1,k-1);
    }
    return helper(s,0,n);
}

scream_ref(fibonacci,10);
///Over here there is no way of referencing to itself since the tail is a nullary function that deos not take in any paramter 
const stream = pair(1,()=>pair(2,()=>pair(head(stream)+head(tail(stream)()),()=>tail(stream)())));

function show_stream(stream,n){
    return n===0
        ? null
        : pair(head(stream),show_stream(tail(stream)(),n-1));
}
show_stream(stream,10);

function tree_to_arraytree(xs){
    let res = [];
    function tree_to_arraytree_helper(xs){
    if(is_null(xs)){
        return res;
    }else{
        if(is_list(head(xs))){
            const len = array_length(res);
            res[len] = tree_to_arraytree(head(xs));
        }else if(is_number(head(xs))){
            const len = array_length(res);
            res[len] = head(xs);
            }
        }
    return tree_to_arraytree_helper(tail(xs));
    }
    
    return tree_to_arraytree_helper(xs);
}

tree_to_arraytree(list(list(1,2,3),list(3,2,list(2,3,4))));
//model answer is even more is even more simple
function tree2arr(xs){
    if(is_number(xs)){
        return xs;//since array is implemented using array
    }else{
        const a = [];
        let i = 0;
        while(!is_null(xs)){
            a[i] = tree2arr(head(xs));
            i = i+1;
            xs = tail(xs);
        }
        return a;
    }
}

tree2arr(list(list(1,2,3),list(3,2,list(2,3,4))));

function arraytree_to_tree(a){
        if(is_number(a)){
            return a;
        }else{
            let xs = null;
            const len = array_length(a);
            for(let i = len -1; i>=0; i = i -1){
                xs = pair(arraytree_to_tree(a[i]),xs);
            }
            return xs;
        }
    }

display(arraytree_to_tree([1,[2,3,1],[1,[2,3]]]),"Notice how wishful thinking is applied on the array.Instead of looping through layer by layer in the array, we assume that the function will take care of the recursion for each element by applying recursion on each of them and providing a needed base case of only numbers being present --->");

function permutations(xs){
    return is_null(xs)
        ? list(null)
        : accumulate(append,null,map(x=>map(p=>pair(x,p),permutations(remove(x,xs))),xs));
}
function perms01(n,m){
    function helper(n,m,res){
        return n !== 0 && m !==0
            ? helper(n-1,m-1,pair(1,pair(0,res)))
            : n===0 && m!==0
            ? helper(n,m-1,pair(0,res))
            : n!==0 && m===0
            ? helper(n-1,m,pair(1,res))
            :res
            ;
    }
    const ys = helper(n,m,null);
    const xs = permutations(ys);
function belongs(x,y){
function eq(x,y,res){
    return !is_null(x)
        ? eq(tail(x),tail(y),equal(head(x),head(y)) && res)
        : res;
}
return is_null(y)
    ? false
    : eq(x,head(y),true) || belongs(x,tail(y))
    ;
}
function remove_dup(xs){
    return accumulate((x,y)=>belongs(x,y)
        ? y
        : pair(x,y)
        ,null,xs);
    }
    return remove_dup(xs);
}
display(perms01(4,1),"inefficient method -->");

//But do notice how the method above is extremely inefficient space wise and time wise since it compares everysingle element against accumulated data.
//Study the model solution below: 
function perms02(n,m){
    if(n===0 && m === 0){
        return list(null); // Note that you are supposed to return a lits of something so the base case should be a list of null.
    }else{
        const p0 = (n>0)
            ? map(p=>pair(0,p),perms02(n-1,m))
            : null;
        const p1 = (m>0)
            ? map(p=>pair(1,p),perms02(n,m-1))
            : null;
        return append(p0,p1);
    }
}
display(perms02(1,2),"more efficient method -->");

function two_d_memoize(f){
    let mem = [];
    function read(x,y){
        return mem[x] === undefined 
            ? undefined
            : mem[x][y]
            ;
    }
    function write(x,y,value){
        if(mem[x] === undefined){
            mem[x] = [];
        }else{}
        mem[x][y] = value;
    }
    function mf(x,y){
        const mem_xy = read(x,y);
        if(mem_xy!==undefined){
            return mem_xy;
        }else{
        const result = f(x,y);
        write(x,y,result);
        return result;
        }
    }
    return mf;
}
const a = (n,m)=>{
    if(n===0 && m === 0){
        return list(null); 
    }else{
        const p0 = (n>0)
            ? map(p=>pair(0,p),perms02(n-1,m))
            : null;
        const p1 = (m>0)
            ? map(p=>pair(1,p),perms02(n,m-1))
            : null;
        return append(p0,p1);
        }
    };



const perms01memo = two_d_memoize(a);
perms01memo(2,2);

//BOX AND POINTER DIAGRAM: DO NOTE THAT THESE ARE FREE MARKS AND THAT YOU ARE A DUMBASS IF YOU DUN GET THEM:
/********************BUGGY WARNING!!!!***************************************************************************************/
//Data abstraction 
function make_stack(){
    return null;
}


function is_empty(stack){
    return is_null(stack);
}


function push(stack,x){
    if(is_null(stack)){
        return list(x);
    }
    let tmp = copy(stack);
    set_head((stack),x);
    display(stack);
    set_tail((stack),tmp);
}

//I couldnt quite figure this out so I cant really check the question on stack.
/*
function pop(stack){
    let temp = null;
    while(!is_empty(stack)){
    if(is_null(tail(stack))){
        temp = head(stack);
        set_head(stack,null);

    }else{
        temp = head(tail(stack));
        pop(tail(stack));
        set_head(stack,temp);
        }
    }
    return temp;
}*/

function stack_list(xs){
    return reverse(xs);
}

const AA = stack_list(list(1,2,3,4));
AA;

push(AA,1);
AA;

function insert_to_bottom(stack,new_elem){
    if(is_empty(stack)){
        push(stack,new_elem);
    }else{
        const elem = head(stack);
        stack = tail(stack);//these two lines supposed to be pop which removes directly an element from stack
        insert_to_bottom(stack,new_elem);
        push(stack,elem);
    }
}

insert_to_bottom(AA,6);
AA;

function reverse_stack(stack){
    if(!is_empty(stack)){
        const elem = head(stack);
        stack = tail(stack);
        reverse_stack(stack);
        insert_to_bottom(stack,elem);
    }else{}
}

function closest_two_power(x){
    return math_pow(2,math_floor(math_log2(x)));
}

function min_tiles(L,W){
    if(L === 0|| W ===0){
        return 0;
    }else if(L===1 && W===1){
        return 1;
    }else{
        const min = (W<L) ? W:L;
        const power = closest_two_power(min);
        return 1 + min_tiles(L-power,W) + min_tiles(L,W-power);
    }
}
display(min_tiles(20,5),"Number of tiles required --->");

//TICTAC TOE GAME
function grid_to_string(grid){
    return "Current grid:\n" + grid[0][0] + grid[0][1] + grid[0][2] + "\n"
    + grid[1][0] + grid[1][1] + grid[1][2] + "\n"
    + grid[2][0] + grid[2][1] + grid[2][2] + "\n";
}
function free_grid(grid){
    for(let r = 0; r<3; r = r+1){
        for(let c = 0; c<3; c = c+1){
            grid[r][c] = "_";
        }
    }
}

function replace(new_string, r,c, g, expected_string){
    if(g[r][c] === expected_string){
        g[r][c] = new_string;
        return true;
    }else{
        return false;
    }
}
function check_winner(g,p){
    return(
        (g[0][0] === p && g[1][0]===p && g[2][2]===p)||
        (g[0][2] === p && g[1][0]===p && g[2][0]===p)||
        (g[0][0] === p && g[1][0]===p && g[2][0]===p)||
        (g[0][1] === p && g[1][1]===p && g[2][1]===p)||
        (g[0][2] === p && g[1][2]===p && g[2][2]===p)||
        (g[0][0] === p && g[0][1]===p && g[0][2]===p)||
        (g[1][0] === p && g[1][1]===p && g[1][2]===p)||
        (g[2][0] === p && g[2][1]===p && g[2][2]===p)||
        );
}

function play_tic_tac_toe(){
    const grid = [["_","_","_"],
                ["_","_","_"],
                ["_","_","_"]];
    while(prompt("Do you want to play tic tac toe?")==="yes"){
        free_grid(grid);
        let current_player ="X";
        while(current_player!=="GAME OVER"){
            const r = parse_int(prompt(grid_to_string(grid)+ "\n Player" + current_player + ": enter row (0 - 2):"),10);
            const c = parse_int(prompt(grid_to_string(grid)+ "\n Player" + current_player + ": enter col (0 - 2):"),10);
            if(replace_string(current_player,r,c,grid,"_")){
                if(check_winner(grid,current_player)){
                    prompt(grid_to_string(grid) + "\nPlayer" + current_player + "wins!");
                    current_player = "GAMEOVER";
                } else {
                    current_player === "X"? "X": "O";
                }
            }else{
                prompt(grid_to_string(grid")"+r+c+") is not" + "an empty slot! Try again!");
            }
        }
    }
    prompt("Hope you had a nice time playing tic tac toe!");
}

play_tic_tac_toe();
//2022/23 paper
function insert_last(xs,x){
    const tmp = pair(x,tail(xs));
    set_tail(xs,tmp);
    return tmp;
}
//Note that the implementation below is wrong because you need a new list for the operations to occurs correctly. 
function make_RCL_wrong(L){
    if(is_null(tail(L))){
        set_tail(L,L);
    }else{
        insert_last(draw_data(make_RCL_wrong(tail(L))),head(L));
    }
    return L;
}

const ys = list(1,2,3);
set_tail(tail(tail(ys)),ys);
insert_last(ys,4);
insert_last(ys,5);
const xs = list(3);
set_tail(xs,xs);
insert_last(xs,5);
draw_data(xs);
draw_data(ys);
//The correct implementation should be as below
function make_RCLS(L){
    let C = pair(head(L),null);
    set_tail(C,C);
    for(let p = tail(L);!is_null(p);p = tail(p)){
        C = insert_last(C,head(p));
    }
    return C;
}

const AB = enum_list(1,10);
const CD = enum_list(11,20);
const EF = enum_list(20,30);
make_RCLS(AB);
function append_RCLS(C1,C2){
    const initial_list = make_RCLS(C2);
    function helper(C1){
        while(!is_null(C1)){
            const tmp = head(C1);
            insert_last(initial_list,tmp);
            return helper(tail(C1));
        }
    }
    helper(reverse(C1));
    return initial_list;
}
const res = draw_data(append_RCLS(CD,EF));
//Model solution given below for remove_last
function remove_last(xs){
    let second_last = xs;
    while(xs!==tail(second_last)){
        second_last = tail(second_last);
    }
    set_tail(second_last,tail(xs));
    return second_last;
}
draw_data(remove_last(res));
//Terminating condition is when your tail is equal to original list 
function RCL_to_stream(C){
    function helper(xs){
        return pair(head(xs),()=> tail(xs)===C? null:helper(tail(xs)));
    }
    return helper(C);
}
const streamA = RCL_to_stream(res);
eval_stream(streamA,20);

