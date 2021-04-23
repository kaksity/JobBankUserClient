/* eslint-disable camelcase */
/* eslint-disable max-len  */
import request from './utils';

const urlPrefix = '/api/common';
const urls = {
  // users
  readUser: '/users/<id>',
  readUsers: '/users',
  createUsers: '/users',
  updateUsers: '/users/<id>',
  deleteUsers: '/users/<id>',

  // tables
  readTablesList: '/tables/list',
};

Object.keys(urls).map((url) => {
  urls[url] = urlPrefix + urls[url];
  return url;
});

export default new function API() {
  // auth
  this.Login = params => request.post('/login', params);
  this.Register = params => request.post('/register',params);

  // usersgetProfile
  this.readUser = id => request.get(urls.readUser.replace('<id>', id));
  this.readUsers = () => request.get(urls.readUsers, {});
  this.createUsers = params => request.post(urls.createUsers, params);
  this.updateUsers = (id, params) => request.put(urls.updateUsers.replace('<id>', id), params);
  this.deleteUsers = id => request.delete(urls.deleteUsers.replace('<id>', id));

  // table
  this.readTablesList = () => request.get(urls.readTablesList, {});

  this.GetLGA = () => request.get('/lga');
  this.GetHighestQualification = () => request.get('/education-level');
  this.GetProfile = () => request.get('/profile');
  this.UpdateProfile = (params) => request.put('/profile', params);
  this.PostQualifications = (params) => request.post('/qualifications', params);
  this.GetAdditionalSkills = () => request.get('/additional-skills');
  this.GetSkillSet = () => request.get('/skills');
  this.PostAdditionalSkills = (params) => request.post('/additional-skills', params);
  this.DeleteAdditionalSkills = (id) => request.delete(`/additional-skills/${id}`);
  this.PostWorkExperience = (params) => request.post('/work-experiences', params);
  this.GetWorkExperience = () => request.get('/work-experiences');
  this.DeleteWorkExperiences = (id) => request.delete(`/work-experiences/${id}`);
}();
