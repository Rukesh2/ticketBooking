export const isoTimeFormat = (dateTime)=>{
  const date = new Date(dateTime)
  const localTIme = date.toLocaleString('en-us',{
    hour:'2-digit',
    minute:'2-digit',
    hour12:true
  });
  return localTIme
}

export const dateFormat = (dateTime)=>{
  const date = new Date(dateTime)
  const localTIme = date.toLocaleDateString('en-us',{
    hour:'2-digit',
    minute:'2-digit',
    hour12:true
  });
  return localTIme
}