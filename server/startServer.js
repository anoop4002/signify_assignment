import { app } from "./server.js";
import { config } from "./config/config.js";

app.get('/', (req, res) => res.send('Welcome To Signify!'))
app.listen(config.port, () => console.log(`listening on port ${config.port}!`));
