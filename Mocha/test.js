'use strict';
let assert = chai.assert;

describe('TestoviParser', function() {
    
describe('dajTacnost()', function() {


    
        /* test 1 */
        it('[Test 1] Svi prolaze', function() {

            var report1 = `{
                "stats":{
                   "suites":2,
                   "tests":2,
                   "passes":2,
                   "pending":0,
                   "failures":0,
                   "start":"2021-11-05T15:00:26.343Z",
                   "end":"2021-11-05T15:00:26.352Z",
                   "duration":9
                },
                "tests":[
                   {
                      "title":"should draw 3 rows when parameter are 2,3",
                      "fullTitle":"Tabela crtaj() should draw 3 rows when parameter are 2,3",
                      "file":null,
                      "duration":1,
                      "currentRetry":0,
                      "speed":"fast",
                      "err":{
                         
                      }
                   },
                   {
                      "title":"should draw 2 columns in row 2 when parameter are 2,3",
                      "fullTitle":"Tabela crtaj() should draw 2 columns in row 2 when parameter are 2,3",
                      "file":null,
                      "duration":0,
                      "currentRetry":0,
                      "speed":"fast",
                      "err":{
                         
                      }
                   }
                ],
                "pending":[
                   
                ],
                "failures":[
                   
                ],
                "passes":[
                   {
                      "title":"should draw 3 rows when parameter are 2,3",
                      "fullTitle":"Tabela crtaj() should draw 3 rows when parameter are 2,3",
                      "file":null,
                      "duration":1,
                      "currentRetry":0,
                      "speed":"fast",
                      "err":{
                         
                      }
                   },
                   {
                      "title":"should draw 2 columns in row 2 when parameter are 2,3",
                      "fullTitle":"Tabela crtaj() should draw 2 columns in row 2 when parameter are 2,3",
                      "file":null,
                      "duration":0,
                      "currentRetry":0,
                      "speed":"fast",
                      "err":{
                         
                      }
                   }
                ]
             }`;

            
            assert.equal(Modul.dajTacnost(report1).tacnost, "100%");
            assert.equal(JSON.stringify(Modul.dajTacnost(report1).greske), "[]");
        });


        /* test 2 */
        it('[Test 2] Svi padaju', function() {

            var report2 = `{
                "stats":{
                   "suites":2,
                   "tests":2,
                   "passes":0,
                   "pending":0,
                   "failures":2,
                   "start":"2021-11-05T15:00:26.343Z",
                   "end":"2021-11-05T15:00:26.352Z",
                   "duration":9
                },
                "tests":[
                   {
                      "title":"Pada 1",
                      "fullTitle":"Pada 1",
                      "file":null,
                      "duration":1,
                      "currentRetry":0,
                      "speed":"fast",
                      "err":{
                         
                      }
                   },
                   {
                      "title":"Pada 2",
                      "fullTitle":"Pada 2",
                      "file":null,
                      "duration":0,
                      "currentRetry":0,
                      "speed":"fast",
                      "err":{
                         
                      }
                   }
                ],
                "pending":[
                   
                ],
                "failures":[
                    {
                        "title":"Pada 1",
                        "fullTitle":"Pada 1",
                        "file":null,
                        "duration":1,
                        "currentRetry":0,
                        "speed":"fast",
                        "err":{
                           
                        }
                     },
                     {
                        "title":"Pada 2",
                        "fullTitle":"Pada 2",
                        "file":null,
                        "duration":0,
                        "currentRetry":0,
                        "speed":"fast",
                        "err":{
                           
                        }
                     }
                ],
                "passes":[
                   
                ]
             }`;

          
            assert.equal(Modul.dajTacnost(report2).tacnost, "0%");
            assert.equal(JSON.stringify(Modul.dajTacnost(report2).greske), '["Pada 1","Pada 2"]');
        });


        /* test 3 */
        it('[Test 3] Jedan prolazi jedan pada', function() {

            var report3 = `{
                "stats":{
                   "suites":2,
                   "tests":2,
                   "passes":1,
                   "pending":0,
                   "failures":1,
                   "start":"2021-11-05T15:00:26.343Z",
                   "end":"2021-11-05T15:00:26.352Z",
                   "duration":9
                },
                "tests":[
                   {
                      "title":"Pada 1",
                      "fullTitle":"Pada 1",
                      "file":null,
                      "duration":1,
                      "currentRetry":0,
                      "speed":"fast",
                      "err":{
                         
                      }
                   },
                   {
                      "title":"Pada 2",
                      "fullTitle":"Pada 2",
                      "file":null,
                      "duration":0,
                      "currentRetry":0,
                      "speed":"fast",
                      "err":{
                         
                      }
                   }
                ],
                "pending":[
                   
                ],
                "failures":[
                     {
                        "title":"Pada 2",
                        "fullTitle":"Pada 2",
                        "file":null,
                        "duration":0,
                        "currentRetry":0,
                        "speed":"fast",
                        "err":{
                           
                        }
                     }
                ],
                "passes":[
                    {
                        "title":"Pada 1",
                        "fullTitle":"Pada 1",
                        "file":null,
                        "duration":1,
                        "currentRetry":0,
                        "speed":"fast",
                        "err":{
                           
                        }
                     }
                ]
             }`;

           
            assert.equal(Modul.dajTacnost(report3).tacnost, "50%");
            assert.equal(JSON.stringify(Modul.dajTacnost(report3).greske), '["Pada 2"]');
        });


        /* test 4 */
        it('[Test 4] Testovi se ne mogu izvrsiti', function() {

            var report4 = `{
                "stats":{
                   "suites":2,
                   "tests":2,
                   "passes":0,
                   "pending":1,
                   "failures":0,
                   "start":"2021-11-05T15:00:26.343Z",
                   "end":"2021-11-05T15:00:26.352Z",
                   "duration":9
                },
                "tests":[
                   {
                      "title":"Pada 1",
                      "fullTitle":"Pada 1",
                      "file":null,
                      "duration":1,
                      "currentRetry":0,
                      "speed":"fast",
                      "err":{
                         
                      }
                   },
                   {
                      "title":"Pada 2",
                      "fullTitle":"Pada 2",
                      "file":null,
                      "duration":0,
                      "currentRetry":0,
                      "speed":"fast",
                      "err":{
                         
                      }
                   }
                ],
                "pending":[
                    {
                        "title":"Pada 1",
                        "fullTitle":"Pada 1",
                        "file":null,
                        "duration":1,
                        "currentRetry":0,
                        "speed":"fast",
                        "err":{
                           
                        }
                     },
                     {
                        "title":"Pada 2",
                        "fullTitle":"Pada 2",
                        "file":null,
                        "duration":0,
                        "currentRetry":0,
                        "speed":"fast",
                        "err":{
                           
                        }
                     }
                ],
                "failures":[
                     
                ],
                "passes":[
                    
                ]
             }`;

            
            assert.equal(Modul.dajTacnost(report4).tacnost, "0%");
            assert.equal(JSON.stringify(Modul.dajTacnost(report4).greske), '["Testovi se ne mogu izvrsiti"]');
        });


        /* test 5 */
        it('[Test 5] Veci broj testova', function() {

            var report2 = `{
                "stats":{
                   "suites":5,
                   "tests":5,
                   "passes":3,
                   "pending":0,
                   "failures":2,
                   "start":"2021-11-05T15:00:26.343Z",
                   "end":"2021-11-05T15:00:26.352Z",
                   "duration":9
                },
                "tests":[
                   {
                      "title":"Test 1",
                      "fullTitle":"Test 1",
                      "file":null,
                      "duration":1,
                      "currentRetry":0,
                      "speed":"fast",
                      "err":{
                         
                      }
                   },
                   {
                      "title":"Test 2",
                      "fullTitle":"Test 2",
                      "file":null,
                      "duration":0,
                      "currentRetry":0,
                      "speed":"fast",
                      "err":{
                         
                      }
                   },
                   {
                      "title":"Test 3",
                      "fullTitle":"Test 3",
                      "file":null,
                      "duration":0,
                      "currentRetry":0,
                      "speed":"fast",
                      "err":{
                         
                      }
                   },
                   {
                      "title":"Test 4",
                      "fullTitle":"Test 4",
                      "file":null,
                      "duration":0,
                      "currentRetry":0,
                      "speed":"fast",
                      "err":{
                         
                      }
                   },
                   {
                      "title":"Test 5",
                      "fullTitle":"Test 5",
                      "file":null,
                      "duration":0,
                      "currentRetry":0,
                      "speed":"fast",
                      "err":{
                         
                      }
                   }
                ],
                "pending":[
                   
                ],
                "failures":[
                    {
                        "title":"Test 4",
                        "fullTitle":"Test 4",
                        "file":null,
                        "duration":0,
                        "currentRetry":0,
                        "speed":"fast",
                        "err":{
                           
                        }
                     },
                     {
                        "title":"Test 5",
                        "fullTitle":"Test 5",
                        "file":null,
                        "duration":0,
                        "currentRetry":0,
                        "speed":"fast",
                        "err":{
                           
                        }
                     }
                ],
                "passes":[
                    {
                        "title":"Test 1",
                        "fullTitle":"Test 1",
                        "file":null,
                        "duration":1,
                        "currentRetry":0,
                        "speed":"fast",
                        "err":{
                           
                        }
                     },
                     {
                        "title":"Test 2",
                        "fullTitle":"Test 2",
                        "file":null,
                        "duration":0,
                        "currentRetry":0,
                        "speed":"fast",
                        "err":{
                           
                        }
                     },
                     {
                        "title":"Test 3",
                        "fullTitle":"Test 3",
                        "file":null,
                        "duration":0,
                        "currentRetry":0,
                        "speed":"fast",
                        "err":{
                           
                        }
                     }
                ]
             }`;

            
            assert.equal(Modul.dajTacnost(report2).tacnost, "60%");
            assert.equal(JSON.stringify(Modul.dajTacnost(report2).greske), '["Test 4","Test 5"]');
        });


        /*Zadatak 4*/
        it('[Test 1] Identicni nazivi testova', function() {

            var report1 = `{
                "stats":{
                   "suites":5,
                   "tests":5,
                   "passes":3,
                   "pending":0,
                   "failures":2,
                   "start":"2021-11-05T15:00:26.343Z",
                   "end":"2021-11-05T15:00:26.352Z",
                   "duration":9
                },
                "tests":[
                   {
                      "title":"Test 1",
                      "fullTitle":"Test 1",
                      "file":null,
                      "duration":1,
                      "currentRetry":0,
                      "speed":"fast",
                      "err":{
                         
                      }
                   },
                   {
                      "title":"Test 2",
                      "fullTitle":"Test 2",
                      "file":null,
                      "duration":0,
                      "currentRetry":0,
                      "speed":"fast",
                      "err":{
                         
                      }
                   },
                   {
                      "title":"Test 3",
                      "fullTitle":"Test 3",
                      "file":null,
                      "duration":0,
                      "currentRetry":0,
                      "speed":"fast",
                      "err":{
                         
                      }
                   },
                   {
                      "title":"Test 4",
                      "fullTitle":"Test 4",
                      "file":null,
                      "duration":0,
                      "currentRetry":0,
                      "speed":"fast",
                      "err":{
                         
                      }
                   },
                   {
                      "title":"Test 5",
                      "fullTitle":"Test 5",
                      "file":null,
                      "duration":0,
                      "currentRetry":0,
                      "speed":"fast",
                      "err":{
                         
                      }
                   }
                ],
                "pending":[
                   
                ],
                "failures":[
                    {
                        "title":"Test 4",
                        "fullTitle":"Test 4",
                        "file":null,
                        "duration":0,
                        "currentRetry":0,
                        "speed":"fast",
                        "err":{
                           
                        }
                     },
                     {
                        "title":"Test 5",
                        "fullTitle":"Test 5",
                        "file":null,
                        "duration":0,
                        "currentRetry":0,
                        "speed":"fast",
                        "err":{
                           
                        }
                     }
                ],
                "passes":[
                    {
                        "title":"Test 1",
                        "fullTitle":"Test 1",
                        "file":null,
                        "duration":1,
                        "currentRetry":0,
                        "speed":"fast",
                        "err":{
                           
                        }
                     },
                     {
                        "title":"Test 2",
                        "fullTitle":"Test 2",
                        "file":null,
                        "duration":0,
                        "currentRetry":0,
                        "speed":"fast",
                        "err":{
                           
                        }
                     },
                     {
                        "title":"Test 3",
                        "fullTitle":"Test 3",
                        "file":null,
                        "duration":0,
                        "currentRetry":0,
                        "speed":"fast",
                        "err":{
                           
                        }
                     }
                ]
             }`;

            
            assert.equal(Modul.porediRezultate(report1, report1).promjena, "60%");
            assert.equal(JSON.stringify(Modul.porediRezultate(report1, report1).greske), '["Test 4","Test 5"]');

        });



        /* Test 2 */
        it('[Test 2] Razliciti nazivi testova', function() {

            var report1 = `{
                "stats":{
                   "suites":5,
                   "tests":5,
                   "passes":3,
                   "pending":0,
                   "failures":2,
                   "start":"2021-11-05T15:00:26.343Z",
                   "end":"2021-11-05T15:00:26.352Z",
                   "duration":9
                },
                "tests":[
                   {
                      "title":"Test 1",
                      "fullTitle":"Test 1",
                      "file":null,
                      "duration":1,
                      "currentRetry":0,
                      "speed":"fast",
                      "err":{
                         
                      }
                   },
                   {
                      "title":"Test 2",
                      "fullTitle":"Test 2",
                      "file":null,
                      "duration":0,
                      "currentRetry":0,
                      "speed":"fast",
                      "err":{
                         
                      }
                   },
                   {
                      "title":"Test 3",
                      "fullTitle":"Test 3",
                      "file":null,
                      "duration":0,
                      "currentRetry":0,
                      "speed":"fast",
                      "err":{
                         
                      }
                   },
                   {
                      "title":"Test 4",
                      "fullTitle":"Test 4",
                      "file":null,
                      "duration":0,
                      "currentRetry":0,
                      "speed":"fast",
                      "err":{
                         
                      }
                   },
                   {
                      "title":"Test 5",
                      "fullTitle":"Test 5",
                      "file":null,
                      "duration":0,
                      "currentRetry":0,
                      "speed":"fast",
                      "err":{
                         
                      }
                   }
                ],
                "pending":[
                   
                ],
                "failures":[
                    {
                        "title":"Test 4",
                        "fullTitle":"Test 4",
                        "file":null,
                        "duration":0,
                        "currentRetry":0,
                        "speed":"fast",
                        "err":{
                           
                        }
                     },
                     {
                        "title":"Test 5",
                        "fullTitle":"Test 5",
                        "file":null,
                        "duration":0,
                        "currentRetry":0,
                        "speed":"fast",
                        "err":{
                           
                        }
                     }
                ],
                "passes":[
                    {
                        "title":"Test 1",
                        "fullTitle":"Test 1",
                        "file":null,
                        "duration":1,
                        "currentRetry":0,
                        "speed":"fast",
                        "err":{
                           
                        }
                     },
                     {
                        "title":"Test 2",
                        "fullTitle":"Test 2",
                        "file":null,
                        "duration":0,
                        "currentRetry":0,
                        "speed":"fast",
                        "err":{
                           
                        }
                     },
                     {
                        "title":"Test 3",
                        "fullTitle":"Test 3",
                        "file":null,
                        "duration":0,
                        "currentRetry":0,
                        "speed":"fast",
                        "err":{
                           
                        }
                     }
                ]
             }`;


             var report2 = `{
                "stats":{
                   "suites":3,
                   "tests":3,
                   "passes":3,
                   "pending":0,
                   "failures":0,
                   "start":"2021-11-05T15:00:26.343Z",
                   "end":"2021-11-05T15:00:26.352Z",
                   "duration":9
                },
                "tests":[
                   {
                      "title":"Test 1",
                      "fullTitle":"Test 1",
                      "file":null,
                      "duration":1,
                      "currentRetry":0,
                      "speed":"fast",
                      "err":{
                         
                      }
                   },
                   {
                      "title":"Test 2",
                      "fullTitle":"Test 2",
                      "file":null,
                      "duration":0,
                      "currentRetry":0,
                      "speed":"fast",
                      "err":{
                         
                      }
                   },
                   {
                      "title":"Test 3",
                      "fullTitle":"Test 3",
                      "file":null,
                      "duration":0,
                      "currentRetry":0,
                      "speed":"fast",
                      "err":{
                         
                      }
                   }
                ],
                "pending":[
                   
                ],
                "failures":[
                   
                ],
                "passes":[
                    {
                        "title":"Test 1",
                        "fullTitle":"Test 1",
                        "file":null,
                        "duration":1,
                        "currentRetry":0,
                        "speed":"fast",
                        "err":{
                           
                        }
                     },
                     {
                        "title":"Test 2",
                        "fullTitle":"Test 2",
                        "file":null,
                        "duration":0,
                        "currentRetry":0,
                        "speed":"fast",
                        "err":{
                           
                        }
                     },
                     {
                        "title":"Test 3",
                        "fullTitle":"Test 3",
                        "file":null,
                        "duration":0,
                        "currentRetry":0,
                        "speed":"fast",
                        "err":{
                           
                        }
                     }
                ]
             }`;

            
            assert.equal(Modul.porediRezultate(report1, report2).promjena, "57.1%");
            assert.equal(JSON.stringify(Modul.porediRezultate(report1, report2).greske), '["Test 4","Test 5"]');

        });


        /* Test 3 */
        it('[Test 3] U drugom rezlatatu svi prolaze', function() {

            var report1 = `{
                "stats":{
                   "suites":3,
                   "tests":3,
                   "passes":1,
                   "pending":0,
                   "failures":2,
                   "start":"2021-11-05T15:00:26.343Z",
                   "end":"2021-11-05T15:00:26.352Z",
                   "duration":9
                },
                "tests":[
                   {
                      "title":"Test A",
                      "fullTitle":"Test A",
                      "file":null,
                      "duration":1,
                      "currentRetry":0,
                      "speed":"fast",
                      "err":{
                         
                      }
                   },
                   {
                      "title":"Test B",
                      "fullTitle":"Test B",
                      "file":null,
                      "duration":0,
                      "currentRetry":0,
                      "speed":"fast",
                      "err":{
                         
                      }
                   },
                   {
                      "title":"Test C",
                      "fullTitle":"Test C",
                      "file":null,
                      "duration":0,
                      "currentRetry":0,
                      "speed":"fast",
                      "err":{
                         
                      }
                   }
                ],
                "pending":[
                   
                ],
                "failures":[
                    {
                        "title":"Test A",
                        "fullTitle":"Test A",
                        "file":null,
                        "duration":0,
                        "currentRetry":0,
                        "speed":"fast",
                        "err":{
                           
                        }
                     },
                     {
                        "title":"Test C",
                        "fullTitle":"Test C",
                        "file":null,
                        "duration":0,
                        "currentRetry":0,
                        "speed":"fast",
                        "err":{
                           
                        }
                     }
                ],
                "passes":[
                    {
                        "title":"Test B",
                        "fullTitle":"Test B",
                        "file":null,
                        "duration":1,
                        "currentRetry":0,
                        "speed":"fast",
                        "err":{
                           
                        }
                     }
                ]
             }`;


             var report2 = `{
                "stats":{
                   "suites":3,
                   "tests":3,
                   "passes":3,
                   "pending":0,
                   "failures":0,
                   "start":"2021-11-05T15:00:26.343Z",
                   "end":"2021-11-05T15:00:26.352Z",
                   "duration":9
                },
                "tests":[
                   {
                      "title":"Test A",
                      "fullTitle":"Test A",
                      "file":null,
                      "duration":1,
                      "currentRetry":0,
                      "speed":"fast",
                      "err":{
                         
                      }
                   },
                   {
                      "title":"Test B",
                      "fullTitle":"Test B",
                      "file":null,
                      "duration":0,
                      "currentRetry":0,
                      "speed":"fast",
                      "err":{
                         
                      }
                   },
                   {
                      "title":"Test C",
                      "fullTitle":"Test C",
                      "file":null,
                      "duration":0,
                      "currentRetry":0,
                      "speed":"fast",
                      "err":{
                         
                      }
                   }
                ],
                "pending":[
                   
                ],
                "failures":[
                   
                ],
                "passes":[
                    {
                        "title":"Test A",
                        "fullTitle":"Test A",
                        "file":null,
                        "duration":1,
                        "currentRetry":0,
                        "speed":"fast",
                        "err":{
                           
                        }
                     },
                     {
                        "title":"Test B",
                        "fullTitle":"Test B",
                        "file":null,
                        "duration":0,
                        "currentRetry":0,
                        "speed":"fast",
                        "err":{
                           
                        }
                     },
                     {
                        "title":"Test C",
                        "fullTitle":"Test C",
                        "file":null,
                        "duration":0,
                        "currentRetry":0,
                        "speed":"fast",
                        "err":{
                           
                        }
                     }
                ]
             }`;

            
            assert.equal(Modul.porediRezultate(report1, report2).promjena, "100%");
            assert.equal(JSON.stringify(Modul.porediRezultate(report1, report2).greske), '[]');

        });


        /* Test 4 */
        it('[Test 4] U prvom rezlatatu svi prolaze', function() {

            var report1 = `{
                "stats":{
                   "suites":3,
                   "tests":3,
                   "passes":1,
                   "pending":0,
                   "failures":2,
                   "start":"2021-11-05T15:00:26.343Z",
                   "end":"2021-11-05T15:00:26.352Z",
                   "duration":9
                },
                "tests":[
                   {
                      "title":"Test A",
                      "fullTitle":"Test A",
                      "file":null,
                      "duration":1,
                      "currentRetry":0,
                      "speed":"fast",
                      "err":{
                         
                      }
                   },
                   {
                      "title":"Test B",
                      "fullTitle":"Test B",
                      "file":null,
                      "duration":0,
                      "currentRetry":0,
                      "speed":"fast",
                      "err":{
                         
                      }
                   },
                   {
                      "title":"Test C",
                      "fullTitle":"Test C",
                      "file":null,
                      "duration":0,
                      "currentRetry":0,
                      "speed":"fast",
                      "err":{
                         
                      }
                   }
                ],
                "pending":[
                   
                ],
                "failures":[
                    {
                        "title":"Test A",
                        "fullTitle":"Test A",
                        "file":null,
                        "duration":0,
                        "currentRetry":0,
                        "speed":"fast",
                        "err":{
                           
                        }
                     },
                     {
                        "title":"Test C",
                        "fullTitle":"Test C",
                        "file":null,
                        "duration":0,
                        "currentRetry":0,
                        "speed":"fast",
                        "err":{
                           
                        }
                     }
                ],
                "passes":[
                    {
                        "title":"Test B",
                        "fullTitle":"Test B",
                        "file":null,
                        "duration":1,
                        "currentRetry":0,
                        "speed":"fast",
                        "err":{
                           
                        }
                     }
                ]
             }`;


             var report2 = `{
                "stats":{
                   "suites":3,
                   "tests":3,
                   "passes":3,
                   "pending":0,
                   "failures":0,
                   "start":"2021-11-05T15:00:26.343Z",
                   "end":"2021-11-05T15:00:26.352Z",
                   "duration":9
                },
                "tests":[
                   {
                      "title":"Test A",
                      "fullTitle":"Test A",
                      "file":null,
                      "duration":1,
                      "currentRetry":0,
                      "speed":"fast",
                      "err":{
                         
                      }
                   },
                   {
                      "title":"Test B",
                      "fullTitle":"Test B",
                      "file":null,
                      "duration":0,
                      "currentRetry":0,
                      "speed":"fast",
                      "err":{
                         
                      }
                   },
                   {
                      "title":"Test C",
                      "fullTitle":"Test C",
                      "file":null,
                      "duration":0,
                      "currentRetry":0,
                      "speed":"fast",
                      "err":{
                         
                      }
                   }
                ],
                "pending":[
                   
                ],
                "failures":[
                   
                ],
                "passes":[
                    {
                        "title":"Test A",
                        "fullTitle":"Test A",
                        "file":null,
                        "duration":1,
                        "currentRetry":0,
                        "speed":"fast",
                        "err":{
                           
                        }
                     },
                     {
                        "title":"Test B",
                        "fullTitle":"Test B",
                        "file":null,
                        "duration":0,
                        "currentRetry":0,
                        "speed":"fast",
                        "err":{
                           
                        }
                     },
                     {
                        "title":"Test C",
                        "fullTitle":"Test C",
                        "file":null,
                        "duration":0,
                        "currentRetry":0,
                        "speed":"fast",
                        "err":{
                           
                        }
                     }
                ]
             }`;

            
            assert.equal(Modul.porediRezultate(report2, report1).promjena, "33.3%");
            assert.equal(JSON.stringify(Modul.porediRezultate(report2, report1).greske), '["Test A","Test C"]');

        });

    });
});
   