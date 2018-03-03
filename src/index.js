module.exports = function count(s, pairs) { //

	let N = findN(pairs);

	if(N > 10000007) return;  //can't solve yet for N > 1000000
													   
	let tempMask = [], count = 0;

	for(let k = 1; k <= N; k++){		
		for(let j = 0; j < s.length; j++){		
			if(s[j] === '1'){
				if(gcd(k + j, N) === 1){
					tempMask.push(1);
				}
				else
					tempMask.push(0);

			}
			else if(s[j] === '0'){
				if(gcd(k + j, N) !== 1){
					tempMask.push(1);
				}
				else
					tempMask.push(0);
			}			
		}
		if(logicalOR(tempMask)) count++;
		tempMask = [];
	}
	
	return count;
}

let logicalOR = function(bitMaskArr){
	let temp = 1;
	for(let i = 0; i < bitMaskArr.length; i++){
		temp = (temp & bitMaskArr[i]);
	}

	if(temp === 1) return true;

	return false;
}

let findN = function(pairs){
	let N = 1;

	for(let i = 0; i < pairs.length; i++){
		N *= Math.pow(pairs[i][0], pairs[i][1]);
		//N = N % 1000000007;
	}		    
	
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

//console.log(count('111100101000', [[13, 1], [3, 1], [17, 1], [11, 1], [2, 1], [23, 1], [29, 1], [19, 1]]));

