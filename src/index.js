module.exports = function count(s, pairs) { //

	let N = findN(pairs);
	//s = s.split("").reverse().join("");

	if(N > 1000000) return;  //can't solve yet for N > 1000000

	let resultMask = '1'.repeat(N);
	let tempMask = [];

	for(let j = 0; j < s.length; j++){		//iterate over bits in bit mask for(let j = 0; j < s.length; j++){
		for(let k = 1; k <= N; k++){		//iterate over possible numbers
			if(s[j] === '1'){
				if(gcd(k + j, N) === 1){
					tempMask.push('1');
				}
				else
					tempMask.push('0');

			}
			else if(s[j] === '0'){
				if(gcd(k + j, N) !== 1){
					tempMask.push('1');
				}
				else
					tempMask.push('0');
			}			
		}
		resultMask = logicalORInString(resultMask, tempMask.join(""));
		tempMask = [];
	}
	
	return countK(resultMask);
}

let logicalORInString = function(firstMask, secondMask){
	let resultMask = [];

	for(let i = 0; i < firstMask.length; i++){
		resultMask.push((+firstMask[i] & +secondMask[i]) + "");
	}

	return resultMask.join("");
}

let countK = function(resultMask){
	let count = 0;

	for(let i = 0; i < resultMask.length; i++){
		if(resultMask[i] === '1') count++;
	}

	return count;
}

let findN = function(pairs){
	let N = 1;

	for(let i = 0; i < pairs.length; i++)
		N *= Math.pow(pairs[i][0], pairs[i][1]);
	
	return N;
}

let gcd = function(a, b){
	if ( ! b) {
        return a;
    }

    return gcd(b, a % b);
}

//console.log(count('0', [[3, 1], [2, 1]]));

