 document.addEventListener('deviceready', onDeviceReady, false);        
        var dbCreated = "false";
        db = window.openDatabase("ctuegames", "1.0", "games", 200000);
        
       
      function onDeviceReady() {
          $.mobile.loading( 'show', {
              text: 'Loading',
              textVisible: true,
              theme: 'a',
              html: ""
          });
        if (dbCreated == "true")
            $.mobile.loading( 'hide');
          //  db.transaction(getSavedSur, transaction_error);
        else
            db.transaction(populateDB, transaction_error, populateDB_success);
    }
   
    
    function transaction_error(tx, error) {
        $('#busy').hide();
        alert("Database Error: " + error);
    }

    function populateDB_success() {
        $.mobile.loading( 'hide');
        dbCreated = "true";
        /*alert("populateDB");
        db.transaction(getSavedSur, transaction_error);
        alert("populateDB");*/
    }

    function getSavedSur(tx) {
        var sql = "select e.gameName " + 
                    "from gamerules" +
                    "order by e.gameName";
        tx.executeSql(sql, transaction_error, getSavedSur_success);
        alert("getSavedSur");
    }

    function getSavedSur_success(tx, results) {
        $('#busy').hide();
        alert("Database Results: " + results);
        var len = results.rows.length;
        for (var i=0; i<len; i++) {
            var gameDis = results.rows.item(i);
            $('#mainList').append('<li><h3>'results.rows.item(i)'</h3></li>');
        }
        setTimeout(function(){
            ddFindSurvey.refresh();
        },100);
        db = null;
    }

    function populateDB(tx) {
        
        var sqlgamesrules = 
            "CREATE TABLE IF NOT EXISTS gamerules ( "+
            "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
            "gameName VARCHAR(50), " +
            "descrip VARCHAR(150), " +
            "rule1 VARCHAR(50), " +
            "rule2 VARCHAR(50), " +
            "rule3 VARCHAR(50), " + 
            "rule4 VARCHAR(50), " +
            "rule5 VARCHAR(50), " +
            "rule6 VARCHAR(30))";
        tx.executeSql(sqlgamesrules);
        

        tx.executeSql("INSERT INTO gamerules (gameName,descrip,rule1,rule2) VALUES ('Apple Sauce','Use a small apple to play Hag e Sack with your hands, when the apple starts to spilt players can punch the apple and smash it but must call Apple Sauce Bitch first','No Kicking','Call Apple Sauce Bitch before punching apple')");
        
       }
