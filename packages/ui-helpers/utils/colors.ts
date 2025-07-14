// @ts-ignore
export function hexToRgb(h="#ffffff"){return['0x'+h[1]+h[2]|0,'0x'+h[3]+h[4]|0,'0x'+h[5]+h[6]|0]}
export function rgbToHex(r,g,b){return"#"+((1<<24)+(r<<16)+(g<<8)+ b).toString(16).slice(1);}

export function hexToRgba(color:string,opacity:number){
  console.log("-> color", color);
  const [r,g,b] = hexToRgb(color)
  return `rgba(${r},${g},${b},${opacity})`
}