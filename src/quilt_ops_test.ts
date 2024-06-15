import * as assert from 'assert';
import { NW, NE, SW, SE, GREEN, RED, ROUND, STRAIGHT, Square, rnil, rcons, qnil, qcons, Row } from './quilt';
import { sflip_vert, rflip_vert, qflip_vert, sflip_horz, rflip_horz, qflip_horz, sew, symmetrize } from './quilt_ops';


describe('quilt_ops', function() {

  // Feel free to use these consts in your tests (though it's not required)
  // and create any others you find useful!

  const nw_rnd_grn: Square = {shape: ROUND, color: GREEN, corner: NW};
  const nw_rnd_red: Square = {shape: ROUND, color: RED, corner: NW};
  const nw_strt_grn: Square = {shape: STRAIGHT, color: GREEN, corner: NW};
  const nw_strt_red: Square = {shape: STRAIGHT, color: RED, corner: NW};

  const ne_rnd_grn: Square = {shape: ROUND, color: GREEN, corner: NE};
  const ne_rnd_red: Square = {shape: ROUND, color: RED, corner: NE};
  const ne_strt_grn: Square = {shape: STRAIGHT, color: GREEN, corner: NE};
  const ne_strt_red: Square = {shape: STRAIGHT, color: RED, corner: NE};

  const se_rnd_grn: Square = {shape: ROUND, color: GREEN, corner: SE};
  const se_rnd_red: Square = {shape: ROUND, color: RED, corner: SE};
  const se_strt_grn: Square = {shape: STRAIGHT, color: GREEN, corner: SE};
  const se_strt_red: Square = {shape: STRAIGHT, color: RED, corner: SE};

  const sw_rnd_grn: Square = {shape: ROUND, color: GREEN, corner: SW};
  const sw_rnd_red: Square = {shape: ROUND, color: RED, corner: SW};
  const sw_strt_grn: Square = {shape: STRAIGHT, color: GREEN, corner: SW};
  const sw_strt_red: Square = {shape: STRAIGHT, color: RED, corner: SW};

  const r_nw_rnd_grn : Row = rcons(nw_rnd_grn, rnil);
  const r_sw_rnd_grn : Row = rcons(sw_rnd_grn, rnil);

  const r_ne_rnd_grn : Row = rcons(ne_rnd_grn, rnil);
  const r_se_rnd_grn : Row = rcons(se_rnd_grn, rnil);

  const r_rnd_grn : Row = rcons(nw_rnd_grn, rcons(ne_rnd_grn, rnil));
  const r_swe_rnd_grn : Row = rcons(se_rnd_grn, rcons(sw_rnd_grn, rnil));
  const r_sew_rnd_grn : Row = rcons(sw_rnd_grn, rcons(se_rnd_grn, rnil));

  const r3_rnd_grn : Row = rcons(nw_rnd_grn, rcons(ne_rnd_grn, rcons(nw_rnd_grn, rcons(ne_rnd_grn, rnil))));
  const r4_rnd_grn : Row = rcons(se_rnd_grn, rcons(sw_rnd_grn, rcons(se_rnd_grn, rcons(sw_rnd_grn, rnil))));
  const r5_rnd_grn : Row = rcons(sw_rnd_grn, rcons(se_rnd_grn, rcons(sw_rnd_grn, rcons(se_rnd_grn, rnil))));

 


  it('sflip_vert', function() {
    // TODO: add more sflip_vert tests beyond this random example test

    //16 POSSIBLE UNIQUE SQUARES, SO 16 TESTS (within our <20 tests heuristics for finite inputs)

    assert.deepStrictEqual(sflip_vert(nw_rnd_grn), sw_rnd_grn);
    assert.deepStrictEqual(sflip_vert(nw_rnd_red), sw_rnd_red);
    assert.deepStrictEqual(sflip_vert(nw_strt_grn), sw_strt_grn);
    assert.deepStrictEqual(sflip_vert(nw_strt_red), sw_strt_red);

    assert.deepStrictEqual(sflip_vert(ne_rnd_grn), se_rnd_grn);
    assert.deepStrictEqual(sflip_vert(ne_rnd_red), se_rnd_red);
    assert.deepStrictEqual(sflip_vert(ne_strt_grn), se_strt_grn);
    assert.deepStrictEqual(sflip_vert(ne_strt_red), se_strt_red);

    assert.deepStrictEqual(sflip_vert(se_rnd_grn), ne_rnd_grn);
    assert.deepStrictEqual(sflip_vert(se_rnd_red), ne_rnd_red);
    assert.deepStrictEqual(sflip_vert(se_strt_grn), ne_strt_grn);
    assert.deepStrictEqual(sflip_vert(se_strt_red), ne_strt_red);

    assert.deepStrictEqual(sflip_vert(sw_rnd_grn), nw_rnd_grn);
    assert.deepStrictEqual(sflip_vert(sw_rnd_red), nw_rnd_red);
    assert.deepStrictEqual(sflip_vert(sw_strt_grn), nw_strt_grn);
    assert.deepStrictEqual(sflip_vert(sw_strt_red), nw_strt_red);
  });

  it('rflip_vert', function() {
    // TODO: add more rflip_vert tests beyond this random example test

    //Zero-One-Many Heuristic (at least 2 tests per) 
    //1 test for the zero subdomain (only rnil will yield 0 recursive calls)
    //2 tests for the one subdomain
    //2 tests for the many subdomain 

    //Tests 0 subdomain (base case)
    assert.deepStrictEqual(rflip_vert(rnil), rnil); //Only input that will test 0 subdomain

    //2 TESTS FOR 1 SUBDOMAIN 
    assert.deepStrictEqual(rflip_vert(r_nw_rnd_grn), r_sw_rnd_grn); //1 recursive call on row of length 1
    assert.deepStrictEqual(rflip_vert(r_se_rnd_grn), r_ne_rnd_grn); //1 recurisve call on row of length 1 

    //2 TESTS FOR MANY SUBDOMAIN
    assert.deepStrictEqual(rflip_vert(r_rnd_grn), r_sew_rnd_grn); // Boundary case (2 recursive calls)
    assert.deepStrictEqual(rflip_vert(r3_rnd_grn), r5_rnd_grn); //Tests 4 recursive calls
  });

  it('qflip_vert', function() {
    // TODO: add more qflip_vert tests beyond this random example test

    //Zero-One-Many Heuristic (at least 2 tests per) 
    //1 test for the zero subdomain (only qnil will yield 0 recursive calls)
    //2 tests for the one subdomain
    //2 tests for the many subdomain 

    //Tests the 0 subdomain (base case)
    assert.deepStrictEqual(qflip_vert(qnil), qnil); //Only input that will test 0 subdomain

    //2 TESTS FOR 1 SUBDOMAIN
    //Quilts with a single row will test the 1 subdomain
    assert.deepStrictEqual(qflip_vert(qcons(r_nw_rnd_grn, qnil)),
        qcons(rcons(sw_rnd_grn, rnil), qnil)); //Tests a single recursive call 
    assert.deepStrictEqual(qflip_vert(qcons(r_se_rnd_grn, qnil)),
        qcons(rcons(ne_rnd_grn, rnil), qnil)); //Tests a single recursive call 

    //2 TESTS FOR THE MANY SUBDOMAIN
    //Tests quilts that are comprised of multiple rows to test the row-order flipping behavior
    assert.deepStrictEqual(qflip_vert(qcons(r_nw_rnd_grn, qcons(r_se_rnd_grn, qnil))), qcons(r_ne_rnd_grn, qcons(r_sw_rnd_grn, qnil))) //Boundary case (2 recursive calls)(2 rows in quilt)
    assert.deepStrictEqual(qflip_vert(qcons(r_ne_rnd_grn, qcons(r_se_rnd_grn, qcons(r_nw_rnd_grn, qnil)))), qcons(r_sw_rnd_grn, qcons(r_ne_rnd_grn, qcons(r_se_rnd_grn, qnil)))); //3 recursive calls (3 rows in quilt)

  });

  it('sflip_horz', function() {
    // TODO: add more sflip_horz tests beyond this random example test
    //16 POSSIBLE UNIQUE SQUARES, SO 16 TESTS (within our <20 tests heuristics for finite inputs)

    assert.deepStrictEqual(sflip_horz(nw_rnd_grn), ne_rnd_grn);
    assert.deepStrictEqual(sflip_horz(nw_rnd_red), ne_rnd_red);
    assert.deepStrictEqual(sflip_horz(nw_strt_grn), ne_strt_grn);
    assert.deepStrictEqual(sflip_horz(nw_strt_red), ne_strt_red);

    assert.deepStrictEqual(sflip_horz(ne_rnd_grn), nw_rnd_grn);
    assert.deepStrictEqual(sflip_horz(ne_rnd_red), nw_rnd_red);
    assert.deepStrictEqual(sflip_horz(ne_strt_grn), nw_strt_grn);
    assert.deepStrictEqual(sflip_horz(ne_strt_red), nw_strt_red);

    assert.deepStrictEqual(sflip_horz(se_rnd_grn), sw_rnd_grn);
    assert.deepStrictEqual(sflip_horz(se_rnd_red), sw_rnd_red);
    assert.deepStrictEqual(sflip_horz(se_strt_grn), sw_strt_grn);
    assert.deepStrictEqual(sflip_horz(se_strt_red), sw_strt_red);

    assert.deepStrictEqual(sflip_horz(sw_rnd_grn), se_rnd_grn);
    assert.deepStrictEqual(sflip_horz(sw_rnd_red), se_rnd_red);
    assert.deepStrictEqual(sflip_horz(sw_strt_grn), se_strt_grn);
    assert.deepStrictEqual(sflip_horz(sw_strt_red), se_strt_red);
  });

  it('rflip_horz', function() {
    // TODO: add more rflip_horz tests beyond this random example test

    //Zero-One-Many Heuristic (at least 2 tests per) 
    //1 test for the zero subdomain (only rnil will yield 0 recursive calls)
    //2 tests for the one subdomain
    //2 tests for the many subdomain 

    //1 TEST FOR 0 SUBDOMAIN 
    assert.deepStrictEqual(rflip_horz(rnil), rnil); //Only input that yields 0 recursive calls 

    //2 TESTS FOR 1 SUBDOMAIN (Boundary cases)
    //Rows with only 1 square
    assert.deepStrictEqual(rflip_horz(r_nw_rnd_grn), r_ne_rnd_grn); //Tests a single recursive call
    assert.deepStrictEqual(rflip_horz(r_se_rnd_grn), r_sw_rnd_grn); //Tests a single recursive call

    //2 TESTS FOR MANY SUBDOMAIN 
    //Rows with at least 2 squares 
    assert.deepStrictEqual(rflip_horz(r_swe_rnd_grn), r_swe_rnd_grn); //Boundary case (2 recursive calls)(2 squares in row)
    assert.deepStrictEqual(rflip_horz(r4_rnd_grn), r4_rnd_grn); //Tests a 4 recursive calls case 
  });

  it('qflip_horz', function() {
    // TODO: add more qflip_horz tests beyond this random example test

    //Zero-One-Many Heuristic (at least 2 tests per) 
    //1 test for the zero subdomain (only qnil will yield 0 recursive calls)
    //2 tests for the one subdomain
    //2 tests for the many subdomain 

    //1 TEST FOR 0 SUBDOMAIN 
    assert.deepStrictEqual(qflip_horz(qnil), qnil); //Only input that yields 0 recursive calls
    
    //2 TESTS FOR 1 SUBDOMAIN
    //Quilts with only 1 row
    assert.deepStrictEqual(qflip_horz(qcons(r_nw_rnd_grn, qnil)), qcons(r_ne_rnd_grn, qnil)); //Tests single recursive call (quilt w/ only 1 row)
    assert.deepStrictEqual(qflip_horz(qcons(r4_rnd_grn, qnil)), qcons(r4_rnd_grn, qnil)); //Tests single recurisve call (quilt w/ only 1 row)

    //2 TESTS FOR MANY SUBDOMAIN 
    //Quilts with at least 2 rows 
    assert.deepStrictEqual(
        qflip_horz(qcons(r_ne_rnd_grn, qcons(r_nw_rnd_grn, qnil))),
        qcons(r_nw_rnd_grn, qcons(r_ne_rnd_grn, qnil))); //Boundary Case (2 recursive calls)(quilt with 2 rows)
    
    assert.deepStrictEqual(
        qflip_horz(qcons(r_nw_rnd_grn, qcons(r_nw_rnd_grn, qcons(r_se_rnd_grn, qnil)))),
        qcons(r_ne_rnd_grn, qcons(r_ne_rnd_grn, qcons(r_sw_rnd_grn, qnil)))); //Tests 3 recursive calls (quilt with 3 rows)
  });



  it('sew', function() {
    // invalid case: (qnil, !qnil)
    assert.throws(() => sew(qnil, qcons(r_rnd_grn, qnil)), Error);
    assert.throws(() => sew(qnil, qcons(r_rnd_grn, qcons(r_rnd_grn, qnil))), Error);

    // invalid case: (!qnil, qnil)
    assert.throws(() => sew(qcons(r_rnd_grn, qnil), qnil), Error);
    assert.throws(() => sew(qcons(r_rnd_grn, qcons(r_rnd_grn, qnil)), qnil), Error);

    // 0-1-many: base case
    assert.deepStrictEqual(sew(qnil, qnil), qnil);

    // 0-1-many: one recursive call
    assert.deepStrictEqual(sew(qcons(r_rnd_grn, qnil), qcons(r_rnd_grn, qnil)), qcons(r3_rnd_grn, qnil));
    assert.deepStrictEqual(sew(qcons(r_swe_rnd_grn, qnil), qcons(r_swe_rnd_grn, qnil)), qcons(r4_rnd_grn, qnil));

    // 0-1-many: many recursive calls
    assert.deepStrictEqual(
        sew(qcons(r_rnd_grn, qcons(r_rnd_grn, qnil)), qcons(r_rnd_grn, qcons(r_rnd_grn, qnil))),
        qcons(r3_rnd_grn, qcons(r3_rnd_grn, qnil)));
    assert.deepStrictEqual(
        sew(qcons(r_swe_rnd_grn, qcons(r_swe_rnd_grn, qcons(r_swe_rnd_grn, qnil))), 
            qcons(r_swe_rnd_grn, qcons(r_swe_rnd_grn, qcons(r_swe_rnd_grn, qnil)))),
        qcons(r4_rnd_grn, qcons(r4_rnd_grn, qcons(r4_rnd_grn, qnil))));
  });

  it('symmetrize', function() {
    // 0-1-many: base case
    assert.deepStrictEqual(symmetrize(qnil), qnil);
    assert.deepStrictEqual(symmetrize(qcons(rcons(nw_rnd_grn, rnil), qnil)),
        qcons(rcons(nw_rnd_grn, rcons(ne_rnd_grn, rnil)),
            qcons(rcons(sw_rnd_grn, rcons(se_rnd_grn, rnil)), qnil)));

    // 0-1-many: one recursive call
    assert.deepStrictEqual(symmetrize(qcons(rcons(nw_rnd_grn, rnil), qnil)),
        qcons(rcons(nw_rnd_grn, rcons(ne_rnd_grn, rnil)),
            qcons(rcons(sw_rnd_grn, rcons(se_rnd_grn, rnil)), qnil)));
    assert.deepStrictEqual(symmetrize(qcons(rcons(se_rnd_grn, rnil), qnil)),
        qcons(rcons(se_rnd_grn, rcons(sw_rnd_grn, rnil)),
            qcons(rcons(ne_rnd_grn, rcons(nw_rnd_grn, rnil)), qnil)));

    // 0-1-many: many recursive calls
    assert.deepStrictEqual(symmetrize(qcons(r_rnd_grn, qnil)),
        qcons(
            rcons(nw_rnd_grn, rcons(ne_rnd_grn, rcons(nw_rnd_grn, rcons(ne_rnd_grn, rnil)))),
            qcons(
                rcons(sw_rnd_grn, rcons(se_rnd_grn, rcons(sw_rnd_grn, rcons(se_rnd_grn, rnil)))),
                qnil)));
    assert.deepStrictEqual(symmetrize(qcons(r_rnd_grn, qcons(r_sew_rnd_grn, qnil))),
        qcons(
            rcons(nw_rnd_grn, rcons(ne_rnd_grn, rcons(nw_rnd_grn, rcons(ne_rnd_grn, rnil)))),
            qcons(
                rcons(sw_rnd_grn, rcons(se_rnd_grn, rcons(sw_rnd_grn, rcons(se_rnd_grn, rnil)))),
                qcons(
                    rcons(nw_rnd_grn, rcons(ne_rnd_grn, rcons(nw_rnd_grn, rcons(ne_rnd_grn, rnil)))),
                    qcons(
                        rcons(sw_rnd_grn, rcons(se_rnd_grn, rcons(sw_rnd_grn, rcons(se_rnd_grn, rnil)))),
                        qnil)))));
  });

});
