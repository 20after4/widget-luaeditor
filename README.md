# com-chilipeppr-widget-pythoneditor
Edit and run Python code with a multi-file editor. Save locally or upload/run remotely on the Python device.

![alt text](screenshot.png "Screenshot")

## ChiliPeppr Widget / Python Editor

All ChiliPeppr widgets/elements are defined using cpdefine() which is a method
that mimics require.js. Each defined object must have a unique ID so it does
not conflict with other ChiliPeppr widgets.

| Item                  | Value           |
| -------------         | ------------- |
| ID                    | com-chilipeppr-widget-pythoneditor |
| Name                  | Widget / Python Editor |
| Description           | Edit and run Python code with a multi-file editor. Save locally or upload/run remotely on the Python device. |
| chilipeppr.load() URL | http://raw.githubusercontent.com/chilipeppr/widget-pythoneditor/master/auto-generated-widget.html |
| Edit URL              | http://ide.c9.io/chilipeppr/widget-pythoneditor |
| Github URL            | http://github.com/chilipeppr/widget-pythoneditor |
| Test URL              | https://preview.c9users.io/chilipeppr/widget-pythoneditor/widget.html |

## Example Code for chilipeppr.load() Statement

You can use the code below as a starting point for instantiating this widget
inside a workspace or from another widget. The key is that you need to load
your widget inlined into a div so the DOM can parse your HTML, CSS, and
Javascript. Then you use cprequire() to find your widget's Javascript and get
back the instance of it.

```javascript
// Inject new div to contain widget or use an existing div with an ID
$("body").append('<' + 'div id="myDivWidgetPythoneditor"><' + '/div>');

chilipeppr.load(
  "#myDivWidgetPythoneditor",
  "http://raw.githubusercontent.com/chilipeppr/widget-pythoneditor/master/auto-generated-widget.html",
  function() {
    // Callback after widget loaded into #myDivWidgetPythoneditor
    // Now use require.js to get reference to instantiated widget
    cprequire(
      ["inline:com-chilipeppr-widget-pythoneditor"], // the id you gave your widget
      function(myObjWidgetPythoneditor) {
        // Callback that is passed reference to the newly loaded widget
        console.log("Widget / Python Editor just got loaded.", myObjWidgetPythoneditor);
        myObjWidgetPythoneditor.init();
      }
    );
  }
);

```

## Publish

This widget/element publishes the following signals. These signals are owned by this widget/element and are published to all objects inside the ChiliPeppr environment that listen to them via the
chilipeppr.subscribe(signal, callback) method.
To better understand how ChiliPeppr's subscribe() method works see amplify.js's documentation at http://amplifyjs.com/api/pubsub/

  <table id="com-chilipeppr-elem-pubsubviewer-pub" class="table table-bordered table-striped">
      <thead>
          <tr>
              <th style="">Signal</th>
              <th style="">Description</th>
          </tr>
      </thead>
      <tbody>
      <tr><td colspan="2">(No signals defined in this widget/element)</td></tr>
      </tbody>
  </table>

## Subscribe

This widget/element subscribes to the following signals. These signals are owned by this widget/element. Other objects inside the ChiliPeppr environment can publish to these signals via the chilipeppr.publish(signal, data) method.
To better understand how ChiliPeppr's publish() method works see amplify.js's documentation at http://amplifyjs.com/api/pubsub/

  <table id="com-chilipeppr-elem-pubsubviewer-sub" class="table table-bordered table-striped">
      <thead>
          <tr>
              <th style="">Signal</th>
              <th style="">Description</th>
          </tr>
      </thead>
      <tbody>
      <tr valign="top"><td>/com-chilipeppr-widget-pythoneditor/loadScript</td><td>Publish an object of {name:"myfile.python", content:"print(\"hello world\")"} and we will open a new tab with the contents of the file.</td></tr>
      </tbody>
  </table>

## Foreign Publish

This widget/element publishes to the following signals that are owned by other objects.
To better understand how ChiliPeppr's subscribe() method works see amplify.js's documentation at http://amplifyjs.com/api/pubsub/

  <table id="com-chilipeppr-elem-pubsubviewer-foreignpub" class="table table-bordered table-striped">
      <thead>
          <tr>
              <th style="">Signal</th>
              <th style="">Description</th>
          </tr>
      </thead>
      <tbody>
      <tr><td colspan="2">(No signals defined in this widget/element)</td></tr>
      </tbody>
  </table>

## Foreign Subscribe

This widget/element publishes to the following signals that are owned by other objects.
To better understand how ChiliPeppr's publish() method works see amplify.js's documentation at http://amplifyjs.com/api/pubsub/

  <table id="com-chilipeppr-elem-pubsubviewer-foreignsub" class="table table-bordered table-striped">
      <thead>
          <tr>
              <th style="">Signal</th>
              <th style="">Description</th>
          </tr>
      </thead>
      <tbody>
      <tr><td colspan="2">(No signals defined in this widget/element)</td></tr>
      </tbody>
  </table>

## Methods / Properties

The table below shows, in order, the methods and properties inside the widget/element.

  <table id="com-chilipeppr-elem-methodsprops" class="table table-bordered table-striped">
      <thead>
          <tr>
              <th style="">Method / Property</th>
              <th>Type</th>
              <th style="">Description</th>
          </tr>
      </thead>
      <tbody>
      <tr valign="top"><td>id</td><td>string</td><td>"com-chilipeppr-widget-pythoneditor"<br><br>The ID of the widget. You must define this and make it unique.</td></tr><tr valign="top"><td>name</td><td>string</td><td>"Widget / Python Editor"</td></tr><tr valign="top"><td>desc</td><td>string</td><td>"Edit and run Python code with a multi-file editor. Save locally or upload/run remotely on the Python device."</td></tr><tr valign="top"><td>url</td><td>string</td><td>"http://raw.githubusercontent.com/chilipeppr/widget-pythoneditor/master/auto-generated-widget.html"</td></tr><tr valign="top"><td>fiddleurl</td><td>string</td><td>"http://ide.c9.io/chilipeppr/widget-pythoneditor"</td></tr><tr valign="top"><td>githuburl</td><td>string</td><td>"http://github.com/chilipeppr/widget-pythoneditor"</td></tr><tr valign="top"><td>testurl</td><td>string</td><td>"http://widget-pythoneditor-chilipeppr.c9users.io/widget.html"</td></tr><tr valign="top"><td>publish</td><td>object</td><td>Please see docs above.<br><br>Define the publish signals that this widget/element owns or defines so that
other widgets know how to subscribe to them and what they do.</td></tr><tr valign="top"><td>subscribe</td><td>object</td><td>Please see docs above.<br><br>Define the subscribe signals that this widget/element owns or defines so that
other widgets know how to subscribe to them and what they do.</td></tr><tr valign="top"><td>foreignPublish</td><td>object</td><td>Please see docs above.<br><br>Document the foreign publish signals, i.e. signals owned by other widgets
or elements, that this widget/element publishes to.</td></tr><tr valign="top"><td>foreignSubscribe</td><td>object</td><td>Please see docs above.<br><br>Document the foreign subscribe signals, i.e. signals owned by other widgets
or elements, that this widget/element subscribes to.</td></tr><tr valign="top"><td>jscript</td><td>object</td><td></td></tr><tr valign="top"><td>editor</td><td>object</td><td></td></tr><tr valign="top"><td>init</td><td>function</td><td>function () </td></tr><tr valign="top"><td>setupSubscribe</td><td>function</td><td>function () <br><br>Setup subscribe so others can publish to us and ask us to
open a file, i.e. the NodeMCU Files widget sends this to us.</td></tr><tr valign="top"><td>loadScript</td><td>function</td><td>function (data) <br><br>The method that receives the /loadScript publishes</td></tr><tr valign="top"><td>loadPrevFiles</td><td>function</td><td>function () </td></tr><tr valign="top"><td>getDeviceFileList</td><td>function</td><td>function () </td></tr><tr valign="top"><td>aceId</td><td>string</td><td>"com-chilipeppr-pythoneditor"<br><br>The DOM ID of the element that should be the Ace Editor</td></tr><tr valign="top"><td>aceSessionName</td><td>object</td><td></td></tr><tr valign="top"><td>aceSessions</td><td>object</td><td></td></tr><tr valign="top"><td>aceCurrentSession</td><td>object</td><td></td></tr><tr valign="top"><td>aceIsLoaded</td><td>boolean</td><td></td></tr><tr valign="top"><td>loadAce</td><td>function</td><td>function (sessionName) </td></tr><tr valign="top"><td>fileNewCtr</td><td>number</td><td></td></tr><tr valign="top"><td>fileNew</td><td>function</td><td>function (evt) </td></tr><tr valign="top"><td>createFileTab</td><td>function</td><td>function (id, filename) </td></tr><tr valign="top"><td>onFileTabShow</td><td>function</td><td>function (e) </td></tr><tr valign="top"><td>onFileTabClose</td><td>function</td><td>function (e) </td></tr><tr valign="top"><td>renameFileNeedSaveAfter</td><td>boolean</td><td></td></tr><tr valign="top"><td>renameFileShow</td><td>function</td><td>function (evt) </td></tr><tr valign="top"><td>renameFileHide</td><td>function</td><td>function (evt) </td></tr><tr valign="top"><td>renameFile</td><td>function</td><td>function () </td></tr><tr valign="top"><td>getActiveFile</td><td>function</td><td>function () </td></tr><tr valign="top"><td>fileLocalSave</td><td>function</td><td>function (evt) </td></tr><tr valign="top"><td>refreshFileList</td><td>function</td><td>function () <br><br>Update the file pulldown to show the new files in localStorage.</td></tr><tr valign="top"><td>fileLocalOpen</td><td>function</td><td>function (fi) </td></tr><tr valign="top"><td>fileUploadAndRun</td><td>function</td><td>function (evt) </td></tr><tr valign="top"><td>fileUpload</td><td>function</td><td>function (evt) </td></tr><tr valign="top"><td>rawUploadAndRun</td><td>function</td><td>function (txt, filename) </td></tr><tr valign="top"><td>fileDump</td><td>function</td><td>function (evt) </td></tr><tr valign="top"><td>fileDelete</td><td>function</td><td>function (evt) </td></tr><tr valign="top"><td>fileRun</td><td>function</td><td>function (evt) </td></tr><tr valign="top"><td>cleanupFilename</td><td>function</td><td>function () </td></tr><tr valign="top"><td>setupUploadRun</td><td>function</td><td>function () <br><br>Setup the Upload -> Run button</td></tr><tr valign="top"><td>onOpenUploadRunRegion</td><td>function</td><td>function (evt) </td></tr><tr valign="top"><td>onCloseUploadRunRegion</td><td>function</td><td>function () </td></tr><tr valign="top"><td>flashMsg</td><td>function</td><td>function (title, msg) </td></tr><tr valign="top"><td>setupStartup</td><td>function</td><td>function () </td></tr><tr valign="top"><td>editStartup</td><td>function</td><td>function (evt) </td></tr><tr valign="top"><td>saveStartup</td><td>function</td><td>function (evt) </td></tr><tr valign="top"><td>makeTextareaAcceptTabs</td><td>function</td><td>function () </td></tr><tr valign="top"><td>sendCtr</td><td>number</td><td>Keep a counter so each send has its own ID so we can use jsonSend
and get complete statuses back from SPJS when we send each line
to the serial port.</td></tr><tr valign="top"><td>send</td><td>function</td><td>function (txt) <br><br>Send the script off to the serial port.</td></tr><tr valign="top"><td>getScript</td><td>function</td><td>function () </td></tr><tr valign="top"><td>runScript</td><td>function</td><td>function (macroStr, helpTxt) </td></tr><tr valign="top"><td>jscriptKeypress</td><td>function</td><td>function (evt) </td></tr><tr valign="top"><td>saveTemporaryFile</td><td>function</td><td>function (evt) </td></tr><tr valign="top"><td>getTemporaryFile</td><td>function</td><td>function () </td></tr><tr valign="top"><td>setScriptFromTemporaryFile</td><td>function</td><td>function () </td></tr><tr valign="top"><td>showData</td><td>function</td><td>function (datatxt) </td></tr><tr valign="top"><td>saveScript</td><td>function</td><td>function () </td></tr><tr valign="top"><td>deleteRecentFiles</td><td>function</td><td>function () </td></tr><tr valign="top"><td>createRecentFileEntry</td><td>function</td><td>function (fileStr, info) </td></tr><tr valign="top"><td>buildRecentFileMenu</td><td>function</td><td>function () </td></tr><tr valign="top"><td>loadFileFromLocalStorageKey</td><td>function</td><td>function (key) </td></tr><tr valign="top"><td>resizeEditor</td><td>function</td><td>function () </td></tr><tr valign="top"><td>resize</td><td>function</td><td>function () <br><br>Resize the widget to the height of the window</td></tr><tr valign="top"><td>loadJscript</td><td>function</td><td>function (txt) </td></tr><tr valign="top"><td>setupSamples</td><td>function</td><td>function () </td></tr><tr valign="top"><td>getMethodString</td><td>function</td><td>function (methodToGet) </td></tr><tr valign="top"><td>autoAddMacros</td><td>object</td><td></td></tr><tr valign="top"><td>generateZigZag</td><td>function</td><td>function () <br><br>This macro helps you generate a zig zag tool
path inside of an overall rectangular shape.
Give it the width and height of the rectangular
shape. Then give it the step over value and it
will generate the gcode and then send it to the
workspace so you can visualize it and run it.<br><br>This can be used to mill out or pocket a work
piece. It can also be used to scan a laser
over a surface to ablate or cure material
by scanning back and forth with a step over.</td></tr><tr valign="top"><td>sendSerial</td><td>function</td><td>function (gcode) </td></tr><tr valign="top"><td>statEl</td><td>object</td><td></td></tr><tr valign="top"><td>status</td><td>function</td><td>function (txt) </td></tr><tr valign="top"><td>forkSetup</td><td>function</td><td>function () <br><br>Add the fork menu to upper right corner caret.</td></tr>
      </tbody>
  </table>


## About ChiliPeppr

[ChiliPeppr](http://chilipeppr.com) is a hardware fiddle, meaning it is a
website that lets you easily
create a workspace to fiddle with your hardware from software. ChiliPeppr provides
a [Serial Port JSON Server](https://github.com/johnlauer/serial-port-json-server)
that you run locally on your computer, or remotely on another computer, to connect to
the serial port of your hardware like an Arduino or other microcontroller.

You then create a workspace at ChiliPeppr.com that connects to your hardware
by starting from scratch or forking somebody else's
workspace that is close to what you are after. Then you write widgets in
Javascript that interact with your hardware by forking the base template
widget or forking another widget that
is similar to what you are trying to build.

ChiliPeppr is massively capable such that the workspaces for
[TinyG](http://chilipeppr.com/tinyg) and [Grbl](http://chilipeppr.com/grbl) CNC
controllers have become full-fledged CNC machine management software used by
tens of thousands.

ChiliPeppr has inspired many people in the hardware/software world to use the
browser and Javascript as the foundation for interacting with hardware. The
Arduino team in Italy caught wind of ChiliPeppr and now
ChiliPeppr's Serial Port JSON Server is the basis for the
[Arduino's new web IDE](https://create.arduino.cc/). If the Arduino team is excited about building on top
of ChiliPeppr, what
will you build on top of it?

