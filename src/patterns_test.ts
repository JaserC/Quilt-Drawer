import * as assert from 'assert';
import { NW, NE, SE, SW, GREEN, RED, ROUND, STRAIGHT, Square, Row, rcons, qcons, qnil, rnil, Quilt, qconcat } from './quilt';
import { PatternA, PatternB, PatternC } from './patterns';


describe('patterns', function() {

  // Feel free to use these in your tests (though it's not required)
  // and create any other consts you find useful:
  
  const nw_rnd_grn: Square = {shape: ROUND, color: GREEN, corner: NW};
  const nw_rnd_red: Square = {shape: ROUND, color: RED, corner: NW};
  const nw_strt_grn: Square = {shape: STRAIGHT, color: GREEN, corner: NW};
  const nw_strt_red: Square = {shape: STRAIGHT, color: RED, corner: NW};

  const ne_rnd_grn: Square = {shape: ROUND, color: GREEN, corner: NE};
  const ne_rnd_red: Square = {shape: ROUND, color: RED, corner: NE};
  // const ne_strt_grn: Square = {shape: STRAIGHT, color: GREEN, corner: NE};
  // const ne_strt_red: Square = {shape: STRAIGHT, color: RED, corner: NE};

  const se_rnd_grn: Square = {shape: ROUND, color: GREEN, corner: SE};
  const se_rnd_red: Square = {shape: ROUND, color: RED, corner: SE};
  const se_strt_grn: Square = {shape: STRAIGHT, color: GREEN, corner: SE};
  const se_strt_red: Square = {shape: STRAIGHT, color: RED, corner: SE};

  const sw_rnd_grn: Square = {shape: ROUND, color: GREEN, corner: SW};
  const sw_rnd_red: Square = {shape: ROUND, color: RED, corner: SW};
  // const sw_strt_grn: Square = {shape: STRAIGHT, color: GREEN, corner: SW};
  // const sw_strt_red: Square = {shape: STRAIGHT, color: RED, corner: SW};

  it('PatternA', function() {
    const gr_rnd_row: Row = rcons(nw_rnd_grn, rcons(nw_rnd_grn, rnil));
    const rd_rnd_row: Row = rcons(nw_rnd_red, rcons(nw_rnd_red, rnil));
    
    //Zero-One-Many Heuristic (at least 2 per)
    //1 test for the zero subdomain (only 0 will yield 0 recursive calls)
    //3 tests for the one subdomain
    //3 tests for the many subdomain 

    //SINGLE TEST USED TO TEST 0 ZERO SUBDOMAIN
    assert.deepStrictEqual(PatternA(0n), qnil); //0 is the only input that doesn't make any recursive calls

    //THREE TESTS FOR THE 1 SUBDOMAIN
    assert.deepStrictEqual(PatternA(1n), qcons(gr_rnd_row, qnil)); //Tests a single recursive call and undefined color arg
    assert.deepStrictEqual(PatternA(1n, GREEN), qcons(gr_rnd_row, qnil)); //Tests a single recursive call and green color arg
    assert.deepStrictEqual(PatternA(1n, RED), qcons(rd_rnd_row, qnil)); //Tests a single recursive call and red color arg

    //THREE TESTS FOR THE MANY SUBDOMAIN
    assert.deepStrictEqual(PatternA(2n), qcons(gr_rnd_row, qcons(gr_rnd_row, qnil))); //Boundary case (2 calls) with undefined color arg
    assert.deepStrictEqual(PatternA(3n, GREEN),
         qcons(gr_rnd_row, qcons(gr_rnd_row, qcons(gr_rnd_row, qnil)))); //3 recursive calls with green color arg
    assert.deepStrictEqual(PatternA(4n, RED),
         qcons(rd_rnd_row, qcons(rd_rnd_row, qcons(rd_rnd_row, qcons(rd_rnd_row, qnil))))); //4 recurisve calls with red color arg

    // THREE TESTS FOR ERROR SUBDOMAIN (as created by that conditional)
    assert.throws(() => PatternA(-1n, GREEN), Error); //Not exactly a boundary case, but close to it
    assert.throws(() => PatternA(-10n, RED), Error); //A more extreme case
    assert.throws(() => PatternA(-100n), Error); //A more extreme case
  });

  it('PatternB', function() {
    // TODO: Add tests in problem 1g

    const gr_rnd_row1: Row = rcons(se_rnd_grn, rcons(sw_rnd_grn, rnil));
    const gr_rnd_row2: Row = rcons(ne_rnd_grn, rcons(nw_rnd_grn, rnil));

    const rd_rnd_row1: Row = rcons(se_rnd_red, rcons(sw_rnd_red, rnil));
    const rd_rnd_row2: Row = rcons(ne_rnd_red, rcons(nw_rnd_red, rnil));

    const gr_quilt: Quilt = qcons(gr_rnd_row1, qcons(gr_rnd_row2, qnil));
    const rd_quilt: Quilt = qcons(rd_rnd_row1, qcons(rd_rnd_row2, qnil));

    //Zero-One-Many Heuristic (at least 2 per)
    //1 test for the zero subdomain (only 0 will yield 0 recursive calls)
    //3 tests for the one subdomain
    //3 tests for the many subdomain 

    //SINGLE TEST USED TO TEST 0 ZERO SUBDOMAIN (base case)
    assert.deepStrictEqual(PatternB(0n), qnil); //0 is the only input that doesn't make any recursive calls

    //THREE TESTS FOR THE 1 SUBDOMAIN
    assert.deepStrictEqual(PatternB(2n), qcons(gr_rnd_row1, qcons(gr_rnd_row2, qnil))); //Tests a single recursive call and undefined color arg
    assert.deepStrictEqual(PatternB(2n, GREEN), qcons(gr_rnd_row1, qcons(gr_rnd_row2, qnil))); //Tests a single recursive call and green color arg
    assert.deepStrictEqual(PatternB(2n, RED), qcons(rd_rnd_row1, qcons(rd_rnd_row2, qnil))); //Tests a single recursive call and red color arg

    //THREE TESTS FOR THE MANY SUBDOMAIN
    assert.deepStrictEqual(PatternB(4n), qconcat(gr_quilt, gr_quilt)); //Boundary case (2 calls) with undefined color param
    assert.deepStrictEqual(PatternB(6n, GREEN), qconcat(qconcat(gr_quilt, gr_quilt), gr_quilt)); //Tests 3 recursive calls with a green color arg
    assert.deepStrictEqual(PatternB(8n, RED), qconcat(qconcat(qconcat(rd_quilt, rd_quilt), rd_quilt), rd_quilt)); //Tests 4 recursive calls with a red color arg

    // THREE TESTS FOR LESS THAN 0 SUBDOMAIN (as created by that conditional)
    assert.throws(() => PatternB(-1n, GREEN), Error); //Tests Green color param as well
    assert.throws(() => PatternB(-5n), Error); //Tests undefined color param 
    assert.throws(() => PatternB(-10n, RED), Error); //Tests red color param

    //THREE TESTS FOR ODD NUMBERS SUBDOMAIN (as created by that conditional)
    assert.throws(() => PatternB(1n, GREEN), Error); //Tests Green color param 
    assert.throws(() => PatternB(3n, RED), Error); //Tests red color param
    assert.throws(() => PatternB(5n), Error); //Tests undefined color param
  });

  it('PatternC', function() {
    const gr_rnd_row1: Row = rcons(nw_strt_grn, rcons(se_strt_grn, rnil));
    const gr_rnd_row2: Row = rcons(se_strt_grn, rcons(nw_strt_grn, rnil));

    const rd_rnd_row1: Row = rcons(nw_strt_red, rcons(se_strt_red, rnil));
    const rd_rnd_row2: Row = rcons(se_strt_red, rcons(nw_strt_red, rnil));

    //Zero-One-Many Heuristic (at least 2 per)
    //3 test for the zero subdomain (0n yields no recursive calls, but neither does 1n)
    //3 tests for the one subdomain
    //2 tests for the many subdomain 

    //THREE TESTS USED TO TEST 0 ZERO SUBDOMAIN (base cases)
    assert.deepStrictEqual(PatternC(0n), qnil); //0 is an input that leads to no recursive calls
    assert.deepStrictEqual(PatternC(1n, GREEN), qcons(gr_rnd_row1, qnil)); //0 recursive calls with a green color arg
    assert.deepStrictEqual(PatternC(1n, RED), qcons(rd_rnd_row1, qnil)); //0 recurisve calls with a red color arg

    //THREE TESTS FOR THE 1 SUBDOMAIN
    assert.deepStrictEqual(PatternC(2n, GREEN), qcons(gr_rnd_row1, qcons(gr_rnd_row2, qnil))); //Boundary case (1 call) with an undefined color arg
    assert.deepStrictEqual(PatternC(2n, RED), qcons(rd_rnd_row1, qcons(rd_rnd_row2, qnil))); //Boundary case (1 call) with an undefined color arg
    assert.deepStrictEqual(PatternC(3n), qcons(gr_rnd_row1, qcons(gr_rnd_row2, qcons(gr_rnd_row1, qnil)))); //Boundary Case (1 recursive call) with undefined color arg
    
    //TWO TESTS FOR THE MANY SUBDOMAIN 
    assert.deepStrictEqual(PatternC(4n, RED), qcons(rd_rnd_row1, qcons(rd_rnd_row2, qcons(rd_rnd_row1, qcons(rd_rnd_row2, qnil))))); //2 recurisve calls (boundary case) with red color arg
    assert.deepStrictEqual(PatternC(6n), qcons(gr_rnd_row1, qcons(gr_rnd_row2, qcons(gr_rnd_row1, qcons(gr_rnd_row2, qcons(gr_rnd_row1, qcons(gr_rnd_row2, qnil))))))); //3 recursive calls with undefined color arg

    // THREE TESTS FOR ERROR SUBDOMAIN (as created by that conditional)
    assert.throws(() => PatternC(-1n, GREEN), Error); //Boundary case
    assert.throws(() => PatternC(-10n, RED), Error); //A more extreme case
    assert.throws(() => PatternC(-100n), Error); //A more extreme case
  });
});
