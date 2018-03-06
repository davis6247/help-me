module.exports = function count(s, pairs) { // 

	const mod = 1000000007;
	let N = findN(pairs), flagNotBreak = true;
	let exponentMod = findExpMod(pairs, mod);

	console.log(exponentMod);

	if(N > 10000000) return;  //can't solve yet for N > 1000000
	      											   
	let count = 0;

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

let findExpMod = function(pairs, mod){
	let exp = 1,currentExp;

	for(let i = 0; i < pairs.length; i++){
		currentExp = powerMod(pairs[i][0], pairs[i][1] - 1, mod);
		exp = multiMod(exp, currentExp, mod);
	}

	return exp;
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

let findN = function(pairs){
	let N = 1;

	for(let i = 0; i < pairs.length; i++)
		N *= pairs[i][0];  
	
	return N;
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

// console.log(count('01', [[3, 3]]))

// console.log(count('1011', [[3, 1000000000]]))


