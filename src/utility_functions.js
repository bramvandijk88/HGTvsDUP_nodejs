export let setPar = function(parname, value)
{
  this[parname] = value;
}

export let mean = function(arr)
{
  return arr.reduce((cum,val) => cum + val, 0) / arr.length;
}

