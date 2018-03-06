module.exports = function count(s, pairs) {
	const mod = 1000000007;
	let flagNotBreak = true;
	let N = findN(pairs, mod); 
	let exponentMod = findExpMod(pairs, mod);
	let count = 0;

	console.log(exponentMod, "   :  " + N);

	if(s.length == 1) return caseForS_One(pairs, s, N, exponentMod, mod);

  	if(N > 10000000) return;  //can't solve  for N > 1000000 yet

	for(let k = 1; k <= N; k++){		
		for(let j = 0; j < s.length; j++){		
			if(gcd(k + j, N) === 1){
				if(s[j] === '1')
					continue;
				else
					flagNotBreak = false;
					break;
				}			
			else{
				if(s[j] === '0')
					continue;				
				else
					flagNotBreak = false;
					break;
			}			
		}
		if(flagNotBreak) count++;
		flagNotBreak = true;
	}
	
	return multiMod(count ,exponentMod, mod);
}


let findN = function(pairs, mod){
	let N = 1;

	for(let i = 0; i < pairs.length; i++)
		N *= pairs[i][0];  
	
	return N;
}

let findExpMod = function(pairs, mod){
	let exp = 1,currentExp;

	for(let i = 0; i < pairs.length; i++){
		currentExp = powerMod(pairs[i][0], pairs[i][1] - 1, mod);
		exp = multiMod(exp, currentExp, mod);
	}

	return exp;
}

let caseForS_One = function(pairs, s, N, exponentMod,mod){
	let caseN = N;
	let count = 0;
	let caseCount = 0;
	
    for (let i = 0; i < pairs.length; i++){
		caseCount = caseN / pairs[i][0];
		caseN -= caseCount;
    	count += caseCount;
	}
	
	if(s[0] == '0')
		return (count * exponentMod) % mod;
	else 
		return ((N - count) * exponentMod) % mod;  
}

let powerMod = function(base, exponent, modulus){ //Modular exponentiation, avoiding overflow
	let result = 1; 
	 while (exponent > 0){
		 if ((exponent % 2) == 1)
			   result = multiMod(result, base, modulus);
		  exponent = Math.floor(exponent / 2);
		  base = multiMod(base, base, modulus);           
	 }
	 return result;
 }

let multiMod = function(a, b, mod){
	if(a * b < Number.MAX_SAFE_INTEGER) return a * b;

	let result = 0;
	a %= mod;
  
	while(b > 0){
		if((b % 2) === 1)
		  result = (result + a) % mod;
  
		a = (a * 2) % mod;
  
		b = Math.floor(b / 2);
	}
  
	return result % mod;
  }

let gcd = function(a,b) {
    a = Math.abs(a);
    b = Math.abs(b);
    if (b > a) {var temp = a; a = b; b = temp;}
    while (true) {
        if (b == 0) return a;
        a %= b;
        if (a == 0) return b;
        b %= a;
    }
}

  


