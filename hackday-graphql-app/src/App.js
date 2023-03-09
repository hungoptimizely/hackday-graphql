import { Container } from "@mui/material";
import SuperheroApp from "./components/superhero";

function App() {
  return (
    <>
    <Container maxWidth="xl">
      <h3>React & GraphQL App</h3>
      <SuperheroApp />
    </Container>
    </>
  );
}

export default App;
