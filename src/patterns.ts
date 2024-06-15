import { Quilt, Square, Color, qnil, rnil, rcons, qcons} from './quilt';

/** Returns a quilt in pattern "A". */
export const PatternA = (row: bigint, color?: Color): Quilt => {
  if (row < 0){
    throw new Error("Negative row passed"); 
  }
  else if(row === 0n){
    return qnil;
  }
  else{
    const squareColor : Color = color != undefined ? color : "GREEN"; 
    const s : Square = {shape: "ROUND", color: squareColor, corner: "NW"};
    return qcons(rcons(s, rcons(s, rnil)), PatternA(row-1n, color));
  }
}

/** Returns a quilt in pattern "B". */
export const PatternB = (row: bigint, color?: Color): Quilt => {
  if (row < 0n){
    throw new Error("Negative row passed");
  }
  else if (row % 2n === 1n){
    throw new Error("Odd # of rows");
  }
  else if (row === 0n){
    return qnil;  
  }
  else{
    const squareColor : Color = color != undefined ? color : "GREEN"; 

    const s : Square = {shape: "ROUND", color: squareColor, corner: "SE"};
    const t : Square = {shape: "ROUND", color: squareColor, corner: "SW"};
    const u : Square = {shape: "ROUND", color: squareColor, corner: "NE"};
    const v : Square = {shape: "ROUND", color: squareColor, corner: "NW"};

    return qcons(rcons(s, (rcons(t, rnil))), qcons(rcons(u, (rcons(v, rnil))), PatternB(row-2n, color)));
  }
}

/** Returns a quilt in pattern "C". */
export const PatternC = (row: bigint, color?: Color): Quilt => {
  const squareColor : Color = color != undefined ? color : "GREEN"; 

  const s : Square = {shape: "STRAIGHT", color: squareColor, corner: "NW"};
  const t : Square = {shape: "STRAIGHT", color: squareColor, corner: "SE"};
  const u : Square = {shape: "STRAIGHT", color: squareColor, corner: "SE"};
  const v : Square = {shape: "STRAIGHT", color: squareColor, corner: "NW"};
  if (row < 0n){
    throw new Error("Negative row # passed");  
  }
  else if (row === 0n){
    return qnil;  
  }
  else if(row === 1n){
    return qcons(rcons(s, (rcons(t, rnil))), qnil);
  }
  else{
    return qcons(rcons(s, (rcons(t, rnil))), qcons(rcons(u, (rcons(v, rnil))), PatternC(row-2n, color)));
  }
}
