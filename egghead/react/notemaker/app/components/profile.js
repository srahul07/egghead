import React from 'react';
import { Router } from 'react-router';
import Repos from './github/repos';
import UserProfile from './github/userprofile';
import Notes from './notes/notes';
import ReactFireMixin from 'reactfire';
import Firebase from 'firebase';
import helpers from '../utils/helpers';


var Profile = React.createClass({
  mixins: [ReactFireMixin],
  getInitialState: function() {
    return {
     notes: [1, 2, 3],
     bio: {},
     repos: []
    };
  },
  componentDidMount: function() {
    var config = {
      apiKey: "nTxyFWmoKiTdwRpJagmsNiPbOEH2", // "<API_KEY>",
      authDomain: "notemaker-8bc3d.firebaseapp.com",
      databaseURL: "https://notemaker-8bc3d.firebaseio.com",
      storageBucket: "notemaker-8bc3d.appspot.com",
    };
    this.db = Firebase.initializeApp(config).database();

    this.init(this.props.params.username);
  },
  componentWillReceiveProps: function(nextProps) {
    this.unbind('notes');
    this.init(nextProps.params.username)
  },
  componentWillUnmount: function() {
   this.unbind('notes');
  },
  init: function(username) {
    var childRef = this.db.ref(username);
    this.bindAsArray(childRef, 'notes');

    helpers.getGithubInfo(username)
    .then(function(data) {
      this.setState({
        bio: data.bio,
        repos: data.repos
      })
    }.bind(this))
  },
  handleAddNote: function(newNote) {
    this.db.ref(this.props.params.username).child(this.state.notes.length).set(newNote);
  },
  render: function() {
    return (
      <div className="row">
        <div className="col-md-4">
          <UserProfile username={ this.props.params.username } bio={ this.state.bio } />
        </div>
        <div className="col-md-4">
          <Repos username={ this.props.params.username } repos={ this.state.repos } />
        </div>
        <div className="col-md-4">
          <Notes username={ this.props.params.username } notes={ this.state.notes }
            addNote={this.handleAddNote} />
        </div>
      </div>
    );
  }
});

module.exports = Profile;
