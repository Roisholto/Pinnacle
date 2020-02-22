export default function array_rand(arr){
    Array.isArray(arr)
        return arr[Math.floor(Math.random()*arr.length)];

    return undefined
}
