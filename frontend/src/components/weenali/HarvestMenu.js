import React, { useState } from "react";

import React from "react";
import { Link } from "react-router-dom";

export default function HarvestMenu() {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/dashboard">Dashboard</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/addHarvest">Farmers Harvest Data Collection</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/transfer">Harvest Collection and Paddy Mill Transfer</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/cost">Cost Details</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/graph">Graphs</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/logout">Logout</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
  );
}
