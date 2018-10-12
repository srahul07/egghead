import React from 'react';


var Repos = React.createClass({
  propTypes: {
    username: React.PropTypes.string.isRequired,
    repos: React.PropTypes.array.isRequired
  },
  render: function() {
    var repos = this.props.repos.map(function(repo, index) {
      return (
        <li className="list-group-item" key={index}>
          {repo.html_url && <h4><a href={repo.html_url}>{repo.name}</a>&nbsp;&nbsp;&nbsp;<span className="label label-default">{repo.language}</span></h4>}
          {repo.description && <p>{repo.description}</p>}
        </li>
      )
    });
    return (
      <div>
        <h3>User Repos</h3>
        <ul className="list-group"> {repos} </ul>
      </div>
    );
  }
});

module.exports = Repos;
