import axios from 'axios';
import { _ } from "@/utils/utils";

const HTTP = axios.create({
  baseURL: 'http://localhost:5000/api/',
});

export const contactMessage = {
  post: async function(name, email, message) {
    let response = await HTTP.post('contactMessage', {
      name,
      email,
      message
    });

    return _.get(response, 'data');
  }
};