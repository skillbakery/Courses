import 'package:flutter/material.dart';

import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/foundation.dart';
import 'dart:async';
import 'dart:io';
import 'package:path_provider/path_provider.dart';
import 'dart:convert' as convert;
import 'package:http/http.dart' as http;

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        // This is the theme of your application.
        //
        // Try running your application with "flutter run". You'll see the
        // application has a blue toolbar. Then, without quitting the app, try
        // changing the primarySwatch below to Colors.green and then invoke
        // "hot reload" (press "r" in the console where you ran "flutter run",
        // or simply save your changes to "hot reload" in a Flutter IDE).
        // Notice that the counter didn't reset back to zero; the application
        // is not restarted.
        primarySwatch: Colors.orange,
      ),
      home: MyHomePage(title: 'Flutter Demo Home Page',storage:DataStorage(),data:GetData()),
    );
  }
}

class DataStorage{
  Future<String> get _path async {
    final directory = await getApplicationDocumentsDirectory();
    return directory.path;
  }

  Future<File> get _file async {
    final path = await _path;
    return File('$path/appfile.txt');
  }

  Future<int> readVal() async {
    try{
      final file = await _file;
      String fileContent = await file.readAsString() ;
      return int.parse(fileContent);
    } catch(e){
      return 0;
    }
  }

  Future<File> writeVal(int data) async{
    final file = await _file;

    return file.writeAsString('$data');
  }
}

class GetData {
  Future<http.Response> getData() async{
    return http.get('https://www.googleapis.com/books/v1/volumes?q={flutter}');
  }
}
class MyHomePage extends StatefulWidget {
  final String title;
  final DataStorage storage;
  final GetData data;

  MyHomePage({Key key, this.title,@required this.storage,@required this.data}) : super(key: key);

  // This widget is the home page of your application. It is stateful, meaning
  // that it has a State object (defined below) that contains fields that affect
  // how it looks.

  // This class is the configuration for the state. It holds the values (in this
  // case the title) provided by the parent (in this case the App widget) and
  // used by the build method of the State. Fields in a Widget subclass are
  // always marked "final".

  

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter;
  int _itemCount;
  @override
  void initState(){
    super.initState();
    widget.storage.readVal().then((int value){
      setState(() {
       _counter = value; 
      });
    });

    widget.data.getData().then((var response){
    if (response.statusCode == 200) {
      var jsonResponse = convert.jsonDecode(response.body);
      _itemCount = jsonResponse['totalItems'];
      }
    });
  }
  Future<File> _incrementCounter() async {
    setState(() {
      // This call to setState tells the Flutter framework that something has
      // changed in this State, which causes it to rerun the build method below
      // so that the display can reflect the updated values. If we changed
      // _counter without calling setState(), then the build method would not be
      // called again, and so nothing would appear to happen.
      _counter++;
    });


    return widget.storage.writeVal(_counter);
  }

  @override
  Widget build(BuildContext context) {
    // This method is rerun every time setState is called, for instance as done
    // by the _incrementCounter method above.
    //
    // The Flutter framework has been optimized to make rerunning build methods
    // fast, so that you can just rebuild anything that needs updating rather
    // than having to individually change instances of widgets.
    return Scaffold(
      appBar: AppBar(
        // Here we take the value from the MyHomePage object that was created by
        // the App.build method, and use it to set our appbar title.
        title: Text(widget.title),
      ),
      body: new ListView.builder(
        itemCount: _itemCount,//_counter, 
        itemBuilder: (BuildContext context, int index) {
          return ListTile(
            leading:const Icon(Icons.account_box),
            title: Text('Name'),
            onTap:(){
              Navigator.push(
                context,
                MaterialPageRoute(builder:(context)=>NextPage()),
              );
            }
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: Icon(Icons.add),
      ), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}
class NextPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(appBar: AppBar(
       title: Text('This is the next screen'),
      ),
      body: Center(
        child: new Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          new RaisedButton(
          onPressed: (){
            Navigator.pop(context);
          },
          child: Text('Back'),
        ),
        new SizedBox(
            width: 200.0,
            height: 140.0,
            child: AutoSizeText(
              "That is how I look increase some more lines and lets see how it looks.",
              style: TextStyle(fontSize: 30.0),
              maxLines: 2,
            ),
        ),
        ],
      ),
    )
    );
  }
}
