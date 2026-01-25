import React, { useState } from "react";
import axios from "axios";
import "./GitHubSearch.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import { PiBuildingsFill } from "react-icons/pi";
import { FaXTwitter, FaGithub } from "react-icons/fa6";

function GitHubSearch() {
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim()) {
      setError("Please enter a GitHub username");
      setProfile(null);
      return;
    }

    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      setProfile(response.data);
      setError("");
    } catch (err) {
      setProfile(null);
      setError("User Not Found");
    }
  };

  return (
    <div className="main-container">
      <h1 className="main-heading">GitHub Profile Detective </h1>

      <form onSubmit={handleSubmit} className="Search-form">
        <input type="text" className="Search-input" placeholder="Enter GitHub Username..." value={username} onChange={(e) => setUsername(e.target.value)} />
        <button type="submit" className="Search-btn"> Search </button>
      </form>

      {error && <p className="error-msg">{error}</p>}

      {profile && (
        <div className="profile-container">

          <div className="profile-header">
            <img src={profile.avatar_url} alt="avatar" className="profile-avatar" />
            <div className="profile-header-info">
              <h2 className="profile-name"> {profile.name || profile.login} </h2>
              <a href={profile.html_url} target="_blank" rel="noreferrer" className="Profile-username" > @{profile.login} </a>
              <p className="profile-created">   Joined: {new Date(profile.created_at).toLocaleDateString()} </p>
            </div>
          </div>
          <p className="Profile-bio">{profile.bio}</p>

          <div className="profile-stats">
            <div> Repositories <span className="stats">{profile.public_repos}</span> </div>
            <div> Followers <span className="stats">{profile.followers}</span> </div>
            <div> Following <span className="stats">{profile.following}</span> </div>
          </div>

          <div className="profile-info"> <p className="profile-location"> <FaMapMarkerAlt /> {profile.location} </p>
            <p className="profile-company"> <PiBuildingsFill /> {profile.company} </p>
          </div>

          <div className="profile-links">
            <a href={`https://twitter.com/${profile.twitter_username}`} target="_blank" rel="noreferrer" className="twitter-link">
              <FaXTwitter /> @{profile.twitter_username}
            </a>
            <a
              href={profile.html_url} target="_blank"  rel="noreferrer"  className="profile-url">
              <FaGithub /> View Profile
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default GitHubSearch;
