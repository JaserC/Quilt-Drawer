import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { Color, RED, GREEN, Quilt } from './quilt';
import { PatternA, PatternB, PatternC } from './patterns';
import { QuiltElem } from './quilt_draw';
import { QuiltTableElem } from './quilt_draw_table';
import { symmetrize } from './quilt_ops';
import { QuiltForm } from './quilt_form';


// Returns the pattern number, which must be A-C, or undefined if it was not
// provided or is not in the valid range.
const getPattern = (params: URLSearchParams): string|undefined => {
  if (!params.has("pattern"))
    return undefined;

  switch (params.get("pattern")) {
    case "A": return "A";
    case "B": return "B";
    case "C": return "C";
    default:  return undefined;
  }
}


// Returns the color requested or undefined if none was specified.
const getColor = (params: URLSearchParams): Color|undefined => {
  const colorStr = params.get("color");
  if (colorStr === null) {
    return undefined;
  } else {
    const color = colorStr.toLowerCase();
    if (color === "red") {
      return RED; 
    } else if (color === "green") {
      return GREEN;
    } else {
      return undefined;
    }
  }
}


// Returns the number of rows, which must be a natural number. Defaults to 4.
const getRows = (params: URLSearchParams): number => {
  const rowStr = params.get("rows");
  if (rowStr === null) {
    return 4;
  } else {
    const rows = parseInt(rowStr);
    return !isNaN(rows) ? rows : 4;
  }
};


// TODO: update getQuilt, getSymmetrizedQuilt, and Pattern function calls with new params as necessary

// Returns the quilt with the given pattern.
// Throws an exception if the pattern is not A-C.
const getQuilt = (pattern: string, row: bigint, color?: Color | undefined): Quilt => {
  switch (pattern) {
    case "A": return PatternA(row, color);
    case "B": return PatternB(row, color);
    case "C": return PatternC(row, color);
    default:  throw new Error('impossible');
  }
};

// Returns the quilt with the given pattern, symmetrized if indicated in params.
// Throws an exception if the pattern is not A-C
const getSymmetrizedQuilt = (params: URLSearchParams, pattern: string, row: bigint, color?: Color): Quilt => {
  const sym: boolean = params.has("symmetrize");
  if (sym) {
    return symmetrize(getQuilt(pattern, row, color));
  } else {
    return getQuilt(pattern, row, color);
  }
};

// Returns the given quilt as an element to be rendered, as a table if indicated 
// in params
const getQuiltElem = (params: URLSearchParams, quilt: Quilt): JSX.Element => {
  const table: boolean = params.has("table");
  if (table) {
    return <React.StrictMode><QuiltTableElem quilt={quilt}/></React.StrictMode>;
  } else {
    return <React.StrictMode><QuiltElem quilt={quilt}/></React.StrictMode>;
  }
  // Note: here, React replaces the custom tags with the HTML returned by the 
  // function with that name. e.g. <QuiltTableElem quilt={quilt}/> is equivalent
  // to the result of QuiltTableElem(quilt)
}


// Parse the arguments to the page, which can indicate the color and number of
// rows in the quilt.
const params: URLSearchParams = new URLSearchParams(window.location.search);
const colorParam: Color | undefined = getColor(params);  // TODO: utilize return value for problem 1c
const rowParam: bigint = BigInt(getRows(params));   // TODO: utilize return value for problem 1e

// Create a root in which to show the quilt.
const main: HTMLElement|null = document.getElementById('main');
if (main === null)
  throw new Error('missing main element');
const root: Root = createRoot(main);

// Invoke the function for the pattern given in the query params.
const pattern: string|undefined = getPattern(params);
if (pattern === undefined) {
  root.render(QuiltForm({}));  // redirect with default pattern
} else {
  // Display the quilt in the page.
  try {
    // TODO: Assign "result" to the getSymmetrizedQuilt call instead for problem 4h
    // getQuilt(pattern, rowParam, colorParam); 
    const result = getSymmetrizedQuilt(params, pattern, rowParam, colorParam);

    // TODO: Remove contents of this root.render with the getQuiltElem call in
    //    the next line for problem 6c
    root.render(getQuiltElem(params, result));
    
  } catch (e: unknown) {
    if (e instanceof Error) {
      root.render(<p><b>Error</b>: {e.message}</p>);
    } else {
      throw e;
    }
  }
}
