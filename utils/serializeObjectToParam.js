const serialize = ( obj ) => {
  let str = '?' + Object.keys(obj).reduce(function(a, k){
      a.push(k + '=' + obj[k]);
      return a;
  }, []).join('&');
  return str;
}

export { serialize }
