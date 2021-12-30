import axios from 'axios';

export default axios.create({
  baseURL: 'https://react-quiz-d260e-default-rtdb.firebaseio.com/',
});
