exports.response = function (s, sol) {
    let rep = [];
    for (var i=0; i<sol.length; i++) {
        if (s[i] == sol[i]) {
            rep.unshift('✅');
        } else {
            for (j=0; j<sol.length; j++) {
                if (s[i] == sol[j]) {
                    rep.push('❎'); break;
                }

            }
        }
    }

    while (rep.length < sol.length) {
        rep.push('⛔');
    }

    return rep.join(' ');
}

exports.gen_string = function (length) {
        let result           = '';
        let characters       = 'ABCDEF';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++ ) {

            // Every letter appears only once
            do { //sadly it's a non optimized 'var' (instead of 'let') because of the condition
                var candidate = characters.charAt(Math.floor(Math.random() * charactersLength));
            } while (result.includes(candidate) );

            result += candidate;
           
        }
        return result;
}