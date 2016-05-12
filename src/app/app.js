import HelloWorld from './module/hello-world';

var app = {};

app.start = () => app.helloworld = HelloWorld('Hello world');

window.app = app;
