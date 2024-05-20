import { app } from './src/app';

app.get('/api/tickets', (req, res) => {
  res.send('Hello world!');
})

app.listen(3000, () => {
  console.log('Listening on port 3000');
})