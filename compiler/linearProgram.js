/**
 * linear programme designed language
 * 
 * Stm -> Stm;Stm;          (CompoundStm)       ExpList -> Exp,ExpList  (PairExpList)
 * Stm -> id := Exp         (AssignStm)         ExpList -> Exp          (LastExpList)
 * Stm -> print(ExpList)    (PrintStm)          Binop -> +              (Plus)
 * Exp -> id                (IdExp)             Binop -> -              (Minus)
 * Exp -> num               (NumExp)            Binop -> x              (Times)
 * Exp -> Exp Binop Exp     (OpExp)             Binop -> /              (Div)
 * Exp -> (Stm,Exp)         (EseqExp)
 * 
 * Stm is a sentence
 * Exp is a expression
 * 
 * a := 5 + 3; b := (print(a,a-1) , 10*a) ; print(b)
 * Source code not easy to handle,
 * so esay way to deal with it : tree!
 * Every Stm or every Exp is a node!
 * Grammar expression[Stm , Exp],of its right number of symbol same as nodes of tree
 * 
 * 
 * 
 * Define a data structure according to the above tree
 * 
 * Grammar              typedef
 * =============================
 * Stm                  A_stm
 * Exp                  A_exp
 * ExpList              A_explist
 * id                   string
 * num                  int
 * 
 */



function sizeof(o) {
    return 0;
}

//typedef


let string = String;
let A_stm = A_stm_;
let A_exp = A_exp_;
let A_expList = A_expList_;

let A_binop = {
    A_plus: 1,
    A_minus: 2,
    A_times: 3,
    A_div: 4
};




function A_stm_() {
    this.kind = undefined;//KIND
    this.u = {
        compound: {
            stm1: undefined,//refer to A_stm
            stm2: undefined,//refer to A_stm
        },
        assign: {
            id: undefined,//refer to string
            exp: undefined,//refer to A_exp

        },
        print: {
            exps: undefined,//A_expList
        }


    };
}

xy.static_impl(A_stm_, {
    KIND: {
        A_compoundStm: 1,
        A_assignStm: 2,
        A_printStm: 3
    }
});



function A_CompoundStm(/* A_stm */stm1,/*A_stm*/stm2) {//return A_stm
    let s = checkd_malloc(sizeof(s));
    s.kind = A_stm.KIND.A_compoundStm;
    s.u.compound.stm1 = stm1;
    s.u.compound.stm2 = stm2;
    return s;

}

function A_AssignStm(/* string */ id,/* A_exp */ exp) {

}

function A_PrintStm(/* A_expList */ exps) {

}

function A_exp_() {

    this.kind = undefined;//KIND
    this.u = {
        id: undefined,//refer to string
        num: undefined,//refer to int
        op: {
            left: undefined,//refer to A_exp
            right: undefined,//refer to A_exp
            oper: undefined,//A_binop
        },
        eswq: {
            stm: undefined,//A_stm
            exp: undefined//A_exp
        }

    };
}

xy.static_impl(A_exp_, {
    KIND: {
        A_idExp: 1,
        A_numExp: 2,
        A_opExp: 3,
        A_eseqExp: 3
    }
});

function A_IdExp(/* string */ id) {//A_exp

}

function A_NumExp(/* int */ num) {//A_exp

}

function A_OpExp(/* A_exp */ left,/* A_binop */ oper,/* A_exp */ right) {//A_exp

}

function A_EseqExp(/* A_stm */ stm,/* A_exp */ exp) {//A_exp

}

function A_expList_() {
    this.kind = undefined;//KIND
    this.u = {
        pair: {
            head: undefined,//A_exp
            tail: undefined//A_expList
        },
        last: undefined,//A_exp
    }
}

xy.static_impl(A_expList_, {
    KIND: {
        A_pairExpList: 1,
        A_lastExpList: 2
    }
});







