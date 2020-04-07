import axios from 'axios';
import {_} from "@/utils/utils";

const HTTP = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL
});

export const contactMessage = {
  post: async function(name, email, message) {
    let response = await HTTP.post('/contactMessage', {
      name,
      email,
      message
    });

    return _.get(response, 'data');
  }
};