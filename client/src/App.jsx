import { EthProvider } from "./contexts/EthContext";
import UserRegistration from "./components/UserRegistration";
import TodoList from "./components/TodoList";

function App() {
  return (
    <EthProvider>
    <UserRegistration/>
    <TodoList/>
    </EthProvider>
  );
}

export default App;
