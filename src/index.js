import "../css/index.css";
import ReactDOM from "react-dom";
import { App } from "./components/App";
import { createServer } from "./ServerAPI";
import { BrowserRouter } from "react-router-dom";

const server = createServer();

ReactDOM.render(
<BrowserRouter>
    <App server={server} />
</BrowserRouter> , document.getElementById("root"));
