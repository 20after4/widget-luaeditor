/* global macro requirejs cprequire cpdefine chilipeppr THREE */
// ignore this errormessage:

// ChiliPeppr Widget/Element Javascript
cprequire_test(["inline:com-chilipeppr-widget-luaeditor"], function(myWidget) {

    // Test this element. This code is auto-removed by the chilipeppr.load()
    // when using this widget in production. So use the cpquire_test to do things
    // you only want to have happen during testing, like loading other widgets or
    // doing unit tests. Don't remove end_test at the end or auto-remove will fail.

    console.log("test running of " + myWidget.id);

    $('body').prepend('<div id="testDivForFlashMessageWidget"></div>');
    $('#com-chilipeppr-widget-luaeditor').css('margin', '10px');

    chilipeppr.load(
        "#testDivForFlashMessageWidget",
        "http://fiddle.jshell.net/chilipeppr/90698kax/show/light/",
        function() {
            console.log("mycallback got called after loading flash msg module");
            cprequire(["inline:com-chilipeppr-elem-flashmsg"], function(fm) {
                //console.log("inside require of " + fm.id);
                fm.init();
            });
        }
    );

    // init my widget
    myWidget.init();

} /*end_test*/ );

// This is the main definition of your widget. Give it a unique name.
cpdefine("inline:com-chilipeppr-widget-luaeditor", ["chilipeppr_ready", /* other dependencies here */ ], function() {
    return {
        /**
         * The ID of the widget. You must define this and make it unique.
         */
        id: "com-chilipeppr-widget-luaeditor", // Make the id the same as the cpdefine id
        name: "Widget / Lua Editor", // The descriptive name of your widget.
        desc: "Edit and run Lua code. Lots of sample Lua code too.", // A description of what your widget does
        url: "(auto fill by runme.js)",       // The final URL of the working widget as a single HTML file with CSS and Javascript inlined. You can let runme.js auto fill this if you are using Cloud9.
        fiddleurl: "(auto fill by runme.js)", // The edit URL. This can be auto-filled by runme.js in Cloud9 if you'd like, or just define it on your own to help people know where they can edit/fork your widget
        githuburl: "(auto fill by runme.js)", // The backing github repo
        testurl: "(auto fill by runme.js)",   // The standalone working widget so can view it working by itself
        /**
         * Define pubsub signals below. These are basically ChiliPeppr's event system.
         * ChiliPeppr uses amplify.js's pubsub system so please refer to docs at
         * http://amplifyjs.com/api/pubsub/
         */
        /**
         * Define the publish signals that this widget/element owns or defines so that
         * other widgets know how to subscribe to them and what they do.
         */
        publish: {
            // Define a key:value pair here as strings to document what signals you publish.
        },
        /**
         * Define the subscribe signals that this widget/element owns or defines so that
         * other widgets know how to subscribe to them and what they do.
         */
        subscribe: {
            // Define a key:value pair here as strings to document what signals you subscribe to
            // so other widgets can publish to this widget to have it do something.
            // '/onExampleConsume': 'Example: This widget subscribe to this signal so other widgets can send to us and we'll do something with it.'
        },
        /**
         * Document the foreign publish signals, i.e. signals owned by other widgets
         * or elements, that this widget/element publishes to.
         */
        foreignPublish: {
            // Define a key:value pair here as strings to document what signals you publish to
            // that are owned by foreign/other widgets.
            // '/jsonSend': 'Example: We send Gcode to the serial port widget to do stuff with the CNC controller.'
        },
        /**
         * Document the foreign subscribe signals, i.e. signals owned by other widgets
         * or elements, that this widget/element subscribes to.
         */
        foreignSubscribe: {
            // Define a key:value pair here as strings to document what signals you subscribe to
            // that are owned by foreign/other widgets.
            // '/com-chilipeppr-elem-dragdrop/ondropped': 'Example: We subscribe to this signal at a higher priority to intercept the signal. We do not let it propagate by returning false.'
        },
        jscript: null, // contains the javascript macro that the user is working with
        init: function () {

            this.forkSetup();
            
            $('#' + this.id + ' .luaeditor-run').click(this.runMacro.bind(this));
            
            // saveMacro
            $('#' + this.id + ' .luaeditor-save').click(this.saveMacro.bind(this));
            
            // setup del files
            $('#' + this.id + ' .recent-file-delete').click( this.deleteRecentFiles.bind(this));

            this.buildRecentFileMenu();
            
            // capture ctrl+enter on textarea
            $('#' + this.id + ' .luaeditor-maineditor').keypress(this.jscriptKeypress.bind(this));
            
            // samples
            this.setupSamples();
            
            this.makeTextareaAcceptTabs();
            
            // popovers
            $('#' + this.id + ' .panel-heading .btn').popover();
            
            // see if startup script
            //.setupStartup();
            
            console.log(this.name + " done loading.");
        },
        setupStartup: function() {
            
            // setup pulldown menu items
            $('#' + this.id + ' .luaeditor-startup-load').click(this.editStartup.bind(this));
            $('#' + this.id + ' .luaeditor-startup-save').click(this.saveStartup.bind(this));
            
            // run startup script
            //this.onStartup();
            
        },
        editStartup: function(evt) {
            console.log("editStartup. evt:", evt);
            
            var script = localStorage.getItem(this.id + '-startup');
            this.jscript = script;
            this.loadJscript(this.jscript);
            this.status("Loaded startup script");
            
        },
        saveStartup: function(evt) {
            console.log("saveStartup. evt:", evt);
            var fileStr = this.getJscript();
            localStorage.setItem(this.id + '-startup', fileStr);
            this.status("Saved startup script");
        },
        makeTextareaAcceptTabs: function() {
            $(document).delegate('#' + this.id + ' .luaeditor-maineditor', 'keydown', function(e) {
                var keyCode = e.keyCode || e.which;
                
                if (keyCode == 9) {
                    e.preventDefault();
                    var start = $(this).get(0).selectionStart;
                    var end = $(this).get(0).selectionEnd;
                    
                    // set textarea value to: text before caret + tab + text after caret
                    $(this).val($(this).val().substring(0, start)
                                + "\t"
                                + $(this).val().substring(end));
                    
                    // put caret at right position again
                    $(this).get(0).selectionStart =
                        $(this).get(0).selectionEnd = start + 1;
                }
            });
        },
        getJscript: function() {
            this.jscript = $('#' + this.id + ' .luaeditor-maineditor').val();
            return this.jscript;
        },
        runMacro: function(macroStr, helpTxt) {
                        
            // allow a custom macro to be passed in
            if (typeof macroStr === "string") {
                this.jscript = macroStr;
            } else {
                this.getJscript();
            }
            
            //this.jscript = $('.com-chilipeppr-widget-macro-jscript').val();
            
            if (this.jscript && this.jscript.length > 1) {
            try {
                eval(this.jscript);
                
                if (!helpTxt) helpTxt = "";
                helpTxt = helpTxt.trim();
                if (helpTxt.length > 0) helpTxt += " ";

                this.status("Ran " + helpTxt + "macro. "); // + this.jscript);
            } catch(e) {
                //var etxt = JSON.stringify(e);
                console.log("Err running macro. err:", e);
                var etxt = e.message;
                var estack = null;
                if ('stack' in e) estack = e.stack;
                if (etxt != null && etxt.length > 0) {
                    this.status("Error doing eval() on your script. Error: " + etxt );
                    if (estack != null) this.status(estack);
                } else {
                    this.status("Error doing eval() on your script.");
                }
            }
            } else {
                this.status("No script to run. Empty.");
            }
        },
        jscriptKeypress: function(evt) {
            //console.log("got keypress textarea. evt:", evt);
            if (evt.ctrlKey && evt.keyCode == 10) {
                // run the macro
                //$('.com-chilipeppr-widget-macro-run').click();
                this.runMacro();
                // mimic push on btn
                $('#' + this.id + ' .luaeditor-run').addClass('active');
                var that = this;
                setTimeout(function() {
                    $('#' + that.id + ' .luaeditor-run').removeClass('active');
                }, 200);
            }
                
        },
        showData: function(datatxt) {
            $('#com-chilipeppr-widget-modal-macro-view .modal-body textarea').val(datatxt);
            //$('#com-chilipeppr-widget-modal-macro-view .modal-title').text("View Probe Data");
            $('#com-chilipeppr-widget-modal-macro-view').modal('show');
        },
        saveMacro: function() {
            
            var fileStr = this.getJscript();
            var firstLine = "";
            if (fileStr.match(/(.*)\r{0,1}\n/)) {
                // we have our first line
                firstLine = RegExp.$1;
            } else if (fileStr.length > 20) {
                firstLine = fileStr.substring(0,20);
            } else if (fileStr.length > 0) {
                firstLine = fileStr;
            }
                
            var info = {
                name: "" + firstLine,
                lastModified: new Date()
            };
            this.createRecentFileEntry(fileStr, info);
            this.status('Saved your file "' + info.name + '". Retrieve it from upper right pulldown.');

        },
        deleteRecentFiles: function() {
            console.log("deleting files");
            // loop thru file storage and delete entries that match this widget
            var keysToDelete = [];
            for (var i = 0; i < localStorage.length; i++){
                console.log("localStorage.item.key:", localStorage.key(i));
                var key = localStorage.key(i);
                if (key.match(/com-chilipeppr-widget-macro-recent/)) {
                    //localStorage.removeItem(key);
                    keysToDelete.push(key);
                    console.log("going to remove localstorage key:", key);
                }
            }
            keysToDelete.forEach(function(key) {
                localStorage.removeItem(key);
            });
            //localStorage.clear();
            this.buildRecentFileMenu();
        },
        createRecentFileEntry: function(fileStr, info) {
            console.log("createRecentFileEntry. fileStr.length:", fileStr.length, "info:", info);
            // get the next avail slot
            var lastSlot = -1;
            for(var ctr = 0; ctr < 100; ctr++) {
                if (this.id + '-recent' + ctr in localStorage) {
                    console.log("found recent file entry. ctr:", ctr);
                    lastSlot = ctr;
                }
            }
            console.log("lastSlot we found:", lastSlot);
            
            var nextSlot = lastSlot + 1;
            var recent = localStorage.getItem(this.id + "-recent" + nextSlot);
            if (recent == null) {
                console.log("empty slot. filling.");
                localStorage.setItem(this.id + "-recent" + nextSlot, fileStr);
                localStorage.setItem(this.id + "-recent" + nextSlot + "-name", info.name);
                localStorage.setItem(this.id + "-recent" + nextSlot + "-lastMod", info.lastModified);
                this.buildRecentFileMenu();
            }
            
        },
        buildRecentFileMenu: function() {
            
            // cleanup prev recent files
            $('#' + this.id + ' .dropdown-menu-files > li.recent-file-item').remove();
            
            var li = $('#' + this.id + ' .dropdown-menu-files > li.recent-files');
            console.log("listItems:", li);
            
            // get all macro files
            var keysForMacros = [];
            for (var i = 0; i < localStorage.length; i++){
                console.log("localStorage.item.key:", localStorage.key(i));
                var key = localStorage.key(i);
                if (key.match(/com-chilipeppr-widget-luaeditor-recent(\d+)-name/)) {
                    //localStorage.removeItem(key);
                    var keyCtr = RegExp.$1;
                    keysForMacros.push(keyCtr);
                    console.log("found a macro name with localstorage key:", key, "keyCtr:", keyCtr);
                }
            }
            keysForMacros.forEach(function(key) {
                localStorage.removeItem(key);
            });
            
            //var ctr = 0;
            for(var i = 0; i < keysForMacros.length; i++) {
                var ctr = keysForMacros[i];
                var recentName = localStorage.getItem(this.id + "-recent" + ctr + "-name");
                //while(recentName != null) {
                console.log("recentFile ctr:", ctr, "recentName:", recentName);
                var recentLastModified = localStorage.getItem(this.id + "-recent" + ctr + "-lastMod");
                var rlm = new Date(recentLastModified);
                var recentSize = localStorage.getItem(this.id + "-recent" + ctr).length;
                var rsize = parseInt(recentSize / 1024);
                if (rsize == 0) rsize = 1;
                var newLi = $(
                    '<li class="recent-file-item"><a href="javascript:">' + recentName +
                    ' <span class="lastModifyDate">' + rlm.toLocaleString() + '</span>' +
                    ' ' + rsize + 'KB' +
                    '</a></li>');
                    //' <button type="button" class="btn btn-default btn-xs"><span class="glyphicon glyphicon-trash"></span></button></a></li>');
                newLi.insertAfter(li);
                var that = this;
                newLi.click(this.id + "-recent" + ctr, function(data) {
                    console.log("got recent file click. data:", data);
                    var key = data.data;
                    that.loadFileFromLocalStorageKey(key);
                    
                });

                //ctr++;
                //recentName = localStorage.getItem("com-chilipeppr-widget-macro-recent" + ctr + "-name");
                
            }
        },
        loadFileFromLocalStorageKey: function(key) {
            // load file into probes
            var info = {
                name: localStorage.getItem(key + '-name'), 
                lastModified: localStorage.getItem(key + '-lastMod')
            };
            console.log("loading script data. localStorage.key:", key, "info:", info);
            
            // load the data
            this.jscript = localStorage.getItem(key);
            this.loadJscript(this.jscript);
            this.status("Loaded data \"" + info.name + "\"");
        },
        loadJscript: function(txt) {
            //this.jscript = txt;
            $('#' + this.id + ' .luaeditor-maineditor').val(txt);
            console.log("loaded script into main editor textarea");
        },
        setupSamples: function() {
            var that = this;

            // watchChiliPepprPauseSolderDispenser
            $('.com-chilipeppr-widget-macro-sample.sample-watchChiliPepprPauseSolderDispenser').click(function() { 
                var txt = that.getMethodString(that.watchChiliPepprPauseSolderDispenser);
                that.loadJscript(txt);
            });
            
            // append the autoAddMacros
            var dropdownEl = $('#' + this.id + ' .dropdown-sample-macros');
            console.log("dropdown to append to", dropdownEl);
            for (var i in this.autoAddMacros) {
                var item = this.autoAddMacros[i];
                var id = item.id;
                var desc = item.desc;

                var menuToAdd = $('<li><a href="javascript:" class="com-chilipeppr-widget-macro-sample ' +
                    'sample-' + id + '">' + desc + '</a></li>');
                menuToAdd.click(function() {
                    var txt = that.getMethodString(that[id]);
                    that.loadJscript(txt);
                });
            
                console.log("adding macro id:", id, "desc:", desc, "el:", menuToAdd);
                
                // append to menu
                dropdownEl.append(menuToAdd);
                console.log("the new dropdown:", dropdownEl);
            }
                        
            
        },
        getMethodString: function(methodToGet) {
            var txt = methodToGet.toString();
            // remove first and last lines
            var arr = txt.split("\n");
            var ctr = 0;
            arr.forEach(function(item) {
                arr[ctr] = item.replace(/            /, "");
                arr[ctr] = arr[ctr].replace(/    /g, "\t");
                ctr++;
            });
            arr = arr.splice(1, arr.length - 2);
            return arr.join("\n");
        },
        autoAddMacros: [
            { id : 'generateZigZag', desc : "Generate Zig Zag Tool Path" }
        ],

        // START SAMPLES
        /**
         * This macro helps you generate a zig zag tool
         * path inside of an overall rectangular shape. 
         * Give it the width and height of the rectangular
         * shape. Then give it the step over value and it 
         * will generate the gcode and then send it to the 
         * workspace so you can visualize it and run it.
         * 
         * This can be used to mill out or pocket a work
         * piece. It can also be used to scan a laser
         * over a surface to ablate or cure material
         * by scanning back and forth with a step over.
         */
        generateZigZag: function() {
        },
        sendSerial: function(gcode) {
            // send our data
            chilipeppr.publish("/com-chilipeppr-widget-serialport/send", gcode);
        },
        // END SAMPLES
        
        statEl: null, // cache the status element in DOM
        status: function(txt) {
            console.log("status. txt:", txt);
            if (this.statEl == null) this.statEl = $('#' + this.id + ' .luaeditor-status');
            var len = this.statEl.val().length;
            if (len > 3000) {
                console.log("truncating status area text");
                this.statEl.val(this.statEl.val().substring(len-1500));
            }
            this.statEl.val(this.statEl.val() + "\n" + txt);
            this.statEl.scrollTop(
                this.statEl[0].scrollHeight - this.statEl.height()
            );
        },
        /**
         * Add the fork menu to upper right corner caret.
         */
        forkSetup: function () {
            var topCssSelector = '#' + this.id;
            
            $(topCssSelector + ' .panel-title').popover({
                title: this.name,
                content: this.desc,
                html: true,
                delay: 200,
                animation: true,
                trigger: 'hover',
                placement: 'auto'
            });
            
            var that = this;
            chilipeppr.load("http://fiddle.jshell.net/chilipeppr/zMbL9/show/light/", function () {
                require(['inline:com-chilipeppr-elem-pubsubviewer'], function (pubsubviewer) {
                    pubsubviewer.attachTo($(topCssSelector + ' .panel-heading .dropdown .dropdown-menu-fork'), that);
                });
            });
            
        },
    }
});